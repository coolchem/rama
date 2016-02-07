
import parseHTML from "../utils/html-parser";
import {createElement} from "../utils/dom";
import {createVNode} from "../utils/dom";
import {Dictionary} from "../../../test/unit/core/utils/Dictionary";
import {ComponentBase} from "./ComponentBase";
import {VNode} from "../utils/dom";

export const ViewBaseErrors = {
    ERROR_INVALID_RENDER_STRING:
        `Error: 'render' function returned invalid string,'render' function must not return empty string, null or undefined value

         Please make sure your view has implemented the 'render' function properly. `,

    ERROR_MULTIPLE_NODES_FOUND:
        `Error: Multiple nodes found during rendering,'render' function must return string with one root node.

         Please make sure your view has implemented the 'render' function properly. `,
};

var viewCache:Dictionary<string,VNode[]> = new Dictionary<string,VNode[]>();

export abstract class ViewBase extends ComponentBase
{

    protected refs:any;

    createdCallback():void {
        super.createdCallback();
        this.refs = {};
        this.parse();
    }

    private parse():void
    {
        var vnodes:VNode[] = viewCache.get(this.tagName);
        if(!vnodes)
        {
            vnodes = [];
            viewCache.set(this.tagName,vnodes);
            var renderString:string = this.render();

            if(renderString === null || renderString === undefined)
            {
                renderString = "";
            }

            var elements:HTMLCollection = parseHTML(renderString);

            if(elements && elements.length > 0)
            {
                for(var i=0; i<elements.length; i++)
                {
                    var el:Element = elements.item(i);
                    var vnode:VNode = createVNode(el);
                    vnodes.push(vnode);
                }
            }
        }

        for(var i=0; i<vnodes.length; i++)
        {
            var vnode:VNode = vnodes[i];
            var el:Element = createElement(vnode,this.refs) as Element;
            this.appendChild(el);
        }
    }

    protected abstract render():string;

}