/// <reference types="googlemaps" />
declare namespace sico.maps.overlay {
    class Html extends google.maps.OverlayView {
        static version: string;
        protected options: sico.maps.IMarkerOptions;
        protected div: HTMLElement;
        protected listeners: google.maps.MapsEventListener[];
        constructor(opt: sico.maps.IMarkerOptions);
        draw(): void;
        onAdd(): void;
        onRemove(): void;
    }
}
