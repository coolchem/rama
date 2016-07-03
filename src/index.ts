
import {createVNode as createElementFunction} from "./core/utils/dom";
import {UIElement} from "./core/UIElement";


export var rama:{createElement:Function} = {createElement:createElementFunction};

export var render = function (elementClass:new()=>any, node:HTMLElement) {

    node.innerHTML = "";
    var element:UIElement =  new elementClass() as UIElement;
    element.initialize();
    node.appendChild(element.getElementRef())
};

export * from "./core/utils/dom"
export * from "./core/UIElement"

export * from "./decorators"

export * from "./View"
export * from "./Skin"
export * from "./Group"
export * from "./Component"
export * from "./Container"
