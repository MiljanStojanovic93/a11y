import { _ as __nuxt_component_0 } from './nuxt-link-295e6065.mjs';
import { a as useSupabaseClient } from '../server.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, openBlock, createBlock, toDisplayString, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { o as oneMinuteInMilliseconds } from './time-562db5c1.mjs';
import 'node:http';
import 'node:https';
import '../../nitro/node-server.mjs';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '../../index.mjs';
import '@supabase/supabase-js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuditProcessingDialog",
  __ssrInlineRender: true,
  props: {
    auditId: {}
  },
  emits: ["close"],
  setup(__props) {
    const props = __props;
    const client = useSupabaseClient();
    const isAuditFinished = ref(false);
    const axeErrorMessage = ref();
    const axeTableInsertChannel = client.channel("table-db-changes").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "axe"
      },
      (payload) => {
        var _a;
        if (payload.new.audit_id === props.auditId) {
          if (payload.new.errors) {
            axeErrorMessage.value = (_a = payload.new.errors[0]) == null ? void 0 : _a.message;
          }
          isAuditFinished.value = true;
          client.removeChannel(axeTableInsertChannel);
          clearTimeout(timeout);
        }
      }
    ).subscribe();
    const timeout = setTimeout(() => {
      client.removeChannel(axeTableInsertChannel);
      axeErrorMessage.value = "Something went wrong, test malformed.";
      isAuditFinished.value = true;
    }, 15 * oneMinuteInMilliseconds);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = resolveComponent("Dialog");
      const _component_Button = resolveComponent("Button");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProgressBar = resolveComponent("ProgressBar");
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        modal: "",
        class: "w-full max-w-xl",
        "dismissable-mask": ""
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-medium"${_scopeId}>New audit processing</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-medium" }, "New audit processing")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div aria-live="polite"${_scopeId}>`);
            if (unref(isAuditFinished)) {
              _push2(`<div class="flex min-h-[200px] items-center justify-center"${_scopeId}>`);
              if (unref(axeErrorMessage)) {
                _push2(`<div${_scopeId}><p class="mb-3"${_scopeId}><span class="mb-3 block text-center text-lg text-red-700"${_scopeId}> Oops, something went wrong: </span><span class="block whitespace-pre-line rounded-md bg-gray-100 p-4"${_scopeId}>${ssrInterpolate(unref(axeErrorMessage))}</span></p>`);
                _push2(ssrRenderComponent(_component_Button, {
                  class: "!block !w-full",
                  outlined: "",
                  onClick: ($event) => _ctx.$emit("close", { resetAuditForm: false })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Repeat audit `);
                    } else {
                      return [
                        createTextVNode(" Repeat audit ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<div${_scopeId}><p class="mb-6 text-center text-lg"${_scopeId}> Automatic tests finished successfully! </p>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "p-button !block",
                  to: `/audit/${_ctx.auditId}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View audit results `);
                    } else {
                      return [
                        createTextVNode(" View audit results ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!--[--><p class="mb-6 text-center text-lg"${_scopeId}> Your audit has been initiated and is currently being processed. Please wait a few minutes for automatic tests results to be generated. A link to the audit results will be provided here and in the `);
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/audit" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Audit List`);
                  } else {
                    return [
                      createTextVNode("Audit List")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`. </p>`);
              _push2(ssrRenderComponent(_component_ProgressBar, {
                class: "mb-3",
                mode: "indeterminate"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                class: "!block !w-full",
                text: "",
                onClick: ($event) => _ctx.$emit("close")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Create another audit in the meantime `);
                  } else {
                    return [
                      createTextVNode(" Create another audit in the meantime ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { "aria-live": "polite" }, [
                unref(isAuditFinished) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex min-h-[200px] items-center justify-center"
                }, [
                  unref(axeErrorMessage) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("p", { class: "mb-3" }, [
                      createVNode("span", { class: "mb-3 block text-center text-lg text-red-700" }, " Oops, something went wrong: "),
                      createVNode("span", { class: "block whitespace-pre-line rounded-md bg-gray-100 p-4" }, toDisplayString(unref(axeErrorMessage)), 1)
                    ]),
                    createVNode(_component_Button, {
                      class: "!block !w-full",
                      outlined: "",
                      onClick: ($event) => _ctx.$emit("close", { resetAuditForm: false })
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Repeat audit ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", { class: "mb-6 text-center text-lg" }, " Automatic tests finished successfully! "),
                    createVNode(_component_NuxtLink, {
                      class: "p-button !block",
                      to: `/audit/${_ctx.auditId}`
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" View audit results ")
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ]))
                ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("p", { class: "mb-6 text-center text-lg" }, [
                    createTextVNode(" Your audit has been initiated and is currently being processed. Please wait a few minutes for automatic tests results to be generated. A link to the audit results will be provided here and in the "),
                    createVNode(_component_NuxtLink, { to: "/audit" }, {
                      default: withCtx(() => [
                        createTextVNode("Audit List")
                      ]),
                      _: 1
                    }),
                    createTextVNode(". ")
                  ]),
                  createVNode(_component_ProgressBar, {
                    class: "mb-3",
                    mode: "indeterminate"
                  }),
                  createVNode(_component_Button, {
                    class: "!block !w-full",
                    text: "",
                    onClick: ($event) => _ctx.$emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Create another audit in the meantime ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ], 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditProcessingDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AuditProcessingDialog-e6f7122e.mjs.map
