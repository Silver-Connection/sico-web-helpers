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
/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
declare var G_vmlCanvasManager: any;
declare namespace sico.draw {
    interface IGaugeConfig {
        autoDraw?: boolean;
        backgroundColor?: string;
        backgroundShow?: boolean;
        canvasHeight?: number;
        canvasWidth?: number;
        centerX?: "left" | "center" | "right";
        centerY?: "top" | "center" | "bottom";
        deg: number;
        data?: IGaugeData[];
        lineCap?: "butt" | "round" | "square";
        labelInverse?: boolean;
        labelHtml?: boolean;
        labelCssBase?: string;
        offset?: number;
    }
    interface IGaugeData {
        value: number;
        label?: string | LabelFunction;
        labelCss?: string;
        labelColor?: string;
        labelFont?: string;
        labelSize?: number;
        labelShow?: boolean;
        labelStyle?: string;
        color?: string;
        size?: number;
    }
    type LabelFunction = (val: number) => string;
    class Gauge {
        static degToRands(value: number): number;
        static percentToRands(value: number, max: number): number;
        options: IGaugeConfig;
        el: HTMLElement;
        elLabels: JQuery<HTMLElement>;
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        protected default: IGaugeConfig;
        protected defaultData: IGaugeData;
        private centerXFactor;
        private centerYFactor;
        private gaugeSize;
        private labelSize;
        constructor(element: HTMLElement | JQuery<HTMLElement>, opt: IGaugeConfig);
        createCanvas(): void;
        $draw(): void;
        drawBackground(): void;
        drawGauge(data: IGaugeData, offset?: number): void;
        drawLine(rands: number, size: number, color: string, offset?: number): void;
        drawText(data: IGaugeData, offset: number): void;
        htmlText(data: IGaugeData): void;
        private getCenterPoint();
        private checkData();
    }
}
declare var Dropzone: any;
declare namespace sico {
    class DropzoneHelper {
        static TEMPLATE: string;
        static MODAL: string;
        /**
         * Initialize image upload config
         */
        static $image(modelUpdate: (data: any) => void, hideForm?: boolean): void;
        /**
         * Initialize file (any) upload config
         */
        static $file(modelUpdate: (data: any) => void, hideForm?: boolean): void;
        /**
         * Show upload
         */
        static $uploadShow(el: string | HTMLElement): void;
        /**
         * Show delete overlay
         */
        static $deleteOverlayShow(id: number): void;
        /**
         * Hide delete overlay
         */
        static $deleteOverlayHide(id: number): void;
        /**
         * Show fullsize image
         */
        static $modalShow(url: string, title?: string): void;
    }
}
/// <reference types="googlemaps" />
declare namespace sico.maps.overlay {
    class Html extends google.maps.OverlayView {
        static version: string;
        protected options: sico.maps.IMarkerOptions;
        protected div: HTMLElement;
        protected listeners: google.maps.MapsEventListener[];
        /**
         * Load configuartions
         * @constructor
         * @param {sico.maps.IMarkerOptions} opt - Configuartions
         */
        constructor(opt: sico.maps.IMarkerOptions);
        /**
         * Add html overlays
         * @return {void}
         */
        draw(): void;
        onAdd(): void;
        onRemove(): void;
    }
}
/// <reference types="googlemaps" />
declare namespace sico.maps {
    const MAP_PIN = "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z";
    const SQUARE_PIN = "M22-48h-44v43h16l6 5 6-5h16z";
    const SHIELD = "M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z";
    const ROUTE = "M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z";
    const SQUARE = "M-24-48h48v48h-48z";
    const SQUARE_ROUNDED = "M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z";
    interface IMarkerOptions extends google.maps.MarkerOptions {
        html?: string;
    }
    interface IMapOptions {
        /**
         * This is the element in which the map gets rendered
         * @default document.getElementById("gmap_canvas")
         * @type HTMLElement
         */
        element: HTMLElement;
        /**
         * Google maps options. Styles and co.
         * @default {mapTypeId: google.maps.MapTypeId.ROADMAP}
         * @type google.maps.MapOptions
         */
        map?: google.maps.MapOptions;
        /**
         * Location of the destination
         * @default new google.maps.LatLng(0, 0)
         * @type google.maps.MapOptions
         */
        location: google.maps.LatLng;
        /**
         * HTML Content of the info window
         * @default "<strong>Name</strong><br/>Street No. 123"
         * @type string
         */
        title: string;
        /**
         * Show info window on map load
         * @default true
         * @type boolean
         */
        titleShow?: boolean;
        /**
         * Array of marker options
         * @default null
         * @type google.maps.MarkerOptions[]
         */
        marker?: IMarkerOptions[];
        /**
         * Direction service options
         * @default null
         * @type google.maps.DirectionsRequest
         */
        direction?: google.maps.DirectionsRequest;
        /**
         * Rectangle overlay options
         * @default null
         * @type google.maps.RectangleOptions[]
         */
        rectangles?: google.maps.RectangleOptions[];
        /**
         * Polygon overlay options
         * @default null
         * @type google.maps.RectangleOptions[]
         */
        polygons?: google.maps.PolygonOptions[];
    }
    class Map {
        protected options: IMapOptions;
        protected default: IMapOptions;
        protected map: google.maps.Map;
        protected info: google.maps.InfoWindow;
        protected location: google.maps.Marker;
        /**
         * Load configuartions
         * @constructor
         * @param {IMapOptions} opt - Configuartions
         */
        constructor(opt: IMapOptions);
        /**
         * Add a marker to the map. This is invoked by the "draw()" methode if the marker configuartion is set.
         * @param {IMarkerOptions} options - Configuartions
         * @return {void}
         */
        addMarker(options: IMarkerOptions): void;
        /**
         * Add a direction service to the map. This is invoked by the "draw()" methode if the directions configuartion is set.
         * @param {google.maps.DirectionsRequest} options - Configuartions
         * @return {void}
         */
        addDirection(options: google.maps.DirectionsRequest): void;
        /**
         * Add a rectangle to the map. This is invoked by the "draw()" methode if the directions configuartion is set.
         * @param {google.maps.DirectionsRequest} options - Configuartions
         * @return {void}
         */
        addRectangle(options: google.maps.RectangleOptions): void;
        /**
         * Add a polygon to the map. This is invoked by the "draw()" methode if the directions configuartion is set.
         * @param {google.maps.DirectionsRequest} options - Configuartions
         * @return {void}
         */
        addPolygon(options: google.maps.PolygonOptions): void;
        /**
         * Render the map, apply marker and direction service, if set.
         * @return {void}
         */
        draw(): void;
    }
}
interface Image {
    Created: string;
    CreatedBy: string;
    Id: number;
    Link: string;
    Name: string;
    Notes: string;
    TargetId: number;
    Type: string;
}
interface Images {
    Images: Image[];
}
/// <reference types="datatables.net" />
/// <reference types="datatables.net-buttons" />
/// <reference types="datatables.net-fixedheader" />
/// <reference types="datatables.net-select" />
interface ISampleModel {
    Id: number;
    Line: number;
    Type: string;
    Database: string;
    User: string;
    Address: string;
    IsDeleted: boolean;
}
declare function createSampleData(rows: any): ISampleModel[];
declare function createBtn(config: any): string;
declare const dtConfig: DataTables.Settings;
declare function testDataTableRaw(id: string): void;
declare function testDataTableHelper(id: string): void;
declare function notifyInfo(): void;
declare function notifySuccess(): void;
declare function notifyError(): void;
declare namespace sico {
    class Toggler {
        static switcher(selector: string, on: string, off?: string): void;
        static jQueryInterface(config: any): typeof Toggler;
        private _element;
        private _on;
        private _off;
        private _toggleOn;
        private _toggleOff;
        constructor(element: any);
        static readonly VERSION: string;
        on: string;
        off: string;
        toggleOn: string;
        toggleOff: string;
        switch(): void;
        dispose(): void;
        getSelectorFromElement(element: any): string;
        getOnFromElement(element: any): string;
        getOffFromElement(element: any): string;
        getToggleOnFromElement(element: any): string;
        getToggleOffFromElement(element: any): string;
        private _change(selector);
        private _switchItem(element, isEvent?, isToggle?);
        private _switchArray(elements);
    }
}
declare module 'package-name/transaction/sico.transaction.modul' {
	export const NOTIFY_INFO: {
	    delay: number;
	    icon_type: string;
	    type: string;
	};
	export const NOTIFY_SUCCESS: {
	    delay: number;
	    icon_type: string;
	    type: string;
	};
	export const NOTIFY_ERROR: {
	    delay: number;
	    icon_type: string;
	    type: string;
	};
	export interface IModel {
	    /**
	     * Transaction action name
	     * @default null
	     * @type string
	     */
	    Action: string;
	    /**
	     * Transaction return code
	     * @default null
	     * @type string
	     */
	    Code: number;
	    /**
	     * Actual data
	     * @default null
	     * @type string
	     */
	    Data: any;
	    /**
	     * Transaction message
	     * @default null
	     * @type string
	     */
	    Message: string;
	}
	export class Transaction implements IModel {
	    /**
	     * Toggle remarkable-bootstrap-notify
	     * @param {string} action
	     * @param {Transaction Code | number} code
	     * @param {string} message
	     */
	    static $notifyNow(action: string, code: number, message: string): void;
	    /**
	     * Check if model implements Transaction Model
	     * @param {IModel} model - Transaction Model
	     */
	    static $isTransaction(model: IModel): model is IModel;
	    Action: string;
	    Code: number;
	    Data: any;
	    Message: string;
	    /**
	     * Load configurations and create Transaction Object
	     * @constructor
	     * @param {any} opt - Payload Data
	     */
	    constructor(data?: any);
	    /**
	     * Toggle remarkable-bootstrap-notify
	     */
	    $noify(model?: any): void;
	    /**
	     * Check if model implements Transaction Model
	     * @param {IModel} model - Transaction Model
	     */
	    $isTransaction(model: IModel): model is IModel;
	}

}
declare namespace sico {
    interface TransactionModel {
        /**
         * Transaction action name
         * @default null
         * @type string
         */
        Action: string;
        /**
         * Transaction return code
         * @default null
         * @type string
         */
        Code: number;
        /**
         * Actual data
         * @default null
         * @type string
         */
        Data: any;
        /**
         * Transaction message
         * @default null
         * @type string
         */
        Message: string;
    }
    class Transaction implements TransactionModel {
        static NOTIFY_INFO: {
            delay: number;
            icon_type: string;
            type: string;
        };
        static NOTIFY_SUCCESS: {
            delay: number;
            icon_type: string;
            type: string;
        };
        static NOTIFY_ERROR: {
            delay: number;
            icon_type: string;
            type: string;
        };
        /**
         * Check if model implements TransactionModel
         * @param {TransactionModel} model - Transaction Model
         */
        static $isTransaction(model: TransactionModel): model is TransactionModel;
        /**
         * Toggle remarkable-bootstrap-notify
         * @param {any} model - Transaction Model
         */
        static $noify(model: any): void;
        /**
         * Toggle remarkable-bootstrap-notify
         * @param {string} action
         * @param {Transaction Code | number} code
         * @param {string} message
         */
        static $notifyNow(action: string, code: number, message: string): void;
        Action: string;
        Code: number;
        Data: any;
        Message: string;
        /**
         * Load configurations and create Transaction Object
         * @constructor
         * @param {any} opt - Payload Data
         */
        constructor(data: any);
        /**
         * Toggle remarkable-bootstrap-notify
         */
        $noify(): void;
        /**
         * Export Vue.js model function
         */
        $vue(): () => Transaction;
    }
}
/// <reference types="vuejs" />
/// <reference types="jquery" />
declare const Vue: vuejs.Vue;
declare namespace sico {
    type FunctionCallback = (data?: any) => void;
    interface VueHelperOptions extends vuejs.ComponentOptions<vuejs.Vue> {
        /**
         * Path to Model which is used for AJAX can be replaced in each request
         * @default null
         * @type string
         */
        path?: string;
        /**
         * GET URL
         * @default null
         * @type string
         */
        get?: string;
        /**
         * POST URL
         * @default null
         * @type string
         */
        post?: string;
        /**
         * PUT URL
         * @default null
         * @type string
         */
        put?: string;
        /**
         * DELETE URL
         * @default null
         * @type string
         */
        delete?: string;
    }
    class VueHelper {
        /**
         * Send ajax request without settings data.
         * @param {JQueryAjaxSettings} settings - jQuery ajaxy settings
         * @param {string} action - Action name for display in notify.
         * @param {Function} callback - Callback function with respond data as parameter
         */
        static ajax(settings: JQueryAjaxSettings, action?: string, callback?: FunctionCallback): void;
        /**
         * Find polyfill
         * @param {Array} Array
         * @param {Function} callback callback function used for search
         */
        static find(path: any[], callback: (el: any, index?: number) => boolean): any;
        private static _ajax(settings, options, $this?, callback?);
        options: VueHelperOptions;
        protected default: VueHelperOptions;
        private vuePrivate;
        vue: vuejs.Vue;
        private storePrivate;
        store: any;
        readonly element: String | Element | (() => HTMLElement);
        /**
         * Load configurations and create Vue Object
         * @constructor
         * @param {VueHelperOptions} opt - Configurations
         */
        constructor(opt: VueHelperOptions);
        /**
         * Send a GET request to given URL
         * @param {string} action - Overwrite transaction action name. If action is set to 'hide' no notification will be emitted.
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        $get(action?: string, callback?: FunctionCallback, path?: string): void;
        /**
         * Send a POST request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        $post(callback?: FunctionCallback, path?: string): void;
        /**
         * Send a PUT request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {string} path - Path in Vue data to use for this request. Used for partial update.
         */
        $put(callback?: FunctionCallback, path?: string): void;
        /**
         * Send a GET request to given URL
         * @param {Function} callback - Callback function with respond data as parameter
         */
        $delete(callback?: FunctionCallback, path?: string): void;
        /**
         * Revert data to initial state
         */
        $revert(): void;
        /**
         * Set new data for this object
         * @param {Any} data - Table data
         * @param {Function} callback - Callback function with respond data as parameter
         * @param {Boolean} skipTransaction - Trigger transaction notification
         */
        $data(data: any, callback?: FunctionCallback, skipTransaction?: boolean): void;
        /**
         * Find polyfill
         * @param {String | Array} path to data or array
         * @param {Function} callback callback function used for search
         */
        $find(path: string | any[], callback: (el: any, index?: number) => boolean): any;
        private _getData(path);
        private _getValue(path);
    }
}
