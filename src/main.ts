
import {createVNode as createElementFunction} from "./core/utils/dom";

import "./pollyfills";

export var rama:{createElement:Function} = {createElement:createElementFunction};
export * from "./decorators"

export * from "./View"
export * from "./Skin"
export * from "./Group"
export * from "./Component"
export * from "./Container"
