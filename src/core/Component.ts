

import {ComponentBase} from "./base/ComponentBase";
import {Skin} from "./Skin";

export class Component extends ComponentBase
{
    private _skinClass:Function;

    private _skinClassSet:boolean = false;

    private _skinElement:HTMLElement;

    private _skinParts:Array<{id:string,required:boolean}> = [];


    get skinParts():any {
        return this._skinParts;
    }

    set skinParts(value:any) {
        this._skinParts = value;
    }

    get skinClass():Function {
        return this._skinClass;
    }

    set skinClass(value:Function) {

        if(this._skinClass !== value)
        {
            this._skinClass = value;
            if(this._skinClassSet)
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

        if(this.skinClass)
        {
            //this._skinElement = new this._skinClass().render();
            this.appendChild(this._skinElement);

            this.findSkinParts();
            this.validateSkinState();
        }
    }

    validateSkinState(){

    }

    private detachSkin(){
        this.clearSkinParts();
        this.removeChild(this._skinElement);
    }

    findSkinParts() {
        if (this._skinElement) {
            for (var j = 0; j < this.skinParts.length; j++) {
                var skinPart = this.skinParts[j];
                var skinPartFound = false;

                var skinPartElement:HTMLElement;

                if (skinPartElement) {
                    skinPartFound = true;
                    this[skinPart.id] = skinPartElement;
                    this.partAdded(skinPart.id, skinPartElement)
                }

                if (skinPart.required === true && !skinPartFound) {
                    throw new ReferenceError("Required Skin part not found: " + skinPart.id + " in the Attached skin");
                }
            }
        }
    }

    clearSkinParts(){

        if (this._skinElement) {
            for (var j = 0; j < this.skinParts.length; j++) {
                var skinPart = this.skinParts[j];
                if(this[skinPart.id] !== null)
                {
                    this.partRemoved(skinPart.id, this[skinPart.id])
                }
            }
        }

    }
}