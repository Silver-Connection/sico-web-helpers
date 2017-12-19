declare namespace sico {
    class Toggler {
        static switcher(selector: string, on: string, off?: string): void;
        static jQueryInterface(config: any): typeof Toggler;
        private _element;
        private _on;
        private _off;
        private _toggleOn;
        private _toggleOff;
        constructor(element: any);
        static readonly VERSION: string;
        on: string;
        off: string;
        toggleOn: string;
        toggleOff: string;
        switch(): void;
        dispose(): void;
        getSelectorFromElement(element: any): string;
        getOnFromElement(element: any): string;
        getOffFromElement(element: any): string;
        getToggleOnFromElement(element: any): string;
        getToggleOffFromElement(element: any): string;
        private _change(selector);
        private _switchItem(element, isEvent?, isToggle?);
        private _switchArray(elements);
    }
}
