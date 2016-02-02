
import {element} from "../../../src/core/decorators";


class TesComp extends HTMLElement
{

}

describe('decorators Spec', () => {


    describe("element decorator",()=>{


        it("should register the constructor",()=>{

            var cb = element("x-test");

            cb(TesComp);

            var isUNKnownElement:boolean = document.createElement("x-test") instanceof HTMLUnknownElement;

            expect(isUNKnownElement).toBe(false);
        });


    });
});