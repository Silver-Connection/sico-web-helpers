/**
 * @summary     DataTables Bootstrap 4 helper
 * @description Converts Paging and search to work with bootstrap
 * @version     2.1
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

namespace sico {
    export class DataTablesBootstrap4 {
        public static Paging = {
            bootstrap: {
                fnInit(settings: DataTables.SettingsLegacy, paging: any, fnDraw: (settings: DataTables.SettingsLegacy) => void ) {
                    const oLang = settings.oLanguage.oPaginate;
                    const fnClickHandler = (e: any) => {
                        e.preventDefault();
                        if (settings.oApi._fnPageChange(settings, e.data.action)) {
                            fnDraw(settings);
                        }
                    };

                    const html = `
<nav>
    <ul class="pagination">
        <li class="${settings.oClasses.sPageButton} static-control first disabled"><a href="#" class="page-link"><i class="fa fa-step-backward"></i></a></li>
        <li class="${settings.oClasses.sPageButton} static-control prev disabled"><a href="#" class="page-link"><i class="fa fa-caret-left"></i></a></li>
        <li class="${settings.oClasses.sPageButton} static-control next disabled"><a href="#" class="page-link"><i class="fa fa-caret-right"></i></a></li>
        <li class="${settings.oClasses.sPageButton} static-control last disabled"><a href="#" class="page-link"><i class="fa fa-step-forward"></i></a></li>
    </ul>
</nav>
`;
                    $(paging).append(html);
                    const els = $("a", paging);
                    $(els[0]).bind("click.DT", { action: "first" }, fnClickHandler);
                    $(els[1]).bind("click.DT", { action: "previous" }, fnClickHandler);
                    $(els[2]).bind("click.DT", { action: "next" }, fnClickHandler);
                    $(els[3]).bind("click.DT", { action: "last" }, fnClickHandler);
                },

                fnUpdate(settings: DataTables.SettingsLegacy, fnDraw: (settings: DataTables.SettingsLegacy) => void) {
                    const dt: DataTables.Api = $(settings.nTable).dataTable().api();
                    // var dt: DataTables.DataTables = new $.fn.dataTable.Api(settings.nTable);
                    const info: DataTables.PageMethodeModelInfoReturn = dt.page.info();

                    const an = settings.aanFeatures["p"];
                    let btnMax = 5;
                    const btnOffset = Math.floor((btnMax - 1) / 2);
                    let jen = 0;
                    let j = 0;

                    // remove old btns
                    $("li:not(.static-control)", an[0]).remove();

                    // add / remove disabled classes from the static elements
                    if (info.pages > 1) {
                        // enable btns
                        $(an[0]).removeClass("invisible");
                        $("li.first, li.prev, li.next, li.last", an[0]).removeClass("disabled");
                        if (info.page === 0) {
                            $("li.first, li.prev", an[0]).addClass("disabled");
                        } else if (info.page === (info.pages - 1)) {
                            $("li.next, li.last", an[0]).addClass("disabled");
                        }

                        if (btnMax > info.pages) {
                            btnMax = info.pages;
                        }
                        let count: number = btnMax + info.page - btnOffset;
                        let start: number = info.page - btnOffset;

                        if (start < 0) {
                            const offset = start * (-1);
                            start = start + offset;
                            count = count + offset;
                        }

                        if ((count + 1) > info.pages) {
                            const offset = count - info.pages;
                            start = start - offset;
                            count = info.pages;
                        }

                        // add the new list items and their event handlers
                        for (j = start, jen = count - 1; j <= jen; j++) {
                            const btnActive = 'class="'
                                + settings.oClasses.sPageButton + ((j === info.page) ? " active" : "") + '"';
                            const btn = $("<li " + btnActive + '><a href="#" class="page-link">' + (j + 1) + "</a></li>")
                                .insertBefore($("li.next", an[0])[0]);

                            if (j === info.page) {
                                $("a", btn).attr("style", "cursor: default;");
                            } else {
                                btn.bind("click", (e: any) => {
                                    e.preventDefault();
                                    dt.page((parseInt($("a", this).text(), 10) - 1));
                                    fnDraw(settings);
                                });
                            }
                        }
                    } else {
                        // Hide btns
                        $(an[0]).addClass("invisible");
                        // disable btns
                        $("li.first, li.prev, li.next, li.last", an[0]).addClass("disabled");
                    }
                },
            },
        };

        /**
         * Render function for table filter
         * @param table
         */
        public static fnFeatureHtmlFilter(table: Node) {
            // set up filter
            if ($("div.dataTables_filter", table).length > 0) {
                let filterString: string = $("div.dataTables_filter label", table).text().trim();
                if (filterString[filterString.length - 1] === ":") {
                    filterString = filterString.substring(0, filterString.length - 1);
                }
                const filterInput = $("div.dataTables_filter input", table).attr("placeholder", filterString);
                const filterHtml = $("<div>", { class: "input-group" })
                    .append('<div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>')
                    .append(filterInput);
                $("div.dataTables_filter", table).addClass("form-group").append(filterHtml);
                $("div.dataTables_filter label", table).detach();
            }
        }

        /**
         * Render function for table length selector
         * @param table
         */
        public static fnFeatureHtmlLength(table: Node) {
            // set up page-size
            if ($("div.dataTables_length", table).length > 0) {
                $("div.dataTables_length", table)
                    .addClass("form-group")
                    .addClass("d-inline-flex")
                    .addClass("pull-right");
                const pageSelect = $("div.dataTables_length select", table);
                const pageHtml = $("<div>", { class: "input-group" })
                    .append('<span class="input-group-addon"><i class="fa fa-list" aria-hidden="true"></i></span>')
                    .append(pageSelect);
                $("div.dataTables_length", table).append(pageHtml);
                const pageString: string = $("div.dataTables_length label", table).text().trim();
                pageSelect.attr("title", pageString);
                $("div.dataTables_length label", table).detach();
            }
        }
    }
}

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
    const defaultClasses: DataTables.ExtClassesSettings = {
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
            action: () => {
                const selected = this.rows({ selected: true });
                const deselected = this.rows({ selected: false });
                selected.deselect();
                deselected.select();
            },
        },
    });

    /* bootstrap style pagination control */
    $.extend($.fn.dataTable.ext.pager, sico.DataTablesBootstrap4.Paging);

    /* register a new feature with DataTables */
    $.fn.dataTable.ext.feature.push({
        fnInit(settings: DataTables.SettingsLegacy) {
            const init = settings.oInit;
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
} else {
    alert("Warning: BootstrapInit requires DataTables 1.10 or greater - www.datatables.net/download");
}
