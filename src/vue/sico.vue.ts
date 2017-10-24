/**
 * @summary     Vue.js Helper
 * @description Wrapper with ajax support
 * @version     2.0
 * @file        sico.vue.js
 * @dependencie Vue.js, jQuery, sico.transaction
 * @author      Silver Connection OHG
 * @contact     Kiarash G. <kiarash@si-co.net>
 * @copyright   Copyright 2017 Silver Connection OHG
 *
 * This source file is free software, available under the following license:
 *   MIT license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: https://github.com/Silver-Connection/dataTables.bootstrap
 */
"use strict";
declare const Vue: vuejs.Vue;

namespace sico {
    export type FunctionCallback = (data?: any) => void;

    // tslint:disable-next-line:interface-name
    export interface VueHelperOptions extends vuejs.ComponentOptions<vuejs.Vue> {
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

    // tslint:disable-next-line:interface-name
    interface VueHelperAjaxOptions {
        action?: string;
        path?: string;
        setData?: boolean;
        setNotify?: boolean;
    }

    export class VueHelper {
        public options: VueHelperOptions = null;
        protected default: VueHelperOptions =
        {
            data: null,
            delete: null,
            el: "",
            get: null,
            path: null,
            post: null,
            put: null,
        };

        private vuePrivate: vuejs.Vue = null;
        get vue(): vuejs.Vue {
            return this.vuePrivate;
        }
        set vue(model: vuejs.Vue) {
            this.vuePrivate = model;
        }

        private storePrivate: any = null;
        get store(): any {
            return this.storePrivate;
        }
        set store(model: any) {
            this.storePrivate = model;
        }

        // tslint:disable-next-line:ban-types
        get element(): String | Element | (() => HTMLElement) {
            return this.options.el;
        }

        /**
         * Load configurations and create Vue Object
         * @constructor
         * @param {VueHelperOptions} opt - Configurations
         */
        public constructor(opt: VueHelperOptions) {
            // Set defaults
            if (typeof jQuery === "undefined") {
                // Use underscore
                opt = _.defaults(this.default, opt);
            } else {
                opt = $.extend(true, this.default, opt);
            }
            this.options = opt;

            // Check element
            if (this.options.el === "") {
                throw new Error("No HTML element passed. Valid inputs are: String or HTML Element");
            }

            // Check data
            if (this.options.data === null) {
                throw new Error("No data passed for use with Vue.js");
            }

            if (typeof this.options.data !== "function") {
                const data = this.options.data;
                this.options.data = () => data;
            }

            // Check path
            if (this.options.path == null || this.options.path === "" || this.options.path === "undefined") {
                this.options.path = null;
            }

            this.vuePrivate = new Vue(this.options);
        }

        /**
         * Send a GET request to given URL
         * @param {string} action - Overwrite transaction action name. If action is set to 'hide' no notification will be emitted.
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        public $get(action: string = null, callback: FunctionCallback = null, path: string = null): void {
            if (this.options == null || this.options.get == null || this.vuePrivate == null) {
                return;
            }

            this._ajax(
                {
                    contentType: "application/json",
                    // data: JSON.stringify(this._vue.$data),
                    dataType: "json",
                    method: "GET",
                    url: this.options.get,
                },
                {
                    action,
                    path,
                    setData: true,
                    setNotify: action === "hide" ? false : true,
                },
                callback);
        }

        /**
         * Send a POST request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        public $post(callback: FunctionCallback = null, path: string = null): void {
            if (this.options == null || this.options.post == null || this.vuePrivate == null) {
                return;
            }

            this._ajax(
                {
                    contentType: "application/json",
                    data: JSON.stringify(this._getData(path)),
                    dataType: "json",
                    method: "POST",
                    url: this.options.post,
                },
                {
                    action: null,
                    path,
                    setData: true,
                    setNotify: true,
                },
                callback);
        }

        /**
         * Send a PUT request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        public $put(callback: FunctionCallback = null, path: string = null): void {
            if (this.options == null || this.options.put == null || this.vuePrivate == null) {
                return;
            }

            this._ajax(
                {
                    contentType: "application/json",
                    data: JSON.stringify(this._getData(path)),
                    dataType: "json",
                    method: "PUT",
                    url: this.options.put,
                },
                {
                    action: null,
                    path,
                    setData: true,
                    setNotify: true,
                },
                callback);
        }

        /**
         * Send a GET request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         */
        public $delete(callback: FunctionCallback = null, path: string = null): void {
            if (this.options == null || this.options.delete == null || this.vuePrivate == null) {
                return;
            }

            this._ajax(
                {
                    contentType: "application/json",
                    // data: JSON.stringify(this._vue.$data),
                    dataType: "json",
                    method: "DELETE",
                    url: this.options.delete,
                },
                {
                    action: null,
                    path,
                    setData: false,
                    setNotify: true,
                },
                callback);
        }

