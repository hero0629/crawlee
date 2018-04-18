import fs from 'fs';
import path from 'path';
import _ from 'underscore';
import Promise from 'bluebird';
import { leftpad } from 'apify-shared/utilities';
import LruCache from 'apify-shared/lru_cache';
import { checkParamOrThrow } from 'apify-client/build/utils';
import { ENV_VARS, LOCAL_EMULATION_SUBDIRS } from './constants';
import { apifyClient, ensureDirExists } from './utils';

export const LOCAL_EMULATION_SUBDIR = LOCAL_EMULATION_SUBDIRS.datasets;
export const LEFTPAD_COUNT = 9; // Used for filename in DatasetLocal.
const MAX_OPENED_STORES = 1000;

const writeFilePromised = Promise.promisify(fs.writeFile);
const readdirPromised = Promise.promisify(fs.readdir);

const { datasets } = apifyClient;
const datasetsCache = new LruCache({ maxLength: MAX_OPENED_STORES }); // Open Datasets are stored here.

/**
 * The `Dataset` class provides a simple interface to the [Apify Dataset](https://www.apify.com/docs/storage#dataset) storage.
 * You should not instantiate this class directly, use the [Apify.openDataset()](#module-Apify-openDataset) function.
 *
 * Example usage:
 *
 * ```javascript
 * const dataset = await Apify.openDataset('my-dataset-id');
 * await dataset.pushData({ foo: 'bar' });
 * ```
 *
 * @param {String} datasetId - ID of the dataset.
 */
export class Dataset {
    constructor(datasetId) {
        checkParamOrThrow(datasetId, 'datasetId', 'String');

        this.datasetId = datasetId;
    }

    /**
     * Stores object or an array of objects in the dataset.
     * The function has no result, but throws on invalid args or other errors.
     *
     * @return {Promise} That resolves when data gets saved into the dataset.
     */
    pushData(data) {
        checkParamOrThrow(data, 'data', 'Array | Object');

        return datasets.putItems({
            datasetId: this.datasetId,
            data,
        });
    }
}

/**
 * This is a local emulation of a dataset.
 *
 * @ignore
 */
export class DatasetLocal {
    constructor(datasetId, localEmulationDir) {
        checkParamOrThrow(datasetId, 'datasetId', 'String');
        checkParamOrThrow(localEmulationDir, 'localEmulationDir', 'String');

        this.localEmulationPath = path.resolve(path.join(localEmulationDir, LOCAL_EMULATION_SUBDIR, datasetId));
        this.counter = 0;
        this.datasetId = datasetId;
        this.initializationPromise = this._initialize();
    }

    _initialize() {
        return ensureDirExists(this.localEmulationPath)
            .then(() => readdirPromised(this.localEmulationPath))
            .then((files) => {
                if (files.length) {
                    const lastFileNum = files.pop().split('.')[0];

                    this.counter = parseInt(lastFileNum, 10);
                }
            });
    }

    pushData(data) {
        checkParamOrThrow(data, 'data', 'Array | Object');

        if (!_.isArray(data)) data = [data];

        return this.initializationPromise
            .then(() => {
                const promises = data.map((item) => {
                    this.counter++;

                    // Format JSON to simplify debugging, the overheads is negligible
                    const itemStr = JSON.stringify(item, null, 2);
                    const fileName = `${leftpad(this.counter, LEFTPAD_COUNT, 0)}.json`;
                    const filePath = path.join(this.localEmulationPath, fileName);

                    return writeFilePromised(filePath, itemStr);
                });

                return Promise.all(promises);
            });
    }
}

/**
 * Helper function that first requests dataset by ID and if dataset doesn't exist then gets it by name.
 *
 * @ignore
 */
const getOrCreateDataset = (datasetIdOrName) => {
    return datasets
        .getDataset({ datasetId: datasetIdOrName })
        .then((existingDataset) => {
            if (existingDataset) return existingDataset;

            return datasets.getOrCreateDataset({ datasetName: datasetIdOrName });
        });
};


