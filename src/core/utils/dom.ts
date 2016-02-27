

import {UIElement} from "../UIElement";
import {PropertySetter} from "../support_classes/PropertySetter";
import {titleCase} from "./string-utils";


export function createVNode(ele:string|Function, props?:any, ...args):VNode
{

    var elementProps:any = {};
    var stateManagedProperties:any = {};

    for(var prop in props)
    {
        var nameAndState = prop.split('__');

        if(nameAndState.length == 2)
        {
            var stateName:string = nameAndState[1];
            if(stateManagedProperties[stateName] === undefined)
            {
                stateManagedProperties[stateName] = {};
            }

            stateManagedProperties[stateName][nameAndState[0]] = props[prop];
        }
        else
        {
            elementProps[prop] = props[prop];
        }
    }

    return  {type:ele,children:args,props:elementProps,stateManagedProps:stateManagedProperties};

}

export function createElement(tag:VNode|string,refs?:any,stateManagedProperties?:any,rootElement?:UIElement):UIElement
{
    var element:UIElement;

    var vnode:VNode;
    if(typeof tag == "string")
    {
        vnode = {type:"text",text:tag as string}
    }
    else
    {
        vnode = tag as VNode;
    }

    if(vnode.type =="text")
    {
        var textNode:Text = document.createTextNode(vnode.text);
        return new UIElement(textNode);
    }


    if(typeof vnode.type === "string")
    {
        var htmlNode:Element = document.createElement(vnode.type as string);
        if(rootElement)
        {
            element = rootElement;
            element.__setElementRef(htmlNode)
        }
        else
        {
            element = new UIElement(htmlNode);
        }

    }
    else
    {
        element = new (vnode.type as new()=>any)()
    }

    if(!(element instanceof UIElement))
    {
        throw TypeError("Custom Component Class must extend UIElement.\n" + element.toString())
    }

    if(vnode.props)
    {
        for (var attrName in vnode.props) {
            element.setAttribute(attrName, vnode.props[attrName])
        }
    }

    var children = vnode.children;

    if(children)
    {
        for (var i = 0; i < children.length; i++) {

            var childElement:UIElement = createElement(children[i],refs,stateManagedProperties);

            if (childElement) {
                var childNode:VNode|string = children[i];

                if(typeof children[i] !== "string" && typeof (childNode as VNode).type === "string")
                {
                    var functionName:string = "set" + titleCase((childNode as VNode).type);

                    if(element[functionName]) //checking if we need to transclude content
                    {
                        element[functionName](childElement.getChildren());
                    }
                    else
                    {
                        element.appendChild(childElement);
                    }
                }
                else
                {
                    element.appendChild(childElement);
                }

            }
        }
    }

    registerRefs(refs,vnode.props,element);

    registerStateManagedComponent(element,stateManagedProperties,vnode.stateManagedProps);

    return element;
}

function registerRefs(refs:any,props:any,element:UIElement)
{
    if(refs && props.id){
        refs[props.id] = element;
    }
}

function registerStateManagedComponent(element:UIElement,stateManagedProperties:any,stateManagedAttributes:any)
{
    if(stateManagedProperties && stateManagedAttributes)
    {
        for (var stateName in stateManagedAttributes) {

            if(stateManagedProperties[stateName] === undefined)
            {
                stateManagedProperties[stateName] = [];
            }

            var attributes:any = stateManagedAttributes[stateName];

            for (var attrName in attributes) {


                var propertySetter = new PropertySetter(element,attrName,attributes[attrName])

                stateManagedProperties[stateName].push(propertySetter);
            }

        }
    }
}