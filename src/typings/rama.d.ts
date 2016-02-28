
import {VNode} from "../core/utils/dom";

declare namespace JSX {

    interface ElementClass {
        render?():VNode
    }
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}