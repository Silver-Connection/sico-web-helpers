Draw Gauge
--
<!-- TOC -->

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
    - [Main Options](#main-options)
    - [Data-series Options](#data-series-options)
- [API](#api)
    - [$draw()](#draw)

<!-- /TOC -->

## Installation

Currently we need jQuery before we can load this script.
```html
<!-- jQuery -->
<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>

<!-- Draw Gauge -->
<script type="text/javascript" src="src/draw/sico.draw.gauge.js"></script>
```

## Usage

This tool will create a canvas element and attach it in to the given Element. 

```javascript
// Simple gauge with one data value
const gauge1 = new sico.draw.Gauge(document.getElementById("gauge-1"), {
        backgroundShow: true,
        canvasHeight: 400,
        canvasWidth: 200,
        centerX: "left",
        data: [
            {
                size: 40,
                value: 50,
            },
        ],
        deg: 180,
        offset: 270,
    });
```

## Options

This tool is build using typescript so we have some Interfaces we can use for configure our gauge.

```javascript
// Main options
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
    labelInverse?: boolean;
    labelHtml?: boolean;
    labelHtmlUseCanvasSize?: boolean;
    labelCssBase?: string;
    offset?: number;
}

// Dataseries options
interface IGaugeData {
    value: number;
    label?: string | LabelFunction;
    labelCss?: string;
    labelColor?: string;
    labelFont?: string;
    labelSize?: number;
    labelShow?: boolean;
    labelStyle?: string;
    color?: string;
    size?: number;
}

// Label function
type LabelFunction = (val: number) => string;
```
 
### Main Options

| Parameter | Type | Default | Description |
|-|-|-|-|
|autoDraw| boolean | true | Block auto-draw in constructer |
|backgroundColor| string | "#E3DBCB" | Background color |
|backgroundShow| boolean | true | Draw background |
|canvasHeight| number | 300 | Total height in px |
|canvasWidth| number | 600 | Total width in px |
|centerX| string | "center" | Set the x-axis value for the center of the circles, possible options are: "left", "center", "right" |
|centerY| string | "center" | Set the y-axis value for the center of the circles, possible options are: "top", "center", "bottom" |
|data| IGaugeData[] | null | Data-series array |
|deg| number | 180 | Total degree for drawing the gauge, from 0 to 360 |
|offset| number | 180 | In canvas 0° is at 3 o`clock. If you need to rotate the whole gauge we can use this option. |
|lineCap| string | "butt" | We can set the line cap style, valid options: "butt", "round", "square" |
|labelInverse| boolean | false | You can inverse the order of the labels |
|labelHtml| boolean | false | Create HTML element for labels instead of drawing into image |
|labelHtmlUseCanvasSize| boolean | false | Set label wrapper size to canvas dimensions |
|labelCssBase| string | undefined | Base CSS class for label's span |


### Data-series Options

| Parameter | Type | Default | Description |
|-|-|-|-|
|color| string | "#0382A0" | Line color |
|label| string \| LabelFunction | undefined | Label text. We can also pass a function |
|labelCss| string | undefined | CSS Class for label span element, if ```labelHtml``` is set. |
|labelColor| string | "#727272" | Label color |
|labelFont| string | "sans-serif" | Label font |
|labelSize| number | 20 | Label size in px |
|labelShow| boolean | true | Draw label |
|labelStyle| string | "normal normal bold" | Label styling, see [Here](https://www.w3schools.com/tags/canvas_font.asp) |
|size| number | 10 | Line size |
|value| number | 0 | Value used for drawing the correct length of a line. Valid values are from 0 to 100 |

> If ```labelHtml``` is true only the ```labelCss``` options in the data-series is used. 
> All other ```label*``` options are discarded.

## API

### $draw()

If ```autodraw``` is ```false``` you need to call the ```$draw()``` method manual.

```javascript
const gauge = new sico.draw.Gauge(el,{...});
gauge.$draw();
```