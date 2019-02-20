import fs from 'fs';
import vm from 'vm';
import util from 'util';
import _ from 'underscore';
import log from 'apify-shared/log';
import { checkParamOrThrow } from 'apify-client/build/utils';
import { checkParamPrototypeOrThrow } from 'apify-shared/utilities';
import { RequestQueue, RequestQueueLocal } from './request_queue';
import Request from './request';
import { enqueueLinks } from './enqueue_links';

const jqueryPath = require.resolve('jquery');
const underscorePath = require.resolve('underscore');
const readFilePromised = util.promisify(fs.readFile);

/**
 * Hides certain Puppeteer fingerprints from the page, in order to help avoid detection of the crawler.
 * The function should be called on a newly-created page object before navigating to the target crawled page.
 *
 * @param {Page} page
 *   Puppeteer <a href="https://pptr.dev/#?product=Puppeteer&show=api-class-page" target="_blank"><code>Page</code></a> object.
 * @return {Promise}
 * @memberOf puppeteer
 */
const hideWebDriver = async (page) => {
    checkParamOrThrow(page, 'page', 'Object');

    await page.evaluateOnNewDocument(() => {
        var modifiedNavigator; // eslint-disable-line no-var
        try {
            if (Navigator.prototype.hasOwnProperty('webdriver')) { // eslint-disable-line no-prototype-builtins
                modifiedNavigator = Navigator.prototype;
            } else {
                modifiedNavigator = Object.create(window.navigator);
                Object.defineProperty(window, 'navigator', {
                    value: modifiedNavigator,
                    configurable: false,
                    enumerable: true,
                    writable: false,
                });
            }
            Object.defineProperties(modifiedNavigator, {
                webdriver: {
                    configurable: true,
                    get: function () { // eslint-disable-line object-shorthand
                        return false;
                    },
                },
            });
            // Date.prototype.getTimezoneOffset = function () { return -4 * 60; };
        } catch (e) {
            console.error(e);
        }
    });
};

/**
 * Injects a JavaScript file into a Puppeteer page.
 * Unlike Puppeteer's `addScriptTag` function, this function works on pages
 * with arbitrary Cross-Origin Resource Sharing (CORS) policies.
 *
 * @param {Page} page
 *   Puppeteer <a href="https://pptr.dev/#?product=Puppeteer&show=api-class-page" target="_blank"><code>Page</code></a> object.
 * @param {String} filePath File path
 * @return {Promise}
 * @memberOf puppeteer
 */
const injectFile = async (page, filePath) => {
    checkParamOrThrow(page, 'page', 'Object');
    checkParamOrThrow(filePath, 'filePath', 'String');

    const contents = await readFilePromised(filePath, 'utf8');

    return page.evaluateOnNewDocument(contents);
};

/**
 * Injects the <a href="https://jquery.com/" target="_blank"><code>jQuery</code></a> library into a Puppeteer page.
 * jQuery is often useful for various web scraping and crawling tasks.
 * For example, it can help extract text from HTML elements using CSS selectors.
 *
 * Beware that the injected jQuery object will be set to the `window.$` variable and thus it might cause conflicts with
 * other libraries included by the page that use the same variable name (e.g. another version of jQuery).
 * This can affect functionality of page's scripts.
 *
 * **Example usage:**
 * ```javascript
 * await Apify.utils.puppeteer.injectJQuery(page);
 * const title = await page.evaluate(() => {
 *   return $('head title').text();
 * });
 * ```
 *
 * Note that `injectJQuery()` does not affect the Puppeteer's
 * <a href="https://pptr.dev/#?product=Puppeteer&show=api-pageselector" target="_blank"><code>Page.$()</code></a>
 * function in any way.
 *
 * @param {Page} page
 *   Puppeteer <a href="https://pptr.dev/#?product=Puppeteer&show=api-class-page" target="_blank"><code>Page</code></a> object.
 * @return {Promise}
 * @memberOf puppeteer
 */
const injectJQuery = (page) => {
    checkParamOrThrow(page, 'page', 'Object');

    // TODO: For better performance we could use minimized version of the script
    return injectFile(page, jqueryPath);
};

/**
 * Injects the <a href="https://underscorejs.org/" target="_blank"><code>Underscore.js</code></a> library into a Puppeteer page.
 *
 * Beware that the injected Underscore object will be set to the `window._` variable and thus it might cause conflicts with
 * libraries included by the page that use the same variable name.
 * This can affect functionality of page's scripts.
 *
 * **Example usage:**
 * ```javascript
 * await Apify.utils.puppeteer.injectUnderscore(page);
 * const escapedHtml = await page.evaluate(() => {
 *   return _.escape('<h1>Hello</h1>');
 * });
 * ```
 *
 * @param {Page} page Puppeteer [Page](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page) object.
 * @return {Promise}
 * @memberOf puppeteer
 */
