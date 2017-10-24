"use strict";
var sico;
(function (sico) {
    var Transaction = (function () {
        function Transaction(data) {
            this.Action = "";
            this.Code = 0;
            this.Data = data == null ? {} : data;
            this.Message = "";
        }
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
        Transaction.$noify = function (model) {
            if (sico.Transaction.$isTransaction(model)) {
                sico.Transaction.$notifyNow(model.Action, model.Code, model.Message);
            }
        };
        Transaction.$notifyNow = function (action, code, message) {
            switch (code) {
                case 1:
                    $.notify({
                        icon: "fa fa-floppy-o",
                        message: message,
                        title: "<strong>" + action + "</strong><br/>",
                    }, Transaction.NOTIFY_SUCCESS);
                    break;
                case 2:
                    $.notify({
                        icon: "fa fa-exclamation",
                        message: message,
                        title: "<strong>" + (action === "" ? "Error" : action) + "</strong><br/>",
                    }, Transaction.NOTIFY_ERROR);
                    break;
                case 0:
                default:
                    $.notify({
                        icon: "fa fa-ellipsis-h",
                        message: message,
                        title: "<strong>" + (action === "" ? "Init" : action) + "</strong><br/>",
                    }, Transaction.NOTIFY_INFO);
                    break;
            }
        };
        Transaction.prototype.$noify = function () {
            sico.Transaction.$notifyNow(this.Action, this.Code, this.Message);
        };
        Transaction.prototype.$vue = function () {
            var $this = this;
            return function () { return $this; };
        };
        Transaction.NOTIFY_INFO = {
            delay: 5000,
            icon_type: "class",
            type: "info",
        };
        Transaction.NOTIFY_SUCCESS = {
            delay: 5000,
            icon_type: "class",
            type: "success",
        };
        Transaction.NOTIFY_ERROR = {
            delay: 5000,
            icon_type: "class",
            type: "danger",
        };
        return Transaction;
    }());
    sico.Transaction = Transaction;
})(sico || (sico = {}));
//# sourceMappingURL=sico.transaction.js.map