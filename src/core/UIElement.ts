
import {titleCase} from "./utils/string-utils";
import {EventDispatcher} from "./EventDispatcher";
import {ArrayList} from "./collections/ArrayList";

export class UIElement extends EventDispatcher
{

    protected _initialized:boolean;

    protected _children:ArrayList<UIElement>;

    public parentElement:UIElement;

    constructor(element:Node)
    {
        if(!element)
        {
            throw new ReferenceError("Cannot create UIElement with null or undefined element ref")
        }

        if(!(element instanceof Node))
        {
            throw new ReferenceError("Element passed to UIElement must be an instance of Html Node")
        }

        super(element);

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

    protected createChildren():void
    {

    }

    protected childrenCreated():void
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

    protected preAttach():void
    {

    }

    protected attached():void
    {

    }

    protected preDetach():void
    {

    }

    protected detached():void
    {

    }

    /*
    *
    * Public methods
    *
    * */

    getElementRef():Node {
        return this._element;
    }

    setChildren(elements:UIElement[]):void
    {
        this._children = new ArrayList(elements);
    }

    getChildren():UIElement[]
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


        element.parentElement = this;
        element.initialize();
        element.attached();

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

}