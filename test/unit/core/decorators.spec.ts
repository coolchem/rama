
import {element} from "../../../src/core/decorators";

var testCompCreated:boolean = false;
@element("x-test")
class TesComp extends HTMLElement
{
    createdCallback() {
        testCompCreated = true;
    }
}

describe('decorators Spec', () => {


    describe("element decorator",()=>{


        it("should register the constructor",()=>{

            var isUNKnownElement:boolean = document.createElement("x-test") instanceof HTMLUnknownElement;

            expect(isUNKnownElement).toBe(false);

            expect(testCompCreated).toBe(true);
        });

        it("should throw error if element is already registered",()=>{



            var throws = function() {
                @element("x-test")
                class TesComp extends HTMLElement{}
            };

            expect(throws).toThrowError();
        });


    });
});