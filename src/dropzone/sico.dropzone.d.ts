declare var Dropzone: any;
declare namespace sico {
    class DropzoneHelper {
        static TEMPLATE: string;
        static MODAL: string;
        static $image(modelUpdate: (data: any) => void, hideForm?: boolean): void;
        static $file(modelUpdate: (data: any) => void, hideForm?: boolean): void;
        static $uploadShow(el: string | HTMLElement): void;
        static $deleteOverlayShow(id: number): void;
        static $deleteOverlayHide(id: number): void;
        static $modalShow(url: string, title?: string): void;
    }
}
