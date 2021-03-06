/**
 * @summary     DataTables Bootstrap 4 helper
 * @description Converts Paging and search to work with bootstrap
 * @version     2.3
 * @file        dataTables.bootstrap.js
 * @author      Silver Connection OHG
 * @contact     Kiarash G. <kiarash@si-co.net>
 * @copyright   Copyright 2017 Silver Connection OHG
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: https://github.com/Silver-Connection/dataTables.bootstrap and http://www.datatables.net
 */
"use strict";
var _this = this;
var sico;
(function (sico) {
    var DataTablesBootstrap4 = /** @class */ (function () {
        function DataTablesBootstrap4() {
        }
        /**
         * Render function for table filter
         * @param table
         */
        DataTablesBootstrap4.fnFeatureHtmlFilter = function (table) {
            // set up filter
            if ($("div.dataTables_filter", table).length > 0) {
                var filterString = $("div.dataTables_filter label", table).text().trim();
                if (filterString[filterString.length - 1] === ":") {
                    filterString = filterString.substring(0, filterString.length - 1);
                }
                var filterInput = $("div.dataTables_filter input", table).attr("placeholder", filterString);
                var filterHtml = $("<div>", { class: "input-group" })
                    .append('<div class="input-group-prepend"><i class="input-group-text fa fa-search" aria-hidden="true"></i></div>')
                    .append(filterInput);
                $("div.dataTables_filter", table).addClass("form-group").append(filterHtml);
                $("div.dataTables_filter label", table).detach();
            }
        };
        /**
         * Render function for table length selector
         * @param table
         */
        DataTablesBootstrap4.fnFeatureHtmlLength = function (table) {
            // set up page-size
            if ($("div.dataTables_length", table).length > 0) {
                $("div.dataTables_length", table)
                    .addClass("form-group")
                    .addClass("d-inline-flex")
                    .addClass("pull-right");
                var pageSelect = $("div.dataTables_length select", table);
                var pageHtml = $("<div>", { class: "input-group" })
                    .append('<span class="input-group-prepend"><i class="input-group-text fa fa-list" aria-hidden="true"></i></span>')
                    .append(pageSelect);
                $("div.dataTables_length", table).append(pageHtml);
                var pageString = $("div.dataTables_length label", table).text().trim();
                pageSelect.attr("title", pageString);
                $("div.dataTables_length label", table).detach();
            }
        };
        DataTablesBootstrap4.Paging = {
            bootstrap: {
                fnInit: function (settings, paging, fnDraw) {
                    var oLang = settings.oLanguage.oPaginate;
                    var fnClickHandler = function (e) {
                        e.preventDefault();
                        if (settings.oApi._fnPageChange(settings, e.data.action)) {
                            fnDraw(settings);
                        }
                    };
                    var html = "\n<nav>\n    <ul class=\"pagination\">\n        <li class=\"" + settings.oClasses.sPageButton + " static-control first disabled\"><a href=\"#\" class=\"page-link\"><i class=\"fa fa-step-backward\"></i></a></li>\n        <li class=\"" + settings.oClasses.sPageButton + " static-control prev disabled\"><a href=\"#\" class=\"page-link\"><i class=\"fa fa-caret-left\"></i></a></li>\n        <li class=\"" + settings.oClasses.sPageButton + " static-control next disabled\"><a href=\"#\" class=\"page-link\"><i class=\"fa fa-caret-right\"></i></a></li>\n        <li class=\"" + settings.oClasses.sPageButton + " static-control last disabled\"><a href=\"#\" class=\"page-link\"><i class=\"fa fa-step-forward\"></i></a></li>\n    </ul>\n</nav>\n";
                    $(paging).append(html);
                    var els = $("a", paging);
                    $(els[0]).bind("click.DT", { action: "first" }, fnClickHandler);
                    $(els[1]).bind("click.DT", { action: "previous" }, fnClickHandler);
                    $(els[2]).bind("click.DT", { action: "next" }, fnClickHandler);
                    $(els[3]).bind("click.DT", { action: "last" }, fnClickHandler);
                },
                fnUpdate: function (settings, fnDraw) {
                    var dt = $(settings.nTable).dataTable().api();
                    // var dt: DataTables.DataTables = new $.fn.dataTable.Api(settings.nTable);
                    var info = dt.page.info();
                    var an = settings.aanFeatures["p"];
                    var btnMax = 5;
                    var btnOffset = Math.floor((btnMax - 1) / 2);
                    var jen = 0;
                    var j = 0;
                    // remove old btns
                    $("li:not(.static-control)", an[0]).remove();
                    // add / remove disabled classes from the static elements
                    if (info.pages > 1) {
                        // enable btns
                        $(an[0]).removeClass("invisible");
                        $("li.first, li.prev, li.next, li.last", an[0]).removeClass("disabled");
                        if (info.page === 0) {
                            $("li.first, li.prev", an[0]).addClass("disabled");
                        }
                        else if (info.page === (info.pages - 1)) {
                            $("li.next, li.last", an[0]).addClass("disabled");
                        }
                        if (btnMax > info.pages) {
                            btnMax = info.pages;
                        }
                        var count = btnMax + info.page - btnOffset;
                        var start = info.page - btnOffset;
                        if (start < 0) {
                            var offset = start * (-1);
                            start = start + offset;
                            count = count + offset;
                        }
                        if ((count + 1) > info.pages) {
                            var offset = count - info.pages;
                            start = start - offset;
                            count = info.pages;
                        }
                        // add the new list items and their event handlers
                        for (j = start, jen = count - 1; j <= jen; j++) {
                            var btnActive = 'class="'
                                + settings.oClasses.sPageButton + ((j === info.page) ? " active" : "") + '"';
                            var btn = $("<li " + btnActive + '><a href="#" class="page-link">' + (j + 1) + "</a></li>")
                                .insertBefore($("li.next", an[0])[0]);
                            if (j === info.page) {
                                $("a", btn).attr("style", "cursor: default;");
                            }
                            else {
                                btn.bind("click", function (e) {
                                    e.preventDefault();
                                    dt.page((parseInt($("a", e.currentTarget).text(), 10) - 1));
                                    fnDraw(settings);
                                });
                            }
                        }
                    }
                    else {
                        // Hide btns
                        $(an[0]).addClass("invisible");
                        // disable btns
                        $("li.first, li.prev, li.next, li.last", an[0]).addClass("disabled");
                    }
                },
            },
        };
        return DataTablesBootstrap4;
    }());
    sico.DataTablesBootstrap4 = DataTablesBootstrap4;
})(sico || (sico = {}));
if (typeof $.fn.dataTable === "function" &&
    typeof $.fn.dataTable.versionCheck === "function" &&
    $.fn.dataTable.versionCheck("1.10.0")) {
    /* Default table settings */
    $.extend(true, $.fn.dataTable.defaults, {
        dom: "<'row'<'col-lg-5'f><'col-lg-7'Bl>>"
            + "<'row'<'col-lg-12't>>"
            + "<'row'<'col-lg-5'i><'col-lg-7'p>>Ox",
        paging: true,
        pagingType: "bootstrap",
        stateSave: true,
        language: {
            buttons: {
                print: '<i class="fa fa-print" aria-hidden="true"></i>',
                copy: '<i class="fa fa-clipboard" aria-hidden="true"></i>',
                csv: '<i class="fa fa-file-text-o" aria-hidden="true"></i>',
                colvis: '<i class="fa fa-list-alt" aria-hidden="true"></i> <text>Columns</text>',
            },
        },
    });
    /* Default class names */
    var defaultClasses = {
        sWrapper: "dataTables_wrapper dt-bootstrap4",
        sFilterInput: "form-control",
        sLength: "dataTables_length",
        sLengthSelect: "form-control",
        sProcessing: "dataTables_processing panel panel-default",
        sPaging: "dataTables_paginate pull-right page_",
        sPageButton: "paginate_button page-item",
    };
    $.extend($.fn.dataTable.ext.classes, defaultClasses);
    $.fn.dataTable.ext.buttons.collection.className += " dropdown-toggle";
    /* Default button settings */
    $.extend(true, $.fn.dataTable.Buttons.defaults, {
        dom: {
            container: {
                className: "dt-buttons btn-group ",
            },
            button: {
                className: "btn btn-outline-secondary",
            },
            collection: {
                tag: "div",
                className: "dt-button-collection dropdown-menu",
                button: {
                    tag: "a",
                    className: "dt-button dropdown-item",
                },
            },
        },
    });
    // Add select buttons
    $.extend($.fn.dataTable.ext.buttons, {
        selectInverse: {
            text: '<i class="fa fa-exchange" aria-hidden="true"></i>',
            className: "buttons-select-inverse",
            action: function () {
                var selected = _this.rows({ selected: true });
                var deselected = _this.rows({ selected: false });
                selected.deselect();
                deselected.select();
            },
        },
    });
    /* bootstrap style pagination control */
    $.extend($.fn.dataTable.ext.pager, sico.DataTablesBootstrap4.Paging);
    /* register a new feature with DataTables */
    $.fn.dataTable.ext.feature.push({
        fnInit: function (settings) {
            var init = settings.oInit;
            // transform filter
            if (settings.aanFeatures["f"] && settings.aanFeatures["f"] != null) {
                sico.DataTablesBootstrap4.fnFeatureHtmlFilter(settings.nTableWrapper);
            }
            // transform page length
            if (settings.aanFeatures["l"] && settings.aanFeatures["l"] != null) {
                sico.DataTablesBootstrap4.fnFeatureHtmlLength(settings.nTableWrapper);
            }
            return;
        },
        cFeature: "x",
        sFeature: "BootstrapInit",
    });
}
else {
    alert("Warning: BootstrapInit requires DataTables 1.10 or greater - www.datatables.net/download");
}
//# sourceMappingURL=sico.datatables.b4.js.map