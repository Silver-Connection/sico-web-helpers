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
var sico;
(function (sico) {
    var VueHelper = /** @class */ (function () {
        /**
         * Load configurations and create Vue Object
         * @constructor
         * @param {VueHelperOptions} opt - Configurations
         */
        function VueHelper(opt) {
            this.options = null;
            this.default = {
                data: null,
                delete: null,
                el: "",
                get: null,
                path: null,
                post: null,
                put: null,
            };
            this.vuePrivate = null;
            this.storePrivate = null;
            // Set defaults
            if (typeof jQuery === "undefined") {
                // Use underscore
                opt = _.defaults(this.default, opt);
            }
            else {
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
                var data_1 = this.options.data;
                this.options.data = function () { return data_1; };
            }
            // Check path
            if (this.options.path == null || this.options.path === "" || this.options.path === "undefined") {
                this.options.path = null;
            }
            this.vuePrivate = new Vue(this.options);
        }
        Object.defineProperty(VueHelper.prototype, "vue", {
            get: function () {
                return this.vuePrivate;
            },
            set: function (model) {
                this.vuePrivate = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VueHelper.prototype, "store", {
            get: function () {
                return this.storePrivate;
            },
            set: function (model) {
                this.storePrivate = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VueHelper.prototype, "element", {
            // tslint:disable-next-line:ban-types
            get: function () {
                return this.options.el;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Send a GET request to given URL
         * @param {string} action - Overwrite transaction action name. If action is set to 'hide' no notification will be emitted.
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        VueHelper.prototype.$get = function (action, callback, path) {
            if (action === void 0) { action = null; }
            if (callback === void 0) { callback = null; }
            if (path === void 0) { path = null; }
            if (this.options == null || this.options.get == null || this.vuePrivate == null) {
                return;
            }
            this._ajax({
                contentType: "application/json",
                // data: JSON.stringify(this._vue.$data),
                dataType: "json",
                method: "GET",
                url: this.options.get,
            }, {
                action: action,
                path: path,
                setData: true,
                setNotify: action === "hide" ? false : true,
            }, callback);
        };
        /**
         * Send a POST request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        VueHelper.prototype.$post = function (callback, path) {
            if (callback === void 0) { callback = null; }
            if (path === void 0) { path = null; }
            if (this.options == null || this.options.post == null || this.vuePrivate == null) {
                return;
            }
            this._ajax({
                contentType: "application/json",
                data: JSON.stringify(this._getData(path)),
                dataType: "json",
                method: "POST",
                url: this.options.post,
            }, {
                action: null,
                path: path,
                setData: true,
                setNotify: true,
            }, callback);
        };
        /**
         * Send a PUT request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        VueHelper.prototype.$put = function (callback, path) {
            if (callback === void 0) { callback = null; }
            if (path === void 0) { path = null; }
            if (this.options == null || this.options.put == null || this.vuePrivate == null) {
                return;
            }
            this._ajax({
                contentType: "application/json",
                data: JSON.stringify(this._getData(path)),
                dataType: "json",
                method: "PUT",
                url: this.options.put,
            }, {
                action: null,
                path: path,
                setData: true,
                setNotify: true,
            }, callback);
        };
        /**
         * Send a GET request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         */
        VueHelper.prototype.$delete = function (callback, path) {
            if (callback === void 0) { callback = null; }
            if (path === void 0) { path = null; }
            if (this.options == null || this.options.delete == null || this.vuePrivate == null) {
                return;
            }
            this._ajax({
                contentType: "application/json",
                // data: JSON.stringify(this._vue.$data),
                dataType: "json",
                method: "DELETE",
                url: this.options.delete,
            }, {
                action: null,
                path: path,
                setData: false,
                setNotify: true,
            }, callback);
        };
        /**
         * Revert data to initial state
         */
        VueHelper.prototype.$revert = function () {
            if (this.options == null || this.options.data == null || this.vuePrivate == null) {
                return;
            }
            var data = null;
            var $this = this;
            if (typeof this.options.data === "function") {
                // data = this.options.data();
            }
            else {
                data = this.options.data;
            }
            if (data != null && data.Data != null) {
                this.vue.$set(this.vue, "Data", data.Data);
                sico.Transaction.$notifyNow("Revert", 1, "Reverted data to initial state");
            }
        };
        /**
         * Set new data for this object
         * @param {Any} data - Table data
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {Boolean} skipTransaction - Trigger transaction notification
         */
        VueHelper.prototype.$data = function (data, callback, skipTransaction) {
            if (data != null) {
                this.vue.$set(this.vue, "Data", data);
                if (callback && typeof callback === "function") {
                    callback(data);
                }
                if (!skipTransaction) {
                    sico.Transaction.$notifyNow("Refreshed", 1, "Successfully fetched data");
                }
            }
        };
        /**
         * Find polyfill
         * @param {String | Array} path to data or array
         * @param {Function} callback callback function used for search
         */
        VueHelper.prototype.$find = function (path, callback) {
            if (typeof callback !== "function") {
                throw new TypeError("callback must be a function");
            }
            var list = null;
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
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            for (var i = 0; i < length; i++) {
                var element = list[i];
                if (callback.call(thisArg, element, i, list)) {
                    return element;
                }
            }
        };
        VueHelper.prototype._getData = function (path) {
            if ((path == null || path === "" || path === "undefined") && this.options.path != null && this.options.path !== "undefined") {
                path = this.options.path;
            }
            if (path == null || path === "" || path === "undefined") {
                return this.vue.$data;
            }
            return this._getValue(path);
        };
        VueHelper.prototype._getValue = function (path) {
            var list = this.vue[path];
            if (path.indexOf(".") > -1) {
                var paths = path.split(".");
                for (var i = 0; i < paths.length; i++) {
                    if (i === 0) {
                        list = this.vue[paths[i]];
                    }
                    else {
                        var t = paths[i];
                        if (t.indexOf("[") > -1) {
                            var index = t.substr(t.indexOf("[") + 1).replace("]", "");
                            var base = t.substr(0, t.indexOf("["));
                            list = list[base][index];
                        }
                        else {
                            list = list[paths[i]];
                        }
                    }
                }
            }
            return list;
        };
        VueHelper.prototype._ajax = function (settings, options, callback) {
            if (callback === void 0) { callback = null; }
            var $this = this;
            $.ajax(settings)
                .done(function (response) {
                var isTransaction = true;
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
                    var path = options.path;
                    if ((path == null || path === "" || path === "undefined")
                        && $this.options.path != null && $this.options.path !== "undefined") {
                        path = $this.options.path;
                    }
                    if (path == null || path === "" || path === "undefined") {
                        $this.vue.$set($this.vue, "Data", response.Data);
                    }
                    else {
                        var cmd = "$this.vue.$data." + path + " = response.Data;";
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
                .fail(function (jqXHR, textStatus, errorThrown) {
                sico.Transaction.$notifyNow("Request", 2, errorThrown);
                // tslint:disable-next-line:no-console
                console.log(textStatus, errorThrown);
            });
        };
        return VueHelper;
    }());
    sico.VueHelper = VueHelper;
})(sico || (sico = {}));
//# sourceMappingURL=sico.vue.js.map