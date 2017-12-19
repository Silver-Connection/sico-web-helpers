declare namespace sico {
    interface TransactionModel {
        Action: string;
        Code: number;
        Data: any;
        Message: string;
    }
    class Transaction implements TransactionModel {
        static NOTIFY_INFO: {
            delay: number;
            icon_type: string;
            type: string;
        };
        static NOTIFY_SUCCESS: {
            delay: number;
            icon_type: string;
            type: string;
        };
        static NOTIFY_ERROR: {
            delay: number;
            icon_type: string;
            type: string;
        };
        static $isTransaction(model: TransactionModel): model is TransactionModel;
        static $noify(model: any): void;
        static $notifyNow(action: string, code: number, message: string): void;
        Action: string;
        Code: number;
        Data: any;
        Message: string;
        constructor(data: any);
        $noify(): void;
        $vue(): () => Transaction;
    }
}
