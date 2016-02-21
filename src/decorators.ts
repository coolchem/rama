
export function skinPart(required:boolean = false):PropertyDecorator{

    return function (target: any, key: string):void {
        if(!target.skinParts)
            target.skinParts = {};

        target.skinParts[key] = {required:true};
    }
}