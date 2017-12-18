"use strict";
var sico;
(function (sico) {
    var DropzoneHelper = (function () {
        function DropzoneHelper() {
        }
        DropzoneHelper.$image = function (modelUpdate, hideForm) {
            if (hideForm === void 0) { hideForm = true; }
            Dropzone.options.dropzoneImageEdit = {
                paramName: "model.File",
                maxFilesize: 3,
                uploadMultiple: false,
                acceptedFiles: "image/*",
                parallelUploads: 1,
                previewTemplate: sico.DropzoneHelper.TEMPLATE,
                thumbnailHeight: null,
                thumbnailWidth: null,
                method: "POST",
                init: function () {
                    this.on("success", function (file, respond) {
                        sico.Transaction.$noify(respond);
                        if (respond.Code === 1) {
                            $(".dz-preview.dz-success").remove();
                            if (hideForm) {
                                $("#dropzoneImageEdit").addClass("hidden");
                            }
                            modelUpdate(respond);
                        }
                    });
                },
            };
        };
        DropzoneHelper.$file = function (modelUpdate, hideForm) {
            if (hideForm === void 0) { hideForm = true; }
            Dropzone.options.dropzoneImageEdit = {
                paramName: "model.File",
                maxFilesize: 10,
                uploadMultiple: false,
                parallelUploads: 1,
                previewTemplate: sico.DropzoneHelper.TEMPLATE,
                thumbnailHeight: null,
                thumbnailWidth: null,
                method: "POST",
                init: function () {
                    this.on("success", function (file, respond) {
                        sico.Transaction.$noify(respond);
                        if (respond.Code === 1) {
                            $(".dz-preview.dz-success").remove();
                            if (hideForm) {
                                $("#dropzoneFileEdit").addClass("hidden");
                            }
                            modelUpdate(respond);
                        }
                    });
                },
            };
        };
        DropzoneHelper.$uploadShow = function (el) {
            $(el).removeClass("d-none").addClass("show");
        };
        DropzoneHelper.$deleteOverlayShow = function (id) {
            $("#image_" + id).addClass("overlay-flex");
        };
        DropzoneHelper.$deleteOverlayHide = function (id) {
            $("#image_" + id).removeClass("overlay-flex");
        };
        DropzoneHelper.$modalShow = function (url, title) {
            if (title === void 0) { title = "Image"; }
            if ($("#modal-image-fullsize").length === 0) {
                $("body").append(DropzoneHelper.MODAL);
            }
            var img = "<img src=\"" + url + "\" src=\"" + title + "\" />";
            $("#modal-image-fullsize .modal-body").html(img);
            $("#modal-image-fullsize .modal-title").text(title);
            $("#modal-image-fullsize").modal("show");
        };
        DropzoneHelper.TEMPLATE = "\n<div class=\"dz-preview dz-file-preview\">\n    <div class=\"dz-image\">\n        <img data-dz-thumbnail />\n    </div>\n    <div class=\"dz-bg\">\n        <div class=\"dz-details\">\n            <div class=\"dz-filename\">\n                <small class=\"d-block\">Filename</small>\n                <span data-dz-name></span>\n            </div>\n            <div class=\"dz-size\">\n                <small class=\"label-block\">Size</small>\n                <span data-dz-size></span>\n            </div>\n        </div>\n        <div class=\"progress dz-progress\">\n            <div class=\"dz-upload progress-bar progress-bar-striped bg-success\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\" data-dz-uploadprogress></div>\n        </div>\n        <div class=\"dz-error-message\">\n            <span data-dz-errormessage></span>\n        </div>\n        <div class=\"dz-controle\">\n            <div class=\"dz-success-mark\">\n                <!-- <i class=\"fa fa-check-circle-o\"></i> -->\n            </div>\n            <div class=\"dz-error-mark\">\n                <!-- <i class=\"fa fa-times-circle-o\"></i> -->\n            </div>\n        </div>\n    </div>\n</div>\n";
        DropzoneHelper.MODAL = "\n<div id=\"modal-image-fullsize\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"image-fullsize\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\"></h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n                <img src=\"#\" alt=\"\" />\n            </div>\n        </div>\n    </div>\n</div>\n    ";
        return DropzoneHelper;
    }());
    sico.DropzoneHelper = DropzoneHelper;
})(sico || (sico = {}));
//# sourceMappingURL=sico.dropzone.js.map