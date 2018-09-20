import _ from 'underscore';
import { betterSetInterval, betterClearInterval } from 'apify-shared/utilities';
import log from 'apify-shared/log';
import { ACTOR_EVENT_NAMES } from 'apify-shared/consts';
import { checkParamOrThrow } from 'apify-client/build/utils';
import { getMemoryInfo, isAtHome } from '../utils';
import events from '../events';

const DEFAULT_OPTIONS = {
    eventLoopSnapshotIntervalSecs: 0.5,
    maxBlockedMillis: 50,
    memorySnapshotIntervalSecs: 1,
    maxUsedMemoryRatio: 0.7,
    snapshotHistorySecs: 60,
};

/**
 * Creates snapshots of system resources at given intervals and marks the resource
 * as either overloaded or not during the last interval. Keeps a history of the snapshots.
 * It tracks the following resources: Memory, EventLoop and CPU.
 * The class is used by the {@linkcode AutoscaledPool} class.
 *
 * There are differences in behavior when running locally and on the Apify platform,
 * but those differences are handled internally by the class and do not affect its interface.
 *
 * Memory becomes overloaded if its current use exceeds the `minFreeMemoryRatio` option.
 * It's computed using the total memory available to the container when running on
 * the Apify platform and a quarter of total system memory when running locally.
 * Use of total memory may be overridden by using the `maxBlockedRatio` option.
 *
 * Event loop becomes overloaded if it slows down by more than the `maxBlockedMillis` option.
 *
 * CPU tracking is available only on the Apify platform and the CPU overloaded event is read
 * directly off the container and is not configurable.
 *
 * @param {Object} options
 * @param {Number} [options.eventLoopSnapshotIntervalSecs=0.5]
 *   Defines the interval of measuring the event loop response time.
 * @param {Number} [options.maxBlockedMillis=50]
 *   Maximum allowed delay of the event loop in milliseconds.
 *   Exceeding this limit overloads the event loop.
 * @param {Number} [options.memorySnapshotIntervalSecs=1]
 *   Defines the interval of measuring memory consumption.
 *   The measurement itself is resource intensive (25 - 50ms async),
 *   therefore, setting this interval below 1 second is not recommended.
 * @param {Number} [options.maxUsedMemoryRatio=0.7]
 *   Defines the maximum ratio of memory that can be used.
 *   Exceeding this limit overloads the memory.
 * @param {Number} [options.snapshotHistorySecs=60]
 *   Sets the interval in seconds for which a history of resource snapshots
 *   will be kept. Increasing this to very high numbers will affect performance.
 * @param {Number} [options.maxMemoryMbytes]
 *   Sets the maximum amount of memory to be used in megabytes.
 * @ignore
 */
export default class Snapshotter {
    constructor(options = {}) {
        const {
            eventLoopSnapshotIntervalSecs,
            memorySnapshotIntervalSecs,
            snapshotHistorySecs,
            maxBlockedMillis,
            maxUsedMemoryRatio,
            maxMemoryMbytes,
        } = _.defaults(options, DEFAULT_OPTIONS);

        checkParamOrThrow(eventLoopSnapshotIntervalSecs, 'options.eventLoopSnapshotIntervalSecs', 'Number');
        checkParamOrThrow(memorySnapshotIntervalSecs, 'options.memorySnapshotIntervalSecs', 'Number');
        checkParamOrThrow(snapshotHistorySecs, 'options.snapshotHistorySecs', 'Number');
        checkParamOrThrow(maxBlockedMillis, 'options.maxBlockedMillis', 'Number');
        checkParamOrThrow(maxUsedMemoryRatio, 'options.maxUsedMemoryRatio', 'Number');
        checkParamOrThrow(maxMemoryMbytes, 'options.maxMemoryMbytes', 'Maybe Number');

        this.eventLoopSnapshotIntervalMillis = eventLoopSnapshotIntervalSecs * 1000;
        this.memorySnapshotIntervalMillis = memorySnapshotIntervalSecs * 1000;
        this.snapshotHistoryMillis = snapshotHistorySecs * 1000;
        this.maxBlockedMillis = maxBlockedMillis;
        this.maxUsedMemoryRatio = maxUsedMemoryRatio;
        this.maxMemoryBytes = maxMemoryMbytes ? maxMemoryMbytes * 1024 * 1024 : null;

        this.cpuSnapshots = [];
        this.eventLoopSnapshots = [];
        this.memorySnapshots = [];
    }

    /**
     * Starts capturing snapshots in configured intervals.
     * @return {Promise}
     * @ignore
     */
    async start() {
        // Ensure max memory is correctly computed.
        if (!this.maxMemoryBytes) {
            const { totalBytes } = await getMemoryInfo();
            if (isAtHome()) {
                this.maxMemoryBytes = totalBytes;
            } else {
                this.maxMemoryBytes = Math.ceil(totalBytes / 4);
                log.info(`Snapshotter: Setting max memory of this run to ${Math.round(this.maxMemoryBytes / 1024 / 1024)} MB.`);
            }
        }
        // Add dummy snapshot to compare the first with.
        this.eventLoopSnapshots.push({
            createdAt: new Date(),
            isOverloaded: false,
            exceededMillis: 0,
        });

        // Start snapshotting.
        this.eventLoopInterval = betterSetInterval(this._snapshotEventLoop.bind(this), this.eventLoopSnapshotIntervalMillis);
        this.memoryInterval = betterSetInterval(this._snapshotMemory.bind(this), this.memorySnapshotIntervalMillis);
        events.on(ACTOR_EVENT_NAMES.CPU_INFO, this._snapshotCpu.bind(this));
    }

