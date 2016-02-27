
declare interface VNode
{
    type:string|Function;
    children?:Array<VNode|string>;
    props?:any;
    stateManagedProps?:any;
    text?:string;
}

declare namespace JSX {


    interface ElementClass {
        render():VNode
    }
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}