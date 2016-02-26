
import {UIElement} from "../../../src/core/UIElement";


describe('UIElement Spec', () => {


    describe("UIElement constructor",()=>{

        it("should throw error if UIElement is constructed with null or undefined element",()=>{

            function throws(){
                var UiElement:any = UIElement;

                var el = new UiElement();
            }

            function throws1(){
                var UiElement:any = UIElement;

                var el = new UiElement(null);
            }

            expect(throws).toThrowError();
            expect(throws1).toThrowError()
        });

        it("should throw error if UIElement is constructed element not instance of Node",()=>{

            function throws(){
                var UiElement:any = UIElement;

                var el = new UiElement("asdasd");
            }
            expect(throws).toThrowError();
        });

    });

    describe("interface methods",()=>{

        var el:UIElement;

        beforeEach(()=>{
            el = new UIElement(document.createElement("div"));
        });

        it("should return the reference to html node",()=>{
            var node:Node = document.createElement("div");
            el = new UIElement(node);
            expect(el.getElementRef() === node).toBe(true);
        });

        it("should be able to append UIElement",()=>{

            var node:Node = document.createElement("div");
            el.appendChild(new UIElement(node));
            expect(el.getChildren().length).toEqual(1);
            expect(el.getChildren()[0].getElementRef() === node).toBe(true);
            expect(el.getElementRef().childNodes.item(0) === node).toBe(true);
        });

        it("should be able to append UIElement at a given position",()=>{

            var node:Node = document.createElement("div");
            el.appendChild(new UIElement(document.createElement("div")));
            el.appendChildAt(new UIElement(node),0);

            expect(el.getChildren().length).toEqual(2);
            expect(el.getChildren()[0].getElementRef() === node).toBe(true);
            expect(el.getElementRef().childNodes.item(0) === node).toBe(true);
        });

        it("should be able to remove an element",()=>{

            var childEl1:UIElement = new UIElement(document.createElement("div"));

            el.appendChild(childEl1);

            el.removeChild(childEl1);

            expect(el.getChildren().length).toEqual(0);

        });

        it("should be able to remove all Children",()=>{
            var childEl1:UIElement = new UIElement(document.createElement("div"));

            el.appendChild(childEl1);

            el.removeAllChildren();

            expect(el.getChildren().length).toEqual(0);
        });
    });

    describe("Lifecycle methods",()=>{

        var el:UIElement;

        beforeEach(()=>{
            el = new UIElement(document.createElement("div"));
        });


        it("should call preInitialize before initializing element",(done)=>{

            class TestElement extends UIElement
            {

                protected preInitCalled:boolean;
                protected preInitialize():void {
                    super.preInitialize();
                    this.preInitCalled = true;
                }


                initialize():void {
                    super.initialize();
                    expect(this.preInitCalled).toBe(true);
                    done();
                }
            }
            var el:TestElement = new TestElement(document.createElement("div"));
            el.initialize();
        });

        it("should call initialized after initializing element",(done)=>{

            class TestElement1 extends UIElement
            {

                protected preInitCalled:boolean;

                protected preInitialize():void {
                    super.preInitialize();
                    this.preInitCalled = true;
                }

                protected initialized():void {
                    super.initialized();
                    expect(this.preInitCalled).toBe(true);
                    done();
                }
            }
            var el:TestElement1 = new TestElement1(document.createElement("div"));
            el.initialize();
        });


        it("should call initialize on child UIElement before adding",(done)=>{

            class TestElement2 extends UIElement
            {

                protected preInitCalled:boolean;

                protected preInitialize():void {
                    super.preInitialize();
                    this.preInitCalled = true;
                }

                protected initialized():void {
                    super.initialized();
                    expect(this.preInitCalled).toBe(true);
                    done();
                }
            }
            var el:TestElement2 = new TestElement2(document.createElement("div"));

            var parentElement:UIElement = new UIElement(document.createElement("div"));
            parentElement.appendChild(el);

        });

        it("should call preAttach and attached in while appending Child",(done)=>{

            class TestElement3 extends UIElement
            {


                preAttachCalled:boolean;

                protected preAttach():void {
                    super.preAttach();
                    this.preAttachCalled = true;

                }


                protected attached():void {
                    super.attached();
                    expect(this.preAttachCalled).toBe(true);
                    done();
                }
            }
            var el:TestElement3 = new TestElement3(document.createElement("div"));

            var parentElement:UIElement = new UIElement(document.createElement("div"));
            parentElement.appendChild(el);

        });

        it("should call preDetach and detached in order when child UIElement is being removed",(done)=>{
            class TestElement4 extends UIElement
            {


                preDetachCalled:boolean;

                protected preDetach():void {
                    this.preDetachCalled = true;

                }


                protected detached():void {
                    expect(this.preDetachCalled).toBe(true);
                    done();
                }
            }
            var el:TestElement4 = new TestElement4(document.createElement("div"));

            var parentElement:UIElement = new UIElement(document.createElement("div"));
            parentElement.appendChild(el);

            parentElement.removeChild(el);
        });

    })
});