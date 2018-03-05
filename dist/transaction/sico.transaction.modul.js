/**
 * @summary     Transaction Model
 * @description Transaction model used for AJAX and Vue.js
 * @version     3.0
 * @file        sico.transaction.js
 * @dependencie jQuery, remarkable-bootstrap-notify
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
 * For details please refer to: https://github.com/Silver-Connection/sico-web-helpers
 */
"use strict";
export var NOTIFY_INFO = {
    delay: 5000,
    icon_type: "class",
    type: "info",
};
export var NOTIFY_SUCCESS = {
    delay: 5000,
    icon_type: "class",
    type: "success",
};
export var NOTIFY_ERROR = {
    delay: 5000,
    icon_type: "class",
    type: "danger",
};
var Transaction = /** @class */ (function () {
    /**
     * Load configurations and create Transaction Object
     * @constructor
     * @param {any} opt - Payload Data
     */
    function Transaction(data) {
        this.Action = "";
        this.Code = 0;
        this.Data = data == null ? {} : data;
        this.Message = "";
    }
    /**
     * Toggle remarkable-bootstrap-notify
     * @param {string} action
     * @param {Transaction Code | number} code
     * @param {string} message
     */
    Transaction.$notifyNow = function (action, code, message) {
        switch (code) {
            case 1:
                $.notify({
                    icon: "fa fa-floppy-o",
                    message: message,
                    title: "<strong>" + action + "</strong><br/>",
                }, NOTIFY_SUCCESS);
                break;
            case 2:
                $.notify({
                    icon: "fa fa-exclamation",
                    message: message,
                    title: "<strong>" + (action === "" ? "Error" : action) + "</strong><br/>",
                }, NOTIFY_ERROR);
                break;
            case 0:
            default:
                $.notify({
                    icon: "fa fa-ellipsis-h",
                    message: message,
                    title: "<strong>" + (action === "" ? "Init" : action) + "</strong><br/>",
                }, NOTIFY_INFO);
                break;
        }
    };
    /**
     * Check if model implements Transaction Model
     * @param {IModel} model - Transaction Model
     */
    Transaction.$isTransaction = function (model) {
        var check = false;
        if (!model) {
            return check;
        }
        if ("Action" in model
            && "Code" in model
            && "Data" in model
            && "Message" in model) {
            check = true;
        }
        return check;
    };
    /**
     * Toggle remarkable-bootstrap-notify
     */
    Transaction.prototype.$noify = function (model) {
        if (model === void 0) { model = null; }
        if (model != null && Transaction.$isTransaction(model)) {
            Transaction.$notifyNow(model.Action, model.Code, model.Message);
        }
        else {
            Transaction.$notifyNow(this.Action, this.Code, this.Message);
        }
    };
    /**
     * Check if model implements Transaction Model
     * @param {IModel} model - Transaction Model
     */
    Transaction.prototype.$isTransaction = function (model) {
        return Transaction.$isTransaction(model);
    };
    return Transaction;
}());
export { Transaction };
//# sourceMappingURL=sico.transaction.modul.js.map