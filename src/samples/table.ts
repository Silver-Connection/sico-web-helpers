interface ISampleModel {
    Id: number;
    Line: number;
    Type: string;
    Database: string;
    User: string;
    Address: string;
    IsDeleted: boolean;
}

function createSampleData(rows): ISampleModel[] {
    const list: ISampleModel[] = [];
    for (let i = 0; i < rows; i++) {
        const model: ISampleModel = {
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

const dtConfig: DataTables.Settings = {
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
        createdCell(td, cellData, rowData, row, col) {
            $(td).html("");
        },
    }, {
        data: "Line",
    }, {
        data: "Type",
        createdCell(td, cellData, rowData, row, col) {
            let css = "badge-info";
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
        createdCell(td, cellData, rowData, row, col) {
            let btn = {
                click: "console.log('Edit " + row + "');",
                content: "Edit",
                css: "btn-warning edit",
            };

            let cell = '<div class="btn-group">' + createBtn(btn);
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

function testDataTableRaw(id: string) {
    const dt = $(id).DataTable(dtConfig);

    // Add data
    dt.clear().draw();
    dt.rows.add(createSampleData(120)).draw();
}

function testDataTableHelper(id: string) {
    const dthConfig: sico.ITableOptions = $.extend(true, dtConfig, { el: id });
    const dth = new sico.DataTablesHelper(dthConfig);

    // Add data
    dth.$data(createSampleData(120));
}
