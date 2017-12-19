/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="datatables.net-buttons" />
/// <reference types="datatables.net-fixedheader" />
declare namespace sico {
    interface ITableOptions extends DataTables.Settings {
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
    interface IDataTablesButtonSettings extends DataTables.ButtonSettings {
        messageTop?: string;
        messageBottom?: string;
    }
    class DataTablesHelper {
        options: ITableOptions;
        protected default: ITableOptions;
        private tablePrivate;
        table: DataTables.Api;
        readonly element: string | HTMLElement | (() => HTMLElement) | JQuery;
        private hasSelectPrivate;
        private isSmallPrivate;
        /**
         * Load configurations and create DataTables Object
         * @constructor
         * @param {ITableOptions} opt - configurations
         */
        constructor(opt: ITableOptions);
        setInputsSmall(): void;
        /**
         * Set new data for this table
         * @param {Any} data - Table data
         */
        $data(data: any[]): void;
        /**
         * Get row HTML Element
         * @param {number} index - Row index
         */
        $rowNode(index: number): Node;
        /**
         * Get row data
         * @param {number} index - Row index
         */
        $rowData(index: number): any;
        /**
         * Toggle CSS class for given row. Returns true CSS class is set.
         * @param {Node} index - Row Node
         * @param {string} css - CSS class
         */
        $rowToggleClass(index: Node | HTMLElement | (() => HTMLElement) | JQuery, css: string): boolean;
        /**
         * Set fixed header
         * @param {DataTables.FixedHeaderSettings} settings - Plug in settings
         */
        $fixedHeader(settings: boolean | DataTables.FixedHeaderSettings): void;
        private buttonPrint(template);
    }
}
