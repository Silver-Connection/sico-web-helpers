// Draw gauge
// tslint:disable-next-line:no-console
// console.log(document.getElementById("gauge-1"));

// let gauge1 = new sico.draw.Gauge(document.getElementById("gauge1"), {
//     data: null,
//     deg: 180,
// });

$(document).ready(() => {
    const el = $("#gauge1");
    // document.getElementById("gauge1")
    const gauge1 = new sico.draw.Gauge(el, {
        backgroundShow: true,
        canvasHeight: 400,
        canvasWidth: 400,
        data: [
            {
                size: 40,
                value: 50,
            },
            // {
            //     color: "red",
            //     label: (val) =>  "Avg. " + val + "%",
            //     labelStyle: "normal normal normal",
            //     size: 40,
            //     value: 80,
            // },
            // {
            //     color: "green",
            //     size: 30,
            //     value: 60,
            // },
        ],
        deg: 360,
        offset: 180,
    });

    const gauge2 = new sico.draw.Gauge(document.getElementById("gauge2"), {
        backgroundShow: true,
        canvasHeight: 400,
        canvasWidth: 400,
        data: [
            {
                label: (val) =>  "Fact. " + val + "%",
                size: 20,
                value: 50,
            },
            {
                color: "red",
                label: (val) =>  "Avg. " + val + "%",
                labelStyle: "normal normal normal",
                size: 20,
                value: 80,
            },
            {
                color: "green",
                label: (val) =>  "Proj. " + val + "%",
                size: 20,
                value: 60,
            },
        ],
        deg: 270,
        lineCap: "round",
        offset: 0,
    });

    const gauge3 = new sico.draw.Gauge(document.getElementById("gauge3"), {
        backgroundShow: true,
        canvasHeight: 200,
        canvasWidth: 400,
        centerY: "bottom",
        data: [
            {
                size: 20,
                value: 50,
            },
            {
                color: "red",
                label: (val) =>  "Avg. " + val + "%",
                labelSize: 15,
                labelStyle: "normal normal normal",
                size: 40,
                value: 80,
            },
        ],
        deg: 180,
    });

    const gauge4 = new sico.draw.Gauge(document.getElementById("gauge4"), {
        backgroundShow: true,
        canvasHeight: 80,
        canvasWidth: 40,
        centerX: "left",
        data: [
            {
                labelSize: 15,
                size: 10,
                value: 50,
            },
        ],
        deg: 180,
        offset: 270,
    });

    const gauge5 = new sico.draw.Gauge(document.getElementById("gauge5"), {
        backgroundShow: false,
        canvasHeight: 400,
        canvasWidth: 200,
        centerX: "right",
        data: [
            {
                label: (val) =>  "Fact. " + val + "%",
                size: 20,
                value: 50,
            },
            {
                color: "red",
                label: (val) =>  "Avg. " + val + "%",
                labelStyle: "normal normal normal",
                size: 20,
                value: 80,
            },
            {
                color: "green",
                label: (val) =>  "Proj. " + val + "%",
                size: 20,
                value: 60,
            },
            {
                color: "#FAE82B",
                label: (val) =>  "A. " + val + "%",
                size: 20,
                value: 40,
            },
            {
                color: "#A01C4D",
                label: (val) =>  "A. " + val + "%",
                size: 20,
                value: 20,
            },
        ],
        deg: 180,
        offset: 90,
    });

    const gauge6 = new sico.draw.Gauge(document.getElementById("gauge6"), {
        backgroundShow: true,
        canvasHeight: 200,
        canvasWidth: 400,
        centerY: "top",
        data: [
            {
                size: 20,
                value: 50,
            },
            {
                color: "red",
                label: (val) =>  "Avg. " + val + "%",
                labelSize: 15,
                labelStyle: "normal normal normal",
                size: 40,
                value: 80,
            },
            // {
            //     color: "green",
            //     size: 30,
            //     value: 60,
            // },
        ],
        deg: 180,
        offset: 0,
    });
});
