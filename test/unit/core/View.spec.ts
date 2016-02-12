
import {element} from "../../../src/core/decorators";
import {createElement} from "../../../src/core/utils/dom";
import {View} from "../../../src/core/View";
import {UIElement} from "../../../src/core/base/UIElement";



var testCompCreated:boolean = false;
@element("x-comp")
class TestComp extends UIElement
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
class TestViewCorrectImplementation extends View
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

describe('View Spec', () => {


    describe("instance Creation",()=>{

        it("should not render anything if render returns null",()=>{


            @element("x-comp-null-renderer")
            class TestViewEmptyRender extends View
            {


                protected render():string {
                    return null;
                }
            }
            var view:View = createElement("x-comp-null-renderer") as View;
            expect(view.children.length).toEqual(0);
        });

        it("should not render anything if render function returns undefined",()=>{


            @element("x-comp-undefined-renderer")
            class TestViewNullRender extends View
            {

                protected render():string {
                    return null;
                }
            }
            var view:View = createElement("x-comp-undefined-renderer") as View;
            expect(view.children.length).toEqual(0);
        });


        it("should create child elements",()=>{

            var view:View = createElement("x-comp-correct-renderer") as View;
            expect(view.children).toBeDefined();
            expect(view.children.length).toEqual(1);

        });

        it("should create child elements which are instances of HTMLElement",()=>{

            var view:View = createElement("x-comp-correct-renderer") as View;
            var instanceOfHtmlElement:boolean = view.children.item(0) instanceof HTMLElement;
            expect(instanceOfHtmlElement).toBe(true);

        });


        it("should create the custom element",()=>{

            var view:View = createElement("x-comp-correct-renderer") as View;
            expect(testCompCreated).toBe(true);

        });

    });
});