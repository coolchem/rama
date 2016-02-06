
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
class TestViewEmptyRender extends ViewBase
{


    protected render():string {
        return ``;
    }
}

class TestViewNullRender extends ViewBase
{


    protected render():string {
        return null;
    }
}

class TestViewUndefinedRender extends ViewBase
{


    protected render():string {
        return undefined;
    }
}


class TestViewMultipleNodesInRender extends ViewBase
{


    protected render():string {
        return `<div>

                </div>
                <div>

                </div>`;
    }
}

class TestViewCorrectImplementation extends ViewBase
{


    protected render():string {
        return `<div>
                <x-comp my-attr="what"></x-comp>
                </div>`;
    }
}

describe('ViewBase Spec', () => {


    describe("instance Creation",()=>{

        it("should throw error if render function returns empty string",()=>{

            var throws = function() {
                new TestViewEmptyRender()
            };

            expect(throws).toThrowError();


        });

        it("should throw error if render function returns null",()=>{

            var throws = function() {
                new TestViewNullRender()
            };

            expect(throws).toThrowError();
        });

        it("should throw error if render function returns undefined",()=>{

            var throws = function() {
                new TestViewUndefinedRender()
            };

            expect(throws).toThrowError();
        });

        it("should throw error if render returns multiple nodes",()=>{

            var throws = function() {
                new TestViewMultipleNodesInRender()
            };

            expect(throws).toThrowError();
        });

        it("should not throw error if everything is good",()=>{

            var throws = function() {
                new TestViewCorrectImplementation()
            };

            expect(throws).not.toThrowError();
        });

    });

    describe("get element",()=>{

        beforeEach(()=>{
            testCompCreated = false;
        });

        it("should not be null or undefined",()=>{

            var view:ViewBase = new TestViewCorrectImplementation();

            expect(view.element).toBeDefined();
            expect(view.element).not.toBeNaN();

        });

        it("should be instance of HTMLElement",()=>{

            var view:ViewBase = new TestViewCorrectImplementation();

            var instanceOfHtmlElement:boolean = view.element instanceof HTMLElement;

            expect(instanceOfHtmlElement).toBe(true);

        });

        it("should give an instance which can be appended to other element without error",()=>{

            var view:ViewBase = new TestViewCorrectImplementation();

            var throws = function() {

                var div:HTMLDivElement = document.createElement("div");
                div.appendChild(view.element);

            };

            expect(throws).not.toThrowError();

        });

        it("should create the custom element",()=>{

            var view:ViewBase = new TestViewCorrectImplementation();

            document.body.appendChild(view.element);
            expect(testCompCreated).toBe(true);

        });

    });
});