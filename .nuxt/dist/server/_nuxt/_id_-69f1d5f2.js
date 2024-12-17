import { defineComponent, mergeProps, unref, useSSRContext, ref, resolveComponent, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, withDirectives, Fragment, renderList, createCommentVNode, vShow, computed, version, inject, watchEffect, watch, getCurrentInstance, withAsyncContext, isRef } from "vue";
import "hookable";
import "destr";
import "devalue";
import { getRequestURL } from "h3";
import { joinURL } from "ufo";
import { k as useRequestEvent, l as useRuntimeConfig, a as useSupabaseClient, f as useRoute, u as useSupabaseUser, c as createError, e as useToast } from "../server.mjs";
import "klona";
import { a as useClipboard } from "./index-8b092d42.js";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-295e6065.js";
import __nuxt_component_0$2 from "./logo-3c5aec70.js";
import __nuxt_component_0 from "./worried-face-6120ec54.js";
import __nuxt_component_1 from "./confused-face-0428d40a.js";
import __nuxt_component_2 from "./smiling-face-e7198ef2.js";
import __nuxt_component_3 from "./without-mouth-face-23a352dd.js";
import { defineHeadPlugin, composableNames } from "@unhead/shared";
import { u as useAudit, g as getStatus } from "./get-status-8e496c81.js";
import { getActiveHead } from "unhead";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "vue-router";
import "cookie-es";
import "ohash";
import "defu";
import "@supabase/supabase-js";
function useRequestURL() {
  {
    const url = getRequestURL(useRequestEvent());
    url.pathname = joinURL(useRuntimeConfig().app.baseURL, url.pathname);
    return url;
  }
}
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AuditReportSharableLink",
  __ssrInlineRender: true,
  setup(__props) {
    const { origin, pathname, searchParams } = useRequestURL();
    const sharableLink = origin + pathname + "?type=" + (searchParams.get("type") || "review") + "&share=true";
    const { copy, copied, isSupported } = useClipboard({
      source: sharableLink
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "print:hidden" }, _attrs))}><h2 class="text-blue-900">Share report</h2><div class="flex justify-between rounded-md border border-blue-900 bg-white"><span class="break-all px-4 py-2">${ssrInterpolate(sharableLink)}</span><div>`);
      if (unref(isSupported)) {
        _push(`<button class="h-full min-w-[80px] flex-1 cursor-pointer bg-blue-900 text-white">`);
        if (!unref(copied)) {
          _push(`<span>Copy</span>`);
        } else {
          _push(`<span>Copied!</span>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditReportSharableLink.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AuditReportIssuesCount",
  __ssrInlineRender: true,
  props: {
    count: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({ class: "flex w-full flex-col items-center justify-between gap-1 rounded-md border-4 border-red-600 bg-red-50 font-medium md:aspect-square" }, _attrs))}><span class="w-full bg-red-600 p-2 text-center text-xl uppercase text-white"> issues </span><span class="flex flex-1 items-center justify-center p-6 text-7xl text-red-600">${ssrInterpolate(_ctx.count)}</span></p>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditReportIssuesCount.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "StatusFaceIcon",
  __ssrInlineRender: true,
  props: {
    statusList: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SvgoWorriedFace = __nuxt_component_0;
      const _component_SvgoConfusedFace = __nuxt_component_1;
      const _component_SvgoSmilingFace = __nuxt_component_2;
      const _component_SvgoWithoutMouthFace = __nuxt_component_3;
      if (_ctx.statusList.some((status) => status === "Failed")) {
        _push(ssrRenderComponent(_component_SvgoWorriedFace, mergeProps({ role: "img" }, _attrs), null, _parent));
      } else if (_ctx.statusList.some((status) => status === "Not tested")) {
        _push(ssrRenderComponent(_component_SvgoConfusedFace, mergeProps({ role: "img" }, _attrs), null, _parent));
      } else if (_ctx.statusList.some((status) => status === "Passed")) {
        _push(ssrRenderComponent(_component_SvgoSmilingFace, mergeProps({ role: "img" }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(_component_SvgoWithoutMouthFace, mergeProps({ role: "img" }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatusFaceIcon.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TrustedTestInfo",
  __ssrInlineRender: true,
  props: {
    info: {},
    displayedInfoKeys: {},
    status: {}
  },
  setup(__props) {
    const collapsibleItemsState = ref({
      Note: { isOpen: false },
      Techniques: { isOpen: false },
      "Disability Impact": { isOpen: false }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = resolveComponent("Tag");
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      if (_ctx.displayedInfoKeys.includes("Test Name") || _ctx.status) {
        _push(`<div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">`);
        if (_ctx.displayedInfoKeys.includes("Test Name")) {
          _push(`<h3 class="text-xl font-semibold">${ssrInterpolate(_ctx.info["Test Name"])}</h3>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.status) {
          _push(`<div class="-order-1 sm:order-1">`);
          _push(ssrRenderComponent(_component_Tag, {
            class: ["!text-base sm:min-w-[200px] sm:!py-2", { "!bg-gray-600": _ctx.status === "Not applicable" }],
            value: _ctx.status,
            rounded: "",
            severity: _ctx.status === "Passed" ? "success" : _ctx.status === "Failed" ? "danger" : "primary"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="space-y-1"><!--[-->`);
      ssrRenderList(_ctx.info, (tTValue, tTKey) => {
        _push(`<li>`);
        if (_ctx.displayedInfoKeys.includes(tTKey) && tTKey !== "Test Name" && tTValue) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tTKey in unref(collapsibleItemsState) ? "details" : "div"), null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (tTKey in unref(collapsibleItemsState)) {
                  _push2(`<summary class="flex w-full cursor-pointer items-center gap-2 bg-white p-0 text-base font-bold"${ssrIncludeBooleanAttr(unref(collapsibleItemsState)[tTKey].isOpen) ? " open" : ""}${_scopeId}>${ssrInterpolate(tTKey)} <i class="${ssrRenderClass([{ "rotate-180": unref(collapsibleItemsState)[tTKey].isOpen }, "pi pi-chevron-down pt-0.5 !text-sm transition-transform"])}" aria-hidden="true"${_scopeId}></i></summary>`);
                } else {
                  _push2(`<span class="inline-block font-bold"${_scopeId}>${ssrInterpolate(tTKey)}:  </span>`);
                }
                _push2(`<span style="${ssrRenderStyle(!(tTKey in unref(collapsibleItemsState)) || unref(collapsibleItemsState)[tTKey].isOpen ? null : { display: "none" })}"${_scopeId}>`);
                if (Array.isArray(tTValue)) {
                  _push2(`<!--[-->`);
                  if (tTKey === "WCAG SC") {
                    _push2(`<ul class="inline-flex gap-2"${_scopeId}><!--[-->`);
                    ssrRenderList(tTValue, (tTValueItem, index) => {
                      _push2(`<li${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_Tag, {
                        value: tTValueItem,
                        severity: "success",
                        rounded: "",
                        class: "tracking-wider [&>.p-tag-value]:leading-4"
                      }, null, _parent2, _scopeId));
                      _push2(`</li>`);
                    });
                    _push2(`<!--]--></ul>`);
                  } else {
                    _push2(`<ol class="mt-1 list-decimal space-y-1 pl-8"${_scopeId}><!--[-->`);
                    ssrRenderList(tTValue, (tTValueItem, index) => {
                      _push2(`<li${_scopeId}>`);
                      if (tTKey === "URLs") {
                        _push2(ssrRenderComponent(_component_NuxtLink, {
                          target: "_blank",
                          to: tTValueItem
                        }, {
                          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                            if (_push3) {
                              _push3(`${ssrInterpolate(tTValueItem)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(tTValueItem), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent2, _scopeId));
                      } else {
                        _push2(`<!--[-->${ssrInterpolate(tTValueItem)}<!--]-->`);
                      }
                      _push2(`</li>`);
                    });
                    _push2(`<!--]--></ol>`);
                  }
                  _push2(`<!--]-->`);
                } else if (typeof tTValue === "string") {
                  _push2(`<!--[-->`);
                  if (["Level"].includes(tTKey)) {
                    _push2(ssrRenderComponent(_component_Tag, {
                      value: tTValue,
                      severity: "info",
                      rounded: "",
                      class: "tracking-wider [&>.p-tag-value]:leading-4"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<span class="${ssrRenderClass({ "mt-1 block": tTKey in unref(collapsibleItemsState) })}"${_scopeId}>${ssrInterpolate(tTValue)}</span>`);
                  }
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                return [
                  tTKey in unref(collapsibleItemsState) ? (openBlock(), createBlock("summary", {
                    key: 0,
                    class: "flex w-full cursor-pointer items-center gap-2 bg-white p-0 text-base font-bold",
                    open: unref(collapsibleItemsState)[tTKey].isOpen,
                    onClick: ($event) => unref(collapsibleItemsState)[tTKey].isOpen = !unref(collapsibleItemsState)[tTKey].isOpen
                  }, [
                    createTextVNode(toDisplayString(tTKey) + " ", 1),
                    createVNode("i", {
                      class: ["pi pi-chevron-down pt-0.5 !text-sm transition-transform", { "rotate-180": unref(collapsibleItemsState)[tTKey].isOpen }],
                      "aria-hidden": "true"
                    }, null, 2)
                  ], 8, ["open", "onClick"])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "inline-block font-bold"
                  }, toDisplayString(tTKey) + ":  ", 1)),
                  withDirectives(createVNode("span", null, [
                    Array.isArray(tTValue) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      tTKey === "WCAG SC" ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "inline-flex gap-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(tTValue, (tTValueItem, index) => {
                          return openBlock(), createBlock("li", { key: index }, [
                            createVNode(_component_Tag, {
                              value: tTValueItem,
                              severity: "success",
                              rounded: "",
                              class: "tracking-wider [&>.p-tag-value]:leading-4"
                            }, null, 8, ["value"])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("ol", {
                        key: 1,
                        class: "mt-1 list-decimal space-y-1 pl-8"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(tTValue, (tTValueItem, index) => {
                          return openBlock(), createBlock("li", { key: index }, [
                            tTKey === "URLs" ? (openBlock(), createBlock(_component_NuxtLink, {
                              key: 0,
                              target: "_blank",
                              to: tTValueItem
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tTValueItem), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(tTValueItem), 1)
                            ], 64))
                          ]);
                        }), 128))
                      ]))
                    ], 64)) : typeof tTValue === "string" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                      ["Level"].includes(tTKey) ? (openBlock(), createBlock(_component_Tag, {
                        key: 0,
                        value: tTValue,
                        severity: "info",
                        rounded: "",
                        class: "tracking-wider [&>.p-tag-value]:leading-4"
                      }, null, 8, ["value"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: { "mt-1 block": tTKey in unref(collapsibleItemsState) }
                      }, toDisplayString(tTValue), 3))
                    ], 64)) : createCommentVNode("", true)
                  ], 512), [
                    [
                      vShow,
                      !(tTKey in unref(collapsibleItemsState)) || unref(collapsibleItemsState)[tTKey].isOpen
                    ]
                  ])
                ];
              }
            }),
            _: 2
          }), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul><!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TrustedTestInfo.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AuditAutomaticTestResultSummary",
  __ssrInlineRender: true,
  props: {
    totalCount: {},
    issuesCount: {},
    passesCount: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProgressBar = resolveComponent("ProgressBar");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-md border p-6" }, _attrs))}><h3 class="mb-2 text-lg font-medium"> Total tested elements: ${ssrInterpolate(_ctx.totalCount)}</h3><div class="space-y-4"><!--[-->`);
      ssrRenderList([
        { name: "Issues", count: _ctx.issuesCount },
        { name: "Passes", count: _ctx.passesCount }
      ], ({ name, count }) => {
        _push(`<div><h4 class="mb-2 text-sm font-medium">${ssrInterpolate(name)}</h4><div class="grid grid-cols-[1fr_48px]">`);
        _push(ssrRenderComponent(_component_ProgressBar, {
          value: count / _ctx.totalCount * 100,
          "show-value": false,
          class: {
            "[&>.p-progressbar-value]:!bg-red-600": name === "Issues",
            "[&>.p-progressbar-value]:!bg-green-600": name === "Passes"
          }
        }, null, _parent));
        _push(`<span class="text-right font-medium">${ssrInterpolate(count)}</span></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditAutomaticTestResultSummary.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AuditReportPageStatuses",
  __ssrInlineRender: true,
  props: {
    pageStatuses: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = resolveComponent("Tag");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-md border p-6" }, _attrs))}><h3 class="text-lg font-medium">Test status</h3><ul class="divide-y"><!--[-->`);
      ssrRenderList(_ctx.pageStatuses, ({ status, pageName }, index) => {
        _push(`<li class="py-4 last-of-type:pb-0"><div class="mb-2 break-all text-sm font-medium">${ssrInterpolate(pageName)}</div>`);
        _push(ssrRenderComponent(_component_Tag, {
          class: ["w-full !text-base", { "!bg-gray-600": status === "Not applicable" }],
          value: status,
          severity: status === "Passed" ? "success" : status === "Failed" ? "danger" : "primary"
        }, null, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditReportPageStatuses.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AuditReportManualTestResults",
  __ssrInlineRender: true,
  props: {
    type: {},
    manualTestResults: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["break-inside-avoid rounded-md border p-6", {
          "border-red-600": _ctx.type === "issues",
          "border-green-600": _ctx.type === "passes"
        }]
      }, _attrs))}>`);
      if (["issues", "passes"].includes(_ctx.type)) {
        _push(`<h5 class="${ssrRenderClass([{
          "text-red-800": _ctx.type === "issues",
          "text-green-800": _ctx.type === "passes"
        }, "text-lg font-medium"])}"> Manual tests </h5>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="${ssrRenderClass([{
        "divide-red-600": _ctx.type === "issues",
        "divide-green-600": _ctx.type === "passes"
      }, "divide-y"])}"><!--[-->`);
      ssrRenderList(_ctx.manualTestResults, (manualTestResult, manualTestResultIndex) => {
        _push(`<li class="space-y-4 py-4 last-of-type:pb-0">`);
        if (manualTestResult.pageName) {
          _push(`<h5 class="break-words text-base font-medium">${ssrInterpolate(manualTestResult.pageName)}</h5>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div>`);
        if (manualTestResult.issues.length) {
          _push(`<p><span class="font-medium">Issues:</span> ${ssrInterpolate(manualTestResult.issues)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (manualTestResult.recommendedFixes.length) {
          _push(`<p><span class="font-medium"> Recommended fixes: </span> ${ssrInterpolate(manualTestResult.recommendedFixes)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul></li>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditReportManualTestResults.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AuditAutomaticTestResultIssue",
  __ssrInlineRender: true,
  props: {
    id: {},
    description: {},
    impact: {},
    groupedNodes: {}
  },
  setup(__props) {
    const props = __props;
    const isCollapsible = computed(() => {
      var _a;
      return (_a = props.groupedNodes[0]) == null ? void 0 : _a.pageName;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "rounded-md border border-red-600 p-6" }, _attrs))}><h5 class="text-lg font-medium text-red-800">${ssrInterpolate(_ctx.id)}</h5><p class="font-medium">${ssrInterpolate(_ctx.description)}.</p><p><span class="font-medium">Impact: </span> ${ssrInterpolate(_ctx.impact || "n/a")} `);
      if (_ctx.impact) {
        _push(`<span class="${ssrRenderClass([{
          "bg-red-700": _ctx.impact === "critical",
          "bg-red-500": _ctx.impact === "serious",
          "bg-red-300": _ctx.impact === "moderate",
          "bg-red-100": _ctx.impact === "minor"
        }, "inline-block h-3 w-3 rounded-full border border-gray-700"])}"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(isCollapsible) ? "Accordion" : "div"), {
        multiple: true,
        class: ["break-inside-avoid", { "mt-6": unref(isCollapsible) }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.groupedNodes, ({ pageName, nodes }, index) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(isCollapsible) ? "AccordionTab" : "div"), { key: index }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}><span class="break-all"${_scopeId2}>${ssrInterpolate(pageName)}</span><span class="text-red-800"${_scopeId2}> (${ssrInterpolate(nodes.length)})</span></span>`);
                  } else {
                    return [
                      createVNode("span", null, [
                        createVNode("span", { class: "break-all" }, toDisplayString(pageName), 1),
                        createVNode("span", { class: "text-red-800" }, " (" + toDisplayString(nodes.length) + ")", 1)
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<ol title="HTML nodes" class="divide-y divide-red-600"${_scopeId2}><!--[-->`);
                    ssrRenderList(nodes, (node, nodeIndex) => {
                      _push3(`<li class="grid break-inside-avoid grid-cols-[34px_minmax(0,1fr)] py-6 pr-1 first-of-type:pt-3 last-of-type:pb-0"${_scopeId2}><span class="font-medium text-red-800" aria-hidden="true"${_scopeId2}>${ssrInterpolate(nodeIndex + 1)}. </span><div${_scopeId2}><div class="mb-1"${_scopeId2}><span class="font-medium"${_scopeId2}>How to fix: </span> ${ssrInterpolate(node.failureSummary)}. </div><div class="mb-2 space-x-1 space-y-1"${_scopeId2}><span class="font-medium"${_scopeId2}>HTML target:</span><code class="break-words rounded-md bg-gray-100 px-2 py-1"${_scopeId2}>${ssrInterpolate(node.target.join(", "))}</code></div><div class="rounded-md bg-gray-100 p-4"${_scopeId2}><code class="break-words"${_scopeId2}>${ssrInterpolate(node.html)}</code></div></div></li>`);
                    });
                    _push3(`<!--]--></ol>`);
                  } else {
                    return [
                      createVNode("ol", {
                        title: "HTML nodes",
                        class: "divide-y divide-red-600"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(nodes, (node, nodeIndex) => {
                          return openBlock(), createBlock("li", {
                            key: nodeIndex,
                            class: "grid break-inside-avoid grid-cols-[34px_minmax(0,1fr)] py-6 pr-1 first-of-type:pt-3 last-of-type:pb-0"
                          }, [
                            createVNode("span", {
                              class: "font-medium text-red-800",
                              "aria-hidden": "true"
                            }, toDisplayString(nodeIndex + 1) + ". ", 1),
                            createVNode("div", null, [
                              createVNode("div", { class: "mb-1" }, [
                                createVNode("span", { class: "font-medium" }, "How to fix: "),
                                createTextVNode(" " + toDisplayString(node.failureSummary) + ". ", 1)
                              ]),
                              createVNode("div", { class: "mb-2 space-x-1 space-y-1" }, [
                                createVNode("span", { class: "font-medium" }, "HTML target:"),
                                createVNode("code", { class: "break-words rounded-md bg-gray-100 px-2 py-1" }, toDisplayString(node.target.join(", ")), 1)
                              ]),
                              createVNode("div", { class: "rounded-md bg-gray-100 p-4" }, [
                                createVNode("code", { class: "break-words" }, toDisplayString(node.html), 1)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.groupedNodes, ({ pageName, nodes }, index) => {
                return openBlock(), createBlock(resolveDynamicComponent(unref(isCollapsible) ? "AccordionTab" : "div"), { key: index }, {
                  header: withCtx(() => [
                    createVNode("span", null, [
                      createVNode("span", { class: "break-all" }, toDisplayString(pageName), 1),
                      createVNode("span", { class: "text-red-800" }, " (" + toDisplayString(nodes.length) + ")", 1)
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode("ol", {
                      title: "HTML nodes",
                      class: "divide-y divide-red-600"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(nodes, (node, nodeIndex) => {
                        return openBlock(), createBlock("li", {
                          key: nodeIndex,
                          class: "grid break-inside-avoid grid-cols-[34px_minmax(0,1fr)] py-6 pr-1 first-of-type:pt-3 last-of-type:pb-0"
                        }, [
                          createVNode("span", {
                            class: "font-medium text-red-800",
                            "aria-hidden": "true"
                          }, toDisplayString(nodeIndex + 1) + ". ", 1),
                          createVNode("div", null, [
                            createVNode("div", { class: "mb-1" }, [
                              createVNode("span", { class: "font-medium" }, "How to fix: "),
                              createTextVNode(" " + toDisplayString(node.failureSummary) + ". ", 1)
                            ]),
                            createVNode("div", { class: "mb-2 space-x-1 space-y-1" }, [
                              createVNode("span", { class: "font-medium" }, "HTML target:"),
                              createVNode("code", { class: "break-words rounded-md bg-gray-100 px-2 py-1" }, toDisplayString(node.target.join(", ")), 1)
                            ]),
                            createVNode("div", { class: "rounded-md bg-gray-100 p-4" }, [
                              createVNode("code", { class: "break-words" }, toDisplayString(node.html), 1)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditAutomaticTestResultIssue.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AuditAutomaticTestResultPass",
  __ssrInlineRender: true,
  props: {
    id: {},
    description: {},
    impact: {},
    groupedNodes: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "rounded-md border border-green-600 p-6" }, _attrs))}><h5 class="text-lg font-medium text-green-800">${ssrInterpolate(_ctx.id)}</h5><p class="mb-4 font-medium">${ssrInterpolate(_ctx.description)}.</p><ul class="divide-y divide-green-600"><!--[-->`);
      ssrRenderList(_ctx.groupedNodes, ({ pageName, nodes }, index) => {
        _push(`<li class="${ssrRenderClass([{ "py-6 last-of-type:pb-0": _ctx.groupedNodes.length > 1 }, "break-inside-avoid"])}">`);
        if (pageName) {
          _push(`<h6 class="mb-2 break-all text-base font-medium">${ssrInterpolate(pageName)}</h6>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p><span class="font-medium text-green-800">${ssrInterpolate(nodes.length)}</span> ${ssrInterpolate(nodes.length === 1 ? "element" : "elements")} passed the test. </p></li>`);
      });
      _push(`<!--]--></ul></li>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditAutomaticTestResultPass.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuditReportCategoryTests",
  __ssrInlineRender: true,
  props: {
    name: {},
    status: {},
    tests: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusFaceIcon = _sfc_main$8;
      const _component_Accordion = resolveComponent("Accordion");
      const _component_AccordionTab = resolveComponent("AccordionTab");
      const _component_TrustedTestInfo = _sfc_main$7;
      const _component_AuditAutomaticTestResultSummary = _sfc_main$6;
      const _component_AuditReportPageStatuses = _sfc_main$5;
      const _component_AuditReportManualTestResults = _sfc_main$4;
      const _component_AuditAutomaticTestResultIssue = _sfc_main$3;
      const _component_AuditAutomaticTestResultPass = _sfc_main$2;
      _push(`<!--[--><div class="mb-6 flex break-after-avoid items-center"><h2 class="order-1 ml-3 text-2xl font-medium">${ssrInterpolate(_ctx.name)}</h2>`);
      _push(ssrRenderComponent(_component_StatusFaceIcon, {
        "status-list": [_ctx.status],
        class: "h-12 w-12"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Accordion, { multiple: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.tests, (test, testIndex) => {
              _push2(ssrRenderComponent(_component_AccordionTab, { key: testIndex }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="mr-2"${_scopeId2}>${ssrInterpolate(test.name)}</span>`);
                    _push3(ssrRenderComponent(_component_StatusFaceIcon, {
                      "status-list": test.pageStatuses.map(({ status }) => status),
                      class: "h-8 w-8"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("span", { class: "mr-2" }, toDisplayString(test.name), 1),
                      createVNode(_component_StatusFaceIcon, {
                        "status-list": test.pageStatuses.map(({ status }) => status),
                        class: "h-8 w-8"
                      }, null, 8, ["status-list"])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b, _c, _d;
                  if (_push3) {
                    _push3(`<div class="mb-4 grid break-inside-avoid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2"${_scopeId2}><div class="flex h-full flex-col space-y-4"${_scopeId2}><div class="flex-1 rounded-md border p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_TrustedTestInfo, {
                      info: test.info,
                      "displayed-info-keys": ["WCAG SC", "Level", "Test Conditions"]
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (test.testedElementsCount > 0) {
                      _push3(ssrRenderComponent(_component_AuditAutomaticTestResultSummary, {
                        "total-count": test.testedElementsCount,
                        "issues-count": ((_a = test.groupedResults.find((group) => group.type === "issues")) == null ? void 0 : _a.testedElementsCount) || 0,
                        "passes-count": ((_b = test.groupedResults.find((group) => group.type === "passes")) == null ? void 0 : _b.testedElementsCount) || 0
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_AuditReportPageStatuses, {
                      "page-statuses": test.pageStatuses
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(test.groupedResults, (group, groupIndex) => {
                      _push3(`<!--[-->`);
                      if (group.manualTestResults.length || group.automaticTestResults.length) {
                        _push3(`<div class="rounded-md border p-6"${_scopeId2}><h3 class="mb-4 text-lg font-medium first-letter:uppercase"${_scopeId2}>${ssrInterpolate(group.type)} <span class="${ssrRenderClass({
                          "text-red-800": group.type === "issues",
                          "text-green-800": group.type === "passes"
                        })}"${_scopeId2}> (${ssrInterpolate(group.testedElementsCount + group.manualTestResults.length)}) </span></h3><ul class="space-y-4"${_scopeId2}>`);
                        if (group.manualTestResults.length) {
                          _push3(ssrRenderComponent(_component_AuditReportManualTestResults, {
                            type: group.type,
                            "manual-test-results": group.manualTestResults
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<!--[-->`);
                        ssrRenderList(group.automaticTestResults, (automaticTestResult, automaticTestResultIndex) => {
                          _push3(`<!--[-->`);
                          if (group.type === "issues") {
                            _push3(ssrRenderComponent(_component_AuditAutomaticTestResultIssue, {
                              id: automaticTestResult.id,
                              description: automaticTestResult.description,
                              impact: automaticTestResult.impact,
                              "grouped-nodes": automaticTestResult.groupedNodes
                            }, null, _parent3, _scopeId2));
                          } else {
                            _push3(ssrRenderComponent(_component_AuditAutomaticTestResultPass, {
                              id: automaticTestResult.id,
                              description: automaticTestResult.description,
                              impact: automaticTestResult.impact,
                              "grouped-nodes": automaticTestResult.groupedNodes
                            }, null, _parent3, _scopeId2));
                          }
                          _push3(`<!--]-->`);
                        });
                        _push3(`<!--]--></ul></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "mb-4 grid break-inside-avoid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2" }, [
                        createVNode("div", { class: "flex h-full flex-col space-y-4" }, [
                          createVNode("div", { class: "flex-1 rounded-md border p-6" }, [
                            createVNode(_component_TrustedTestInfo, {
                              info: test.info,
                              "displayed-info-keys": ["WCAG SC", "Level", "Test Conditions"]
                            }, null, 8, ["info"])
                          ]),
                          test.testedElementsCount > 0 ? (openBlock(), createBlock(_component_AuditAutomaticTestResultSummary, {
                            key: 0,
                            "total-count": test.testedElementsCount,
                            "issues-count": ((_c = test.groupedResults.find((group) => group.type === "issues")) == null ? void 0 : _c.testedElementsCount) || 0,
                            "passes-count": ((_d = test.groupedResults.find((group) => group.type === "passes")) == null ? void 0 : _d.testedElementsCount) || 0
                          }, null, 8, ["total-count", "issues-count", "passes-count"])) : createCommentVNode("", true)
                        ]),
                        createVNode(_component_AuditReportPageStatuses, {
                          "page-statuses": test.pageStatuses
                        }, null, 8, ["page-statuses"])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(test.groupedResults, (group, groupIndex) => {
                          return openBlock(), createBlock(Fragment, { key: groupIndex }, [
                            group.manualTestResults.length || group.automaticTestResults.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "rounded-md border p-6"
                            }, [
                              createVNode("h3", { class: "mb-4 text-lg font-medium first-letter:uppercase" }, [
                                createTextVNode(toDisplayString(group.type) + " ", 1),
                                createVNode("span", {
                                  class: {
                                    "text-red-800": group.type === "issues",
                                    "text-green-800": group.type === "passes"
                                  }
                                }, " (" + toDisplayString(group.testedElementsCount + group.manualTestResults.length) + ") ", 3)
                              ]),
                              createVNode("ul", { class: "space-y-4" }, [
                                group.manualTestResults.length ? (openBlock(), createBlock(_component_AuditReportManualTestResults, {
                                  key: 0,
                                  type: group.type,
                                  "manual-test-results": group.manualTestResults
                                }, null, 8, ["type", "manual-test-results"])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(group.automaticTestResults, (automaticTestResult, automaticTestResultIndex) => {
                                  return openBlock(), createBlock(Fragment, { key: automaticTestResultIndex }, [
                                    group.type === "issues" ? (openBlock(), createBlock(_component_AuditAutomaticTestResultIssue, {
                                      key: 0,
                                      id: automaticTestResult.id,
                                      description: automaticTestResult.description,
                                      impact: automaticTestResult.impact,
                                      "grouped-nodes": automaticTestResult.groupedNodes
                                    }, null, 8, ["id", "description", "impact", "grouped-nodes"])) : (openBlock(), createBlock(_component_AuditAutomaticTestResultPass, {
                                      key: 1,
                                      id: automaticTestResult.id,
                                      description: automaticTestResult.description,
                                      impact: automaticTestResult.impact,
                                      "grouped-nodes": automaticTestResult.groupedNodes
                                    }, null, 8, ["id", "description", "impact", "grouped-nodes"]))
                                  ], 64);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tests, (test, testIndex) => {
                return openBlock(), createBlock(_component_AccordionTab, { key: testIndex }, {
                  header: withCtx(() => [
                    createVNode("span", { class: "mr-2" }, toDisplayString(test.name), 1),
                    createVNode(_component_StatusFaceIcon, {
                      "status-list": test.pageStatuses.map(({ status }) => status),
                      class: "h-8 w-8"
                    }, null, 8, ["status-list"])
                  ]),
                  default: withCtx(() => {
                    var _a, _b;
                    return [
                      createVNode("div", { class: "mb-4 grid break-inside-avoid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2" }, [
                        createVNode("div", { class: "flex h-full flex-col space-y-4" }, [
                          createVNode("div", { class: "flex-1 rounded-md border p-6" }, [
                            createVNode(_component_TrustedTestInfo, {
                              info: test.info,
                              "displayed-info-keys": ["WCAG SC", "Level", "Test Conditions"]
                            }, null, 8, ["info"])
                          ]),
                          test.testedElementsCount > 0 ? (openBlock(), createBlock(_component_AuditAutomaticTestResultSummary, {
                            key: 0,
                            "total-count": test.testedElementsCount,
                            "issues-count": ((_a = test.groupedResults.find((group) => group.type === "issues")) == null ? void 0 : _a.testedElementsCount) || 0,
                            "passes-count": ((_b = test.groupedResults.find((group) => group.type === "passes")) == null ? void 0 : _b.testedElementsCount) || 0
                          }, null, 8, ["total-count", "issues-count", "passes-count"])) : createCommentVNode("", true)
                        ]),
                        createVNode(_component_AuditReportPageStatuses, {
                          "page-statuses": test.pageStatuses
                        }, null, 8, ["page-statuses"])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(test.groupedResults, (group, groupIndex) => {
                          return openBlock(), createBlock(Fragment, { key: groupIndex }, [
                            group.manualTestResults.length || group.automaticTestResults.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "rounded-md border p-6"
                            }, [
                              createVNode("h3", { class: "mb-4 text-lg font-medium first-letter:uppercase" }, [
                                createTextVNode(toDisplayString(group.type) + " ", 1),
                                createVNode("span", {
                                  class: {
                                    "text-red-800": group.type === "issues",
                                    "text-green-800": group.type === "passes"
                                  }
                                }, " (" + toDisplayString(group.testedElementsCount + group.manualTestResults.length) + ") ", 3)
                              ]),
                              createVNode("ul", { class: "space-y-4" }, [
                                group.manualTestResults.length ? (openBlock(), createBlock(_component_AuditReportManualTestResults, {
                                  key: 0,
                                  type: group.type,
                                  "manual-test-results": group.manualTestResults
                                }, null, 8, ["type", "manual-test-results"])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(group.automaticTestResults, (automaticTestResult, automaticTestResultIndex) => {
                                  return openBlock(), createBlock(Fragment, { key: automaticTestResultIndex }, [
                                    group.type === "issues" ? (openBlock(), createBlock(_component_AuditAutomaticTestResultIssue, {
                                      key: 0,
                                      id: automaticTestResult.id,
                                      description: automaticTestResult.description,
                                      impact: automaticTestResult.impact,
                                      "grouped-nodes": automaticTestResult.groupedNodes
                                    }, null, 8, ["id", "description", "impact", "grouped-nodes"])) : (openBlock(), createBlock(_component_AuditAutomaticTestResultPass, {
                                      key: 1,
                                      id: automaticTestResult.id,
                                      description: automaticTestResult.description,
                                      impact: automaticTestResult.impact,
                                      "grouped-nodes": automaticTestResult.groupedNodes
                                    }, null, 8, ["id", "description", "impact", "grouped-nodes"]))
                                  ], 64);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ])
                    ];
                  }),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditReportCategoryTests.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__unhead_injection_handler__";
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  getCurrentInstance();
  return entry;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const getAuditReport = (axeResults, reportType) => {
  const auditReport = {
    categories: {},
    testedElementsCount: {
      total: 0,
      issues: 0,
      passes: 0
    }
  };
  axeResults.forEach((axeResult) => {
    let pageName = "";
    if (axeResult.results.url) {
      pageName += `URL: ${axeResult.results.url} | `;
    }
    if (axeResult.selector) {
      pageName += `Selector: ${axeResult.selector} | `;
    }
    pageName += `Screen size / Device: ${axeResult.size}`;
    const { audit, formData } = useAudit(axeResult);
    audit.value.forEach((auditItem) => {
      var _a, _b, _c;
      const category = auditItem.info["Test Category"];
      const name = auditItem.info["Test Name"];
      const {
        manualTestResultsStatus,
        manualTestIssues,
        manualTestRecommendedFixes
      } = formData.value[auditItem.id];
      const status = getStatus({
        automaticTestResultsStatus: auditItem.automaticTestResultsStatus,
        manualTestResultsStatus,
        reportType
      });
      let relatedTestInAuditReport = (_a = auditReport.categories[category]) == null ? void 0 : _a.tests.find((test) => test.name === name);
      if (!relatedTestInAuditReport) {
        relatedTestInAuditReport = {
          name,
          pageStatuses: [],
          testedElementsCount: 0,
          info: auditItem.info,
          groupedResults: []
        };
        auditReport.categories[category] = {
          status: ((_b = auditReport.categories[category]) == null ? void 0 : _b.status) || "Not applicable",
          tests: [
            ...((_c = auditReport.categories[category]) == null ? void 0 : _c.tests) || [],
            relatedTestInAuditReport
          ]
        };
      }
      relatedTestInAuditReport.pageStatuses.push({ pageName, status });
      auditReport.categories[category].status = getUpdatedCategoryStatus(
        auditReport.categories[category].status,
        status
      );
      addAutomaticTestResults(auditItem, relatedTestInAuditReport, pageName);
      addManualTestResults(
        manualTestResultsStatus,
        manualTestIssues,
        manualTestRecommendedFixes,
        relatedTestInAuditReport,
        pageName,
        auditReport
      );
    });
  });
  addTestedElementsCount(auditReport);
  moveFailedCategoriesToTop(auditReport);
  return auditReport;
};
const getUpdatedCategoryStatus = (currentCategoryStatus, testStatus) => {
  if (
    /*
    Statuses have different importance:
    1. Failed
    2. Not tested
    3. Passed
    4. Not applicable
    "Failed" overwrites all. Not tested overwrites "Not applicable" and "Passed", and so on.
    */
    testStatus !== "Not applicable" && currentCategoryStatus !== "Failed" || testStatus === "Passed" && currentCategoryStatus === "Not applicable"
  ) {
    return testStatus;
  }
  return currentCategoryStatus;
};
const addAutomaticTestResults = (auditItem, relatedTestInAuditReport, pageName) => {
  auditItem.automaticTestGroupedResults.forEach((group) => {
    let relatedTestGroupedResults = relatedTestInAuditReport == null ? void 0 : relatedTestInAuditReport.groupedResults.find(
      (statusGroup) => statusGroup.type === group.type
    );
    if (!relatedTestGroupedResults) {
      relatedTestGroupedResults = {
        type: group.type,
        testedElementsCount: 0,
        automaticTestResults: [],
        manualTestResults: []
      };
      relatedTestInAuditReport == null ? void 0 : relatedTestInAuditReport.groupedResults.push(relatedTestGroupedResults);
    }
    group.results.forEach(({ id, description, impact, nodes }) => {
      let relatedAutomaticTestResult = relatedTestGroupedResults == null ? void 0 : relatedTestGroupedResults.automaticTestResults.find(
        (result) => result.id === id
      );
      if (!relatedAutomaticTestResult) {
        relatedAutomaticTestResult = {
          id,
          description,
          impact,
          groupedNodes: []
        };
        relatedTestGroupedResults == null ? void 0 : relatedTestGroupedResults.automaticTestResults.push(
          relatedAutomaticTestResult
        );
      }
      relatedAutomaticTestResult.groupedNodes.push({ pageName, nodes });
    });
  });
};
const addManualTestResults = (manualTestResultsStatus, manualTestIssues, manualTestRecommendedFixes, relatedTestInAuditReport, pageName, auditReport) => {
  let manualTestResultType = "requires manual tests";
  if (manualTestResultsStatus === "Failed") {
    manualTestResultType = "issues";
    auditReport.testedElementsCount.issues++;
  } else if (manualTestResultsStatus === "Passed") {
    manualTestResultType = "passes";
    auditReport.testedElementsCount.passes++;
  } else if (manualTestResultsStatus === "Not applicable") {
    manualTestResultType = "not applicable";
  }
  const manualTestResult = {
    pageName,
    issues: manualTestIssues,
    recommendedFixes: manualTestRecommendedFixes
  };
  const relatedTestGroupedResults = relatedTestInAuditReport.groupedResults.find(
    ({ type }) => type === manualTestResultType
  );
  if (relatedTestGroupedResults) {
    relatedTestGroupedResults.manualTestResults.push(manualTestResult);
  } else {
    relatedTestInAuditReport.groupedResults.push({
      type: manualTestResultType,
      testedElementsCount: 0,
      automaticTestResults: [],
      manualTestResults: [manualTestResult]
    });
  }
};
const addTestedElementsCount = (auditReport) => {
  const getResultCount = (group) => group.automaticTestResults.reduce(
    (acc, result) => acc + result.groupedNodes.reduce((acc2, group2) => acc2 + group2.nodes.length, 0),
    0
  );
  for (const category of Object.values(auditReport.categories)) {
    for (const test of category.tests) {
      let testedElementsCount = 0;
      for (const group of test.groupedResults) {
        group.testedElementsCount = getResultCount(group);
        testedElementsCount += group.testedElementsCount;
        if (group.type in auditReport.testedElementsCount) {
          auditReport.testedElementsCount[group.type] += group.testedElementsCount;
        }
      }
      test.testedElementsCount = testedElementsCount;
      auditReport.testedElementsCount.total += testedElementsCount;
    }
  }
};
const moveFailedCategoriesToTop = (auditReport) => {
  auditReport.categories = Object.entries(auditReport.categories).sort(([, categoryA], [, categoryB]) => {
    const hasFailedA = categoryA.status === "Failed";
    const hasFailedB = categoryB.status === "Failed";
    if (hasFailedA && !hasFailedB) {
      return -1;
    } else if (!hasFailedA && hasFailedB) {
      return 1;
    }
    return 0;
  }).reduce((result, [categoryName, category]) => {
    result[categoryName] = category;
    return result;
  }, {});
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const route = useRoute();
    const user = useSupabaseUser();
    const auditId = route.params.id;
    const isSharableReport = route.query.share === "true" || !user.value;
    const reportType = typeof route.query.type === "string" ? route.query.type : "review";
    const { data: axeResults } = ([__temp, __restore] = withAsyncContext(() => supabase.from("axe").select("*").eq("audit_id", auditId)), __temp = await __temp, __restore(), __temp);
    const { data: auditInfo } = ([__temp, __restore] = withAsyncContext(() => supabase.from("audits").select("*, projects(name), profiles(username, full_name)").eq("id", auditId).single()), __temp = await __temp, __restore(), __temp);
    if (!axeResults || !auditInfo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Audit not found",
        fatal: true
      });
    }
    useHead({
      title: `Snowdog Accessibility Audit Report - ${auditInfo.config.title}`,
      titleTemplate: "%s"
    });
    const auditReport = getAuditReport(axeResults, reportType);
    const isAuditCompleted = ref(auditInfo.status === "completed");
    const comment = ref(auditInfo.comment);
    const toast = useToast();
    const isCompletingReport = ref(false);
    const completeReport = async () => {
      isCompletingReport.value = true;
      const supabase2 = useSupabaseClient();
      try {
        const { data, error } = await supabase2.from("audits").update({
          status: "completed",
          report_type: reportType,
          comment: comment.value
        }).eq("id", auditId).select();
        if (error) {
          throw new Error(error == null ? void 0 : error.message);
        }
        if ((data == null ? void 0 : data.length) === 1) {
          isAuditCompleted.value = true;
          toast.add({
            severity: "success",
            summary: "Successfully completed report.",
            life: 3e3
          });
        }
      } catch (error) {
        toast.add({
          severity: "error",
          summary: error.message || "Failed to save data.",
          life: 3e3
        });
      } finally {
        isCompletingReport.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuditReportSharableLink = _sfc_main$a;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Card = resolveComponent("Card");
      const _component_SvgoLogo = __nuxt_component_0$2;
      const _component_Tag = resolveComponent("Tag");
      const _component_AuditReportIssuesCount = _sfc_main$9;
      const _component_Textarea = resolveComponent("Textarea");
      const _component_Button = resolveComponent("Button");
      const _component_AuditReportCategoryTests = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(auditInfo) && unref(auditReport)) {
        _push(`<div class="${ssrRenderClass([{ "mb-24": !unref(isAuditCompleted) }, "space-y-6"])}">`);
        if (unref(isAuditCompleted) && !unref(isSharableReport)) {
          _push(ssrRenderComponent(_component_AuditReportSharableLink, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (!unref(isSharableReport)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/audit/new?baseAuditId=${unref(auditId)}`,
            class: "p-button p-button-outlined print:!hidden"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Repeat audit `);
              } else {
                return [
                  createTextVNode(" Repeat audit ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_Card, null, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d;
            if (_push2) {
              _push2(ssrRenderComponent(_component_SvgoLogo, {
                class: "mx-auto mb-8 w-60",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(`<div class="mb-16 space-y-4 text-center"${_scopeId}>`);
              if (!unref(isAuditCompleted)) {
                _push2(ssrRenderComponent(_component_Tag, {
                  value: `${unref(reportType)} report preview`,
                  class: "!px-16 !text-xl !font-normal",
                  severity: "info",
                  rounded: ""
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h1 class="font-medium"${_scopeId}> Accessibility Audit Report &quot;${ssrInterpolate(unref(auditInfo).config.title)}&quot; </h1>`);
              if (unref(auditInfo).config.description) {
                _push2(`<p${_scopeId}>${ssrInterpolate(unref(auditInfo).config.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p${_scopeId}> Created by ${ssrInterpolate((_a = unref(auditInfo).profiles) == null ? void 0 : _a.full_name)} in &quot;${ssrInterpolate((_b = unref(auditInfo).projects) == null ? void 0 : _b.name)}&quot; project on <time${_scopeId}>${ssrInterpolate(new Date(unref(auditInfo).created_at).toLocaleDateString("pl-PL"))}</time>. </p></div><div class="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-[1fr_240px]"${_scopeId}><div class="flex flex-col justify-center"${_scopeId}>`);
              if (unref(auditInfo).config.pages.length) {
                _push2(`<!--[--><h2 class="text-lg font-medium"${_scopeId}>Pages:</h2><ul class="mb-4 list-disc space-y-2 pl-8"${_scopeId}><!--[-->`);
                ssrRenderList(unref(auditInfo).config.pages, (page, index) => {
                  var _a2;
                  _push2(`<li${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    to: page.url,
                    target: "_blank",
                    class: "break-all"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(page.url)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(page.url), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  if ((_a2 = page.selector) == null ? void 0 : _a2.length) {
                    _push2(`<!--[--> - selector: <code class="break-words rounded-md bg-gray-100 px-2 py-1"${_scopeId}>${ssrInterpolate(page.selector)}</code><!--]-->`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</li>`);
                });
                _push2(`<!--]--></ul><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h2 class="text-lg font-medium"${_scopeId}>Screen sizes / Devices:</h2><ul class="list-disc pl-8"${_scopeId}><!--[-->`);
              ssrRenderList(unref(auditInfo).config.viewports, (viewport, index) => {
                _push2(`<li${_scopeId}>${ssrInterpolate(viewport)}</li>`);
              });
              _push2(`<!--]--></ul></div>`);
              _push2(ssrRenderComponent(_component_AuditReportIssuesCount, {
                count: unref(auditReport).testedElementsCount.issues
              }, null, _parent2, _scopeId));
              if (unref(isAuditCompleted) && unref(comment).length) {
                _push2(`<div class="md:col-span-2"${_scopeId}><h2 class="mb-2 text-lg font-medium"${_scopeId}>Auditor comment:</h2><p class="whitespace-pre-line"${_scopeId}>${ssrInterpolate(unref(comment))}</p></div>`);
              } else if (!unref(isAuditCompleted)) {
                _push2(`<div class="md:col-span-2"${_scopeId}><label for="auditor-comment" class="mb-2 block text-lg font-medium"${_scopeId}> Auditor comment: </label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  id: "auditor-comment",
                  modelValue: unref(comment),
                  "onUpdate:modelValue": ($event) => isRef(comment) ? comment.value = $event : null,
                  class: "w-full",
                  rows: "10"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (!unref(isAuditCompleted)) {
                _push2(`<div class="fixed bottom-0 right-0 z-20 w-full border-t bg-white shadow-[0_-1px_6px_0_rgba(0,0,0,0.1)] print:hidden md:border-none md:bg-transparent md:shadow-none"${_scopeId}><div class="flex w-full justify-end space-x-4 p-4 xl:container xl:mx-auto"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/audit/${unref(auditId)}`,
                  class: "p-button p-button-lg p-button-outlined w-full shrink justify-center md:w-[240px]"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Edit audit `);
                    } else {
                      return [
                        createTextVNode(" Edit audit ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_Button, {
                  disabled: unref(isCompletingReport),
                  class: "p-button-lg w-full shrink justify-center md:w-[240px]",
                  onClick: completeReport
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Complete report `);
                    } else {
                      return [
                        createTextVNode(" Complete report ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_SvgoLogo, {
                  class: "mx-auto mb-8 w-60",
                  "aria-hidden": "true"
                }),
                createVNode("div", { class: "mb-16 space-y-4 text-center" }, [
                  !unref(isAuditCompleted) ? (openBlock(), createBlock(_component_Tag, {
                    key: 0,
                    value: `${unref(reportType)} report preview`,
                    class: "!px-16 !text-xl !font-normal",
                    severity: "info",
                    rounded: ""
                  }, null, 8, ["value"])) : createCommentVNode("", true),
                  createVNode("h1", { class: "font-medium" }, ' Accessibility Audit Report "' + toDisplayString(unref(auditInfo).config.title) + '" ', 1),
                  unref(auditInfo).config.description ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(auditInfo).config.description), 1)) : createCommentVNode("", true),
                  createVNode("p", null, [
                    createTextVNode(" Created by " + toDisplayString((_c = unref(auditInfo).profiles) == null ? void 0 : _c.full_name) + ' in "' + toDisplayString((_d = unref(auditInfo).projects) == null ? void 0 : _d.name) + '" project on ', 1),
                    createVNode("time", null, toDisplayString(new Date(unref(auditInfo).created_at).toLocaleDateString("pl-PL")), 1),
                    createTextVNode(". ")
                  ])
                ]),
                createVNode("div", { class: "mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-[1fr_240px]" }, [
                  createVNode("div", { class: "flex flex-col justify-center" }, [
                    unref(auditInfo).config.pages.length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("h2", { class: "text-lg font-medium" }, "Pages:"),
                      createVNode("ul", { class: "mb-4 list-disc space-y-2 pl-8" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(auditInfo).config.pages, (page, index) => {
                          var _a2;
                          return openBlock(), createBlock("li", { key: index }, [
                            createVNode(_component_NuxtLink, {
                              to: page.url,
                              target: "_blank",
                              class: "break-all"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(page.url), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            ((_a2 = page.selector) == null ? void 0 : _a2.length) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(" - selector: "),
                              createVNode("code", { class: "break-words rounded-md bg-gray-100 px-2 py-1" }, toDisplayString(page.selector), 1)
                            ], 64)) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ], 64)) : createCommentVNode("", true),
                    createVNode("h2", { class: "text-lg font-medium" }, "Screen sizes / Devices:"),
                    createVNode("ul", { class: "list-disc pl-8" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(auditInfo).config.viewports, (viewport, index) => {
                        return openBlock(), createBlock("li", { key: index }, toDisplayString(viewport), 1);
                      }), 128))
                    ])
                  ]),
                  createVNode(_component_AuditReportIssuesCount, {
                    count: unref(auditReport).testedElementsCount.issues
                  }, null, 8, ["count"]),
                  unref(isAuditCompleted) && unref(comment).length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "md:col-span-2"
                  }, [
                    createVNode("h2", { class: "mb-2 text-lg font-medium" }, "Auditor comment:"),
                    createVNode("p", { class: "whitespace-pre-line" }, toDisplayString(unref(comment)), 1)
                  ])) : !unref(isAuditCompleted) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "md:col-span-2"
                  }, [
                    createVNode("label", {
                      for: "auditor-comment",
                      class: "mb-2 block text-lg font-medium"
                    }, " Auditor comment: "),
                    createVNode(_component_Textarea, {
                      id: "auditor-comment",
                      modelValue: unref(comment),
                      "onUpdate:modelValue": ($event) => isRef(comment) ? comment.value = $event : null,
                      class: "w-full",
                      rows: "10"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : createCommentVNode("", true)
                ]),
                !unref(isAuditCompleted) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed bottom-0 right-0 z-20 w-full border-t bg-white shadow-[0_-1px_6px_0_rgba(0,0,0,0.1)] print:hidden md:border-none md:bg-transparent md:shadow-none"
                }, [
                  createVNode("div", { class: "flex w-full justify-end space-x-4 p-4 xl:container xl:mx-auto" }, [
                    createVNode(_component_NuxtLink, {
                      to: `/audit/${unref(auditId)}`,
                      class: "p-button p-button-lg p-button-outlined w-full shrink justify-center md:w-[240px]"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit audit ")
                      ]),
                      _: 1
                    }, 8, ["to"]),
                    createVNode(_component_Button, {
                      disabled: unref(isCompletingReport),
                      class: "p-button-lg w-full shrink justify-center md:w-[240px]",
                      onClick: completeReport
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Complete report ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--[-->`);
        ssrRenderList(unref(auditReport).categories, (categoryData, categoryName) => {
          _push(ssrRenderComponent(_component_Card, { key: categoryName }, {
            content: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_AuditReportCategoryTests, {
                  name: categoryName,
                  tests: categoryData.tests,
                  status: categoryData.status
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_AuditReportCategoryTests, {
                    name: categoryName,
                    tests: categoryData.tests,
                    status: categoryData.status
                  }, null, 8, ["name", "tests", "status"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audit/report/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-69f1d5f2.js.map
