"use strict";
namespace sico.maps {
  export const MAP_PIN = "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z";
  export const SQUARE_PIN = "M22-48h-44v43h16l6 5 6-5h16z";
  export const SHIELD = "M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z";
  export const ROUTE = "M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z";
  export const SQUARE = "M-24-48h48v48h-48z";
  export const SQUARE_ROUNDED = "M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z";

  export interface IMarkerOptions extends google.maps.MarkerOptions {
    html?: string;
  }

  export interface IMapOptions {
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

  export class Map {
    protected options: IMapOptions = null;
    protected default: IMapOptions =
      {
        direction: null,
        element: document.getElementById("gmap_canvas"),
        location: new google.maps.LatLng(0, 0),
        map: {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        },
        marker: null,
        title: "<strong>Name</strong><br/>Street No. 123",
        titleShow: true,
      };

    protected map: google.maps.Map = null;
    protected info: google.maps.InfoWindow = null;
    protected location: google.maps.Marker = null;

    /**
     * Load configuartions
     * @constructor
     * @param {IMapOptions} opt - Configuartions
     */
    public constructor(opt: IMapOptions) {
      // Set defaults
      if (typeof jQuery !== "undefined") {
        this.options = $.extend(true, {}, this.default, opt);
      }

      this.options.map["center"] = this.options.location;
    }

    /**
     * Add a marker to the map. This is invoked by the "draw()" methode if the marker configuartion is set.
     * @param {IMarkerOptions} options - Configuartions
     * @return {void}
     */
    public addMarker(options: IMarkerOptions): void {
      if (options == null || options.position == null) {
        return;
      }
      options.map = this.map;

      // SVG
      if (options.icon !== null) {
        const a = new google.maps.Marker(options);
      }

      // HTML
      if (options.html !== null && typeof options.html === "string" && typeof sico.maps.overlay.Html.version !== "undefined") {
        const b = new sico.maps.overlay.Html(options);
      }

      const c = new google.maps.Marker(options);
    }

    /**
     * Add a direction service to the map. This is invoked by the "draw()" methode if the directions configuartion is set.
     * @param {google.maps.DirectionsRequest} options - Configuartions
     * @return {void}
     */
    public addDirection(options: google.maps.DirectionsRequest): void {
      if (options == null) {
        return;
      }
      // init directions service
      const dirService = new google.maps.DirectionsService();
      const dirRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      dirRenderer.setMap(this.map);

      // Check for destination
      if (options.destination == null) {
        options.destination = this.options.location;
      }

      dirService.route(options, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          dirRenderer.setDirections(result);
        }
      });
    }

    /**
     * Add a rectangle to the map. This is invoked by the "draw()" methode if the directions configuartion is set.
     * @param {google.maps.DirectionsRequest} options - Configuartions
     * @return {void}
     */
    public addRectangle(options: google.maps.RectangleOptions): void {
      if (options == null || options.bounds == null) {
        return;
      }
      options.map = this.map;

      const t = new google.maps.Rectangle(options);
    }

    /**
     * Add a polygon to the map. This is invoked by the "draw()" methode if the directions configuartion is set.
     * @param {google.maps.DirectionsRequest} options - Configuartions
     * @return {void}
     */
    public addPolygon(options: google.maps.PolygonOptions): void {
      if (options == null || options.paths == null) {
        return;
      }
      options.map = this.map;

      const t = new google.maps.Polygon(options);
    }

    /**
     * Render the map, apply marker and direction service, if set.
     * @return {void}
     */
    public draw(): void {
      // Init map
      this.map = new google.maps.Map(this.options.element, this.options.map);

      // Create info window
      this.info = new google.maps.InfoWindow({
        content: this.options.title,
      });

      // Create main Marker
      this.location = new google.maps.Marker({
        map: this.map,
        position: this.options.location,
      });

      // Add event
      const $this = this;
      google.maps.event.addListener(this.location, "click", () => {
        $this.info.open($this.map, $this.location);
      });

      if (this.options.titleShow) {
        this.info.open(this.map, this.location);
      }

      // Add Other marker
      if (this.options.marker != null && this.options.marker instanceof Array) {
        // tslint:disable-next-line:no-shadowed-variable
        for (let i = 0, len = this.options.marker.length; i < len; i++) {
          this.addMarker(this.options.marker[i]);
        }
      }

      // Add direction
      if (this.options.direction != null) {
        this.addDirection(this.options.direction);
      }

      // Add Rectangle
      if (this.options.rectangles != null && this.options.rectangles instanceof Array) {
        for (let i = 0, len = this.options.rectangles.length; i < len; i++) {
          this.addRectangle(this.options.rectangles[i]);
        }
      }

      // Add Polygon
      if (this.options.polygons != null && this.options.polygons instanceof Array) {
        for (let i = 0, len = this.options.polygons.length; i < len; i++) {
          this.addPolygon(this.options.polygons[i]);
        }
      }
    }
  }
}
