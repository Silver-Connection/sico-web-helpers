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
        element: HTMLElement;
        map?: google.maps.MapOptions;
        location: google.maps.LatLng;
        title: string;
        titleShow?: boolean;
        marker?: IMarkerOptions[];
        direction?: google.maps.DirectionsRequest;
        rectangles?: google.maps.RectangleOptions[];
        polygons?: google.maps.PolygonOptions[];
    }
    class Map {
        protected options: IMapOptions;
        protected default: IMapOptions;
        protected map: google.maps.Map;
        protected info: google.maps.InfoWindow;
        protected location: google.maps.Marker;
        constructor(opt: IMapOptions);
        addMarker(options: IMarkerOptions): void;
        addDirection(options: google.maps.DirectionsRequest): void;
        addRectangle(options: google.maps.RectangleOptions): void;
        addPolygon(options: google.maps.PolygonOptions): void;
        draw(): void;
    }
}
