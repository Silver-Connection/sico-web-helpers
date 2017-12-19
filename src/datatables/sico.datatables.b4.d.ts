/// <reference types="datatables.net" />
declare namespace sico {
    class DataTablesBootstrap4 {
        static Paging: {
            bootstrap: {
                fnInit(settings: DataTables.SettingsLegacy, paging: any, fnDraw: (settings: DataTables.SettingsLegacy) => void): void;
                fnUpdate(settings: DataTables.SettingsLegacy, fnDraw: (settings: DataTables.SettingsLegacy) => void): void;
            };
        };
        static fnFeatureHtmlFilter(table: Node): void;
        static fnFeatureHtmlLength(table: Node): void;
    }
}
