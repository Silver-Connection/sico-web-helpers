export declare const NOTIFY_INFO: {
    delay: number;
    icon_type: string;
    type: string;
};
export declare const NOTIFY_SUCCESS: {
    delay: number;
    icon_type: string;
    type: string;
};
export declare const NOTIFY_ERROR: {
    delay: number;
    icon_type: string;
    type: string;
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
export declare class Transaction implements IModel {
    /**
     * Toggle remarkable-bootstrap-notify
     * @param {string} action
     * @param {Transaction Code | number} code
     * @param {string} message
     */
    static $notifyNow(action: string, code: number, message: string): void;
    /**
     * Check if model implements Transaction Model
     * @param {IModel} model - Transaction Model
     */
    static $isTransaction(model: IModel): model is IModel;
    Action: string;
    Code: number;
    Data: any;
    Message: string;
    /**
     * Load configurations and create Transaction Object
     * @constructor
     * @param {any} opt - Payload Data
     */
    constructor(data?: any);
    /**
     * Toggle remarkable-bootstrap-notify
     */
    $noify(model?: any): void;
    /**
     * Check if model implements Transaction Model
     * @param {IModel} model - Transaction Model
     */
    $isTransaction(model: IModel): model is IModel;
}
