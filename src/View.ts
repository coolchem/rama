

import {ViewBase} from "./core/ViewBase";

export abstract class View extends ViewBase
{
    abstract render():VNode;
}