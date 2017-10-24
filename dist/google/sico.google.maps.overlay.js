"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sico;
(function (sico) {
    var maps;
    (function (maps) {
        var overlay;
        (function (overlay) {
            var Html = (function (_super) {
                __extends(Html, _super);
                function Html(opt) {
                    var _this = _super.call(this) || this;
                    _this.options = null;
                    _this.div = null;
                    _this.options = opt;
                    _this.setMap(_this.options.map);
                    return _this;
                }
                Html.prototype.draw = function () {
                    var point = null;
                    if (this.options.position instanceof google.maps.LatLng) {
                        point = this.getProjection().fromLatLngToDivPixel(this.options.position);
                    }
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
                };
                Html.prototype.onAdd = function () {
                    if (this.div == null) {
                        this.div = document.createElement("div");
                        this.div.className = "map-icon-label";
                        this.div.style.zIndex = this.get("zIndex");
                        this.div.style.position = "absolute";
                        this.div.style.display = "block";
                        this.div.innerHTML = this.options.html;
                        this.getPanes().overlayImage.appendChild(this.div);
                        var self_1 = this;
                        this.listeners = [
                            google.maps.event.addListener(this, "position_changed", function () { self_1.draw(); }),
                            google.maps.event.addListener(this, "text_changed", function () { self_1.draw(); }),
                            google.maps.event.addListener(this, "zindex_changed", function () { self_1.draw(); }),
                            google.maps.event.addDomListener(this.div, "click", function (event) {
                                google.maps.event.trigger(self_1, "click");
                            }),
                        ];
                    }
                };
                Html.prototype.onRemove = function () {
                    if (this.div) {
                        this.div.parentNode.removeChild(this.div);
                        for (var i = 0, I = this.listeners.length; i < I; ++i) {
                            google.maps.event.removeListener(this.listeners[i]);
                        }
                        this.div = null;
                    }
                };
                Html.version = "1.0";
                return Html;
            }(google.maps.OverlayView));
            overlay.Html = Html;
        })(overlay = maps.overlay || (maps.overlay = {}));
    })(maps = sico.maps || (sico.maps = {}));
})(sico || (sico = {}));
//# sourceMappingURL=sico.google.maps.overlay.js.map