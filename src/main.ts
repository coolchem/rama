
import {createVNode as createElementFunction} from "./core/utils/dom";
import {VNode} from "./core/utils/dom";

export declare namespace JSX {

    interface ElementClass {
        render?():VNode
    }
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

export * from "./core/utils/dom"
export * from "./core/UIElement"

export var rama:{createElement:Function} = {createElement:createElementFunction};
export * from "./decorators"

export * from "./View"
export * from "./Skin"
export * from "./Group"
export * from "./Component"
export * from "./Container"