        /**
         * Revert data to initial state
         */
        public $revert(): void {
            if (this.options == null || this.options.data == null || this.vuePrivate == null) {
                return;
            }

            let data = null;
            const $this = this;
            if (typeof this.options.data === "function") {
                // data = this.options.data();
            } else {
                data = this.options.data;
            }

            if (data != null && data.Data != null) {
                this.vue.$set(this.vue, "Data", data.Data);
                sico.Transaction.$notifyNow("Revert", 1, "Reverted data to initial state");
            }
        }

        /**
         * Set new data for this object
         * @param {Any} data - Table data
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {Boolean} skipTransaction - Trigger transaction notification
         */
        public $data(data: any, callback?: FunctionCallback, skipTransaction?: boolean) {
            if (data != null) {
                this.vue.$set(this.vue, "Data", data);

                if (callback && typeof callback === "function") {
                    callback(data);
                }
                if (!skipTransaction) {
                    sico.Transaction.$notifyNow("Refreshed", 1, "Successfully fetched data");
                }
            }
        }

        /**
         * Find polyfill
         * @param {String | Array} path to data or array
         * @param {Function} callback callback function used for search
         */
        public $find(path: string | any[], callback: (el: any, index?: number) => boolean) {
            if (typeof callback !== "function") {
                throw new TypeError("callback must be a function");
            }

            let list = null;
            if (path && path.constructor === Array) {
                list = path;
            }

            if (typeof path === "string" || path instanceof String) {
                list = this._getValue(path.toString());
            }

            if (list === null) {
                return null;
            }

            // Makes sures is always has an positive integer as length.
            // tslint:disable-next-line:no-bitwise
            const length = list.length >>> 0;
            const thisArg = arguments[1];
            for (let i = 0; i < length; i++) {
                const element = list[i];
                if (callback.call(thisArg, element, i, list)) {
                    return element;
                }
            }
        }

        private _getData(path: string): any {
            if ((path == null || path === "" || path === "undefined") && this.options.path != null && this.options.path !== "undefined") {
                path = this.options.path;
            }

            if (path == null || path === "" || path === "undefined") {
                return this.vue.$data;
            }

            return this._getValue(path);
        }

        private _getValue(path: string): any {
            let list = this.vue[path];
            if (path.indexOf(".") > -1) {
                const paths = path.split(".");
                for (let i = 0; i < paths.length; i++) {
                    if (i === 0) {
                        list = this.vue[paths[i]];
                    } else {
                        const t = paths[i];
                        if (t.indexOf("[") > -1) {
                            const index = t.substr(t.indexOf("[") + 1).replace("]", "");
                            const base = t.substr(0, t.indexOf("["));
                            list = list[base][index];
                        } else {
                            list = list[paths[i]];
                        }
                    }
                }
            }

            return list;
        }

        private _ajax(settings: JQueryAjaxSettings, options: VueHelperAjaxOptions, callback: FunctionCallback = null): void {
            const $this = this;
            $.ajax(settings)
                .done((response: TransactionModel) => {
                    let isTransaction = true;
                    if (!sico.Transaction.$isTransaction(response)) {
                        isTransaction = false;
                        response = new sico.Transaction(response);
                        response.Code = 1;
                    }

                    $this.vue.$set($this.vue, "Action", response.Action);
                    $this.vue.$set($this.vue, "Code", response.Code);
                    $this.vue.$set($this.vue, "Message", response.Message);
                    if (options.setData && response.Code < 2) {
                        // Get path
                        let path = options.path;
                        if ((path == null || path === "" || path === "undefined")
                            && $this.options.path != null && $this.options.path !== "undefined") {
                            path = $this.options.path;
                        }

                        if (path == null || path === "" || path === "undefined") {
                            $this.vue.$set($this.vue, "Data", response.Data);
                        } else {
                            const cmd = "$this.vue.$data." + path + " = response.Data;";
                            // tslint:disable-next-line:no-eval
                            eval(cmd);
                        }
                    }

                    if (response.Code < 2 && callback && typeof callback === "function") {
                        callback(isTransaction ? response : response.Data);
                    }

                    if (options.setNotify) {
                        sico.Transaction.$notifyNow(options.action === null ? response.Action : options.action, response.Code, response.Message);
                    }
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    sico.Transaction.$notifyNow("Request", 2, errorThrown);
                    // tslint:disable-next-line:no-console
                    console.log(textStatus, errorThrown);
                });
        }
    }
}
