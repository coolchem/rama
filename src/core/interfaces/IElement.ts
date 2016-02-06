

export interface IElement extends HTMLElement
{

    visibility:string;
    display:string;

    classNames:string;

    addElement(element:IElement):void;
    addElementAt(element:IElement, index:number);
    removeElement(element:IElement):void;
    removeAllElements():void;

    setStyle(styleName:string,value:string);
    getStyle(styleName:string):string;

    hasClass(name:string):boolean;
    removeClass(names:string[]);

    addClass(name:string[]);

    toggleClass(name:string[]);

}