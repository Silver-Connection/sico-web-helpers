"use strict";
var sico;
(function (sico) {
    var DataTablesHelper = (function () {
        function DataTablesHelper(opt) {
            var _this = this;
            this.default = {
                el: "",
                templatePrint: "#datatables-print",
            };
            this.tablePrivate = null;
            this.hasSelectPrivate = false;
            this.isSmallPrivate = false;
            $.extend(true, this.default, opt);
            this.options = opt;
            if (this.options.el === "") {
                throw new Error("No HTML element passed. Valid inputs are: String or HTML Element");
            }
            if ($(this.options.el).hasClass("table-sm")) {
                this.isSmallPrivate = true;
                var $this_1 = this;
                this.options.drawCallback = function (settings) {
                    $this_1.setInputsSmall();
                };
            }
            if (this.options.fixedHeader === true) {
                this.options.fixedHeader = {
                    header: true,
                };
            }
            var hasFixed = false;
            var offset = $(".fixed-top").outerHeight();
            if (offset > 0) {
                if (this.options.fixedHeader !== null && typeof this.options.fixedHeader === "object") {
                    if (this.options.fixedHeader.header) {
                        hasFixed = true;
                        this.options.fixedHeader["headerOffset"] = offset;
                    }
                }
            }
            if (this.options.buttons != null
                && this.options.buttons instanceof Array) {
                var found = false;
                var foundIndex = 0;
                for (var index = 0; index < this.options.buttons.length; index++) {
                    var element = this.options.buttons[index];
                    if (element === "print") {
                        found = true;
                        foundIndex = index;
                        break;
                    }
                }
                if (found) {
                    if (this.options.templatePrint === undefined) {
                        this.options.templatePrint = this.default.templatePrint;
                    }
                    var print_1 = this.buttonPrint(this.options.templatePrint);
                    if (print_1 != null) {
                        this.options.buttons[foundIndex] = print_1;
                    }
                }
            }
            this.tablePrivate = $(this.options.el).DataTable(this.options);
            this.setInputsSmall();
            if (this.options.select && this.table.settings()[0]._select instanceof Object) {
                this.hasSelectPrivate = true;
            }
            if (hasFixed) {
                var tab = $(this.options.el).closest(".tab-pane");
                if (tab.length > 0) {
                    var selector = ".nav-link[data-toggle=\"tab\"][href*=\"#" + tab.attr("id") + "\"]";
                    $(selector).on("shown.bs.tab", function (e) {
                        _this.table.fixedHeader.enable(true);
                        _this.table.fixedHeader.adjust();
                    });
                    $(selector).on("hidden.bs.tab", function (e) {
                        _this.table.fixedHeader.disable();
                    });
                }
            }
        }
        Object.defineProperty(DataTablesHelper.prototype, "table", {
            get: function () {
                return this.tablePrivate;
            },
            set: function (model) {
                this.tablePrivate = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataTablesHelper.prototype, "element", {
            get: function () {
                return this.options.el;
            },
            enumerable: true,
            configurable: true
        });
        DataTablesHelper.prototype.setInputsSmall = function () {
            if (this.isSmallPrivate) {
                var wrap = $(this.options.el).closest("div.dataTables_wrapper");
                wrap.addClass("table-sm");
                $(".btn-group", wrap).addClass("btn-group-sm");
                $("div.dataTables_paginate ul.pagination", wrap).addClass("pagination-sm");
            }
        };
        DataTablesHelper.prototype.$data = function (data) {
            if (this.table != null) {
                this.table.clear().draw();
                if (data != null && data.length > 0) {
                    this.table.rows.add(data).draw();
                    this.setInputsSmall();
                }
            }
        };
        DataTablesHelper.prototype.$rowNode = function (index) {
            return this.table.row(index).node();
        };
        DataTablesHelper.prototype.$rowData = function (index) {
            return this.table.row(index).data();
        };
        DataTablesHelper.prototype.$rowToggleClass = function (index, css) {
            var row = $(index);
            var hasClass = row.hasClass(css);
            if (hasClass) {
                row.removeClass(css);
            }
            else {
                row.addClass(css);
            }
            return !hasClass;
        };
        DataTablesHelper.prototype.$fixedHeader = function (settings) {
            var dt = new $.fn.dataTable.FixedHeader(this.table, settings);
        };
        DataTablesHelper.prototype.buttonPrint = function (template) {
            var templateEl = $(template);
            if (templateEl.length <= 0) {
                return null;
            }
            var $this = this;
            var title = "";
            if (this.options.title) {
                title = this.options.title;
            }
            else {
                title = document.title;
            }
            return {
                extend: "print",
                title: title,
                messageTop: templateEl.html(),
                autoPrint: true,
                customize: function (win) {
                    var table = $("table.dataTable", win.document.body);
                    $("h1:not(.page-title)", win.document.body).remove();
                    if ($this.hasSelectPrivate) {
                        var selected = $this.table.rows({ selected: true }).indexes();
                        var rows = "";
                        if (selected.length > 0) {
                            for (var index = 0; index < selected.length; index++) {
                                rows += "<tr>" + $("tbody tr:nth-child(" + (selected[index] + 1) + ")", table).html() + "</tr>";
                            }
                            $("tbody", table).html(rows);
                        }
                    }
                    var offset = 0;
                    $("thead tr:first th", table).each(function (i, el) {
                        if ($(el).is(":empty")) {
                            $("tr th:nth-child(" + (i + 1 - offset) + "), tr td:nth-child(" + (i + 1 - offset) + ")", table).remove();
                            offset++;
                        }
                    });
                },
            };
        };
        return DataTablesHelper;
    }());
    sico.DataTablesHelper = DataTablesHelper;
})(sico || (sico = {}));
//# sourceMappingURL=sico.datatables.js.map