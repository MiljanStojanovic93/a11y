import { _ as __nuxt_component_0 } from "./nuxt-link-295e6065.js";
import { defineComponent, ref, unref, withCtx, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import "hookable";
import { f as useRoute, a as useSupabaseClient, e as useToast } from "../server.mjs";
import "destr";
import "devalue";
import "klona";
import { ssrRenderComponent, ssrRenderVNode } from "vue/server-renderer";
import "ufo";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "vue-router";
import "h3";
import "cookie-es";
import "ohash";
import "defu";
import "@supabase/supabase-js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuditSelectReportTypeModalContent",
  __ssrInlineRender: true,
  props: {
    noAxe: { type: Boolean }
  },
  setup(__props) {
    const route = useRoute();
    const auditId = route.params.id;
    useSupabaseClient();
    const NuxtLink = __nuxt_component_0;
    useToast();
    const areManualTestsValidated = ref(false);
    const areManualTestsValid = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h2 class="font-medium">Select the type of report</h2><div class="divide-y">`);
      if (!_ctx.noAxe) {
        _push(`<div class="py-4"><div class="grid grid-cols-[1fr_42px] items-center gap-4 md:gap-14"><div><h3 class="font-medium">Review</h3><p> Presents automatic and manual test results for all pages and screen sizes sorted by categories. To generate this report you don&#39;t need to have manual tests completed. </p></div>`);
        _push(ssrRenderComponent(unref(NuxtLink), {
          to: `/audit/report/${unref(auditId)}?type=review`,
          class: "p-button p-component p-button-icon-only p-button-rounded p-button-outlined"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="p-button-icon pi pi-chevron-right"${_scopeId}></span>`);
            } else {
              return [
                createVNode("span", { class: "p-button-icon pi pi-chevron-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="py-4"><div class="grid grid-cols-[1fr_42px] items-center gap-4"><div><h3 class="font-medium">Functional</h3><p>`);
      if (_ctx.noAxe) {
        _push(`<!--[--> Presents manual test results for all screen sizes sorted by categories. To generate this report you need to have manual tests completed. <!--]-->`);
      } else {
        _push(`<!--[--> The same report as the review but it requires complete manual tests for all pages and screen sizes. <!--]-->`);
      }
      _push(` This means each test should have the status different than &quot;Not tested&quot;. </p>`);
      if (unref(areManualTestsValidated) && !unref(areManualTestsValid)) {
        _push(`<p class="text-red-700"> Manual tests aren&#39;t completed yet. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(areManualTestsValid) ? unref(NuxtLink) : "div"), {
        to: `/audit/report/${unref(auditId)}?type=functional`,
        class: ["p-button p-component p-button-icon-only p-button-rounded p-button-outlined", {
          "p-button-secondary !cursor-not-allowed": !unref(areManualTestsValid),
          "p-button-secondary !cursor-wait": !unref(areManualTestsValidated)
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="p-button-icon pi pi-chevron-right"${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "p-button-icon pi pi-chevron-right" })
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`</div></div><div class="py-4"><div class="grid grid-cols-[1fr_42px] items-center gap-4"><div><h3 class="font-medium">WCAG</h3><p> Mainly required for public sector. It&#39;s build on WCAG Success Criterion to be compliant with the requirements of the law on accessibility. </p><p class="text-yellow-700">Currently not available.</p></div>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent("div"), {
        class: ["p-button p-component p-button-icon-only p-button-rounded p-button-outlined", { "p-button-secondary !cursor-not-allowed": true }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="p-button-icon pi pi-chevron-right"${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "p-button-icon pi pi-chevron-right" })
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditSelectReportTypeModalContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=AuditSelectReportTypeModalContent-10e7c1d0.js.map
