
import {titleCase} from "./utils/string-utils";
import {EventDispatcher} from "./EventDispatcher";
import {ArrayList} from "./collections/ArrayList";

export class UIElement extends EventDispatcher
{

    protected _initialized:boolean;

    private _children:ArrayList<UIElement>;

    public parentElement:UIElement;

    constructor(element?:Node|string)
    {

        var el:Node = element as Node;
        if(typeof element === "string")
        {
            el = document.createElement(element as string);
        }
        super(el);

        this._children = new ArrayList<UIElement>();
    }


    //if overriding please make sure super is called
    initialize():void
    {
        if (this._initialized)
            return;

        this.preInitialize();

        this.createChildren();
        this.childrenCreated();

        this._initialized = true;

        this.initialized();
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
            this._children = new ArrayList(elements);
            this.createChildren();
            return;
        }

        this._children = new ArrayList(elements);
    }

    getChildren():Array<UIElement>
    {
        return this._children.getSource();
    }

    appendChild(element:UIElement):void {
        this.appendChildAt(element, this._children.length)
    }

    appendChildAt(element:UIElement,index:number):void {

        if(index === -1)
        {
            index = 0;
        }


        if(this._initialized)
        {
            element.parentElement = this;
            element.initialize();

            element.preAttach();

            if(this._children.length <= 0 || index > this._children.length-1)
            {
                this._element.appendChild(element.getElementRef())
            }
            else
            {
                var refChild = this._children.getSource()[index].getElementRef();
                this._element.insertBefore(element.getElementRef(), refChild)
            }

            element.attached();
        }

        this._children.addItemAt(element,index);

    }

    removeChild(element:UIElement) {

        element.preDetach();
        this._children.removeItem(element);
        this._element.removeChild(element.getElementRef());
        element.detached();
    };

    removeAllChildren():void {

        while (this._children.length > 0) {
            this.removeChild(this._children.getItemAt(0));
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
                var element:UIElement = this._children.getItemAt(i);

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


}