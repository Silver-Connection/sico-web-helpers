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
        offset?: number;
    }
    interface IGaugeData {
        value: number;
        label?: string | LabelFunction;
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
        private getCenterPoint();
        private checkData();
    }
}
