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
namespace sico {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    const NAME = "toggler";
    const VERSION = "1.1.0";
    const DATA_KEY = "sc.toggler";
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = ".data-api";
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const TRANSITION_DURATION = 150;

    const Event = {
        ONPRE: `on-pre${EVENT_KEY}`,
        ON: `on${EVENT_KEY}`,
        OFFPRE: `off-pre${EVENT_KEY}`,
        OFF: `off${EVENT_KEY}`,
        CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
        ON: "toggle-on",
        OFF: "toggle-off",
        FADE: "fade",
        SHOW: "show",
    };

    const Selector = {
        DATA_TOGGLE: '[data-toggle="toggler"]',
    };

    export class Toggler {
        public static switcher(selector: string, on: string, off?: string) {
            const toggler = new Toggler("");
            toggler.on = on;
            toggler.off = off;
            toggler._change(selector);
        }

        public static jQueryInterface(config) {
            return $.each(this, () => {
                const $this = $(this);
                let data = $this.data(DATA_KEY);

                if (!data) {
                    data = new Toggler(this);
                    $this.data(DATA_KEY, data);
                }

                if (typeof config === "string") {
                    if (data[config] === undefined) {
                        throw new Error(`No method named "${config}"`);
                    }
                    data[config]();
                }
            });
        }

        // tslint:disable-next-line:variable-name
        private _element: JQuery;
        // tslint:disable-next-line:variable-name
        private _on: string;
        // tslint:disable-next-line:variable-name
        private _off: string;
        // tslint:disable-next-line:variable-name
        private _toggleOn: string;
        // tslint:disable-next-line:variable-name
        private _toggleOff: string;

        public constructor(element) {
            if (typeof (element) === "string") {
                this._element = $(element);
            } else {
                this._element = element;
            }
        }

        // getters
        static get VERSION() {
            return VERSION;
        }

        public get on(): string {
            return this._on;
        }
        public set on(model: string) {
            this._on = model;
        }

        public get off(): string {
            return this._off;
        }
        public set off(model: string) {
            this._off = model;
        }

        public get toggleOn(): string {
            return this._toggleOn;
        }
        public set toggleOn(model: string) {
            this._toggleOn = model;
        }

        public get toggleOff(): string {
            return this._toggleOff;
        }
        public set toggleOff(model: string) {
            this._toggleOff = model;
        }

        public switch() {
            this._on = this.getOnFromElement(this._element);
            this._off = this.getOffFromElement(this._element);
            this._toggleOn = this.getToggleOnFromElement(this._element);
            this._toggleOff = this.getToggleOffFromElement(this._element);
            const selector = this.getSelectorFromElement(this._element);
            this._change(selector);
        }

        public dispose() {
            $(this._element).removeClass(DATA_KEY);
            this._element = null;
        }

        public getSelectorFromElement(element): string {
            let selector: string = element.getAttribute("data-target");

            if (!selector) {
                selector = element.getAttribute("href") || "";
                // selector = /^#[a-z]/i.test(selector) ? selector : null
            }

            return selector;
        }

        public getOnFromElement(element): string {
            return element.getAttribute("data-on");
        }

        public getOffFromElement(element): string {
            return element.getAttribute("data-off");
        }

        public getToggleOnFromElement(element): string {
            return element.getAttribute("data-toggle-on");
        }

        public getToggleOffFromElement(element): string {
            return element.getAttribute("data-toggle-off");
        }

        private _change(selector: string) {
            // Check if select matched any node
            const listElement = $(selector);
            if (listElement.length <= 0) {
                return;
            }

            // Switch state of toggle
            const state = this._switchItem(this._element, false, true);

            // Get last elemnts
            const previous = $.makeArray($(listElement).find("." + ClassName.ON));
            if (previous.length > 0) {
                this._switchArray(previous);
            }

            // Do work
            this._switchArray($.makeArray(listElement));
        }

        private _switchItem(element: any, isEvent: boolean = true, isToggle: boolean = false): boolean {
            const target = this._element != null && this._element.length > 0 ? this._element : element;
            const node = $(element);
            const cssOn = isToggle ? this._toggleOn : this._on;
            const cssOff = isToggle ? this._toggleOff : this._off;
            const isOn = node.hasClass(ClassName.ON) || node.hasClass(cssOn);
            const isOff = node.hasClass(ClassName.OFF) || node.hasClass(cssOff);
            const doOn = (!isOn && !isOff) || isOff;

            if (isEvent) {
                const preEvent = $.Event(doOn ? Event.ONPRE : Event.OFFPRE, {
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
            } else {
                node
                    .removeClass(ClassName.ON)
                    .removeClass(cssOn)
                    .addClass(ClassName.OFF)
                    .addClass(cssOff);
            }

            if (isEvent) {
                const postEvent = $.Event(doOn ? Event.ON : Event.OFF, {
                    relatedTarget: element,
                });
                $(target).trigger(postEvent);
            }

            return doOn;
        }

        private _switchArray(elements: any[]) {
            // Loop over all nodes
            elements.forEach((element) => {
                this._switchItem(element, true);
            });
        }
    }

    /**
     * JQuery
     */
    const TogglerJquery = (($) => {
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */

        $(document)
            .on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
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
        $.fn[NAME].noConflict = () => {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Toggler.jQueryInterface;
        };
    })(jQuery);
}
