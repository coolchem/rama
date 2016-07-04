

import {TestDataGroup} from "./core/test-views";
import {DataGroup} from "../../src/DataGroup";

describe('DataGroup Spec', () => {

    describe("Setting initial properties",()=>{

        it("should set the ItemRenderer",()=>{

            var view = new TestDataGroup();

            view.initialize();

            var dataGroup:DataGroup = view.getChildren()[0] as DataGroup;

            expect(dataGroup.getItemRenderer()).toBeDefined();
        })

        it("should create ItemRenderers when DataProvider is set From node",()=>{

            var view = new TestDataGroup();

            view.initialize();

            var dataGroup:DataGroup = view.getChildren()[0] as DataGroup;

            expect(dataGroup.getChildren().length == 2).toEqual(true);
        })
    })

})