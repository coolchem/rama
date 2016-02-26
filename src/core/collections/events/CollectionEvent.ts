
import {EventInit} from "../../event";
export const CollectionEventKind = {
    ADD:"add",
    MOVE:"move",
    REMOVE:"remove",
    REPLACE:"replace",
    EXPAND:"expand",
    REFRESH:"refresh",
    RESET:"reset",
    UPDATE:"update"

};

export const CollectionEvent = {
    COLLECTION_CHANGE:"collectionChange"
};


export interface CollectionEventDetail
{
    kind?:string;
    location?:number;
    oldLocation?:number;
    items?:any[]
}

export class CollectionEventInit extends EventInit<CollectionEventDetail>
{

    constructor(kind?:string, location?:number,
                oldLocation?:number, items?:any[]) {
        super(false, false);
        this.detail = {items:items,kind:kind,location:location,oldLocation:oldLocation}

        this.detail.items = items ? items : [];
    }
}