    /**
     * Stops all resource capturing.
     * @return {Promise}
     * @ignore
     */
    async stop() {
        betterClearInterval(this.eventLoopInterval);
        betterClearInterval(this.memoryInterval);
        events.removeListener(ACTOR_EVENT_NAMES.CPU_INFO, this._snapshotCpu);
        // Allow microtask queue to unwind before stop returns.
        await new Promise(resolve => setImmediate(resolve));
    }

    /**
     * Returns a sample of latest memory snapshots, with the size of the sample defined
     * by the sampleDurationMillis parameter. If omitted, it returns a full snapshot history.
     * @param {Number} [sampleDurationMillis]
     * @return {Array} sample
     * @ignore
     */
    getMemorySample(sampleDurationMillis) {
        return this._getSample(this.memorySnapshots, sampleDurationMillis);
    }

    /**
     * Returns a sample of latest event loop snapshots, with the size of the sample defined
     * by the sampleDurationMillis parameter. If omitted, it returns a full snapshot history.
     * @param {Number} [sampleDurationMillis]
     * @return {Array} sample
     * @ignore
     */
    getEventLoopSample(sampleDurationMillis) {
        return this._getSample(this.eventLoopSnapshots, sampleDurationMillis);
    }

    /**
     * Returns a sample of latest CPU snapshots, with the size of the sample defined
     * by the sampleDurationMillis parameter. If omitted, it returns a full snapshot history.
     * @param {Number} [sampleDurationMillis]
     * @return {Array} sample
     * @ignore
     */
    getCpuSample(sampleDurationMillis) {
        return this._getSample(this.cpuSnapshots, sampleDurationMillis);
    }

    /**
     * Finds the latest snapshots by sampleDurationMillis in the provided array.
     * @param {Array} snapshots
     * @param {Number} [sampleDurationMillis]
     * @return {Array} sample
     * @ignore
     */
    _getSample(snapshots, sampleDurationMillis) { // eslint-disable-line class-methods-use-this
        if (!sampleDurationMillis) return snapshots;

        const sample = [];
        let idx = snapshots.length;
        if (!idx) return sample;

        const latestTime = snapshots[idx - 1].createdAt;
        while (idx--) {
            const snapshot = snapshots[idx];
            if (latestTime - snapshot.createdAt <= sampleDurationMillis) sample.unshift(snapshot);
            else break;
        }
        return sample;
    }

    /**
     * Creates a snapshot of current memory usage.
     * @param {Function} intervalCallback
     * @return {Promise}
     * @ignore
     */
    async _snapshotMemory(intervalCallback) {
        try {
            const now = new Date();
            const memInfo = await getMemoryInfo();
            const { mainProcessBytes, childProcessesBytes } = memInfo;
            this._pruneSnapshots(this.memorySnapshots, now);

            const usedBytes = mainProcessBytes + childProcessesBytes;
            const snapshot = Object.assign(memInfo, {
                createdAt: now,
                isOverloaded: usedBytes / this.maxMemoryBytes > this.maxUsedMemoryRatio,
            });

            this.memorySnapshots.push(snapshot);
        } catch (err) {
            log.exception(err, 'Snapshotter: Memory snapshot failed.');
        } finally {
            intervalCallback();
        }
    }

    /**
     * Creates a snapshot of current event loop delay.
     * @param {Function} intervalCallback
     * @return {Promise}
     * @ignore
     */
    _snapshotEventLoop(intervalCallback) {
        try {
            const now = new Date();
            this._pruneSnapshots(this.eventLoopSnapshots, now);
            const { createdAt } = this.eventLoopSnapshots[this.eventLoopSnapshots.length - 1];
            const delta = now - createdAt - this.eventLoopSnapshotIntervalMillis;

            const snapshot = {
                createdAt: now,
                isOverloaded: false,
                exceededMillis: Math.max(delta - this.maxBlockedMillis, 0),
            };

            if (delta > this.maxBlockedMillis) snapshot.isOverloaded = true;
            this.eventLoopSnapshots.push(snapshot);
        } catch (err) {
            log.exception(err, 'Snapshotter: Event Loop snapshot failed.');
        } finally {
            intervalCallback();
        }
    }

    /**
     * Creates a snapshot of current CPU usage.
     * @param {Object} cpuInfoEvent
     * @return {Promise}
     * @ignore
     */
    _snapshotCpu(cpuInfoEvent) {
        const createdAt = (new Date(cpuInfoEvent.createdAt));
        this._pruneSnapshots(this.cpuSnapshots, createdAt);
        this.cpuSnapshots.push({
            createdAt,
            isOverloaded: cpuInfoEvent.isCpuOverloaded,
        });
    }

    /**
     * Removes snapshots that are older than the snapshotHistorySecs option
     * from the array (destructively - in place).
     * @param {Array} snapshots
     * @param {Date} now
     * @ignore
     */
    _pruneSnapshots(snapshots, now) {
        let oldCount = 0;
        for (let i = 0; i < snapshots.length; i++) {
            const { createdAt } = snapshots[i];
            if (now - createdAt > this.snapshotHistoryMillis) oldCount++;
            else break;
        }
        snapshots.splice(0, oldCount);
    }
}
