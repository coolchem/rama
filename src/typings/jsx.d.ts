

declare namespace JSX {

    interface ElementClass {
        render?():any
    }
    interface IntrinsicElements {
        [elemName: string]: { [attribute: string]: string };
    }
}