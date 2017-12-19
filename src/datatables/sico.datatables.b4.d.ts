/// <reference types="datatables.net" />
declare namespace sico {
    class DataTablesBootstrap4 {
        static Paging: {
            bootstrap: {
                fnInit(settings: DataTables.SettingsLegacy, paging: any, fnDraw: (settings: DataTables.SettingsLegacy) => void): void;
                fnUpdate(settings: DataTables.SettingsLegacy, fnDraw: (settings: DataTables.SettingsLegacy) => void): void;
            };
        };
        /**
         * Render function for table filter
         * @param table
         */
        static fnFeatureHtmlFilter(table: Node): void;
        /**
         * Render function for table length selector
         * @param table
         */
        static fnFeatureHtmlLength(table: Node): void;
    }
}
