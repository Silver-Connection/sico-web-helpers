/**
 * @summary     Draw Gauge
 * @description Creates Gauge chart
 * @version     1.1
 * @file        sico.draw.gauge.js
 * @dependencie jQuery
 * @author      Silver Connection OHG
 * @contact     Kiarash G. <kiarash@si-co.net>
 * @copyright   Copyright 2018 Silver Connection OHG
 *
 * This source file is free software, available under the following license:
 *   MIT license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: https://github.com/Silver-Connection/sico-web-helpers
 */
"use strict";
declare var G_vmlCanvasManager: any;

namespace sico.draw {
    export interface IGaugeConfig {
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
        offset?: number;
    }

    export interface IGaugeData {
        value: number;
        label?: string | LabelFunction;
        labelFont?: string;
        labelSize?: number;
        labelShow?: boolean;
        labelStyle?: string;
        color?: string;
        size?: number;
    }

    export type LabelFunction = (val: number) => string;

    export class Gauge {
        public static degToRands(value: number): number {
            return value * Math.PI / 180;
        }

        public static percentToRands(value: number, max: number): number {
            return value * max / 100 * Math.PI / 180;
        }

        public options: IGaugeConfig;
        public el: HTMLElement;
        public canvas: HTMLCanvasElement;
        public context: CanvasRenderingContext2D;

        protected default: IGaugeConfig =
            {
                autoDraw: true,
                backgroundColor: "#E3DBCB",
                backgroundShow: true,
                canvasHeight: 300,
                canvasWidth: 600,
                centerX: "center",
                centerY: "center",
                data: null,
                deg: 180,
                lineCap: "butt",
                offset: 180,
            };

        protected defaultData: IGaugeData =
            {
                color: "#0382A0",
                label: undefined,
                labelFont: "sans-serif",
                labelShow: true,
                labelSize: 20,
                labelStyle: "normal normal bold",
                size: 10,
                value: 0,
            };

        private centerXFactor: number = 0.5;
        private centerYFactor: number = 0.5;
        private gaugeSize: number = 0;
        private labelSize: number = 0;

        constructor(element: HTMLElement | JQuery<HTMLElement>, opt: IGaugeConfig) {
            // Wrapper
            if (element === null || element === undefined) {
                // tslint:disable-next-line:no-console
                console.log("Could not find wrapper element");
                return;
            }

            if (element instanceof jQuery) {
                this.el = element[0];
            }
            if (element instanceof HTMLElement) {
                this.el = element;
            }

            // Configs
            this.options = $.extend(true, this.default, opt);
            this.checkData();
            if (this.options.centerX === "left") {
                this.centerXFactor = 0;
            } else if (this.options.centerX === "right") {
                this.centerXFactor = 1;
            } else {
                this.centerXFactor = 0.5;
            }

            if (this.options.centerY === "top") {
                this.centerYFactor = 0;
            } else if (this.options.centerY === "bottom") {
                this.centerYFactor = 1;
            } else {
                this.centerYFactor = 0.5;
            }

            // Create and draw Canvas
            this.createCanvas();
            if (this.options.autoDraw) {
                this.$draw();
            }
        }

        public createCanvas() {
            this.canvas = document.createElement("canvas");
            this.el.appendChild(this.canvas);

            if (typeof (G_vmlCanvasManager) === "object") {
                G_vmlCanvasManager.initElement(this.canvas);
            }

            this.canvas.height = this.options.canvasHeight;
            this.canvas.width = this.options.canvasWidth;
            this.context = this.canvas.getContext("2d");

            let scaleBy = 1;
            if (window.devicePixelRatio > 1) {
                scaleBy = window.devicePixelRatio;
                this.canvas.width = this.canvas.width * scaleBy;
                this.canvas.height = this.canvas.height * scaleBy;
                this.context.scale(scaleBy, scaleBy);
            }

            // Clear
            // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        public $draw() {
            // Draw background
            if (this.options.backgroundShow) {
                this.drawBackground();
            }

            // Draw data lines
            if (this.options != null
                && this.options.data != null
                && this.options.data.length > 0) {
                let offsetLine = 0;
                let offsetText = 1;
                for (const data of this.options.data) {
                    this.drawGauge(data, offsetLine);
                    offsetLine += data.size;

                    if (data.labelShow) {
                        this.drawText(data, offsetText);
                        offsetText += data.labelSize + 10;
                    }
                }
            }
        }

        public drawBackground() {
            const rands = Gauge.degToRands(this.options.deg);
            this.drawLine(rands, this.gaugeSize, this.options.backgroundColor, 0);
        }

        public drawGauge(data: IGaugeData, offset: number = 0) {
            const rands = Gauge.percentToRands(data.value, this.options.deg);
            this.drawLine(rands, data.size, data.color, offset);
        }

        public drawLine(rands: number, size: number, color: string, offset: number = 0) {
            // Arc
            const center = this.getCenterPoint();
            let radius = (this.canvas.width / 2) - (size / 2) - offset;
            if (this.canvas.width < this.canvas.height) {
                radius = (this.canvas.height / 2) - (size / 2) - offset;
            }

            this.context.beginPath();
            this.context.arc(center.x, center.y, radius, Gauge.degToRands(this.options.offset), rands + Gauge.degToRands(this.options.offset), false);
            this.context.strokeStyle = color;
            this.context.lineWidth = size;
            this.context.lineCap = this.options.lineCap;
            this.context.stroke();
            this.context.closePath();
        }

        public drawText(data: IGaugeData, offset: number) {
            const center = this.getCenterPoint();
            const font = (data.labelStyle + " " + data.labelSize + "px " + data.labelFont).trim();

            let label = "";
            if (typeof data.label === "function") {
                label = data.label(data.value);
            } else {
                label = data.label;
            }

            this.context.textAlign = this.options.centerX;
            this.context.font = font;

            let y = center.y - offset;
            if (this.options.centerY === "center") {
                y = center.y - offset + this.labelSize / 2;
            } else if (this.options.centerY === "top") {
                y = offset + this.labelSize / 2;
            }

            this.context.fillText(label, center.x, y);
        }

        private getCenterPoint() {
            return {
                x: this.canvas.width * this.centerXFactor,
                y: this.canvas.height * this.centerYFactor,
            };
        }

        private checkData() {
            if (this.options != null && this.options.data != null && this.options.data.length > 0) {
                for (let i = 0; i < this.options.data.length; i++) {
                    this.options.data[i] = $.extend(true, {}, this.defaultData, this.options.data[i]);
                    if (this.options.data[i].label === undefined) {
                        this.options.data[i].label = this.options.data[i].value + "%";
                    }

                    // Total size
                    this.gaugeSize += this.options.data[i].size;
                    this.labelSize += this.options.data[i].labelSize;
                }
            }
        }
    }
}
