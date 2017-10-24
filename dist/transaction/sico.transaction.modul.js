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
var Transaction = (function () {
    function Transaction(data) {
        this.Action = "";
        this.Code = 0;
        this.Data = data == null ? {} : data;
        this.Message = "";
    }
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
    Transaction.prototype.$noify = function (model) {
        if (model === void 0) { model = null; }
        if (model != null && Transaction.$isTransaction(model)) {
            Transaction.$notifyNow(model.Action, model.Code, model.Message);
        }
        else {
            Transaction.$notifyNow(this.Action, this.Code, this.Message);
        }
    };
    Transaction.prototype.$isTransaction = function (model) {
        return Transaction.$isTransaction(model);
    };
    return Transaction;
}());
export { Transaction };
//# sourceMappingURL=sico.transaction.modul.js.map