
declare namespace JSX {


    interface ElementClass {
        render: any;
    }
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}