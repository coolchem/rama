

import {UIElement} from "../base/UIElement";
export declare interface VNode
{
    tagName:string;
    children?:any[];
    attributes?:any;
    text?:string;

}
export function createVNode(el:Element):VNode
{
    if(!el.tagName && el.nodeType === Node.TEXT_NODE){

        return {tagName:"text",text:el.textContent};
    }


    var attributes:any = {};

    if(el.attributes){

        for(var i = 0; i < el.attributes.length; i++){
            var attr = el.attributes[i];
            if(attr.name){

                var value = attr.value;
                if(!value)
                    value = "";

                attributes[attr.name] = attr.value;
            }
        }
    }


    var output:VNode= {
        tagName:el.tagName,
        attributes:attributes,
        children:[]};

    for(var i = 0; i < el.childNodes.length; i++){
        output.children.push(createVNode(el.childNodes[i] as HTMLElement));
    }

    return output;
}

export function createElement(tag:VNode|string,refs?:any):Node
{
    var vnode:VNode;
    if(typeof tag == "string")
    {
        vnode = {tagName:(tag as string)}
    }
    else
    {
        vnode = tag as VNode;
    }

    if(vnode.tagName =="text")
        return document.createTextNode(vnode.text);


    var node:Element = document.createElement(vnode.tagName);

    if(vnode.attributes)
    {
        for (var attrName in vnode.attributes) {
            (node as Element).setAttribute(attrName, vnode.attributes[attrName])
        }
    }

    var children = vnode.children;

    if(children)
    {
        for (var i = 0; i < children.length; i++) {
            var childNode = createElement(children[i],refs);
            if (childNode) {
                node.appendChild(childNode)
            }
        }
    }


    if(refs && vnode.attributes.id){
        refs[vnode.attributes.id] = node;
    }

    if(node instanceof UIElement)
    {
        (node as UIElement).__initializedCallback__();
    }

    return node;
}