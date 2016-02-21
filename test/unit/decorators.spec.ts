
import {element} from "../../src/decorators";
import {skinPart} from "../../src/decorators";
import {createElement} from "../../src/core/utils/dom";

var testCompCreated:boolean = false;

describe('decorators Spec', () => {


    describe("skinPart decorator",()=>{


        it("should add skinpart",()=>{


            class TesComp2{

                @skinPart(false)
                part1:HTMLElement;

                @skinPart()
                part2:HTMLElement;
            }


            var testComp:any = new TesComp2();

            expect(testComp.skinParts["part2"]).toBeDefined();
            expect(testComp.skinParts["part1"]).toBeDefined();
        });


    });
});