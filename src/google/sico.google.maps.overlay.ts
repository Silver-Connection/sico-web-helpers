"use strict";
namespace sico.maps.overlay {
  export class Html extends google.maps.OverlayView {
    public static version = "1.0";
    protected options: sico.maps.IMarkerOptions = null;
    protected div: HTMLElement = null;
    protected listeners: google.maps.MapsEventListener[];

    /**
     * Load configuartions
     * @constructor
     * @param {sico.maps.IMarkerOptions} opt - Configuartions
     */
    public constructor(opt: sico.maps.IMarkerOptions) {
      super();
      this.options = opt;

      this.setMap(this.options.map);
    }

    /**
     * Add html overlays
     * @return {void}
     */
    public draw() {
      let point: google.maps.Point = null;
      if (this.options.position instanceof google.maps.LatLng) {
        point = this.getProjection().fromLatLngToDivPixel(this.options.position);
      }

      // TODO: Fix compiler error
      // if (typeof this.options.position == "google.maps.LatLngLiteral") {
      if (typeof this.options.position) {
        if (typeof this.options.position.lat === "number" && typeof this.options.position.lng === "number") {
          point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.options.position.lat, this.options.position.lng));
        }
        if (typeof this.options.position.lat === "function" && typeof this.options.position.lng === "function") {
          point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.options.position.lat(), this.options.position.lng()));
        }
      }

      if (point) {
        this.div.style.left = (point.x - (this.div.offsetWidth / 2)) + "px";
        this.div.style.top = (point.y - this.div.offsetHeight) + "px";
      }
    }

    public onAdd() {
      if (this.div == null) {
        // Create div
        this.div = document.createElement("div");
        this.div.className = "map-icon-label";
        this.div.style.zIndex = this.get("zIndex"); // Allow label to overlay marker
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.innerHTML = this.options.html;

        // Add to DOM
        this.getPanes().overlayImage.appendChild(this.div);

        // Listener
        const self = this;
        this.listeners = [
          google.maps.event.addListener(this, "position_changed", () => { self.draw(); }),
          google.maps.event.addListener(this, "text_changed", () => { self.draw(); }),
          google.maps.event.addListener(this, "zindex_changed", () => { self.draw(); }),
          google.maps.event.addDomListener(this.div, "click", (event) => {
            google.maps.event.trigger(self, "click");
          }),
        ];
      }
    }

    public onRemove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        for (let i = 0, I = this.listeners.length; i < I; ++i) {
          google.maps.event.removeListener(this.listeners[i]);
        }

        this.div = null;
      }
    }
  }
}
