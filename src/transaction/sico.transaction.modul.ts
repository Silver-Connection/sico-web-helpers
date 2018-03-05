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

export const NOTIFY_INFO = {
    delay: 5000,
    icon_type: "class",
    type: "info",
};
export const NOTIFY_SUCCESS = {
    delay: 5000,
    icon_type: "class",
    type: "success",
};
export const NOTIFY_ERROR = {
    delay: 5000,
    icon_type: "class",
    type: "danger",
};

export interface IModel {
    /**
     * Transaction action name
     * @default null
     * @type string
     */
    Action: string;

    /**
     * Transaction return code
     * @default null
     * @type string
     */
    Code: number;

    /**
     * Actual data
     * @default null
     * @type string
     */
    Data: any;

    /**
     * Transaction message
     * @default null
     * @type string
     */
    Message: string;
}

export class Transaction implements IModel {
    /**
     * Toggle remarkable-bootstrap-notify
     * @param {string} action
     * @param {Transaction Code | number} code
     * @param {string} message
     */
    public static $notifyNow(action: string, code: number, message: string): void {
        switch (code) {
            case 1:
                $.notify({
                    icon: "fa fa-floppy-o",
                    message,
                    title: "<strong>" + action + "</strong><br/>",
                }, NOTIFY_SUCCESS);
                break;

            case 2:
                $.notify({
                    icon: "fa fa-exclamation",
                    message,
                    title: "<strong>" + (action === "" ? "Error" : action) + "</strong><br/>",
                }, NOTIFY_ERROR);

                break;

            case 0:
            default:
                $.notify({
                    icon: "fa fa-ellipsis-h",
                    message,
                    title: "<strong>" + (action === "" ? "Init" : action) + "</strong><br/>",
                }, NOTIFY_INFO);
                break;
        }
    }

    /**
     * Check if model implements Transaction Model
     * @param {IModel} model - Transaction Model
     */
    public static $isTransaction(model: IModel): model is IModel {
        let check = false;
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
    }

    public Action: string;
    public Code: number;
    public Data: any;
    public Message: string;

    /**
     * Load configurations and create Transaction Object
     * @constructor
     * @param {any} opt - Payload Data
     */
    public constructor(data?: any) {
        this.Action = "";
        this.Code = 0;
        this.Data = data == null ? {} : data;
        this.Message = "";
    }

    /**
     * Toggle remarkable-bootstrap-notify
     */
    public $noify(model: any = null): void {
        if (model != null && Transaction.$isTransaction(model)) {
            Transaction.$notifyNow(model.Action, model.Code, model.Message);
        } else {
            Transaction.$notifyNow(this.Action, this.Code, this.Message);
        }
    }

    /**
     * Check if model implements Transaction Model
     * @param {IModel} model - Transaction Model
     */
    public $isTransaction(model: IModel): model is IModel {
        return Transaction.$isTransaction(model);
    }
}
