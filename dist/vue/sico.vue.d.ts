/// <reference types="vuejs" />
declare const Vue: vuejs.Vue;
declare namespace sico {
    type FunctionCallback = (data?: any) => void;
    interface VueHelperOptions extends vuejs.ComponentOptions<vuejs.Vue> {
        path?: string;
        get?: string;
        post?: string;
        put?: string;
        delete?: string;
    }
    class VueHelper {
        options: VueHelperOptions;
        protected default: VueHelperOptions;
        private vuePrivate;
        vue: vuejs.Vue;
        private storePrivate;
        store: any;
        readonly element: String | Element | (() => HTMLElement);
        constructor(opt: VueHelperOptions);
        $get(action?: string, callback?: FunctionCallback, path?: string): void;
        $post(callback?: FunctionCallback, path?: string): void;
        $put(callback?: FunctionCallback, path?: string): void;
        $delete(callback?: FunctionCallback, path?: string): void;
        $revert(): void;
        $data(data: any, callback?: FunctionCallback, skipTransaction?: boolean): void;
        $find(path: string | any[], callback: (el: any, index?: number) => boolean): any;
        private _getData(path);
        private _getValue(path);
        private _ajax(settings, options, callback?);
    }
}
