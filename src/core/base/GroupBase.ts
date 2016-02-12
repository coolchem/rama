
import {UIElement} from "./UIElement";
import {VNode} from "../utils/dom";
import {createElement} from "../utils/dom";

export abstract class GroupBase extends UIElement
{

    protected refs:any;

    private _htmlContent:VNode[];

    createdCallback():void {
        super.createdCallback();
        this.refs = {};
    }

    setHTMLContent(vnodes:VNode[]):void
    {
        this._htmlContent = vnodes;

        if (this.initialized) {
            this.removeAllChildren();
            this.createChildren();
        }
    }


    protected createChildren():void {

        if(this._htmlContent)
        {
            for(var i=0; i<this._htmlContent.length; i++)
            {
                var vnode:VNode = this._htmlContent[i];
                var el:Element = createElement(vnode,this.refs) as Element;
                this.appendChild(el);
            }
        }
    }
}