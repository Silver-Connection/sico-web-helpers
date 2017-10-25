Dropzone.js
--
<!-- TOC -->

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
    - [$image](#image)
    - [$uploadShow](#uploadshow)
    - [$deleteOverlayShow](#deleteoverlayshow)
    - [$deleteOverlayHide](#deleteoverlayhide)
    - [$modalShow](#modalshow)
- [Styling](#styling)

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

// Dropzone Global Configuration
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

### $image

Load image preset configuration and set callback function for dropzone.js

```javascript
// Load preset and set callback
sico.DropzoneHelper.$image((respond: sico.TransactionModel) => {
    vue_images.vue.$data.Data.Images.push(respond.Data);
}, false);
```

**Parameter**

| Parameter | Type | Description |
|-|-|-|
|callback| function (data:any) => void | Sets callback functions for dropzone ```this.on("success", (file, respond) => void)```|
|hideForm (optional)| boolean (default: true) | Hide upload form after upload |

### $uploadShow

Show upload form

```javascript
sico.DropzoneHelper.$image("#id");
sico.DropzoneHelper.$image($("#id"));
```

**Parameter**

| Parameter | Type | Description |
|-|-|-|
|element| string \| HTMLElement | Upload form |

### $deleteOverlayShow

Show delete overlay

```javascript
sico.DropzoneHelper.$deleteOverlayShow(5);
```

**Parameter**

| Parameter | Type | Description |
|-|-|-|
|id| number | File Id, access element by ```#image_id``` |


### $deleteOverlayHide

Hide delete overlay

```javascript
sico.DropzoneHelper.$deleteOverlayHide(5);
```

**Parameter**

| Parameter | Type | Description |
|-|-|-|
|id| number | File Id, access element by ```#image_id``` |

### $modalShow

Open modal with image in full-screen

```javascript
sico.DropzoneHelper.$modalShow(5);
```

**Parameter**

| Parameter | Type | Description |
|-|-|-|
|id| number | File Id, access element by ```#image_id``` |


## Styling

You set some scss variables to customize the UI. Have look at ```_dropzone.scc``` file.