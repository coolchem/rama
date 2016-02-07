
import {element} from "../../../../src/core/decorators";
import {ViewBase} from "../../../../src/core/base/ViewBase";
import {ComponentBase} from "../../../../src/core/base/ComponentBase";


var testCompCreated:boolean = false;
@element("x-comp")
class TestComp extends ComponentBase
{
    createdCallback() {
        testCompCreated = true;
    }

    attachedCallback() {
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
    }
}


@element("x-comp-correct-renderer")
class TestViewCorrectImplementation extends ViewBase
{


    createdCallback():void {
        super.createdCallback();
    }

    protected render():string {
        return `<div>
                <x-comp my-attr="what"></x-comp>
                </div>`;
    }
}

describe('ViewBase Spec', () => {


    describe("instance Creation",()=>{

        it("should not render anything if render returns null",()=>{


            @element("x-comp-null-renderer")
            class TestViewEmptyRender extends ViewBase
            {


                protected render():string {
                    return null;
                }
            }
            var view:ViewBase = document.createElement("x-comp-null-renderer") as ViewBase;
            expect(view.children.length).toEqual(0);
        });

        it("should throw error if render function returns undefined",()=>{


            @element("x-comp-undefined-renderer")
            class TestViewNullRender extends ViewBase
            {

                protected render():string {
                    return null;
                }
            }
            var view:ViewBase = document.createElement("x-comp-undefined-renderer") as ViewBase;
            expect(view.children.length).toEqual(0);
        });


        it("should create child elements",()=>{

            var view:ViewBase = document.createElement("x-comp-correct-renderer") as ViewBase;
            expect(view.children).toBeDefined();
            expect(view.children.length).toEqual(1);

        });

        it("should create child elements which are instances of HTMLElement",()=>{

            var view:ViewBase = document.createElement("x-comp-correct-renderer") as ViewBase;
            var instanceOfHtmlElement:boolean = view.children.item(0) instanceof HTMLElement;
            expect(instanceOfHtmlElement).toBe(true);

        });


        it("should create the custom element",()=>{

            var view:ViewBase = document.createElement("x-comp-correct-renderer") as ViewBase;
            expect(testCompCreated).toBe(true);

        });

    });
});