class Stealth {
    constructor(options) {
        this.options = options;
    }

    getStealthBrowser(browser) {
        if (this.options) return browser;
        const modifiedBrowser = browser;

        const prevNewPage = browser.newPage;

        Object.defineProperty(modifiedBrowser, 'newPage', async (...args) => {
            const page = await prevNewPage(...args);
            await this._applyStealthTricks(page, this.options);
            return Promise.resolve(page);
        });


        return modifiedBrowser;
    }

    _applyStealthTricks(page) {
        const strigifyedFunctions = Object.keys(this.options)
            .filter(key => this.options[key])
            .map(key => ({ func: this.options[key].toString, key }));
        // TODO: ADD TO WINDOW object of browser
        return page.evaluateOnNewDocument((functionsToBeCalled) => {
            for (const { func } of functionsToBeCalled) {
                func.eval()();
            }
        }, strigifyedFunctions);
    }

    // TODO: REFACTOR A LOT, but first lets testIt
    addPlugins(window) {
        function mockPluginsAndMimeTypes() {
            /* global MimeType MimeTypeArray PluginArray */

            // Disguise custom functions as being native
            const makeFnsNative = (fns = []) => {
                const oldCall = Function.prototype.call;
                function call() {
                    return oldCall.apply(this, arguments);
                }
                // eslint-disable-next-line
                Function.prototype.call = call

                const nativeToStringFunctionString = Error.toString().replace(
                    /Error/g,
                    'toString',
                );
                const oldToString = Function.prototype.toString;

                function functionToString() {
                    for (const fn of fns) {
                        if (this === fn.ref) {
                            return `function ${fn.name}() { [native code] }`;
                        }
                    }

                    if (this === functionToString) {
                        return nativeToStringFunctionString;
                    }
                    return oldCall.call(oldToString, this);
                }
                // eslint-disable-next-line
                Function.prototype.toString = functionToString
            };

            const mockedFns = [];

            const fakeData = {
                mimeTypes: [
                    {
                        type: 'application/pdf',
                        suffixes: 'pdf',
                        description: '',
                        __pluginName: 'Chrome PDF Viewer',
                    },
                    {
                        type: 'application/x-google-chrome-pdf',
                        suffixes: 'pdf',
                        description: 'Portable Document Format',
                        __pluginName: 'Chrome PDF Plugin',
                    },
                    {
                        type: 'application/x-nacl',
                        suffixes: '',
                        description: 'Native Client Executable',
                        enabledPlugin: window.Plugin,
                        __pluginName: 'Native Client',
                    },
                    {
                        type: 'application/x-pnacl',
                        suffixes: '',
                        description: 'Portable Native Client Executable',
                        __pluginName: 'Native Client',
                    },
                ],
                plugins: [
                    {
                        name: 'Chrome PDF Plugin',
                        filename: 'internal-pdf-viewer',
                        description: 'Portable Document Format',
                    },
                    {
                        name: 'Chrome PDF Viewer',
                        filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
                        description: '',
                    },
                    {
                        name: 'Native Client',
                        filename: 'internal-nacl-plugin',
                        description: '',
                    },
                ],
                fns: {
                    namedItem: (instanceName) => {
                        // Returns the Plugin/MimeType with the specified name.
                        const fn = function (name) {
                            if (!arguments.length) {
                                throw new TypeError(
                                    `Failed to execute 'namedItem' on '${instanceName}': 1 argument required, but only 0 present.`,
                                );
                            }
                            return this[name] || null;
                        };
                        mockedFns.push({ ref: fn, name: 'namedItem' });
                        return fn;
                    },
                    item: (instanceName) => {
                        // Returns the Plugin/MimeType at the specified index into the array.
                        const fn = function (index) {
                            if (!arguments.length) {
                                throw new TypeError(
                                    `Failed to execute 'namedItem' on '${instanceName}': 1 argument required, but only 0 present.`,
                                );
                            }
                            return this[index] || null;
                        };
                        mockedFns.push({ ref: fn, name: 'item' });
                        return fn;
                    },
                    refresh: (instanceName) => {
                        // Refreshes all plugins on the current page, optionally reloading documents.
                        const fn = function () {
                            return undefined;
                        };
                        mockedFns.push({ ref: fn, name: 'refresh' });
                        return fn;
                    },
                },
            };
            // Poor mans _.pluck
            const getSubset = (keys, obj) => keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});

            function generateMimeTypeArray() {
                const arr = fakeData.mimeTypes
                    .map(obj => getSubset(['type', 'suffixes', 'description'], obj))
                    .map(obj => Object.setPrototypeOf(obj, MimeType.prototype));
                arr.forEach((obj) => {
                    arr[obj.type] = obj;
                });

                // Mock functions
                arr.namedItem = fakeData.fns.namedItem('MimeTypeArray');
                arr.item = fakeData.fns.item('MimeTypeArray');

                return Object.setPrototypeOf(arr, MimeTypeArray.prototype);
            }

