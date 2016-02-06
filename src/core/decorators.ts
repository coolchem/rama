
var webComponents = require("document-register-element");

declare var document:any;

export function element(name: string) {
    return (constructor: Function) => {

        document.registerElement(name,constructor);
    }
}