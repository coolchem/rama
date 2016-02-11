

import {Group} from "./Group";
import {View} from "./View";

export abstract class Skin extends View
{

    getSkinPartByID(id:string):HTMLElement
    {
        var part:HTMLElement = this.refs[id];

        return part ? part: null;
    }
}