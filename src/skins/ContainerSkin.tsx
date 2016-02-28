

import {Skin} from "../Skin";
import {Group} from "../Group";

import {rama} from "../rama"

export class ContainerSkin extends Skin
{

    render():VNode {
        return <Group id="contentGroup"/>
    }
}