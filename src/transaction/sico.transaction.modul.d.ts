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
    Action: string;
    Code: number;
    Data: any;
    Message: string;
}
export declare class Transaction implements IModel {
    static $notifyNow(action: string, code: number, message: string): void;
    static $isTransaction(model: IModel): model is IModel;
    Action: string;
    Code: number;
    Data: any;
    Message: string;
    constructor(data?: any);
    $noify(model?: any): void;
    $isTransaction(model: IModel): model is IModel;
}