const injectUnderscore = (page) => {
    checkParamOrThrow(page, 'page', 'Object');

    // TODO: For better performance we could use minimized version of the script
    return injectFile(page, underscorePath);
};

/**
 * DEPRECATED!
 * TODO: Remove after v1.0.0 gets released.
 * @ignore
 */
const enqueueRequestsFromClickableElements = async (page, selector, purls, requestQueue, requestOpts = {}) => {
    log.warning('Function enqueueRequestsFromClickableElements is deprecated!!! Use `enqueueLinks` instead!');

    checkParamOrThrow(page, 'page', 'Object');
    checkParamOrThrow(purls, 'purls', 'Array');
    checkParamPrototypeOrThrow(requestQueue, 'requestQueue', [RequestQueue, RequestQueueLocal], 'Apify.RequestQueue');
    checkParamOrThrow(requestOpts, 'requestOpts', 'Object');

    /* istanbul ignore next */
    const getHrefs = linkEls => linkEls.map(link => link.href).filter(href => !!href);
    const matchesPseudoUrl = url => _.some(purls, purl => purl.matches(url));
    const urls = await page.$$eval(selector, getHrefs);
    const requests = urls.filter(matchesPseudoUrl).map(url => new Request(Object.assign({ url }, requestOpts)));

    const queueOperationInfos = [];
    for (const request of requests) {
        queueOperationInfos.push(await requestQueue.addRequest(request));
    }
    return queueOperationInfos;
};


/**
 * Forces the Puppeteer browser tab to block loading certain HTTP resources.
 * This is useful to speed up crawling of websites, since it reduces the amount
 * of data that need to be downloaded from the web.
 *
 * The resource types to block can be specified using the `resourceTypes` parameter,
 * which indicates the types of resources as they are perceived by the rendering engine.
 * The following resource types are currently supported:
 * `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`,
 * `eventsource`, `websocket`, `manifest`, `other`.
 * For more details, see Puppeteer's
 * <a href="https://pptr.dev/#?product=Puppeteer&show=api-requestresourcetype" target="_blank">Request.resourceType() documentation</a>.
 *
 * If the `resourceTypes` parameter is not provided,
 * by default the function blocks these resource types: `stylesheet`, `font`, `image`, `media`.
 *
 * Note that the `blockResources` function internally uses Puppeteer's
 * [`Page.setRequestInterception()`](https://pptr.dev/#?product=Puppeteer&show=api-pagesetrequestinterceptionvalue) function,
 * which can only be used once per `Page` object.
 *
 * **Example usage**
 * ```javascript
 * const Apify = require('apify');
 *
 * const browser = await Apify.launchPuppeteer();
 * const page = await browser.newPage();
 *
 * // Block all resources except for the main HTML document
 * await Apify.utils.puppeteer.blockResources(page,
 *   ['stylesheet', 'image', 'media', 'font', 'script', 'texttrack', 'xhr',
 *    'fetch', 'eventsource', 'websocket', 'manifest', 'other']
 * );
 *
 * await page.goto('https://www.example.com');
 * ```
 *
 * @param {Page} page
 *   Puppeteer <a href="https://pptr.dev/#?product=Puppeteer&show=api-class-page" target="_blank"><code>Page</code></a> object.
 * @param {String[]} [resourceTypes=['stylesheet', 'font', 'image', 'media']]
 *   Array of resource types to block.
 * @return {Promise}
 * @memberOf puppeteer
 */
const blockResources = async (page, resourceTypes = ['stylesheet', 'font', 'image', 'media']) => {
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        const type = request.resourceType();
        if (resourceTypes.includes(type)) request.abort();
        else request.continue();
    });
};

/**
 * Enables caching of intercepted responses into a provided object. Automatically enables request interception in Puppeteer.
 * *IMPORTANT*: Caching responses stores them to memory, so too loose rules could cause memory leaks for longer running crawlers.
 *   This issue should be resolved or atleast mitigated in future iterations of this feature.
 * @param {Page} page
 *   Puppeteer <a href="https://pptr.dev/#?product=Puppeteer&show=api-class-page" target="_blank"><code>Page</code></a> object.
 * @param {Object} cache
 *   Object in which responses are stored
 * @param {Array<String|RegExp>} responseUrlRules
 *   List of rules that are used to check if the response should be cached.
 *   String rules are compared as page.url().includes(rule) while RegExp rules are evaluated as rule.test(page.url()).
 * @return {Promise}
 * @memberOf puppeteer
 */
