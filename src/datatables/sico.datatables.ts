/**
 * @summary     Datatables.net Helper
 * @description Wrapper with some common tools
 * @version     3.0
 * @file        sico.datatables.js
 * @dependencie datatables.js, datatables-select, datatables-button, datatables-fixed-header, jQuery
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
 * For details please refer to: https://github.com/Silver-Connection/dataTables.bootstrap
 */

"use strict";
namespace sico {
    export interface ITableOptions extends DataTables.Settings {
        /**
         * Table element to use
         * @default ""
         * @type HTMLElement
         */
        el: string | HTMLElement | (() => HTMLElement) | JQuery;

        /**
         * Table title used for print version
         * @default ""
         * @type HTMLElement
         */
        title?: string;

        /**
         * Table element to use
         * @default #datatables-print
         * @type HTMLElement
         */
        templatePrint?: string | HTMLElement | (() => HTMLElement) | JQuery;
    }

    export interface IDataTablesButtonSettings extends DataTables.ButtonSettings {
        messageTop?: string;
        messageBottom?: string;
    }

    export class DataTablesHelper {
        public options: ITableOptions;
        protected default: ITableOptions =
        {
            el: "",
            templatePrint: "#datatables-print",
        };

        private tablePrivate: DataTables.Api = null;
        get table(): DataTables.Api {
            return this.tablePrivate;
        }
        set table(model: DataTables.Api) {
            this.tablePrivate = model;
        }
        get element(): string | HTMLElement | (() => HTMLElement) | JQuery {
            return this.options.el;
        }

        private hasSelectPrivate: boolean = false;
        private isSmallPrivate = false;

        /**
         * Load configurations and create DataTables Object
         * @constructor
         * @param {ITableOptions} opt - configurations
         */
        public constructor(opt: ITableOptions) {
            // Set defaults
            $.extend(true, this.default, opt);
            this.options = opt;

            // Check element
            if (this.options.el === "") {
                throw new Error("No HTML element passed. Valid inputs are: String or HTML Element");
            }

            // Small table
            if ($(this.options.el).hasClass("table-sm")) {
                this.isSmallPrivate = true;
                const $this = this;
                this.options.drawCallback = (settings) => {
                    $this.setInputsSmall();
                };
            }

            // Fixed Header
            if (this.options.fixedHeader === true) {
                this.options.fixedHeader = {
                    header: true,
                };
            }

            let hasFixed = false;
            const offset = $(".fixed-top").outerHeight();
            if (offset > 0) {
                if (this.options.fixedHeader !== null && typeof this.options.fixedHeader === "object") {
                    if (this.options.fixedHeader.header) {
                        hasFixed = true;
                        this.options.fixedHeader["headerOffset"] = offset;
                    }
                }
            }

            // Check print button
            if (this.options.buttons != null
                && this.options.buttons instanceof Array) {
                let found = false;
                let foundIndex = 0;
                for (let index = 0; index < this.options.buttons.length; index++) {
                    const element = this.options.buttons[index];
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
                    const print = this.buttonPrint(this.options.templatePrint);
                    if (print != null) {
                        this.options.buttons[foundIndex] = print;
                    }
                }
            }

            // Create table
            this.tablePrivate = $(this.options.el).DataTable(this.options);

            // Small
            this.setInputsSmall();

            // Set short cuts
            if (this.options.select && this.table.settings()[0]._select instanceof Object) {
                this.hasSelectPrivate = true;
            }

            // Fixed Header
            if (hasFixed) {
                // Check if is in tab
                const tab = $(this.options.el).closest(".tab-pane");
                if (tab.length > 0) {
                    const selector = `.nav-link[data-toggle="tab"][href*="#${tab.attr("id")}"]`;
                    $(selector).on("shown.bs.tab", (e) => {
                        this.table.fixedHeader.enable(true);
                        this.table.fixedHeader.adjust();
                    });
                    $(selector).on("hidden.bs.tab", (e) => {
                        this.table.fixedHeader.disable();
                    });
                }
            }
        }

        public setInputsSmall(): void {
            if (this.isSmallPrivate) {
                const wrap = $(this.options.el).closest("div.dataTables_wrapper");
                wrap.addClass("table-sm");
                $(".btn-group", wrap).addClass("btn-group-sm");
                $("div.dataTables_paginate ul.pagination", wrap).addClass("pagination-sm");
            }
        }

        /**
         * Set new data for this table
         * @param {Any} data - Table data
         */
        public $data(data: any[]) {
            if (this.table != null) {
                this.table.clear().draw();

                if (data != null && data.length > 0) {
                    this.table.rows.add(data).draw();

                    // Small
                    this.setInputsSmall();
                }
            }
        }

        /**
         * Get row HTML Element
         * @param {number} index - Row index
         */
        public $rowNode(index: number): Node {
            return this.table.row(index).node();
        }

        /**
         * Get row data
         * @param {number} index - Row index
         */
        public $rowData(index: number): any {
            return this.table.row(index).data();
        }

        /**
         * Toggle CSS class for given row. Returns true CSS class is set.
         * @param {Node} index - Row Node
         * @param {string} css - CSS class
         */
        public $rowToggleClass(index: Node | HTMLElement | (() => HTMLElement) | JQuery, css: string): boolean {
            const row = $(index);
            const hasClass = row.hasClass(css);
            if (hasClass) {
                row.removeClass(css);
            } else {
                row.addClass(css);
            }

            return !hasClass;
        }

        /**
         * Set fixed header
         * @param {DataTables.FixedHeaderSettings} settings - Plug in settings
         */
        public $fixedHeader(settings: boolean | DataTables.FixedHeaderSettings) {
            const dt = new $.fn.dataTable.FixedHeader(this.table, settings);
        }

        private buttonPrint(template: string | HTMLElement | (() => HTMLElement) | JQuery): IDataTablesButtonSettings {
            const templateEl = $(template);
            if (templateEl.length <= 0) {
                return null;
            }
            const $this = this;

            // Check if title is set
            let title = "";
            if (this.options.title) {
                title = this.options.title;
            } else {
                title = document.title;
            }

            return {
                extend: "print",
                title,
                messageTop: templateEl.html(),
                autoPrint: true,
                customize: (win: Window) => {
                    const table = $("table.dataTable", win.document.body);

                    // Use template
                    $("h1:not(.page-title)", win.document.body).remove();

                    if ($this.hasSelectPrivate) {
                        // Use only selected rows
                        const selected = $this.table.rows({ selected: true }).indexes();
                        let rows = "";
                        if (selected.length > 0) {
                            // tslint:disable-next-line:prefer-for-of
                            for (let index = 0; index < selected.length; index++) {
                                rows += "<tr>" + $("tbody tr:nth-child(" + (selected[index] + 1) + ")", table).html() + "</tr>";
                            }
                            $("tbody", table).html(rows);
                        }
                    }

                    // Clean empty columns
                    let offset = 0;
                    $("thead tr:first th", table).each((i, el) => {
                        if ($(el).is(":empty")) {
                            $("tr th:nth-child(" + (i + 1 - offset) + "), tr td:nth-child(" + (i + 1 - offset) + ")", table).remove();
                            offset++;
                        }
                    });
                },
            };
        }
    }
}
