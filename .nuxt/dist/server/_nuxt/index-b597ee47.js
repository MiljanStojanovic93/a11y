import { _ as __nuxt_component_0$1 } from "./nuxt-link-295e6065.js";
import { _ as __nuxt_component_0 } from "./Spinner-e14ec5b8.js";
import { defineComponent, ref, computed, resolveComponent, createSlots, withCtx, createVNode, unref, toDisplayString, openBlock, createBlock, Fragment, createTextVNode, renderList, useSSRContext, mergeProps } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
import { h as useUser } from "../server.mjs";
import "hookable";
import "destr";
import "devalue";
import "klona";
import "ufo";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "vue-router";
import "h3";
import "cookie-es";
import "ohash";
import "defu";
import "@supabase/supabase-js";
const getAuditLink = ({
  id,
  axeId,
  status,
  reportType
}) => {
  if (status === "completed") {
    return `/audit/report/${id}?type=${reportType}`;
  }
  return `/audit/${id}?resultId=${axeId}`;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AuditList",
  __ssrInlineRender: true,
  props: {
    audits: {},
    initialCount: { default: 0 },
    isLoading: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const count = ref(props.initialCount ? props.initialCount : props.audits.length);
    const visibleAudits = computed(() => props.audits.slice(0, count.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = resolveComponent("Card");
      const _component_Spinner = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_Card, _attrs, createSlots({
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 id="audits-card-title"${_scopeId}>Your recent audits</h2>`);
          } else {
            return [
              createVNode("h2", { id: "audits-card-title" }, "Your recent audits")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.isLoading) {
              _push2(ssrRenderComponent(_component_Spinner, { class: "mx-auto w-20" }, null, _parent2, _scopeId));
            } else if (_ctx.audits.length) {
              _push2(`<ul aria-labelledby="audits-card-title"${_scopeId}><!--[-->`);
              ssrRenderList(unref(visibleAudits), ({ id, config, axe, status, report_type }) => {
                _push2(`<li${_scopeId}>`);
                if (status === "completed" || (axe == null ? void 0 : axe.length)) {
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    class: "p-button p-button-text w-full justify-between",
                    to: unref(getAuditLink)({
                      id,
                      axeId: axe[0].id,
                      status,
                      reportType: report_type
                    })
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<span class="text-left"${_scopeId2}>${ssrInterpolate(config.title)}</span><span class="p-button p-button-info ml-4 min-w-[116px] justify-center"${_scopeId2}>`);
                        if (status === "completed") {
                          _push3(`<!--[-->See report<!--]-->`);
                        } else {
                          _push3(`<!--[-->See results<!--]-->`);
                        }
                        _push3(`</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-left" }, toDisplayString(config.title), 1),
                          createVNode("span", { class: "p-button p-button-info ml-4 min-w-[116px] justify-center" }, [
                            status === "completed" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode("See report")
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode("See results")
                            ], 64))
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<div class="border border-transparent px-4 py-3.5 text-left leading-normal"${_scopeId}>${ssrInterpolate(config.title)}</div>`);
                }
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<p${_scopeId}>Your audit list is empty</p>`);
            }
          } else {
            return [
              _ctx.isLoading ? (openBlock(), createBlock(_component_Spinner, {
                key: 0,
                class: "mx-auto w-20"
              })) : _ctx.audits.length ? (openBlock(), createBlock("ul", {
                key: 1,
                "aria-labelledby": "audits-card-title"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleAudits), ({ id, config, axe, status, report_type }) => {
                  return openBlock(), createBlock("li", { key: id }, [
                    status === "completed" || (axe == null ? void 0 : axe.length) ? (openBlock(), createBlock(_component_NuxtLink, {
                      key: 0,
                      class: "p-button p-button-text w-full justify-between",
                      to: unref(getAuditLink)({
                        id,
                        axeId: axe[0].id,
                        status,
                        reportType: report_type
                      })
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-left" }, toDisplayString(config.title), 1),
                        createVNode("span", { class: "p-button p-button-info ml-4 min-w-[116px] justify-center" }, [
                          status === "completed" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createTextVNode("See report")
                          ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode("See results")
                          ], 64))
                        ])
                      ]),
                      _: 2
                    }, 1032, ["to"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "border border-transparent px-4 py-3.5 text-left leading-normal"
                    }, toDisplayString(config.title), 1))
                  ]);
                }), 128))
              ])) : (openBlock(), createBlock("p", { key: 2 }, "Your audit list is empty"))
            ];
          }
        }),
        _: 2
      }, [
        _ctx.audits.length ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                class: "p-button",
                to: "/audit/?user=me"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` See all my audits `);
                  } else {
                    return [
                      createTextVNode(" See all my audits ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, {
                  class: "p-button",
                  to: "/audit/?user=me"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" See all my audits ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectList",
  __ssrInlineRender: true,
  props: {
    projects: {},
    initialCount: { default: 0 },
    step: { default: 5 },
    isLoading: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const count = ref(
      props.initialCount ? props.initialCount : props.projects.length
    );
    const showMore = () => {
      count.value = count.value + props.step;
    };
    const visibleProjects = computed(() => props.projects.slice(0, count.value));
    const isShowMoreButtonAvailable = computed(
      () => props.projects.length > 0 && props.initialCount && count.value < props.projects.length
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = resolveComponent("Card");
      const _component_Spinner = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_Card, _attrs, createSlots({
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 id="project-card-title"${_scopeId}>Your projects</h2>`);
          } else {
            return [
              createVNode("h2", { id: "project-card-title" }, "Your projects")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.isLoading) {
              _push2(ssrRenderComponent(_component_Spinner, { class: "mx-auto w-20" }, null, _parent2, _scopeId));
            } else if (unref(visibleProjects).length) {
              _push2(`<ul aria-labelledby="project-card-title" class="grid space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(visibleProjects), ({ id, name }) => {
                _push2(`<li${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  class: "p-button p-button-link grid w-full justify-between",
                  to: `/audit/?projectId=${id}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="text-left"${_scopeId2}>${ssrInterpolate(name)}</span><span class="p-button p-button-info ml-4"${_scopeId2}>See all audits</span>`);
                    } else {
                      return [
                        createVNode("span", { class: "text-left" }, toDisplayString(name), 1),
                        createVNode("span", { class: "p-button p-button-info ml-4" }, "See all audits")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<p${_scopeId}>Your projects list is empty</p>`);
            }
          } else {
            return [
              _ctx.isLoading ? (openBlock(), createBlock(_component_Spinner, {
                key: 0,
                class: "mx-auto w-20"
              })) : unref(visibleProjects).length ? (openBlock(), createBlock("ul", {
                key: 1,
                "aria-labelledby": "project-card-title",
                class: "grid space-y-2"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleProjects), ({ id, name }) => {
                  return openBlock(), createBlock("li", { key: id }, [
                    createVNode(_component_NuxtLink, {
                      class: "p-button p-button-link grid w-full justify-between",
                      to: `/audit/?projectId=${id}`
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-left" }, toDisplayString(name), 1),
                        createVNode("span", { class: "p-button p-button-info ml-4" }, "See all audits")
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ]);
                }), 128))
              ])) : (openBlock(), createBlock("p", { key: 2 }, "Your projects list is empty"))
            ];
          }
        }),
        _: 2
      }, [
        unref(isShowMoreButtonAvailable) ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Button, { onClick: showMore }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Show more projects`);
                  } else {
                    return [
                      createTextVNode("Show more projects")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Button, { onClick: showMore }, {
                  default: withCtx(() => [
                    createTextVNode("Show more projects")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, isViewer } = useUser();
    const projects = ref([]);
    const audits = ref([]);
    const isLoading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AuditList = _sfc_main$2;
      const _component_ProjectList = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 space-y-8" }, _attrs))}><div class="flex flex-wrap justify-between space-y-6 sm:flex-nowrap sm:space-y-0"><h1>Your a11y tools</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "p-button p-button-lg w-full justify-center sm:w-2/5",
        to: "/audit/new"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create new audit `);
          } else {
            return [
              createTextVNode(" Create new audit ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="${ssrRenderClass([{
        "md:w-3/5 md:grid-cols-1": unref(isViewer),
        "md:grid-cols-2": !unref(isViewer)
      }, "grid gap-4"])}">`);
      if (!unref(isViewer)) {
        _push(ssrRenderComponent(_component_AuditList, {
          audits: unref(audits),
          "initial-count": 5,
          "is-loading": unref(isLoading)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ProjectList, {
        projects: unref(projects),
        "initial-count": 5,
        "is-loading": unref(isLoading)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-b597ee47.js.map
