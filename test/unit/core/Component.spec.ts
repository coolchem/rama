

import {Component} from "../../../src/core/Component";
import {element} from "../../../src/core/decorators";
import {Skin} from "../../../src/core/Skin";
import {skinPart} from "../../../src/core/decorators";
import {createElement} from "../../../src/core/utils/dom";
import {throws} from "assert";

@element("comp-spec-test-comp")
class TestComp extends Component
{

}

@element("comp-spec-test-required-parts")
class TestCompRequiredSkinParts extends Component
{

    @skinPart("humm",true)
    testComp:HTMLDivElement
}

@element("comp-spec-test-skin")
class TestSkin extends Skin
{


    protected render():string {

        return `<states>

                </states>

                <div id="humm1">

                </div>
                `;
    }
}

@element("comp-spec-test-skin2")
class TestSkin2 extends Skin
{


    protected render():string {

        return `<states>

                </states>

                <div id="humm">

                </div>
                `;
    }
}

describe('Component Spec', () => {

    describe("createChildren",()=>{

        it("should attachSkin if skinElementName is set",()=>{

            var testComp:Component = document.createElement("comp-spec-test-comp") as Component;
            testComp.setSkinElement("comp-spec-test-skin");
            testComp.__initializedCallback__();

            expect(testComp.children.length).toBe(1);
            expect(testComp.children.item(0) instanceof Skin).toBe(true);

        });

    });


    describe("setSkinElement",()=>{

        it("should attachSkin if component is initialized",()=>{
            var testComp:Component = document.createElement("comp-spec-test-comp") as Component;
            testComp.__initializedCallback__();
            testComp.setSkinElement("comp-spec-test-skin");

            expect(testComp.children.length).toBe(1);
            expect(testComp.children.item(0) instanceof Skin).toBe(true);
        });
    });


    describe("detachedCallback",()=>{

        it("should detach the skin if skin is attached",(done)=>{

            @element("comp-spec-test-detached")
            class TestCompDetached extends Component
            {

                detachedCallback():void {
                    super.detachedCallback();
                    expect(testComp.children.length).toEqual(0);
                    done();
                }
            }

            var testComp:Component = document.createElement("comp-spec-test-detached") as Component;
            testComp.setSkinElement("comp-spec-test-skin");
            testComp.__initializedCallback__();

            var div:HTMLDivElement = document.createElement("div");
            div.appendChild(testComp);

            document.body.appendChild(div);
            document.body.removeChild(div);

        });
    });

    describe("validateSkinChange",()=>{


        it("should detachSkin if skin is already created",()=>{

            var testComp:Component = createElement("comp-spec-test-comp") as Component;
            testComp.setSkinElement("comp-spec-test-skin");


            testComp.setSkinElement('comp-spec-test-skin2');

            expect(testComp.children.item(0) instanceof TestSkin2).toBe(true);

        });


        it("should attach new Skin",()=>{
            var testComp:Component = createElement("comp-spec-test-comp") as Component;
            testComp.setSkinElement("comp-spec-test-skin");

            expect(testComp.children.item(0) instanceof TestSkin).toBe(true);
        });
    });

    describe("attachSkin",()=>{

        it("should throw error if required skin parts not found",()=>{
            var throws = function(){
                var testComp:Component = createElement("comp-spec-test-required-parts") as Component;
                testComp.setSkinElement("comp-spec-test-skin");
            };

            expect(throws).toThrowError();

        });

        it("should call part added with reference to registered skin parts",(done)=>{

            @element("comp-spec-test-parts-added")
            class TestPartAdded extends Component
            {

                @skinPart("humm",true)
                testComp:HTMLDivElement;


                partAdded(id:string, instance:any):void {
                    super.partAdded(id, instance);

                    expect(this.testComp === instance).toBe(true);
                    expect(id).toEqual("humm");

                    done()
                }
            }

            var testComp:Component = createElement("comp-spec-test-parts-added") as Component;
            testComp.setSkinElement("comp-spec-test-skin2");
        });
    });

    describe("detachSkin",()=>{

        it("should call partRemoved with reference to registered skinParts",(done)=>{
            @element("comp-spec-test-parts-removed")
            class TestPartRemoved extends Component
            {

                @skinPart("humm",true)
                testComp:HTMLDivElement;


                partRemoved(id:string, instance:any):void {
                    super.partRemoved(id, instance);


                    expect(this.testComp === instance).toBe(true);
                    expect(id).toEqual("humm");

                    done()
                }
            }

            var testComp:Component = createElement("comp-spec-test-parts-removed") as Component;
            testComp.setSkinElement("comp-spec-test-skin2");

            var div:HTMLDivElement = document.createElement("div");
            div.appendChild(testComp);

            document.body.appendChild(div);
            document.body.removeChild(div);

        });


    });



});