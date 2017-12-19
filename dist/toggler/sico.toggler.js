/**
 * @summary     Toggler
 * @description bootstrap 4 style plug in for toggling css to elements
 * @version     1.2.0
 * @file        sico.toggler.js
 * @dependencie Bootstrap4, jQuery
 * @author      Silver Connection OHG
 * @contact     Kiarash G. <kiarash@si-co.net>
 * @copyright   Copyright 2017 Silver Connection OHG
 *
 * This source file is free software, available under the following license:
 *   MIT license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: https://github.com/Silver-Connection/dataTables.bootstrap
 */
"use strict";
var sico;
(function (sico) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = "toggler";
    var VERSION = "1.1.0";
    var DATA_KEY = "sc.toggler";
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = ".data-api";
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var Event = {
        ONPRE: "on-pre" + EVENT_KEY,
        ON: "on" + EVENT_KEY,
        OFFPRE: "off-pre" + EVENT_KEY,
        OFF: "off" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    };
    var ClassName = {
        ON: "toggle-on",
        OFF: "toggle-off",
        FADE: "fade",
        SHOW: "show",
    };
    var Selector = {
        DATA_TOGGLE: '[data-toggle="toggler"]',
    };
    var Toggler = /** @class */ (function () {
        function Toggler(element) {
            if (typeof (element) === "string") {
                this._element = $(element);
            }
            else {
                this._element = element;
            }
        }
        Toggler.switcher = function (selector, on, off) {
            var toggler = new Toggler("");
            toggler.on = on;
            toggler.off = off;
            toggler._change(selector);
        };
        Toggler.jQueryInterface = function (config) {
            var _this = this;
            return $.each(this, function () {
                var $this = $(_this);
                var data = $this.data(DATA_KEY);
                if (!data) {
                    data = new Toggler(_this);
                    $this.data(DATA_KEY, data);
                }
                if (typeof config === "string") {
                    if (data[config] === undefined) {
                        throw new Error("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        Object.defineProperty(Toggler, "VERSION", {
            // getters
            get: function () {
                return VERSION;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toggler.prototype, "on", {
            get: function () {
                return this._on;
            },
            set: function (model) {
                this._on = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toggler.prototype, "off", {
            get: function () {
                return this._off;
            },
            set: function (model) {
                this._off = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toggler.prototype, "toggleOn", {
            get: function () {
                return this._toggleOn;
            },
            set: function (model) {
                this._toggleOn = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toggler.prototype, "toggleOff", {
            get: function () {
                return this._toggleOff;
            },
            set: function (model) {
                this._toggleOff = model;
            },
            enumerable: true,
            configurable: true
        });
        Toggler.prototype.switch = function () {
            this._on = this.getOnFromElement(this._element);
            this._off = this.getOffFromElement(this._element);
            this._toggleOn = this.getToggleOnFromElement(this._element);
            this._toggleOff = this.getToggleOffFromElement(this._element);
            var selector = this.getSelectorFromElement(this._element);
            this._change(selector);
        };
        Toggler.prototype.dispose = function () {
            $(this._element).removeClass(DATA_KEY);
            this._element = null;
        };
        Toggler.prototype.getSelectorFromElement = function (element) {
            var selector = element.getAttribute("data-target");
            if (!selector) {
                selector = element.getAttribute("href") || "";
                // selector = /^#[a-z]/i.test(selector) ? selector : null
            }
            return selector;
        };
        Toggler.prototype.getOnFromElement = function (element) {
            return element.getAttribute("data-on");
        };
        Toggler.prototype.getOffFromElement = function (element) {
            return element.getAttribute("data-off");
        };
        Toggler.prototype.getToggleOnFromElement = function (element) {
            return element.getAttribute("data-toggle-on");
        };
        Toggler.prototype.getToggleOffFromElement = function (element) {
            return element.getAttribute("data-toggle-off");
        };
        Toggler.prototype._change = function (selector) {
            // Check if select matched any node
            var listElement = $(selector);
            if (listElement.length <= 0) {
                return;
            }
            // Switch state of toggle
            var state = this._switchItem(this._element, false, true);
            // Get last elemnts
            var previous = $.makeArray($(listElement).find("." + ClassName.ON));
            if (previous.length > 0) {
                this._switchArray(previous);
            }
            // Do work
            this._switchArray($.makeArray(listElement));
        };
        Toggler.prototype._switchItem = function (element, isEvent, isToggle) {
            if (isEvent === void 0) { isEvent = true; }
            if (isToggle === void 0) { isToggle = false; }
            var target = this._element != null && this._element.length > 0 ? this._element : element;
            var node = $(element);
            var cssOn = isToggle ? this._toggleOn : this._on;
            var cssOff = isToggle ? this._toggleOff : this._off;
            var isOn = node.hasClass(ClassName.ON) || node.hasClass(cssOn);
            var isOff = node.hasClass(ClassName.OFF) || node.hasClass(cssOff);
            var doOn = (!isOn && !isOff) || isOff;
            if (isEvent) {
                var preEvent = $.Event(doOn ? Event.ONPRE : Event.OFFPRE, {
                    relatedTarget: element,
                });
                $(target).trigger(preEvent);
                if (preEvent.isDefaultPrevented()) {
                    return;
                }
            }
            if (doOn) {
                node
                    .removeClass(ClassName.OFF)
                    .removeClass(cssOff)
                    .addClass(ClassName.ON)
                    .addClass(cssOn);
            }
            else {
                node
                    .removeClass(ClassName.ON)
                    .removeClass(cssOn)
                    .addClass(ClassName.OFF)
                    .addClass(cssOff);
            }
            if (isEvent) {
                var postEvent = $.Event(doOn ? Event.ON : Event.OFF, {
                    relatedTarget: element,
                });
                $(target).trigger(postEvent);
            }
            return doOn;
        };
        Toggler.prototype._switchArray = function (elements) {
            var _this = this;
            // Loop over all nodes
            elements.forEach(function (element) {
                _this._switchItem(element, true);
            });
        };
        return Toggler;
    }());
    sico.Toggler = Toggler;
    /**
     * JQuery
     */
    var TogglerJquery = (function ($) {
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */
        $(document)
            .on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            event.preventDefault();
            Toggler.jQueryInterface.call($(this), "switch");
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */
        $.fn[NAME] = Toggler.jQueryInterface;
        $.fn[NAME].Constructor = TogglerJquery;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Toggler.jQueryInterface;
        };
    })(jQuery);
})(sico || (sico = {}));
//# sourceMappingURL=sico.toggler.js.map