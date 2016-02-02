
var webComponents = require("rama-webcomponents");

declare var document:any;

export function element(name: string) {
    return (constructor: Function) => {

        document.registerElement(name,constructor);
    }
}

export function SkinClass(name: string) {
    return (constructor: Function) => {

    }
}

export function SkinPart(value:{id:string,required:boolean}) {

    return (target, name, descriptor)=>{

    }
}