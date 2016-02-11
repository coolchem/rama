
export abstract class UIElement extends HTMLElement
{


    protected initialized = false;
    /*
        LIFECYCLE Functions
    * */

    // Fires when an instance of the element is created. treat it as constructor
    createdCallback():void {

    };

    // Fires when an instance of the element is created. and all its atrributes are set
    //do not override without calling super.__initializedCallback__
    __initializedCallback__():void
    {
        this.initialized = true;
    }
    // Fires when an instance was inserted into the document.
    attachedCallback():void {

    };

    detachedCallback():void{

    }
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attrName:string, oldVal:string, newVal:string):void {

    };

    replaceChild(newChild:Node, oldChild:Node):Node {
        this.checkAndInitializeUIElement(newChild);
        return super.replaceChild(newChild, oldChild);
    }

    insertAdjacentElement(position:string, insertedElement:Element):Element {
        this.checkAndInitializeUIElement(insertedElement);
        return super.insertAdjacentElement(position, insertedElement);
    }

    appendChildAt(element:Node, index:number) {

        if(index === -1)
        {
            index = 0;
        }

        if(this.children.length <= 0 || index > this.children.length-1)
        {
            this.appendChild(element)
        }
        else
        {
            var refChild = this.children.item(index);
            this.insertBefore(element, refChild)
        }

    };

    insertBefore(newChild:Node, refChild?:Node):Node {
        this.checkAndInitializeUIElement(newChild);
        return super.insertBefore(newChild, refChild);
    }

    appendChild(newChild:Node):Node {
        this.checkAndInitializeUIElement(newChild);
        return super.appendChild(newChild);
    }

    private checkAndInitializeUIElement(node:Node):void
    {
        if(node instanceof UIElement)
        {
            (node as UIElement).__initializedCallback__();
        }
    }
}