declare namespace sico {
    interface TransactionModel {
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
        /**
         * Check if model implements TransactionModel
         * @param {TransactionModel} model - Transaction Model
         */
        static $isTransaction(model: TransactionModel): model is TransactionModel;
        /**
         * Toggle remarkable-bootstrap-notify
         * @param {any} model - Transaction Model
         */
        static $noify(model: any): void;
        /**
         * Toggle remarkable-bootstrap-notify
         * @param {string} action
         * @param {Transaction Code | number} code
         * @param {string} message
         */
        static $notifyNow(action: string, code: number, message: string): void;
        Action: string;
        Code: number;
        Data: any;
        Message: string;
        /**
         * Load configurations and create Transaction Object
         * @constructor
         * @param {any} opt - Payload Data
         */
        constructor(data: any);
        /**
         * Toggle remarkable-bootstrap-notify
         */
        $noify(): void;
        /**
         * Export Vue.js model function
         */
        $vue(): () => Transaction;
    }
}
