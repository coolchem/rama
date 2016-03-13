
import {REvent} from "./event";
class HandlerObject{
    private _handler:Function;
    private _context:any;


    get handler():Function {
        return this._handler;
    }

    get context():any {
        return this._context;
    }

    constructor(handler:Function, context:any) {
        this._handler = handler;
        this._context = context;
    }
}

export class ModelEventDispatcher
{

    protected handlers:any = {};

    dispatchEvent(event:REvent):void {

        let handlers:Array<HandlerObject>;

        handlers = this.getHandlers(event.type);

        if(handlers)
        {
            for(var i=0; i< handlers.length; i++)
            {
                var handler:HandlerObject = handlers[i];

                handler.handler.call(handler.context,event);
            }

        }

    }

    addEventListener(eventName:string, callback:(p1:REvent)=>any, context?:any):void {

        this.toggleSubscription(eventName,callback,true,context);
    }

    removeEventListener(eventName:string, callback:(p1:REvent)=>any):void {

        this.toggleSubscription(eventName,callback,false);

    }


    removeAllEventListeners(eventName:string):void {

        this.handlers[eventName] = [];
    }

    private toggleSubscription(eventName:string,callback:(p1:REvent)=>any,subscribe:boolean,context?:any):void
    {
        let handlers:Array<HandlerObject> = this.getHandlers(eventName);

        for(var i= 0; i<handlers.length ; i++)
        {
            var handler:HandlerObject = handlers[i];

            if(handler.handler === callback)
            {
                if(subscribe === false)
                {
                    handlers.splice(handlers.indexOf(handler),1);
                }

                return;
            }
        }

        handlers.push(new HandlerObject(callback,context));
    }
    private getHandlers(eventName:string):Array<HandlerObject>
    {
        let handlers:Array<HandlerObject>;

        handlers = this.handlers[eventName];

        if(handlers === null || handlers === undefined)
            this.handlers[eventName] = handlers = [];

        return handlers;
    }


    hasEventListener(eventName:string):boolean
    {
        return this.handlers[eventName] !== undefined && this.handlers[eventName].length > 0;
    }
}
