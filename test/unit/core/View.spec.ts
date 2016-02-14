
import {element} from "../../../src/core/decorators";
import {createElement} from "../../../src/core/utils/dom";
import {View} from "../../../src/core/View";
import {UIElement} from "../../../src/core/base/UIElement";
import {Component} from "../../../src/core/Component";


import "../../../src/core/Group";
import {Container} from "../../../src/core/Container";

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

@element("x-container")
class TestContainer extends Container
{

}


@element("x-comp-correct-renderer")
class TestViewCorrectImplementation extends View
{


    createdCallback():void {
        super.createdCallback();
    }

    protected render():string {
        return `<x-container>

                <x-comp my-attr="what"></x-comp>

                </x-container>`;
    }
}

describe('View Spec', () => {


    describe("instance Creation and Initialization",()=>{

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

        it("should create the custom element",()=>{

            var view:View = createElement("x-comp-correct-renderer") as View;
            expect(testCompCreated).toBe(true);

        });

    });

    describe("setCurrentState",()=>{

        @element("test-view-with-states")
        class TestViewWithStates extends View
        {

            protected render():string {
                return `
                <states>
                    <state name="state1"></state>
                    <state name="state2" state-groups="group1,group2"></state>
                    <state name="state3" state-groups="group1"></state>
                    <state name="state4" state-groups="group2"></state>
                </states>

                <x-comp id="1" my-attr="what" my-attr.state1="what1"></x-comp>
                <div id="2" class.state2="humm"></div>
                <div id="3" class="group" class.group1="group1"></div>
                <r-group>
                    <div id="4" class="group" class.group2="group2"></div>
                </r-group>

                `;
            }
        }



        it("should  apply state change to properties successfully",()=>{

            var testView:View = createElement("test-view-with-states") as View;

            testView.setCurrentState("state1");

            var xComp:Component = testView.children.item(0) as Component;
            expect(xComp.getAttribute("my-attr")).toEqual("what1");

            var div1:HTMLDivElement = testView.children.item(1) as HTMLDivElement;
            testView.setCurrentState("state2");

            expect(xComp.getAttribute("my-attr")).toEqual("what");
            expect(div1.getAttribute("class")).toEqual("humm");

            testView.setCurrentState("state1");

            expect(div1.getAttribute("class")).toEqual("")


        });

        it("should apply state change to state groups successfully",()=>{

            var testView:View = createElement("test-view-with-states") as View;

            testView.setCurrentState("state2");

            var div1:HTMLDivElement = testView.children.item(2) as HTMLDivElement;
            var div2:HTMLDivElement = (testView.children.item(3) as HTMLElement).children.item(0) as HTMLDivElement;

            expect(div1.getAttribute("class")).toEqual("group1");
            expect(div2.getAttribute("class")).toEqual("group2");

            testView.setCurrentState("state3");

            expect(div1.getAttribute("class")).toEqual("group1");
            expect(div2.getAttribute("class")).toEqual("group");

            testView.setCurrentState("state4");

            expect(div1.getAttribute("class")).toEqual("group");
            expect(div2.getAttribute("class")).toEqual("group2");


        })
    })
});