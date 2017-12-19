/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="datatables.net-buttons" />
/// <reference types="datatables.net-fixedheader" />
declare namespace sico {
    interface ITableOptions extends DataTables.Settings {
        el: string | HTMLElement | (() => HTMLElement) | JQuery;
        title?: string;
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
        constructor(opt: ITableOptions);
        setInputsSmall(): void;
        $data(data: any[]): void;
        $rowNode(index: number): Node;
        $rowData(index: number): any;
        $rowToggleClass(index: Node | HTMLElement | (() => HTMLElement) | JQuery, css: string): boolean;
        $fixedHeader(settings: boolean | DataTables.FixedHeaderSettings): void;
        private buttonPrint(template);
    }
}
