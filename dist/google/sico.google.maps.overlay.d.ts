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
