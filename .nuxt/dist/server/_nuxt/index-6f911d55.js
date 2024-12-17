import { _ as __nuxt_component_0 } from "./nuxt-link-295e6065.js";
import { _ as __nuxt_component_0$1 } from "./Spinner-e14ec5b8.js";
import { defineComponent, ref, computed, watch, resolveComponent, unref, withCtx, isRef, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, createSlots, Fragment, renderList, defineAsyncComponent, useSSRContext, onUnmounted, mergeProps } from "vue";
import { d as useConfirm, h as useUser, g as useRouter, f as useRoute, a as useSupabaseClient, e as useToast } from "../server.mjs";
import "hookable";
import "destr";
import "devalue";
import "klona";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderAttrs } from "vue/server-renderer";
import { h as hasTimeElapsedInMinutes, o as oneMinuteInMilliseconds } from "./time-562db5c1.js";
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
const statuses = ["draft", "completed"];
const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import("./AuditErrorsDialog-c2b568d6.js").then((m) => m.default || m));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuditTable",
  __ssrInlineRender: true,
  props: {
    audits: {},
    projects: {},
    projectId: {},
    showUserAudits: { type: Boolean }
  },
  emits: ["delete-audit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const confirm = useConfirm();
    const { user } = useUser();
    const router = useRouter();
    const isDialogVisible = ref(false);
    const axeErrorMessage = ref("");
    const dialogHeader = ref("");
    const nodes = computed(
      () => props.audits.map((audit) => ({
        data: {
          ...audit,
          project: audit.projects.name,
          auditor: audit.profiles.username
        }
      }))
    );
    const projectFilterOptions = computed(() => {
      const options = props.projects.map(({ name, id }) => ({
        name,
        value: name,
        id
      }));
      options.unshift({
        name: "All",
        value: "",
        id: 0
      });
      return options;
    });
    const statusOptions = computed(() => {
      const options = statuses.map((status) => ({
        name: status,
        value: status
      }));
      options.unshift({
        name: "All",
        value: ""
      });
      return options;
    });
    const allAuditorIds = computed(
      () => props.audits.map(({ profile_id: profileId }) => profileId)
    );
    const uniqueAuditorFilterOptions = computed(() => {
      const options = props.audits.filter(
        ({ profile_id: profileId }, index) => !allAuditorIds.value.includes(profileId, index + 1)
      ).map((audit) => ({
        name: audit.profiles.username,
        value: audit.profiles.username,
        id: audit.profile_id
      }));
      options.unshift({
        name: "All",
        value: "",
        id: ""
      });
      return options;
    });
    const selectedProject = ref(
      projectFilterOptions.value.find(({ id }) => id === (props == null ? void 0 : props.projectId)) || projectFilterOptions.value[0]
    );
    const selectedAuditor = ref(
      props.showUserAudits ? uniqueAuditorFilterOptions.value.find(({ id }) => id === user.value.id) : uniqueAuditorFilterOptions.value[0]
    );
    const selectedStatus = ref(statusOptions.value[0]);
    const filters = computed(() => {
      var _a;
      return {
        global: "",
        project: selectedProject.value.value,
        auditor: (_a = selectedAuditor.value) == null ? void 0 : _a.value,
        status: selectedStatus.value.value
      };
    });
    const columns = [
      { field: "config.title", header: "Title", sortable: true, start: true },
      { field: "project", header: "Project", sortable: true, start: true },
      {
        field: "auditor",
        header: "Auditor",
        sortable: true,
        start: props.showUserAudits
      },
      { field: "status", header: "Status", sortable: true },
      { field: "urls", header: "Urls", start: true }
    ];
    const selectedColumns = ref(columns.filter((col) => col.start));
    const isFilterActive = (filterField) => selectedColumns.value.some(({ field }) => field === filterField);
    const { isAdmin, isAuditor } = useUser();
    const confirmAuditRemoval = (id) => {
      confirm.require({
        message: "Do you want to delete this audit?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger !pr-6",
        accept: () => {
          emit("delete-audit", id);
        }
      });
    };
    const hasAxeResponseErrors = (axeResponse) => axeResponse.some((result) => {
      var _a;
      return (_a = result == null ? void 0 : result.errors) == null ? void 0 : _a.length;
    });
    const has15MinutesPassed = (auditCreationDate) => {
      return hasTimeElapsedInMinutes(auditCreationDate, 15);
    };
    const isWaitingForResults = (auditData) => !auditData.axe.length && !has15MinutesPassed(auditData.created_at);
    const openDialog = (auditData) => {
      var _a, _b, _c;
      dialogHeader.value = `Audit ${auditData.id} - errors during automatic test processing`;
      axeErrorMessage.value = ((_c = (_b = (_a = auditData.axe) == null ? void 0 : _a.find(({ errors }) => errors)) == null ? void 0 : _b.errors[0]) == null ? void 0 : _c.message) || "Something went wrong, test malformed.";
      isDialogVisible.value = true;
    };
    const clearDialog = () => {
      dialogHeader.value = "";
      axeErrorMessage.value = "";
    };
    watch([selectedProject, selectedAuditor, selectedColumns], (newValues) => {
      var _a, _b;
      let query = {};
      if (newValues[2].some(({ field }) => field === "project") && ((_a = newValues[0]) == null ? void 0 : _a.id)) {
        query = { ...query, projectId: newValues[0].id };
      }
      if (newValues[2].some(({ field }) => field === "auditor") && ((_b = newValues[1]) == null ? void 0 : _b.id) === user.value.id) {
        query = { ...query, user: "me" };
      }
      router.replace({
        query
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TreeTable = resolveComponent("TreeTable");
      const _component_MultiSelect = resolveComponent("MultiSelect");
      const _component_InputText = resolveComponent("InputText");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Column = resolveComponent("Column");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Button = resolveComponent("Button");
      const _component_LazyAuditErrorsDialog = __nuxt_component_1_lazy;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_TreeTable, {
        "auto-layout": true,
        size: "small",
        "show-gridlines": "",
        value: unref(nodes),
        filters: unref(filters)
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-wrap items-center justify-between gap-2"${_scopeId}><div class="flex w-full items-center lg:w-2/4"${_scopeId}><label class="mr-2 shrink" for="select-columns"${_scopeId}> Select columns </label>`);
            _push2(ssrRenderComponent(_component_MultiSelect, {
              modelValue: unref(selectedColumns),
              "onUpdate:modelValue": ($event) => isRef(selectedColumns) ? selectedColumns.value = $event : null,
              "input-id": "select-columns",
              options: columns,
              "option-label": "header",
              class: "w-full overflow-auto lg:w-auto",
              display: "chip",
              placeholder: "Select Columns"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="p-input-icon-left w-full lg:w-1/4"${_scopeId}><i class="pi pi-search"${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_InputText, {
              modelValue: unref(filters).global,
              "onUpdate:modelValue": ($event) => unref(filters).global = $event,
              placeholder: "Global Search",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-3 flex flex-col gap-3 lg:flex-row"${_scopeId}>`);
            if (isFilterActive("project")) {
              _push2(`<div class="flex w-full items-center"${_scopeId}><label class="mr-2 shrink-0" for="filter-projects"${_scopeId}> Filter by projects </label>`);
              _push2(ssrRenderComponent(_component_Dropdown, {
                modelValue: unref(selectedProject),
                "onUpdate:modelValue": ($event) => isRef(selectedProject) ? selectedProject.value = $event : null,
                "input-id": "filter-projects",
                "aria-label": "Filter by project",
                options: unref(projectFilterOptions),
                "option-label": "name",
                placeholder: "Filter by project",
                class: "w-full",
                "data-testid": "audits-project-filter-select"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isFilterActive("auditor")) {
              _push2(`<div class="flex w-full items-center"${_scopeId}><label class="mr-2 shrink-0" for="filter-auditor"${_scopeId}> Filter by auditor </label>`);
              _push2(ssrRenderComponent(_component_Dropdown, {
                id: "auditor-filter",
                modelValue: unref(selectedAuditor),
                "onUpdate:modelValue": ($event) => isRef(selectedAuditor) ? selectedAuditor.value = $event : null,
                "aria-label": "Filter by auditor",
                options: unref(uniqueAuditorFilterOptions),
                "option-label": "name",
                placeholder: "Filter by auditor",
                class: "w-full",
                "data-testid": "audits-auditor-filter-select"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isFilterActive("status")) {
              _push2(`<div class="flex w-full items-center"${_scopeId}><label class="mr-2 shrink-0" for="filter-status"${_scopeId}> Filter by status </label>`);
              _push2(ssrRenderComponent(_component_Dropdown, {
                id: "status-filter",
                modelValue: unref(selectedStatus),
                "onUpdate:modelValue": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
                "aria-label": "Filter by status",
                options: unref(statusOptions),
                "option-label": "name",
                placeholder: "Filter by status",
                class: "w-full",
                "data-testid": "audits-status-filter-select"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-wrap items-center justify-between gap-2" }, [
                createVNode("div", { class: "flex w-full items-center lg:w-2/4" }, [
                  createVNode("label", {
                    class: "mr-2 shrink",
                    for: "select-columns"
                  }, " Select columns "),
                  createVNode(_component_MultiSelect, {
                    modelValue: unref(selectedColumns),
                    "onUpdate:modelValue": ($event) => isRef(selectedColumns) ? selectedColumns.value = $event : null,
                    "input-id": "select-columns",
                    options: columns,
                    "option-label": "header",
                    class: "w-full overflow-auto lg:w-auto",
                    display: "chip",
                    placeholder: "Select Columns"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "p-input-icon-left w-full lg:w-1/4" }, [
                  createVNode("i", { class: "pi pi-search" }),
                  createVNode(_component_InputText, {
                    modelValue: unref(filters).global,
                    "onUpdate:modelValue": ($event) => unref(filters).global = $event,
                    placeholder: "Global Search",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "mt-3 flex flex-col gap-3 lg:flex-row" }, [
                isFilterActive("project") ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex w-full items-center"
                }, [
                  createVNode("label", {
                    class: "mr-2 shrink-0",
                    for: "filter-projects"
                  }, " Filter by projects "),
                  createVNode(_component_Dropdown, {
                    modelValue: unref(selectedProject),
                    "onUpdate:modelValue": ($event) => isRef(selectedProject) ? selectedProject.value = $event : null,
                    "input-id": "filter-projects",
                    "aria-label": "Filter by project",
                    options: unref(projectFilterOptions),
                    "option-label": "name",
                    placeholder: "Filter by project",
                    class: "w-full",
                    "data-testid": "audits-project-filter-select"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ])) : createCommentVNode("", true),
                isFilterActive("auditor") ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex w-full items-center"
                }, [
                  createVNode("label", {
                    class: "mr-2 shrink-0",
                    for: "filter-auditor"
                  }, " Filter by auditor "),
                  createVNode(_component_Dropdown, {
                    id: "auditor-filter",
                    modelValue: unref(selectedAuditor),
                    "onUpdate:modelValue": ($event) => isRef(selectedAuditor) ? selectedAuditor.value = $event : null,
                    "aria-label": "Filter by auditor",
                    options: unref(uniqueAuditorFilterOptions),
                    "option-label": "name",
                    placeholder: "Filter by auditor",
                    class: "w-full",
                    "data-testid": "audits-auditor-filter-select"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ])) : createCommentVNode("", true),
                isFilterActive("status") ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "flex w-full items-center"
                }, [
                  createVNode("label", {
                    class: "mr-2 shrink-0",
                    for: "filter-status"
                  }, " Filter by status "),
                  createVNode(_component_Dropdown, {
                    id: "status-filter",
                    modelValue: unref(selectedStatus),
                    "onUpdate:modelValue": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
                    "aria-label": "Filter by status",
                    options: unref(statusOptions),
                    "option-label": "name",
                    placeholder: "Filter by status",
                    class: "w-full",
                    "data-testid": "audits-status-filter-select"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 text-center"${_scopeId}>The list is empty</div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 text-center" }, "The list is empty")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, { header: "Created : Id" }, {
              body: withCtx(({ node }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(new Date(node.data.created_at).toLocaleDateString("pl-PL"))} : ${ssrInterpolate(node.data.id)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(new Date(node.data.created_at).toLocaleDateString("pl-PL")) + " : " + toDisplayString(node.data.id), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(selectedColumns), (col) => {
              _push2(ssrRenderComponent(_component_Column, {
                key: col.field,
                field: col.field,
                header: col.header,
                sortable: col.sortable
              }, createSlots({ _: 2 }, [
                col.field === "urls" ? {
                  name: "body",
                  fn: withCtx((scope, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<ul${_scopeId2}><!--[-->`);
                      ssrRenderList(scope.node.data.config.pages, (page, pageIndex) => {
                        _push3(`<li${_scopeId2}><a${ssrRenderAttr("href", page.url)}${_scopeId2}>${ssrInterpolate(page.url)}</a></li>`);
                      });
                      _push3(`<!--]--></ul>`);
                    } else {
                      return [
                        createVNode("ul", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(scope.node.data.config.pages, (page, pageIndex) => {
                            return openBlock(), createBlock("li", {
                              key: `page-${scope.node.data.id}-${pageIndex}`
                            }, [
                              createVNode("a", {
                                href: page.url
                              }, toDisplayString(page.url), 9, ["href"])
                            ]);
                          }), 128))
                        ])
                      ];
                    }
                  }),
                  key: "0"
                } : void 0
              ]), _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_Column, { header: "Action" }, {
              body: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([{
                    "grid-cols-3": !isWaitingForResults(scope.node.data),
                    "grid-cols-1": isWaitingForResults(scope.node.data)
                  }, "grid min-w-[386px] gap-2"])}"${_scopeId2}>`);
                  if (isWaitingForResults(scope.node.data)) {
                    _push3(`<span class="flex items-center px-4"${_scopeId2}><i class="pi pi-spin pi-cog mr-4" aria-hidden="true"${_scopeId2}></i> Tests in progress </span>`);
                  } else {
                    _push3(`<!--[-->`);
                    if (scope.node.data.status === "completed") {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        class: "p-button p-button-info justify-center",
                        to: `/audit/report/${scope.node.data.id}?type=${scope.node.data.report_type}`
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` View report `);
                          } else {
                            return [
                              createTextVNode(" View report ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else if (scope.node.data.axe.length && !hasAxeResponseErrors(scope.node.data.axe)) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        class: "p-button p-button-info justify-center",
                        to: `/audit/${scope.node.data.id}?resultId=${scope.node.data.axe[0].id}`
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` View results `);
                          } else {
                            return [
                              createTextVNode(" View results ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else if (hasAxeResponseErrors(scope.node.data.axe) || !scope.node.data.axe.length && has15MinutesPassed(scope.node.data.created_at)) {
                      _push3(ssrRenderComponent(_component_Button, {
                        severity: "danger",
                        label: "View errors",
                        onClick: ($event) => openDialog(scope.node.data)
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: `/audit/new?baseAuditId=${scope.node.data.id}`,
                      class: "p-button p-button-info p-button-outlined justify-center"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Repeat `);
                        } else {
                          return [
                            createTextVNode(" Repeat ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (unref(isAdmin) || unref(isAuditor) && scope.node.data.status === "draft") {
                      _push3(ssrRenderComponent(_component_Button, {
                        severity: "danger",
                        outlined: "",
                        class: "justify-center",
                        onClick: ($event) => confirmAuditRemoval(scope.node.data.id)
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Remove `);
                          } else {
                            return [
                              createTextVNode(" Remove ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: ["grid min-w-[386px] gap-2", {
                        "grid-cols-3": !isWaitingForResults(scope.node.data),
                        "grid-cols-1": isWaitingForResults(scope.node.data)
                      }]
                    }, [
                      isWaitingForResults(scope.node.data) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "flex items-center px-4"
                      }, [
                        createVNode("i", {
                          class: "pi pi-spin pi-cog mr-4",
                          "aria-hidden": "true"
                        }),
                        createTextVNode(" Tests in progress ")
                      ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        scope.node.data.status === "completed" ? (openBlock(), createBlock(_component_NuxtLink, {
                          key: 0,
                          class: "p-button p-button-info justify-center",
                          to: `/audit/report/${scope.node.data.id}?type=${scope.node.data.report_type}`
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" View report ")
                          ]),
                          _: 2
                        }, 1032, ["to"])) : scope.node.data.axe.length && !hasAxeResponseErrors(scope.node.data.axe) ? (openBlock(), createBlock(_component_NuxtLink, {
                          key: 1,
                          class: "p-button p-button-info justify-center",
                          to: `/audit/${scope.node.data.id}?resultId=${scope.node.data.axe[0].id}`
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" View results ")
                          ]),
                          _: 2
                        }, 1032, ["to"])) : hasAxeResponseErrors(scope.node.data.axe) || !scope.node.data.axe.length && has15MinutesPassed(scope.node.data.created_at) ? (openBlock(), createBlock(_component_Button, {
                          key: 2,
                          severity: "danger",
                          label: "View errors",
                          onClick: ($event) => openDialog(scope.node.data)
                        }, null, 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode(_component_NuxtLink, {
                          to: `/audit/new?baseAuditId=${scope.node.data.id}`,
                          class: "p-button p-button-info p-button-outlined justify-center"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Repeat ")
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        unref(isAdmin) || unref(isAuditor) && scope.node.data.status === "draft" ? (openBlock(), createBlock(_component_Button, {
                          key: 3,
                          severity: "danger",
                          outlined: "",
                          class: "justify-center",
                          onClick: ($event) => confirmAuditRemoval(scope.node.data.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Remove ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : createCommentVNode("", true)
                      ], 64))
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, { header: "Created : Id" }, {
                body: withCtx(({ node }) => [
                  createTextVNode(toDisplayString(new Date(node.data.created_at).toLocaleDateString("pl-PL")) + " : " + toDisplayString(node.data.id), 1)
                ]),
                _: 1
              }),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedColumns), (col) => {
                return openBlock(), createBlock(_component_Column, {
                  key: col.field,
                  field: col.field,
                  header: col.header,
                  sortable: col.sortable
                }, createSlots({ _: 2 }, [
                  col.field === "urls" ? {
                    name: "body",
                    fn: withCtx((scope) => [
                      createVNode("ul", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(scope.node.data.config.pages, (page, pageIndex) => {
                          return openBlock(), createBlock("li", {
                            key: `page-${scope.node.data.id}-${pageIndex}`
                          }, [
                            createVNode("a", {
                              href: page.url
                            }, toDisplayString(page.url), 9, ["href"])
                          ]);
                        }), 128))
                      ])
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["field", "header", "sortable"]);
              }), 128)),
              createVNode(_component_Column, { header: "Action" }, {
                body: withCtx((scope) => [
                  createVNode("div", {
                    class: ["grid min-w-[386px] gap-2", {
                      "grid-cols-3": !isWaitingForResults(scope.node.data),
                      "grid-cols-1": isWaitingForResults(scope.node.data)
                    }]
                  }, [
                    isWaitingForResults(scope.node.data) ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex items-center px-4"
                    }, [
                      createVNode("i", {
                        class: "pi pi-spin pi-cog mr-4",
                        "aria-hidden": "true"
                      }),
                      createTextVNode(" Tests in progress ")
                    ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      scope.node.data.status === "completed" ? (openBlock(), createBlock(_component_NuxtLink, {
                        key: 0,
                        class: "p-button p-button-info justify-center",
                        to: `/audit/report/${scope.node.data.id}?type=${scope.node.data.report_type}`
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" View report ")
                        ]),
                        _: 2
                      }, 1032, ["to"])) : scope.node.data.axe.length && !hasAxeResponseErrors(scope.node.data.axe) ? (openBlock(), createBlock(_component_NuxtLink, {
                        key: 1,
                        class: "p-button p-button-info justify-center",
                        to: `/audit/${scope.node.data.id}?resultId=${scope.node.data.axe[0].id}`
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" View results ")
                        ]),
                        _: 2
                      }, 1032, ["to"])) : hasAxeResponseErrors(scope.node.data.axe) || !scope.node.data.axe.length && has15MinutesPassed(scope.node.data.created_at) ? (openBlock(), createBlock(_component_Button, {
                        key: 2,
                        severity: "danger",
                        label: "View errors",
                        onClick: ($event) => openDialog(scope.node.data)
                      }, null, 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(_component_NuxtLink, {
                        to: `/audit/new?baseAuditId=${scope.node.data.id}`,
                        class: "p-button p-button-info p-button-outlined justify-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Repeat ")
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      unref(isAdmin) || unref(isAuditor) && scope.node.data.status === "draft" ? (openBlock(), createBlock(_component_Button, {
                        key: 3,
                        severity: "danger",
                        outlined: "",
                        class: "justify-center",
                        onClick: ($event) => confirmAuditRemoval(scope.node.data.id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Remove ")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : createCommentVNode("", true)
                    ], 64))
                  ], 2)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(dialogHeader) && unref(axeErrorMessage)) {
        _push(ssrRenderComponent(_component_LazyAuditErrorsDialog, {
          visible: unref(isDialogVisible),
          "onUpdate:visible": ($event) => isRef(isDialogVisible) ? isDialogVisible.value = $event : null,
          header: unref(dialogHeader),
          "error-message": unref(axeErrorMessage),
          onHide: clearDialog
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isAdmin, isAuditor } = useUser();
    const route = useRoute();
    const supabase = useSupabaseClient();
    const toast = useToast();
    const audits = ref([]);
    const projects = ref([]);
    const isLoading = ref(true);
    const projectId = ref(Number(route.query.projectId));
    const showUserAudits = ref(route.query.user === "me");
    const notTestedAuditMap = ref(/* @__PURE__ */ new Map());
    const areAllAuditsFinished = computed(
      () => audits.value.every((audit) => hasTimeElapsedInMinutes(audit.created_at, 15))
    );
    const axeTableInsertChannel = supabase.channel("axe").on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "axe" },
      async (payload) => {
        var _a;
        const auditId = payload.new.audit_id;
        const item = notTestedAuditMap.value.get(auditId);
        if (!item || item.didAutomaticTestsFail) {
          return;
        }
        if ((_a = payload.new.errors) == null ? void 0 : _a.length) {
          item.didAutomaticTestsFail = true;
          notTestedAuditMap.value.set(auditId, item);
          await fetchAudits();
          return;
        }
        item.automaticTestsCount += 1;
        notTestedAuditMap.value.set(auditId, item);
        if (item.automaticTestsCount === item.totalNumberOfAllTests) {
          await fetchAudits();
          toast.add({
            severity: "info",
            summary: `The audit list has been updated`,
            life: 3e3
          });
        }
      }
    ).subscribe();
    async function fetchAudits() {
      const { data } = await supabase.from("audits").select(
        "*, projects(name), profiles(username, full_name), axe (id, errors)"
      ).order("created_at", { ascending: false });
      audits.value = data || [];
      audits.value.filter((audit) => !audit.axe.length).forEach(({ id, config }) => {
        notTestedAuditMap.value.set(id, {
          totalNumberOfAllTests: config.pages.length * config.viewports.length,
          automaticTestsCount: 0,
          didAutomaticTestsFail: false
        });
      });
    }
    async function fetchProjects() {
      const supabase2 = useSupabaseClient();
      try {
        const { data } = await supabase2.from("projects").select("*").order("name", { ascending: true });
        projects.value = data || [];
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    const deleteAudit = async (auditId) => {
      const { error } = await supabase.from("audits").delete().eq("id", auditId);
      if (!error) {
        audits.value = audits.value.filter(({ id }) => id !== auditId);
        toast.add({
          severity: "success",
          summary: `Audit #${auditId} deleted`,
          life: 3e3
        });
      }
    };
    async function fetchData() {
      try {
        await Promise.all([fetchAudits(), fetchProjects()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isLoading.value = false;
      }
    }
    const timeout = setTimeout(async () => {
      await fetchData();
    }, 15 * oneMinuteInMilliseconds);
    if (areAllAuditsFinished.value) {
      clearTimeout(timeout);
    }
    onUnmounted(() => {
      supabase.removeChannel(axeTableInsertChannel);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Card = resolveComponent("Card");
      const _component_Spinner = __nuxt_component_0$1;
      const _component_AuditTable = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid" }, _attrs))}><div class="flex justify-between"><h1>Audit list</h1>`);
      if (unref(isAdmin) || unref(isAuditor)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/audit/new",
          class: "p-button-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add new audit `);
            } else {
              return [
                createTextVNode(" Add new audit ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid">`);
      _push(ssrRenderComponent(_component_Card, {
        pt: {
          content: {
            class: "flex flex-col"
          }
        },
        class: "mb-6 overflow-auto"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLoading)) {
              _push2(ssrRenderComponent(_component_Spinner, { class: "mx-auto w-20" }, null, _parent2, _scopeId));
            } else if (unref(audits).length) {
              _push2(ssrRenderComponent(_component_AuditTable, {
                audits: unref(audits),
                projects: unref(projects),
                "project-id": unref(projectId),
                "show-user-audits": unref(showUserAudits),
                onDeleteAudit: deleteAudit
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<p${_scopeId}>Your audit list is empty</p>`);
            }
          } else {
            return [
              unref(isLoading) ? (openBlock(), createBlock(_component_Spinner, {
                key: 0,
                class: "mx-auto w-20"
              })) : unref(audits).length ? (openBlock(), createBlock(_component_AuditTable, {
                key: 1,
                audits: unref(audits),
                projects: unref(projects),
                "project-id": unref(projectId),
                "show-user-audits": unref(showUserAudits),
                onDeleteAudit: deleteAudit
              }, null, 8, ["audits", "projects", "project-id", "show-user-audits"])) : (openBlock(), createBlock("p", { key: 2 }, "Your audit list is empty"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audit/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-6f911d55.js.map
