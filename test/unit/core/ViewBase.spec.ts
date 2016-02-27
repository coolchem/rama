
import {UIElement} from "../../../src/core/UIElement";


import "../../../src/Group";
import {ViewBase} from "../../../src/core/ViewBase";
import {TestView} from "./test-views";
import {TestViewTransclude} from "./test-views";

describe('ViewBase Spec', () => {


    describe("instance Creation and Initialization",()=>{

        it("should not render anything if render returns null",()=>{

            class TestViewNullRender extends ViewBase
            {


                protected render():VNode {
                    return null;
                }
            }
            var view:ViewBase = new TestViewNullRender();
            view.initialize();
            expect(view.getChildren().length).toEqual(0);
        });

        it("should not render anything if render function returns undefined",()=>{

            class TestViewUndefinedRender extends ViewBase
            {

                protected render():VNode {
                    return undefined;
                }
            }
            var view:ViewBase = new TestViewUndefinedRender();
            view.initialize();
            expect(view.getChildren().length).toEqual(0);
        });


        it("should create child elements",()=>{

            var view:ViewBase = new TestView();
            view.initialize();
            expect(view.getChildren()).toBeDefined();
            expect(view.getChildren().length).toEqual(1);

        });

        it("should create the custom element",()=>{

            var view:ViewBase = document.createElement("x-comp-correct-renderer") as ViewBase;
            view.initialize();

        });

        it("should transclude content",()=>{


            var view:ViewBase = new TestViewTransclude();
            view.initialize();
        });

    });

    describe("setCurrentState",()=>{

        it("should  apply state change to properties successfully",()=>{

            var testView:ViewBase = document.createElement("test-view-with-states") as ViewBase;
            testView.initialize();

            testView.setCurrentState("state1");

            //var xComp:Component = testView.children.item(0) as Component;
            //expect(xComp.getAttribute("my-attr")).toEqual("what1");

            //var div1:HTMLDivElement = testView.children.item(1) as HTMLDivElement;
            testView.setCurrentState("state2");

            //expect(xComp.getAttribute("my-attr")).toEqual("what");
            //expect(div1.getAttribute("class")).toEqual("humm");

            testView.setCurrentState("state1");

            //expect(div1.getAttribute("class")).toEqual("")


        });

        it("should apply state change to state groups successfully",()=>{

            var testView:ViewBase = document.createElement("test-view-with-states") as ViewBase;
            testView.initialize();

            testView.setCurrentState("state2");

            var div1:HTMLDivElement = testView.getChildren()[2] as HTMLDivElement;
            var div2:HTMLDivElement = (testView.getChildren()[3] as HTMLElement).children.item(0) as HTMLDivElement;

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