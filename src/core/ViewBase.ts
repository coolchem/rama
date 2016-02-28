
import {createElement} from "./utils/dom";
import {createVNode} from "./utils/dom";
import {State} from "./support_classes/State";
import {PropertySetter} from "./support_classes/PropertySetter";
import {UIElement} from "./UIElement";

export abstract class ViewBase extends UIElement
{


    private _viewStates:State[];

    private _stateManagedProperties;

    private _currentState:string;
    protected _tempCurrentState:string;


    constructor() {
        super();
        this._viewStates = [];
        this._stateManagedProperties = {};
        this._currentState = "";

    }


    protected __preInitialize():void {

        this.parse();

        this._viewStates.forEach((state:State)=>{
            if (this._stateManagedProperties.hasOwnProperty(state.name)) {

                state.propertySetters.push.apply(state.propertySetters, this._stateManagedProperties[state.name]);
            }

            state.stateGroups.forEach((stateGroup)=>{
                if (this._stateManagedProperties.hasOwnProperty(stateGroup)) {

                    state.propertySetters.push.apply(state.propertySetters, this._stateManagedProperties[stateGroup]);
                }
            })

        })
    }

    initialized():void {

        this.setCurrentState(this._tempCurrentState);
    }

    private parse():void
    {

        var tempVNode:VNode = this.render();
        var statesVNode:VNode;

        if(tempVNode === null || tempVNode === undefined)
            return;

        if(typeof tempVNode.type !== "string")
        {
            throw TypeError("Custom Element cannot be the root node of a view.\n" +
                " Please make sure root node is html node, for example 'div','section' etc.")
        }

        if(tempVNode.children)
        {

            for(var i=0; i< tempVNode.children.length; i++)
            {
                var childNode:VNode|string = tempVNode.children[i];
                if((typeof childNode !== "string") && (childNode as VNode).type === "states")
                {
                    statesVNode = childNode;
                    tempVNode.children.splice(i, 1);
                    break;
                }
            }
        }

        if(statesVNode && statesVNode.children)
        {
            for (var j = 0; j < statesVNode.children.length; j++)
            {
                var stateNode:VNode = statesVNode.children[j] as VNode;
                if (typeof stateNode === "string")
                    return;

                if(stateNode.props && stateNode.props["name"] !== null && stateNode.props["name"] !== undefined)
                {
                    var state:State = new State(stateNode.props["name"], stateNode.props["stateGroups"]);
                    this._viewStates.push(state);
                }
            }
        }

        createElement(tempVNode,this,this._stateManagedProperties,this)

    }

    hasState(stateName):boolean
    {
        for (var i = 0; i < this._viewStates.length; i++)
        {
            if (this._viewStates[i].name == stateName)
                return true;
        }
        return false;

    };

    getCurrentState():string
    {
        if(!this.initialized)
            return this._tempCurrentState;

        return this._currentState;
    }
    setCurrentState(stateName:string):void {

        var oldState = this.getState(this._currentState);

        if (this.initialized) {

            if(this.isBaseState(stateName))
            {
                this.removeState(oldState);
                this._currentState = stateName;

            }
            else
            {

                var destination = this.getState(stateName);

                this.initializeState(stateName);

                // Remove the existing state
                this.removeState(oldState);
                this._currentState = stateName;

                this.applyState(destination);
            }

        }
        else
        {
            this._tempCurrentState = stateName;
        }
    }

    protected isBaseState(stateName):boolean {
        return !stateName || stateName == "";
    }

    protected initializeState(stateName):void
    {
        var state = this.getState(stateName);

        if (state)
        {
            state.initialize();
        }
    }

    protected removeState(state){

        if(state)
        {
            for(var i = 0; i< state.propertySetters.length; i++)
            {
                state.propertySetters[i].remove();
            }
        }

    }

    protected applyState(state){

        if(state)
        {
            for(var i = 0; i< state.propertySetters.length; i++)
            {
                state.propertySetters[i].apply();
            }
        }

    }

    getState(stateName:string):State
    {
        if (!this._viewStates || this.isBaseState(stateName))
            return null;

        for (var i = 0; i < this._viewStates.length; i++)
        {
            if (this._viewStates[i].name == stateName)
                return this._viewStates[i];
        }

        throw new ReferenceError("State not Found Exception: The state '" + stateName +
            "' being set on the component is not found in the skin");
    }

   abstract render():VNode;

}