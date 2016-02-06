

import {Group} from "./Group";

export class Skin
{

    protected skin:string = '';

    private _skinElement:HTMLElement;


    constructor() {

        this.parseSkin();
    }

    private parseSkin():void
    {

    }

    getSkinElement():HTMLElement
    {
        return this._skinElement;
    }
    getSkinPart(id:string):HTMLElement
    {
        return null;
    }



}