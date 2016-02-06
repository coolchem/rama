

export function createVNode(el:Element):any
{
    if(!el.tagName && el.nodeType === Node.TEXT_NODE){

        return {tagName:"text",text:el.textContent};
    }


    var attributes = {};

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


    var output:any = {};

    output.tagName = el.tagName;
    output.attributes = attributes;

    output.children = [];

    for(var i = 0; i < el.childNodes.length; i++){
        output.children.push(createVNode(el.childNodes[i] as HTMLElement));
    }

    return output;
}

export function createElement(vnode:{tagName:string,children:any[],attributes:any,text:string}):Node
{
    if(vnode.tagName =="text")
        return document.createTextNode(vnode.text);


    var node:Node = document.createElement(vnode.tagName);

    for (var attrName in vnode.attributes) {
        (node as Element).setAttribute(attrName, vnode.attributes[attrName])
    }

    var children = vnode.children;

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i])
        if (childNode) {
            node.appendChild(childNode)
        }
    }
    return node;
}