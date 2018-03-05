/**
 * @summary     Dropzone Helper
 * @description Wrapper with some common tools
 * @version     1.3
 * @file        sico.dropzone.js
 * @dependencie dropzone.js, jQuery
 * @author      Silver Connection OHG
 * @contact     Kiarash G. <kiarash@si-co.net>
 * @copyright   Copyright 2017 Silver Connection OHG
 *
 * This source file is free software, available under the following license:
 *   MIT license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: https://github.com/Silver-Connection/sico-web-helpers
 */
"use strict";
var sico;
(function (sico) {
    var DropzoneHelper = /** @class */ (function () {
        function DropzoneHelper() {
        }
        /**
         * Initialize image upload config
         */
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
        /**
         * Initialize file (any) upload config
         */
        DropzoneHelper.$file = function (modelUpdate, hideForm) {
            if (hideForm === void 0) { hideForm = true; }
            Dropzone.options.dropzoneFileEdit = {
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
        /**
         * Show upload
         */
        DropzoneHelper.$uploadShow = function (el) {
            $(el).removeClass("d-none").removeClass("hidden").addClass("show");
        };
        /**
         * Show delete overlay
         */
        DropzoneHelper.$deleteOverlayShow = function (id) {
            $("#image_" + id).addClass("overlay-flex");
        };
        /**
         * Hide delete overlay
         */
        DropzoneHelper.$deleteOverlayHide = function (id) {
            $("#image_" + id).removeClass("overlay-flex");
        };
        /**
         * Show fullsize image
         */
        DropzoneHelper.$modalShow = function (url, title) {
            if (title === void 0) { title = "Image"; }
            // Add modal
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