/**
 * Opens a dataset and returns a promise resolving to an instance of the [Dataset](#Dataset) object.
 *
 * Dataset is an append-only storage that is useful for storing sequential or tabular results.
 * For more information, see [Dataset documentation](https://www.apify.com/docs/storage#dataset).
 *
 * Example usage:
 *
 * ```javascript
 * const store = await Apify.openDataset(); // Opens the default dataset of the run.
 * const storeWithName = await Apify.openDataset('some-name'); // Opens dataset with name 'some-name'.
 *
 * // Write a single row to dataset
 * await dataset.pushData({ foo: 'bar' });
 *
 * // Write multiple rows
 * await dataset.pushData([
 *   { foo: 'bar2', col2: 'val2' },
 *   { col3: 123 },
 * ]);
 * ```
 *
 * If the `APIFY_LOCAL_EMULATION_DIR` environment variable is set, the result of this function
 * is an instance of the `DatasetLocal` class which stores the data in a local directory
 * rather than Apify cloud. This is useful for local development and debugging of your acts.
 *
 * @param {string} datasetIdOrName ID or name of the dataset to be opened. If no value is provided
 *                                 then the function opens the default dataset associated with the act run.
 * @returns {Promise<Dataset>} Returns a promise that resolves to a `Dataset` object.
 *
 * @memberof module:Apify
 * @name openDataset
 * @instance
 * @function
 */
export const openDataset = (datasetIdOrName) => {
    checkParamOrThrow(datasetIdOrName, 'datasetIdOrName', 'Maybe String');

    const localEmulationDir = process.env[ENV_VARS.LOCAL_EMULATION_DIR];

    let isDefault = false;
    let datasetPromise;

    if (!datasetIdOrName) {
        const envVar = ENV_VARS.DEFAULT_DATASET_ID;

        // Env var doesn't exist.
        if (!process.env[envVar]) return Promise.reject(new Error(`The '${envVar}' environment variable is not defined.`));

        isDefault = true;
        datasetIdOrName = process.env[envVar];
    }

    datasetPromise = datasetsCache.get(datasetIdOrName);

    // Found in cache.
    if (datasetPromise) return datasetPromise;

    // Use local emulation?
    if (localEmulationDir) {
        datasetPromise = Promise.resolve(new DatasetLocal(datasetIdOrName, localEmulationDir));
    } else {
        datasetPromise = isDefault // If true then we know that this is an ID of existing dataset.
            ? Promise.resolve(new Dataset(datasetIdOrName))
            : getOrCreateDataset(datasetIdOrName).then(dataset => (new Dataset(dataset.id)));
    }

    datasetsCache.add(datasetIdOrName, datasetPromise);

    return datasetPromise;
};

/**
 * Stores object or an array of objects in the default dataset for the current act run using the Apify API
 * Default id of the dataset is in the `APIFY_DEFAULT_DATASET_ID` environment variable
 * The function has no result, but throws on invalid args or other errors.
 *
 * ```javascript
 * await Apify.pushData(data);
 * ```
 *
 * The data is stored in default dataset associated with this act.
 *
 * If the `APIFY_LOCAL_EMULATION_DIR` environment variable is defined, the data gets pushed into local directory.
 * This feature is useful for local development and debugging of your acts.
 *
 * **IMPORTANT**: Do not forget to use the `await` keyword when calling `Apify.pushData()`,
 * otherwise the act process might finish before the data is stored!
 *
 * @param {Object|Array} data Object or array of objects containing data to by stored in the dataset (9MB Max)
 * @returns {Promise} Returns a promise that gets resolved once data are saved.
 *
 * @memberof module:Apify
 * @name pushData
 * @instance
 * @function
 */
export const pushData = item => openDataset().then(dataset => dataset.pushData(item));
