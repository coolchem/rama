

export function titleCase(string) {

    var names:string[] = string.split("-");

    var propName:string = "";

    if(names.length > 0)
    {
        names.forEach((name)=>{
            name = name.charAt(0).toUpperCase() + name.slice(1);
            propName = propName + name;
        })
    }

    return propName;
}

