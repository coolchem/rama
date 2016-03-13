
import {createVNode as createElementFunction} from "./core/utils/dom";


export var rama:{createElement:Function} = {createElement:createElementFunction};

export * from "./core/utils/dom"
export * from "./core/UIElement"

export * from "./decorators"

export * from "./View"
export * from "./Skin"
export * from "./Group"
export * from "./Component"
export * from "./Container"