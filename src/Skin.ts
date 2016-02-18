
import {ViewBase} from "./core/ViewBase";

export abstract class Skin extends ViewBase
{

    getSkinPartByID(id:string):HTMLElement
    {
        var part:HTMLElement = this[id];

        return part ? part: null;
    }
}