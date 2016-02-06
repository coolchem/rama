

import {Group} from "./Group";
import {ViewBase} from "./base/ViewBase";

export abstract class Skin extends ViewBase
{
    getSkinPart(id:string):HTMLElement
    {
        return null;
    }

}