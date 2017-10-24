Dropzone.js
--
<!-- TOC -->

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

<!-- /TOC -->

Please have look at the [Dropzone.js](http://www.dropzonejs.com/) official project website.

Tweaks and improvements:

* Better Bootstrap 4 integration (theming)

## Installation

You may load this files
```html
<!-- Dropzone.js Styles-->
<link rel="stylesheet" type="text/css" href="src/dropzone/dropzone.css" />

<!-- Dropzone.js -->
<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="node_modules/dropzone/dist/min/dropzone.min.js"></script>

<!-- Dropzone.js Helper -->
<script type="text/javascript" src="src/dropzone/sico.dropzone.js"></script>
```

## Usage

For a sample HTML markup please have look at the samples page source.

```javascript
// Load preset
sico.DropzoneHelper.$image((respond: sico.TransactionModel) => {
    vue_images.vue.$data.Data.Images.push(respond.Data);
});

// above call will turn in:

// Dropzone Global Configuartion
Dropzone.options.dropzoneImage = {
    paramName: "value",
    maxFilesize: 3,
    //uploadMultiple: null,
    previewTemplate: sico.DropzoneHelper.TEMPLATE,
    thumbnailHeight: null,
    thumbnailWidth: null,
    headers: {
        "type": "100"
    },

    init: function () {
        this.on("success", function (file, respond) {
            sico.Transaction.$noify(respond);

            if (respond.Code === 1) {
                $(".dz-preview.dz-success").remove();
                $("#dropzoneImageEdit").addClass("hidden");
                modelUpdate(respond);
            }
        });
    }
};

```

## API

We also have added some static methods for common tasks and UI controls.

```javascript

// Load preset and set callback
sico.DropzoneHelper.$image((respond: sico.TransactionModel) => {
    vue_images.vue.$data.Data.Images.push(respond.Data);
});

```

| Method | Return | Description |
|-|-|-|
|$image(callback: (data: any) => void))| void | This will load a preset as shown and set a callback function. |
|$uploadShow(el: string \| HTMLElement)| void | Show upload form |
|$deleteOverlayShow(id: number)| void | Show delete overlay for given id, which will turn in ```#image_id``` |
|$deleteOverlayHide(id: number) | void | Hide delete overlay |
|$modalShow(id: number) | void | Show modal with selected image in full screen |
