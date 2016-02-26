

export class EventInit<D> implements CustomEventInit
{

    bubbles:boolean;
    cancelable:boolean;
    detail:D;


    constructor(bubbles?:boolean, cancelable?:boolean, detail?:D) {
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.detail = detail;
    }
}