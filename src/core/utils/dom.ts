

import {UIElement} from "../base/UIElement";
import {camelCase} from "./string-utils";
import {PropertySetter} from "../support_classes/PropertySetter";
export declare interface VNode
{
    tagName:string;
    children?:any[];
    attributes?:any;
    stateManagedAttributes?:any;
    text?:string;

}
export function createVNode(el:Element):VNode
{
    if(!el.tagName && el.nodeType === Node.TEXT_NODE){

        return {tagName:"text",text:el.textContent};
    }


    var attributes:any = {};

    var stateManagedAttributes:any= {};

    if(el.attributes){

        for(var i = 0; i < el.attributes.length; i++){
            var attr = el.attributes[i];
            if(attr.name){

                var nameAndState = attr.name.split('.');

                if(nameAndState.length == 2)
                {
                    var stateName:string = nameAndState[1].toLowerCase();
                    if(stateManagedAttributes[stateName] === undefined)
                    {
                        stateManagedAttributes[stateName] = {};
                    }

                    stateManagedAttributes[stateName][nameAndState[0]] = attr.value;
                }
                else
                {
                    var value = attr.value;
                    if(!value)
                        value = "";

                    attributes[attr.name] = attr.value;
                }

            }
        }
    }


    var output:VNode= {
        tagName:el.tagName,
        attributes:attributes,
        stateManagedAttributes:stateManagedAttributes,
        children:[]};

    for(var i = 0; i < el.childNodes.length; i++){
        output.children.push(createVNode(el.childNodes[i] as HTMLElement));
    }

    return output;
}

export function createElement(tag:VNode|string,refs?:any,stateManagedProperties?:any):Node
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
            var childNode = createElement(children[i],refs,stateManagedProperties);
            if (childNode) {
                node.appendChild(childNode)
            }
        }
    }


    if(refs && vnode.attributes.id){
        refs[vnode.attributes.id] = node;
    }

    if(stateManagedProperties && vnode.stateManagedAttributes)
    {
        for (var stateName in vnode.stateManagedAttributes) {

            if(stateManagedProperties[stateName] === undefined)
            {
                stateManagedProperties[stateName] = [];
            }

            var attributes:any = vnode.stateManagedAttributes[stateName];

            for (var attrName in attributes) {


                var propertySetter = new PropertySetter(node,attrName,attributes[attrName])

                stateManagedProperties[stateName].push(propertySetter);
            }

        }
    }

    if(node instanceof UIElement)
    {
        (node as UIElement).__initializedCallback__();
    }

    return node;
}