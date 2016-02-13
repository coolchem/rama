
import {element} from "../../../../src/core/decorators";
import {GroupBase} from "../../../../src/core/base/GroupBase";
import {createElement} from "../../../../src/core/utils/dom";


@element("test-group-base")
class TestGroupBase extends GroupBase
{

}
describe('GroupBase Spec', () => {


    describe("setHTMLContent",()=>{

        it("should not create the children from HTMLContent if component is not initialized",()=>{

            var groupBase:TestGroupBase = document.createElement("test-group-base") as TestGroupBase;

            groupBase.setHTMLContent([{tagName:"div",attributes:{id:"div1"}},{tagName:"div",attributes:{id:"div2"}}])

            expect(this.children).toBeUndefined()
        });

        it("should create the children from HTMLContent if component is initialized",()=>{

            var groupBase:TestGroupBase = createElement("test-group-base") as TestGroupBase;

            groupBase.setHTMLContent([{tagName:"div",attributes:{id:"div1"}},{tagName:"div",attributes:{id:"div2"}}])

            expect(groupBase.children.length).toEqual(2);
        });
    });

    describe("createChildren",()=>{


        it("should create children if htmlContent is set",()=>{

            var groupBase:TestGroupBase = document.createElement("test-group-base") as TestGroupBase;

            groupBase.setHTMLContent([{tagName:"div",attributes:{id:"div1"}},{tagName:"div",attributes:{id:"div2"}}])

            groupBase.__initializedCallback__();
            expect(groupBase.children.length).toEqual(2);

        });


        it("should not recreate children if htmlContent is set an component is already initialized",()=>{

            var groupBase:TestGroupBase = document.createElement("test-group-base") as TestGroupBase;

            groupBase.setHTMLContent([{tagName:"div",attributes:{id:"div1"}},{tagName:"div",attributes:{id:"div2"}}])

            groupBase.__initializedCallback__();

            var div1 = groupBase.children.item(0);

            groupBase.__initializedCallback__();

            var isSameReference:boolean = div1 === groupBase.children.item(0);

            expect(isSameReference).toEqual(true);

        });
    });

});