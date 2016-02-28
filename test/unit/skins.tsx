

import {rama} from "../../src/main"
import {Skin} from "../../src/Skin";


export class TestSkin extends Skin
{

    render():VNode {
        return <div>
            <states>
                <state name="testState"/>
            </states>
            <div id="humm"></div>
        </div>;
    }
}

export class TestSkin2 extends Skin
{


    render():VNode {

        return <div id="testComp"></div>;
    }
}