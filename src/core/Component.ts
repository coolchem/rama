

import {ComponentBase} from "./base/ComponentBase";
import {Skin} from "./Skin";
import {createElement} from "./utils/dom";

export class Component extends ComponentBase
{


    private _skinElementName:string;

    private _skinClassSet:boolean = false;

    private _skinElement:Skin;

    skinParts:any = {};

    createdCallback():void {
        super.createdCallback();
        this.validateSkinChange();
    }

    get skinElementName():string {
        return this._skinElementName;
    }

    set skinElementName(value:string) {

        if(this._skinElementName !== value)
        {
            this._skinElementName = value;
            if(this._skinClassSet && this.initialized)
                this.validateSkinChange();
        }

        if(!this._skinClassSet)
            this._skinClassSet = true;
    }

    partAdded(partName, instance) {
        //Override this method to add functionality to various skin component
    };

    partRemoved(partName, instance) {
        //Override this method to add functionality to various skin component
    };

    protected validateSkinChange(){

        if (this._skinElement)
            this.detachSkin();

        this.attachSkin();
    }

    private attachSkin() {

        if(this.skinElementName && this.skinElementName !== "")
        {
            this._skinElement = createElement(this.skinElementName) as Skin;
            this.appendChild(this._skinElement);
            this.findSkinParts();
            this.validateSkinState();
        }
    }

    protected validateSkinState(){

    }

    private detachSkin(){
        this.clearSkinParts();
        this.removeChild(this._skinElement);
    }

    protected findSkinParts() {
        if (this._skinElement) {
            for (var id in this.skinParts) {
                var skinPart = this.skinParts[id];
                var skinPartFound = false;

                var skinPartElement:HTMLElement = this._skinElement.getSkinPartByID(id);

                if (skinPartElement) {
                    skinPartFound = true;
                    this[skinPart.key] = skinPartElement;
                    this.partAdded(id, skinPartElement)
                }

                if (skinPart.required === true && !skinPartFound) {
                    throw new ReferenceError("Required Skin part not found: " + id + " in the Attached skin");
                }
            }
        }
    }

    protected clearSkinParts(){

        if (this._skinElement) {
            for (var id in this.skinParts) {
                var skinPart = this.skinParts[id];
                if(this[skinPart.key] !== null)
                {
                    this.partRemoved(id, this[skinPart.key]);
                }
            }
        }

    }
}