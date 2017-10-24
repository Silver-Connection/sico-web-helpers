DataTables
--
<!-- TOC -->

- [Installation](#installation)
    - [```sico.datatables.b4.js```](#sicodatatablesb4js)
    - [```sico.datatables.js```](#sicodatatablesjs)
- [Usage](#usage)
- [Configuration](#configuration)
- [API](#api)

<!-- /TOC -->

Please have look at the [DataTables](https://datatables.net/) official project website. Currently we fully support this extensions, other may need some tweaking to fit to the Bootstrap 4 theme.

Tweaks and improvements:

* Full Bootstrap 4 integration (theming, pagination, buttons)
* Fixed Header works with tabs and fixed navigation bars
* Support for header templates in print view
* Add swap selected rows button
* Add support for small tables, just add `table-sm` in table`s class attribute

## Installation

You may load this files
```html
<!-- DataTables Styles -->
<link rel="stylesheet" type="text/css" href="src/datatables/datatables.css" />

<!-- DataTables -->
<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="node_modules/datatables.net/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="node_modules/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="node_modules/datatables.net-buttons/js/buttons.colVis.min.js"></script>
<script type="text/javascript" src="node_modules/datatables.net-buttons/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="node_modules/datatables.net-buttons/js/buttons.print.min.js"></script>
<script type="text/javascript" src="node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
<script type="text/javascript" src="node_modules/datatables.net-select/js/dataTables.select.min.js"></script>

<!-- DataTables Helper -->
<script type="text/javascript" src="src/datatables/sico.datatables.b4.js"></script>
<script type="text/javascript" src="src/datatables/sico.datatables.js"></script>
```

If you want to use a print template, add this to your page:
```html
<script id="datatables-print" type="text/template">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-title">
                Print Sample
                <span class="pull-right">
                    <img src="https://si-co.net/content/images/logo-top.png" alt="Logo">
                </span>
            </h1>
        </div>
    </div>
</script>
```

### ```sico.datatables.b4.js```

Changes datatable theme to fit Bootstrap 4. This includes settings for pagination, filter and buttons. Please also include the stylings in your page.

### ```sico.datatables.js```

This is helper wrapper for DataTables which fixes some problems and also adds some improvements for easier usage. 

## Usage

```javascript
// Configuartion
var dt_config = {
    // New Property
    el: "#myTable",
    title: "Print Title",
    templatePrint: "#templatePrint";
    // Normal DataTables Settings
    columns: []
    order: [
        [1, "asc"]
    ],
    paging: true,
    buttons: [
        "copy",
        "csv",
        "print",
        "selectInverse",
        "colvis"
    ],
    fixedHeader: true,
    select: true,
};

// Create table
var dt = new sico.DataTablesHelper(dt_config);

```

## Configuration

The wrapper and datatables use the same configuration object. We have just extended it with the following top level options.

| Option | Type | Description |
|-|-|-|
|el| string, HTMLElement | Table Node |
|title?| string | Title used for print view |
|templatePrint?| string, HTMLElement | A template used for the header in print view. |

## API

We also have added some api shortcuts which you can use. You can access them like this:

```javascript
var dt = new sico.DataTablesHelper(dt_config);

// Use datatables API
dt.table.clear();

// Use helpers API
var data = [
    {a = 1, b = "One"},
    {a = 2, b = "Two"} 
    ];
dt.$data(data);

```

| Method | Return | Description |
|-|-|-|
|$data(data: array)| void | Set table data |
|$rowNode(index: number)| HTML element | Get row HTML element |
|$rowData(index: number)| any | Get row data |
|$rowToggleClass(element: string \| HTMLElement, css: string) | boolean | Toggle CSS. Return ```true``` if class is set |
|$fixedHeader(boolean \| DataTables.FixedHeaderSettings)| void | Short for: $.fn.dataTable.FixedHeader(this.table, settings) |
