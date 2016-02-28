
import {rama} from "../../../src/main"

import {ViewBase} from "../../../src/core/ViewBase";
import {UIElement} from "../../../src/core/UIElement";
import {Skin} from "../../../src/Skin";


export class TestComp extends UIElement
{


    constructor() {
        super(document.createElement("li"));
    }

    customElements:UIElement[];

    setCustomContent(elements:UIElement[]):void
    {
        this.customElements = elements;
    }
    render():VNode{
        return null
    }

}


export class TestView extends ViewBase
{

    render():VNode {
        return <div>
            <div id="myDiv"></div>
            <TestComp />
        </div>;
    }
}

export class TestViewTransclude extends ViewBase
{

    testComp:TestComp;

    render():VNode {
        return <div>
            <TestComp id="testComp">
                <customContent>
                    <div id="myDiv"></div>
                </customContent>
            </TestComp>
        </div>;
    }
}

export class TestViewWithStates extends ViewBase
{

    render():VNode {
        return <div>
            <states>
                <state name="state1"/>
                <state name="state2" stateGroups="group1,group2"/>
                <state name="state3" stateGroups="group1"/>
                <state name="state4" stateGroups="group2"/>
            </states>

            <TestComp id="1" my-attr="what" my-attr__state1="what1"/>
            <div id="2" class__state2="humm"></div>
            <div id="3" class="group" class__group1="group1"></div>
            <r-group>
                <div id="4" class="group" class__group2="group2"></div>
            </r-group>
        </div>;
    }
}
