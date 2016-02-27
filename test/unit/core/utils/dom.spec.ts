


import {createVNode} from "../../../../src/core/utils/dom";
describe("dom Spec",()=>{


   describe("createVNode",()=>{

      it("should return an Vnode",()=>{


          it("should return an Vnode for intrinsic element",()=>{

              var vnode = createVNode("div");
              expect(typeof vnode.type === "string").toBe(true);
              expect(vnode.type).toEqual("div");
          });

          it("should return an Vnode for custom element",()=>{

              class Test{
              }
              var vnode = createVNode(Test);
              expect(vnode.type === Test).toBe(true);
          });

          it("should return an Vnode with properties",()=>{

              var vnode = createVNode("div",{humm:"interesting",humm1:"interesting1"});

              expect(vnode.props["humm"]).toEqual("interesting");
              expect(vnode.props["humm1"]).toEqual("interesting1");
          });

          it("should return an Vnode with state managed properties",()=>{

              var vnode = createVNode("div",{
                  humm__stateName:"interesting",
                  humm__stateName1:"interesting1"});

              expect(vnode.stateManagedProps["stateName"]["humm"]).toEqual("interesting");
              expect(vnode.stateManagedProps["stateName1"]["humm"]).toEqual("interesting1");
          });

          it("should return an Vnode with children",()=>{

              class Test{
              }

              var vnode = createVNode("div",{
                  humm__stateName:"interesting",
                  humm__stateName1:"interesting1"},"child1",Test);

              expect(vnode.children.length).toEqual(2);
              expect(vnode.children[0]).toEqual("child1");
              expect(vnode.children[1]).toEqual(Test);
          })
      })

   });

    describe("createElement",()=>{


    });


});