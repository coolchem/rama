
import {REvent} from "../../../../src/core/base/REvent";
class TestEvent extends REvent
{
    data = {name:"humm"};


}
describe('Event Spec', () => {


    describe("getEventObject",()=>{


        it("should return an instance of native Event",()=>{

            var event = new TestEvent("humm");

            var evtObject:Event = event.getEventObject();

            expect(evtObject instanceof Event).toBe(true);

            expect(evtObject.bubbles).toBe(true);

        });


        it("the eventObject should contain all public properties present on the Instance of REvent",()=>{

            var event = new TestEvent("humm");

            var evtObject:any = event.getEventObject();

            expect(evtObject.data.name).toEqual("humm");

        });

    });
});