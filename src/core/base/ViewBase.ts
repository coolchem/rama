
import parseHTML from "../utils/html-parser";
import {createElement} from "../utils/dom";
import {createVNode} from "../utils/dom";

var webComponents = require("document-register-element");

export const ViewBaseErrors = {
    ERROR_INVALID_RENDER_STRING:
        `Error: 'render' function returned invalid string,'render' function must not return empty string, null or undefined value

         Please make sure your view has implemented the 'render' function properly. `,

    ERROR_MULTIPLE_NODES_FOUND:
        `Error: Multiple nodes found during rendering,'render' function must return string with one root node.

         Please make sure your view has implemented the 'render' function properly. `,
};

export abstract class ViewBase
{


    protected _element:HTMLElement;


    get element():HTMLElement {
        return this._element;
    }

    constructor(){

        this.parse();
    }

    private parse():void
    {

        var renderString:string = this.render();

        if(renderString === "" || renderString === null || renderString === undefined)
        {
            throw new Error(ViewBaseErrors.ERROR_INVALID_RENDER_STRING);
        }

        var elements:HTMLCollection = parseHTML(renderString);

        if(elements.length > 1)
        {
            throw new Error(ViewBaseErrors.ERROR_MULTIPLE_NODES_FOUND);
        }
        var el:Element = elements.item(0);
        var vnode:any = createVNode(el);
        this._element = createElement(vnode) as HTMLElement;

    }

    protected abstract render():string;

}