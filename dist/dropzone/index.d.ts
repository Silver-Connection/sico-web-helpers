declare var Dropzone: any;
declare namespace sico {
    class DropzoneHelper {
        static TEMPLATE: string;
        static MODAL: string;
        /**
         * Initialize image upload config
         */
        static $image(modelUpdate: (data: any) => void, hideForm?: boolean): void;
        /**
         * Initialize file (any) upload config
         */
        static $file(modelUpdate: (data: any) => void, hideForm?: boolean): void;
        /**
         * Show upload
         */
        static $uploadShow(el: string | HTMLElement): void;
        /**
         * Show delete overlay
         */
        static $deleteOverlayShow(id: number): void;
        /**
         * Hide delete overlay
         */
        static $deleteOverlayHide(id: number): void;
        /**
         * Show fullsize image
         */
        static $modalShow(url: string, title?: string): void;
    }
}
