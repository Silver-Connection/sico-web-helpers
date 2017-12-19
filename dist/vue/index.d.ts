/// <reference types="vuejs" />
declare const Vue: vuejs.Vue;
declare namespace sico {
    type FunctionCallback = (data?: any) => void;
    interface VueHelperOptions extends vuejs.ComponentOptions<vuejs.Vue> {
        /**
         * Path to Model which is used for AJAX can be replaced in each request
         * @default null
         * @type string
         */
        path?: string;
        /**
         * GET URL
         * @default null
         * @type string
         */
        get?: string;
        /**
         * POST URL
         * @default null
         * @type string
         */
        post?: string;
        /**
         * PUT URL
         * @default null
         * @type string
         */
        put?: string;
        /**
         * DELETE URL
         * @default null
         * @type string
         */
        delete?: string;
    }
    class VueHelper {
        options: VueHelperOptions;
        protected default: VueHelperOptions;
        private vuePrivate;
        vue: vuejs.Vue;
        private storePrivate;
        store: any;
        readonly element: String | Element | (() => HTMLElement);
        /**
         * Load configurations and create Vue Object
         * @constructor
         * @param {VueHelperOptions} opt - Configurations
         */
        constructor(opt: VueHelperOptions);
        /**
         * Send a GET request to given URL
         * @param {string} action - Overwrite transaction action name. If action is set to 'hide' no notification will be emitted.
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        $get(action?: string, callback?: FunctionCallback, path?: string): void;
        /**
         * Send a POST request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        $post(callback?: FunctionCallback, path?: string): void;
        /**
         * Send a PUT request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        $put(callback?: FunctionCallback, path?: string): void;
        /**
         * Send a GET request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         */
        $delete(callback?: FunctionCallback, path?: string): void;
        /**
         * Revert data to initial state
         */
        $revert(): void;
        /**
         * Set new data for this object
         * @param {Any} data - Table data
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {Boolean} skipTransaction - Trigger transaction notification
         */
        $data(data: any, callback?: FunctionCallback, skipTransaction?: boolean): void;
        /**
         * Find polyfill
         * @param {String | Array} path to data or array
         * @param {Function} callback callback function used for search
         */
        $find(path: string | any[], callback: (el: any, index?: number) => boolean): any;
        private _getData(path);
        private _getValue(path);
        private _ajax(settings, options, callback?);
    }
}
