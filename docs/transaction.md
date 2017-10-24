Transaction & Notification
--
<!-- TOC -->

- [Installation](#installation)
- [Interface](#interface)
- [Usage](#usage)
- [API](#api)

<!-- /TOC -->

Please have look at the [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/) official project website. 

The transaction helper is used for easy work with [Vue.js](https://vuejs.org/). It is based on a given interface for server responses.

## Installation

You may load this files
```html

<!-- Bootstrap-Notify -->
<script type="text/javascript" src="node_modules/popper.js/dist/umd/popper.min.js"></script>
<script type="text/javascript" src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="node_modules/bootstrap-notify/bootstrap-notify.min.js"></script>
<script type="text/javascript" src="node_modules/datatables.net-select/js/dataTables.select.min.js"></script>

<!-- Transaction -->
<script type="text/javascript" src="src/transaction/sico.transaction.js"></script>
```

## Interface

The Vue view model and the server response should match the ```TransactionModel``` interface.

```typescript
export interface TransactionModel {
    /**
     * Transaction action name
     * @default null
     * @type string
     */
    Action: string,

    /**
     * Transaction return code
     * @default null
     * @type string
     */
    Code: number,

    /**
     * Actual data
     * @default null
     * @type string
     */
    Data: any,

    /**
     * Transaction message
     * @default null
     * @type string
     */
    Message: string
}
```

## Usage

```javascript

//# Notifications
sico.Transaction.$notifyNow("Info", 0, "Some informations...");
sico.Transaction.$notifyNow("Success", 1, "All done!");
sico.Transaction.$notifyNow("Error", 2, "Ohn...we have erros");

//# Transaction Model

// ViewModel
var viewModel = { 
    Id: 1,
    Name: "Sample",
    Points: 100,
};

var transactionModel = new sico.Transaction(viewModel);
 
 // Vue
var vue_images = new sico.VueHelper({
    el: "#vue",
    data: transactionModel.$vue(),
    get: "/api/image/",
});

```

## API

**Static Methods**

| Method | Return | Description |
|-|-|-|
|$isTransaction(data: object)| boolean | Check if given object matchs TransactionModel interface |
|$noify(model: TransactionModel)| void | Generate notification based on TransactionModel |
|$notifyNow(action: string, code: number, message: string)| void | Generate notification. Code: 0 -> Info, 1 -> Success, 2 -> Error |

**Instance Methods**

| Method | Return | Description |
|-|-|-|
|$noify()| void | Generate notification based on Transaction class |
|$vue()| () => any | Wraps data in a function for use with Vue.js |
