/**
 * @summary     Dropzone Helper
 * @description Wrapper with some common tools
 * @version     1.1
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
 * For details please refer to: https://github.com/Silver-Connection/dataTables.bootstrap
 */

"use strict";
declare var Dropzone: any;
namespace sico {
    export class DropzoneHelper {
        public static TEMPLATE = `
<div class="dz-preview dz-file-preview">
    <div class="dz-image">
        <img data-dz-thumbnail />
    </div>
    <div class="dz-bg">
        <div class="dz-details">
            <div class="dz-filename">
                <small class="d-block">Filename</small>
                <span data-dz-name></span>
            </div>
            <div class="dz-size">
                <small class="label-block">Size</small>
                <span data-dz-size></span>
            </div>
        </div>
        <div class="progress dz-progress">
            <div class="dz-upload progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
        </div>
        <div class="dz-error-message">
            <span data-dz-errormessage></span>
        </div>
        <div class="dz-controle">
            <div class="dz-success-mark">
                <!-- <i class="fa fa-check-circle-o"></i> -->
            </div>
            <div class="dz-error-mark">
                <!-- <i class="fa fa-times-circle-o"></i> -->
            </div>
        </div>
    </div>
</div>
`;

        public static MODAL = `
<div id="modal-image-fullsize" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="image-fullsize" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <img src="#" alt="" />
            </div>
        </div>
    </div>
</div>
    `;

        /**
         * Initialize image upload config
         */
        public static $image(modelUpdate: (data: any) => void, hideForm: boolean = true) {
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
                init() {
                    this.on("success", (file, respond) => {
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
        }

        /**
         * Show upload
         */
        public static $uploadShow(el: string | HTMLElement) {
            $(el).removeClass("d-none").addClass("show");
        }

        /**
         * Show delete overlay
         */
        public static $deleteOverlayShow(id: number) {
            $("#image_" + id).addClass("overlay-flex");
        }

        /**
         * Hide delete overlay
         */
        public static $deleteOverlayHide(id: number) {
            $("#image_" + id).removeClass("overlay-flex");
        }

        /**
         * Show fullsize image
         */
        public static $modalShow(url: string, title: string = "Image") {
            // Add modal
            if ($("#modal-image-fullsize").length === 0) {
                $("body").append(DropzoneHelper.MODAL);
            }

            const img = `<img src="${url}" src="${title}" />`;
            $("#modal-image-fullsize .modal-body").html(img);
            $("#modal-image-fullsize .modal-title").text(title);
            $("#modal-image-fullsize").modal("show");
        }
    }
}
