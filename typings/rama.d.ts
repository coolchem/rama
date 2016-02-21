
declare namespace JSX {

    interface ElementAttributesProperty {
        props; // specify the property name to use
    }

    interface ElementClass {
        render: any;
    }
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}