            const mimeTypeArray = generateMimeTypeArray();
            Object.defineProperty(window.navigator, 'mimeTypes', {
                get: () => mimeTypeArray,
            });

            function generatePluginArray() {
                const arr = fakeData.plugins
                    .map(obj => getSubset(['name', 'filename', 'description'], obj))
                    .map((obj) => {
                        const mimes = fakeData.mimeTypes.filter(
                            m => m.__pluginName === obj.name,
                        );
                        // Add mimetypes
                        mimes.forEach((mime, index) => {
                            window.navigator.mimeTypes[mime.type].enabledPlugin = obj;
                            obj[mime.type] = window.navigator.mimeTypes[mime.type];
                            obj[index] = window.navigator.mimeTypes[mime.type];
                        });
                        obj.length = mimes.length;
                        return obj;
                    })
                    .map((obj) => {
                        // Mock functions
                        obj.namedItem = fakeData.fns.namedItem('Plugin');
                        obj.item = fakeData.fns.item('Plugin');
                        return obj;
                    })
                    .map(obj => Object.setPrototypeOf(obj, window.Plugin.prototype));
                arr.forEach((obj) => {
                    arr[obj.name] = obj;
                });

                // Mock functions
                arr.namedItem = fakeData.fns.namedItem('PluginArray');
                arr.item = fakeData.fns.item('PluginArray');
                arr.refresh = fakeData.fns.refresh('PluginArray');

                return Object.setPrototypeOf(arr, PluginArray.prototype);
            }

            const pluginArray = generatePluginArray();
            Object.defineProperty(window.navigator, 'plugins', {
                get: () => pluginArray,
            });

            // Make mockedFns toString() representation resemble a native function
            makeFnsNative(mockedFns);
        }
        try {
            const isPluginArray = window.navigator.plugins instanceof PluginArray;
            const hasPlugins = isPluginArray && window.navigator.plugins.length > 0;
            if (isPluginArray && hasPlugins) {
                return; // nothing to do here
            }
            mockPluginsAndMimeTypes();
        } catch (err) {}
    }

    hideWebDriver(window) {
        const newProto = window.navigator.__proto__;
        delete newProto.webdriver;
        // eslint-disable-next-line
        navigator.__proto__ = newProto
    }

    // TODO: Proper runtime mocking
    mockRuntime(window) {
        window.navigator.chrome = {
            runtime: {},
            // etc.
        };
    }

    hackPermissions(window) {
        const originalQuery = window.navigator.permissions.query;
        // eslint-disable-next-line
        window.navigator.permissions.__proto__.query = parameters => parameters.name === 'notifications'
                ? Promise.resolve({ state: Notification.permission }) //eslint-disable-line
            : originalQuery(parameters);

        // Inspired by: https://github.com/ikarienator/phantomjs_hide_and_seek/blob/master/5.spoofFunctionBind.js
        const oldCall = Function.prototype.call;
        function call() {
            return oldCall.apply(this, arguments); //eslint-disable-line
        }
        // eslint-disable-next-line
        Function.prototype.call = call;

        const nativeToStringFunctionString = Error.toString().replace(
            /Error/g,
            'toString',
        );
        const oldToString = Function.prototype.toString;

        function functionToString() {
            if (this === window.navigator.permissions.query) {
                return 'function query() { [native code] }';
            }
            if (this === functionToString) {
                return nativeToStringFunctionString;
            }
            return oldCall.call(oldToString, this);
        }
        // eslint-disable-next-line
        Function.prototype.toString = functionToString
    }

    addLanguage(window) {
        Object.defineProperty(window.navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    }

    emulateWebGL() {
        try {
            /* global WebGLRenderingContext */
            const getParameter = WebGLRenderingContext.getParameter;
            WebGLRenderingContext.prototype.getParameter = function (parameter) {
                // UNMASKED_VENDOR_WEBGL
                if (parameter === 37445) {
                    return 'Intel Inc.';
                }
                // UNMASKED_RENDERER_WEBGL
                if (parameter === 37446) {
                    return 'Intel(R) Iris(TM) Plus Graphics 640';
                }

                return getParameter(parameter);
            };
        } catch (err) {
            console.log('COULD NOT ADD WBEGL');
        }
    }

    emulateWindowFrame(window) {
        try {
            if (window.outerWidth && window.outerHeight) {
                return; // nothing to do here
            }
            const windowFrame = 85; // probably OS and WM dependent
            window.outerWidth = window.innerWidth;
            window.outerHeight = window.innerHeight + windowFrame;
        } catch (err) {
        }
    }

    emulateConsoleDebug(window) {
        window.console.debug = () => {
            return null;
        };
    }
}
export default Stealth;
