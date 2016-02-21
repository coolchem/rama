
import {titleCase} from "./utils/string-utils";
import {EventDispatcher} from "./EventDispatcher";
export abstract class UIElement extends EventDispatcher
{

    protected initialized:boolean;

    //do not override
    initialize():void
    {

    }
}