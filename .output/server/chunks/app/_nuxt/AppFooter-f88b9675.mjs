import { _ as __nuxt_component_0 } from './nuxt-link-295e6065.mjs';
import __nuxt_component_0$1 from './logo-3c5aec70.mjs';
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_SvgoLogo = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-auto flex break-inside-avoid flex-col items-center pb-16 pt-10 print:pb-0" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://snow.dog",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_SvgoLogo, {
          class: "mb-4 w-60",
          "aria-hidden": "true"
        }, null, _parent2, _scopeId));
        _push2(`<span class="sr-only"${_scopeId}>Snowdog website</span>`);
      } else {
        return [
          createVNode(_component_SvgoLogo, {
            class: "mb-4 w-60",
            "aria-hidden": "true"
          }),
          createVNode("span", { class: "sr-only" }, "Snowdog website")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "mailto:accessibility@snow.dog",
    class: "text-lg"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` accessibility@snow.dog `);
      } else {
        return [
          createTextVNode(" accessibility@snow.dog ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=AppFooter-f88b9675.mjs.map
