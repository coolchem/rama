

import {EventDispatcher} from "./EventDispatcher";
import {IElement} from "../interfaces/IComponent";

export abstract class ComponentBase extends HTMLElement implements IElement
{

    /*
        LIFECYCLE Functions
    * */

    // Fires when an instance of the element is created.
    createdCallback() {

    };
    // Fires when an instance was inserted into the document.
    attachedCallback() {

    };
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attrName, oldVal, newVal) {

    };



    get visibility():string {
        return this.getStyle("visibility");
    }

    set visibility(value:string) {
        this.setStyle("visibility", value);
    }

    get display():string {
        return this.getStyle("display")
    }

    set display(value:string) {
        this.setStyle("display", value);
    }

    get classNames():string {
        return this.getAttribute('class');
    }

    set classNames(value:string) {
        this.setAttribute('class', value.trim())
    }


    setStyle(styleName:string, value:string) {
        this.style[styleName] = value;
    }

    getStyle(styleName:string):string {
        return this.style[styleName];
    }

    addElement(element:Element):void {

        this.addElementAt(element, this.children.length)
    }

    addElementAt(element:Element, index:number) {

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
            var refChild:Element = this.children.item(0);
            this.insertBefore(element, refChild)
        }
    }

    removeElement(element:Element):void {

        this.removeChild(element);
    }

    removeAllElements():void {

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
    }

    hasClass(name:string):boolean {
        if (!this.getAttribute) return false;
        return ((" " + (this.getAttribute('class') || '') + " ").replace(/[\n\t]/g, " ").
        indexOf( " " + name + " " ) > -1);
    }

    removeClass(names:string[]) {

        if (names) {
            names.forEach((cssClass)=> {
                this.setAttribute('class', this.trim(
                    (" " + (this.getAttribute('class') || '') + " ")
                        .replace(/[\n\t]/g, " ")
                        .replace(" " + this.trim(cssClass) + " ", " "))
                );
            }, this);
        }
    }

    addClass(names:string[]) {

        if (names) {
            var existingClasses = (' ' + (this.getAttribute('class') || '') + ' ')
                .replace(/[\n\t]/g, " ");

            names.forEach((cssClass)=> {
                cssClass = this.trim(cssClass);
                if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
                    existingClasses += cssClass + ' ';
                }
            });

            this[0].setAttribute('class', this.trim(existingClasses));
        }
    }

    toggleClass(names:string[]) {

        if (names) {
            names.forEach((className:string)=>{
                var classCondition = !this.hasClass(className);
                if(classCondition)
                    this.addClass([className]);
                else
                    this.removeClass([className])
            });
        }
    }

    protected trim( text ) {
        return text == null ?
            "" :
            ( text + "" ).replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
    }

}