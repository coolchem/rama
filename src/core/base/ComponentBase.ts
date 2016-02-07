
export abstract class ComponentBase extends HTMLElement
{

    created = false;
    /*
        LIFECYCLE Functions
    * */

    // Fires when an instance of the element is created.
    createdCallback():void {

        this.created = true;
    };
    // Fires when an instance was inserted into the document.
    attachedCallback():void {

    };
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attrName:string, oldVal:string, newVal:string):void {

    };

}