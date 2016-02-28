
import "./pollyfills";
import {titleCase} from "./utils/string-utils";
import {EventDispatcher} from "./EventDispatcher";


export class UIElement extends EventDispatcher
{

    protected _initialized:boolean;

    private _children:Array<UIElement>;

    public parentElement:UIElement;

    protected _currentState:string;

    getCurrentState():string
    {
        return this._currentState
    }

    setCurrentState(value:string):void
    {
        if(this._currentState !== value)
        {
            this._currentState = value;
            this.validateState();
        }
    }

    constructor(element?:Node|string)
    {

        var el:Node = element as Node;
        if(typeof element === "string")
        {
            el = document.createElement(element as string);
        }
        super(el);

        this._children = [];
        this._currentState = "";
    }


    //if overriding please make sure super is called
    initialize():void
    {
        if (this._initialized)
            return;

        this.preInitialize();

        this.__preInitialize();

        this.createChildren();
        this.childrenCreated();

        this._initialized = true;

        this.initialized();
    }

    protected __preInitialize():void
    {

    }

    /*
    * Life cycle methods
    *
    * */

    protected preInitialize():void
    {

    }

    protected initialized():void
    {

    }

    preAttach():void
    {

    }

    attached():void
    {

    }

    preDetach():void
    {

    }

    detached():void
    {

    }

    /*
    *
    * Public methods
    *
    * */


    __setElementRef(node:Element){
        this._element = node;
    }
    getElementRef():Node|Element {
        return this._element;
    }

    setChildren(elements:UIElement[]):void
    {

        if (this._initialized) {
            this.removeAllChildren();
            this._children = elements;
            this.createChildren();
            return;
        }

        this._children = elements
    }

    getChildren():Array<UIElement>
    {
        return this._children
    }

    appendChild(element:UIElement):void {
        this.appendChildAt(element, this._children.length)
    }

    appendChildAt(element:UIElement,index:number):void {

        if(index === -1)
        {
            index = 0;
        }
        element.parentElement = this;
        element.initialize();

        element.preAttach();

        if(this._children.length <= 0 || index > this._children.length-1)
        {
            this._element.appendChild(element.getElementRef())
        }
        else
        {
            var refChild = this._children[index].getElementRef();
            this._element.insertBefore(element.getElementRef(), refChild)
        }

        element.attached();
        this._children.splice(index, 0, element);
    }

    removeChild(element:UIElement) {

        element.preDetach();
        this._children.splice(this._children.indexOf(element), 1);
        this._element.removeChild(element.getElementRef());
        element.detached();
    };

    removeAllChildren():void {

        while (this._children.length > 0) {
            this.removeChild(this._children[0]);
        }
    }

    setAttribute(name?: string, value?: string): void{
        //finding and calling set function which matches attribute-name
        var functionName = "set" + titleCase(name);

        if(this[functionName])
        {
            this[functionName](value);
        }

        if(this._element instanceof Element)
        {
            (this._element as Element).setAttribute(name, value);
        }

    }

    getAttribute(name: string): string{

        if(this._element instanceof Element)
        {
            return (this._element as Element).getAttribute(name);
        }
        return null;
    }


    protected createChildren():void
    {
        if(this._children && this._children.length > 0)
        {
            var docFragment:DocumentFragment = document.createDocumentFragment();


            for(var i=0; i<this._children.length; i++)
            {
                var element:UIElement = this._children[i];

                element.parentElement = this;
                element.initialize();

                element.preAttach();
                docFragment.appendChild(element.getElementRef());
                element.attached();
            }

            this._element.appendChild(docFragment);
        }
    }

    protected childrenCreated():void
    {

    }

    protected validateState():void
    {

    }


}