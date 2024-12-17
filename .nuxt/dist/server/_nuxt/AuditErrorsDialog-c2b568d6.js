import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuditErrorsDialog",
  __ssrInlineRender: true,
  props: {
    header: {},
    errorMessage: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = resolveComponent("Dialog");
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        modal: "",
        header: _ctx.header,
        class: "w-full max-w-xl",
        "dismissable-mask": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-3"${_scopeId}><span class="mb-3 block text-center text-lg text-red-700"${_scopeId}> Oops, something went wrong: </span><span class="block whitespace-pre-line rounded-md bg-gray-100 p-4"${_scopeId}>${ssrInterpolate(_ctx.errorMessage)}</span></p>`);
          } else {
            return [
              createVNode("p", { class: "mb-3" }, [
                createVNode("span", { class: "mb-3 block text-center text-lg text-red-700" }, " Oops, something went wrong: "),
                createVNode("span", { class: "block whitespace-pre-line rounded-md bg-gray-100 p-4" }, toDisplayString(_ctx.errorMessage), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditErrorsDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=AuditErrorsDialog-c2b568d6.js.map
