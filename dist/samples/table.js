function createSampleData(rows) {
    var list = [];
    for (var i = 0; i < rows; i++) {
        var model = {
            Address: "10.10.10." + i + "/32",
            Database: Math.random().toString(36).substring(7),
            Id: i + 69,
            IsDeleted: false,
            Line: i,
            Type: Math.random() >= 0.5 ? "host" : "local",
            User: Math.random().toString(36).substring(7),
        };
        list.push(model);
    }
    return list;
}
function createBtn(config) {
    return '<button type="button" class="btn ' + config.css + '" onclick="' + config.click + '">' + config.content + "</button>";
}
var dtConfig = {
    autoWidth: true,
    buttons: [
        "copy",
        "csv",
        "print",
        "selectInverse",
        "colvis",
    ],
    columns: [{
            className: "select-checkbox",
            data: "Type",
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).html("");
            },
        }, {
            data: "Line",
        }, {
            data: "Type",
            createdCell: function (td, cellData, rowData, row, col) {
                var css = "badge-info";
                if (cellData === "host") {
                    css = "badge-warning";
                }
                $(td).html('<span class="badge ' + css + '">' + cellData + "</span>");
            },
        }, {
            data: "Database",
        }, {
            data: "User",
        }, {
            data: "Address",
        }, {
            data: "Type",
            createdCell: function (td, cellData, rowData, row, col) {
                var btn = {
                    click: "console.log('Edit " + row + "');",
                    content: "Edit",
                    css: "btn-warning edit",
                };
                var cell = '<div class="btn-group">' + createBtn(btn);
                btn = {
                    click: "rowDelete(" + row + ");",
                    content: "Delete",
                    css: "btn-danger delete",
                };
                cell += createBtn(btn) + "</div>";
                $(td).html(cell);
            },
        }],
    fixedHeader: true,
    order: [
        [1, "asc"],
    ],
    paging: true,
    select: true,
};
function testDataTableRaw(id) {
    var dt = $(id).DataTable(dtConfig);
    // Add data
    dt.clear().draw();
    dt.rows.add(createSampleData(120)).draw();
}
function testDataTableHelper(id) {
    var dthConfig = $.extend(true, dtConfig, { el: id });
    var dth = new sico.DataTablesHelper(dthConfig);
    // Add data
    dth.$data(createSampleData(120));
}
//# sourceMappingURL=table.js.map