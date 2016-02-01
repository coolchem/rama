
export class REvent
{
    event:Event;

    constructor(name:string, bubbles:boolean = true, cancellable?:boolean){

        this.event = document.createEvent("HTMLEvents");
        this.event.initEvent(name, bubbles, cancellable);
    }

    getEventObject():Event
    {
        var thisEvent:any = this.event;

        //setting all the public properties on the "this" to the event object
        for (var propName in this) {

            if(propName !== 'getEventObject')
                thisEvent[propName] = this[propName];
        }
        return this.event;
    }


}