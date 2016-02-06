
import {element} from "../../../src/core/decorators";

var testCompCreated:boolean = false;
@element("x-test")
class TesComp extends HTMLElement
{
    createdCallback() {
        testCompCreated = true;
        console.log("I got Created");
    }

    attachedCallback() {
        console.log("I got attached");
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log("my Attributes changed");
        console.log(attrName);
        console.log(newVal);
    }
}

describe('decorators Spec', () => {


    describe("element decorator",()=>{


        it("should register the constructor",()=>{

            var isUNKnownElement:boolean = document.createElement("x-test") instanceof HTMLUnknownElement;

            expect(isUNKnownElement).toBe(false);

            expect(testCompCreated).toBe(true);
        });


    });
});