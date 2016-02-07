

import {Group} from "./Group";
import {ViewBase} from "./base/ViewBase";

export abstract class Skin extends ViewBase
{

    getSkinPartByID(id:string):HTMLElement
    {
        var part:HTMLElement = this.refs[id];

        return part ? part: null;
    }
}