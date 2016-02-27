
import {rama} from "../../../src/main"

import {ViewBase} from "../../../src/core/ViewBase";
import {UIElement} from "../../../src/core/UIElement";


class TestComp extends UIElement
{

}


export class TestView extends ViewBase
{

    protected render():VNode {
        return <div>
            <div id="myDiv"></div>
        </div>;
    }
}

export class TestViewTransclude extends ViewBase
{

    protected render():VNode {
        return <div>
            <div id="myDiv"></div>
        </div>;
    }
}

export class TestViewWithStates extends ViewBase
{

    protected render():VNode {
        return <div>
            <states>
                <state name="state1"/>
                <state name="state2" state-groups="group1,group2"/>
                <state name="state3" state-groups="group1"/>
                <state name="state4" state-groups="group2"/>
            </states>

            <x-comp id="1" my-attr="what" my-attr.state1="what1"/>
            <div id="2" class.state2="humm"></div>
            <div id="3" class="group" class.group1="group1"></div>
            <r-group>
                <div id="4" class="group" class.group2="group2"></div>
            </r-group>
        </div>;
    }
}