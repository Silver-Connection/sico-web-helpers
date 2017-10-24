interface Image {
    Created: string;
    CreatedBy: string;
    Id: number;
    Link: string;
    Name: string;
    Notes: string;
    TargetId: number;
    Type: string;
}

interface Images {
    Images: Image[];
}

$(document).ready(() => {
    const list: Image[] = [{
        Created: "2017-01-01",
        CreatedBy: "User-A",
        Id: 1,
        Link: "https://si-co.net/content/images/logo-top.png",
        Name: "logo-top.png",
        Notes: "Top Logo",
        TargetId: 8,
        Type: "Logo",
    }, {
        Created: "2017-02-01",
        CreatedBy: "User-B",
        Id: 3,
        Link: "http://www.dropzonejs.com/images/new-logo.svg",
        Name: "new-logo.svg",
        Notes: "Dropzone.js",
        TargetId: 1,
        Type: "Logo",
    }, {
        Created: "2017-02-01",
        CreatedBy: "User-B",
        Id: 2,
        Link: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15f39e9b84e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15f39e9b84e%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.84375%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
        Name: "empty.svg",
        Notes: "DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews. It’s lightweight, doesn’t depend on any other library (like jQuery) and is highly customizable.",
        TargetId: 8,
        Type: "Image",
    },
    ];

    const model: Images = { Images: list };
    const vueModel = new sico.Transaction(model);
    const vueImages = new sico.VueHelper({
        data: vueModel.$vue(),
        delete: "/api/image/",
        el: "#tab-dropzone",
        methods: {
            editLink: (id: string) => {
                return "#";
            },
        },
    });

    sico.DropzoneHelper.$image((respond: sico.TransactionModel) => {
        vueImages.vue.$data.Data.Images.push(respond.Data);
    });

    function imageDelete(id) {
        let index = 0;
        const match = vueImages.$find("Data.Images", (el, i) => {
            index = i;
            return el.Id === id;
        });
        vueImages.vue.$data.Data.Images.splice(index, 1);
    }

});