const cacheResponses = async (page, cache, responseUrlRules) => {
    checkParamOrThrow(page, 'page', 'Object');
    checkParamOrThrow(cache, 'cache', 'Object');
    checkParamOrThrow(responseUrlRules, 'responseUrlRules', 'Array');

    // Check that rules are either String or RegExp
    responseUrlRules.forEach((rule, index) => checkParamOrThrow(rule, `responseUrlRules[${index}]`, 'String | RegExp'));

    // Required to be able to intercept requests
    await page.setRequestInterception(true);

    page.on('request', async (request) => {
        const url = request.url();

        if (cache[url]) {
            await request.respond(cache[url]);
            return;
        }

        request.continue();
    });

    page.on('response', async (response) => {
        const url = response.url();

        // Response is already cached, do nothing
        if (cache[url]) return;

        const shouldCache = responseUrlRules.some((rule) => {
            if (typeof rule === 'string') return url.includes(rule);
            if (rule instanceof RegExp) return rule.test(url);
        });

        try {
            if (shouldCache) {
                const buffer = await response.buffer();
                cache[url] = {
                    status: response.status(),
                    headers: response.headers(),
                    body: buffer,
                };
            }
        } catch (e) {
            // ignore errors, usualy means that buffer is empty or broken connection
        }
    });
};

/**
 * Compiles a Puppeteer script into an async function that may be executed at any time
 * by providing it with the following object:
 * ```
 * {
 *    page: Page,
 *    request: Request,
 * }
 * ```
 * Where `page` is a Puppeteer <a href="https://pptr.dev/#?product=Puppeteer&show=api-class-page" target="_blank"><code>Page</code></a>
 * and `request` is a {@link Request}.
 *
 * The function is compiled by using the `scriptString` parameter as the function's body,
 * so any limitations to function bodies apply. Return value of the compiled function
 * is the return value of the function body = the `scriptString` parameter.
 *
 * As a security measure, no globals such as `process` or `require` are accessible
 * from within the function body. Note that the function does not provide a safe
 * sandbox and even though globals are not easily accessible, malicious code may
 * still execute in the main process via prototype manipulation. Therefore you
 * should only use this function to execute sanitized or safe code.
 *
 * Custom context may also be provided using the `context` parameter. To improve security,
 * make sure to only pass the really necessary objects to the context. Preferably making
 * secured copies beforehand.
 *
 * @param {String} scriptString
 * @param {Object} context
 * @return {Function} `async ({ page, request }) => { scriptString }`
 * @memberOf puppeteer
 */
const compileScript = (scriptString, context = Object.create(null)) => {
    const funcString = `async ({ page, request }) => {${scriptString}}`;

    let func;
    try {
        func = vm.runInNewContext(funcString, context); // "Secure" the context by removing prototypes, unless custom context is provided.
    } catch (err) {
        log.exception(err, 'Cannot compile script!');
        throw err;
    }

    if (!_.isFunction(func)) throw new Error('Compilation result is not a function!'); // This should not happen...

    return func;
};

let logEnqueueLinksDeprecationWarning = true;

/**
 * A namespace that contains various utilities for
 * [Puppeteer](https://github.com/GoogleChrome/puppeteer) - the headless Chrome Node API.
 *
 * **Example usage:**
 *
 * ```javascript
 * const Apify = require('apify');
 * const { puppeteer } = Apify.utils;
 *
 * // Open https://www.example.com in Puppeteer
 * const browser = await Apify.launchPuppeteer();
 * const page = await browser.newPage();
 * await page.goto('https://www.example.com');
 *
 * // Inject jQuery into a page
 * await puppeteer.injectJQuery(page);
 * ```
 * @namespace puppeteer
 */
export const puppeteerUtils = {
    hideWebDriver,
    injectFile,
    injectJQuery,
    injectUnderscore,
    enqueueRequestsFromClickableElements,
    enqueueLinks: async (...args) => {
        if (logEnqueueLinksDeprecationWarning) {
            log.warning('Using enqueueLinks() from the Apify.utils.puppeteer namespace is deprecated. '
                + 'Please use the Apify.utils.enqueueLinks().');
            logEnqueueLinksDeprecationWarning = false;
            return enqueueLinks(...args);
        }
    },
    blockResources,
    cacheResponses,
    compileScript,
};
