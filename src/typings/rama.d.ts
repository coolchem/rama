
import {VNode} from "../core/utils/dom";

export * from "../main";

declare namespace JSX {

    interface ElementClass {
        render?():VNode
    }
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}