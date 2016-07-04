
import {UIElement} from "./core/UIElement";
export function skinPart(required:boolean = false):PropertyDecorator{

    return function (target: any, key: string):void {
        if(!target.skinParts)
            target.skinParts = {};

        target.skinParts[key] = {required:true};
    }
}

export function event(name:string):Function
{
    return function (target: UIElement):void {
        if(!target.eventHandlers)
            target.eventHandlers = {};

        target.eventHandlers[name] = [];
    }
}