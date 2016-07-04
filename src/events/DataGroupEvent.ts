

import {REventInit} from "../core/event";


export class DataGroupEventDetail
{
    renderer;
    index:number;
    constructor(renderer,index)
    {
        this.renderer = renderer;
        this.index = index;
    }
}
export class DataGroupEventInit extends REventInit<DataGroupEventDetail>
{
    
    static ITEM_RENDERER_ADDED:string = "itemRendererAdded";
    static ITEM_RENDERER_REMOVED:string = "itemRendererRemoved";
    
    constructor(renderer, index:number) {
        
        super(false,true,new DataGroupEventDetail(renderer,index))
    }
}