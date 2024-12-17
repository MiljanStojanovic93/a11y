import { _ as __nuxt_component_0 } from './nuxt-link-295e6065.mjs';
import { a as useSupabaseClient, e as useRoute, f as useRouter, g as createError, _ as __nuxt_component_0$1 } from '../server.mjs';
import { _ as __nuxt_component_0$2 } from './Spinner-e14ec5b8.mjs';
import { useSSRContext, defineComponent, ref, withAsyncContext, computed, watch, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, isRef, defineAsyncComponent } from 'vue';
import { u as useAudit, g as getStatus } from './get-status-8e496c81.mjs';
import { u as useIntersectionObserver, r as refDebounced } from './index-8b092d42.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { a as availableScreenSizes } from './screenSizes-4ba45971.mjs';
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
import './_plugin-vue_export-helper-cc2b3d55.mjs';

function useDeepSearch(obj, target, maxDepth = 3) {
  const foundObjects = [];
  const stack = [
    { obj, depth: 0 }
  ];
  while (stack.length > 0) {
    const stackItem = stack.pop();
    if (!stackItem) {
      break;
    }
    const { obj: currentObj, depth } = stackItem;
    if (depth > maxDepth) {
      continue;
    }
    if (typeof currentObj === "object" && currentObj !== null) {
      for (const value of Object.values(currentObj)) {
        if (typeof value === "string" && value.toLowerCase().includes(target.toLowerCase())) {
          foundObjects.push(currentObj);
          break;
        } else if (typeof value === "object" && value !== null) {
          stack.push({ obj: value, depth: depth + 1 });
        }
      }
    }
  }
  return foundObjects;
}
const manualTestResultsStatusOptions = [
  "Not tested",
  "Not applicable",
  "Passed",
  "Failed"
];
function addToUniqueList(list, value) {
  const items = typeof value === "string" ? [value] : Array.isArray(value) ? [...value] : [];
  items.forEach((item) => {
    if (!list.includes(item)) {
      list.push(item);
    }
  });
}
function useAuditFilters(audit, formData) {
  const selectedItems = ref({
    selectedWcagSc: [],
    selectedLevel: [],
    selectedStatus: [],
    selectedCategory: []
  });
  const optionLists = ref({
    wcagScList: [],
    levelList: [],
    statusList: manualTestResultsStatusOptions,
    categoryList: []
  });
  const searchValue = ref("");
  const searchValueDebounced = refDebounced(searchValue, 300);
  function extractSelectedCodes(selectedItems2) {
    return new Set((selectedItems2 || []).map((value) => value));
  }
  audit.value.forEach((test) => {
    addToUniqueList(optionLists.value.wcagScList, test.info["WCAG SC"]);
    addToUniqueList(optionLists.value.levelList, test.info.Level);
    addToUniqueList(optionLists.value.categoryList, test.info["Test Category"]);
  });
  optionLists.value.wcagScList.sort();
  optionLists.value.categoryList.sort();
  for (const [, value] of Object.entries(formData.value)) {
    if (typeof value === "object" && value !== null && "status" in value) {
      addToUniqueList(
        optionLists.value.statusList,
        value.status
      );
    }
  }
  const filteredAudit = computed(() => {
    if (selectedItems.value.selectedWcagSc.length === 0 && selectedItems.value.selectedLevel.length === 0 && selectedItems.value.selectedStatus.length === 0 && selectedItems.value.selectedCategory.length === 0 && !searchValueDebounced.value) {
      return audit.value;
    } else {
      const selectedWcagCodes = extractSelectedCodes(
        selectedItems.value.selectedWcagSc
      );
      const selectedLevels = extractSelectedCodes(
        selectedItems.value.selectedLevel
      );
      const selectedStatuses = extractSelectedCodes(
        selectedItems.value.selectedStatus
      );
      const selectedCategories = extractSelectedCodes(
        selectedItems.value.selectedCategory
      );
      const filteredTests = audit.value.filter((element) => {
        var _a;
        const filteredWcag = selectedWcagCodes.size === 0 || ((_a = element.info["WCAG SC"]) == null ? void 0 : _a.some((value) => selectedWcagCodes.has(value)));
        const filteredLevel = selectedLevels.size === 0 || element.info.Level && (selectedLevels == null ? void 0 : selectedLevels.has(element.info.Level));
        const filteredStatus = selectedStatuses.size === 0 || selectedStatuses.has(
          getStatus({
            automaticTestResultsStatus: element.automaticTestResultsStatus,
            manualTestResultsStatus: formData.value[element.id].manualTestResultsStatus
          })
        );
        const filteredCategories = selectedCategories.size === 0 || selectedCategories.has(element.info["Test Category"]);
        return filteredWcag && filteredLevel && filteredStatus && filteredCategories;
      });
      let foundObjects = filteredTests;
      if (searchValueDebounced.value && searchValueDebounced.value.length >= 3) {
        foundObjects = [];
        filteredTests.forEach((item) => {
          const found = useDeepSearch(item, searchValueDebounced.value);
          if (found.length > 0) {
            foundObjects.push(item);
          }
        });
      }
      return foundObjects;
    }
  });
  return {
    filteredAudit,
    selectedItems,
    optionLists,
    searchValue
  };
}
const __nuxt_component_3_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./AuditSelectReportTypeModalContent-10e7c1d0.mjs').then((m) => m.default || m));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuditResults",
  __ssrInlineRender: true,
  props: {
    result: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const {
      audit,
      isSaving,
      formData,
      isFormDataEdited,
      updateField,
      saveFormData
    } = ([__temp, __restore] = withAsyncContext(() => useAudit(props.result)), __temp = await __temp, __restore(), __temp);
    const { filteredAudit, optionLists, searchValue, selectedItems } = useAuditFilters(audit, formData);
    const resultsHeader = ref(null);
    const isResultsHeaderVisible = ref(false);
    useIntersectionObserver(resultsHeader, ([{ isIntersecting }]) => {
      isResultsHeaderVisible.value = isIntersecting;
    });
    const isSelectReportTypeModalVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InlineMessage = resolveComponent("InlineMessage");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Button = resolveComponent("Button");
      const _component_MultiSelect = resolveComponent("MultiSelect");
      const _component_InputText = resolveComponent("InputText");
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_Spinner = __nuxt_component_0$2;
      const _component_Dialog = resolveComponent("Dialog");
      const _component_LazyAuditSelectReportTypeModalContent = __nuxt_component_3_lazy;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_InlineMessage, {
        style: unref(isFormDataEdited) ? null : { display: "none" },
        severity: "warn",
        class: "flex w-full items-center !justify-start"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Save your changes before selecting different url, selector or device. `);
          } else {
            return [
              createTextVNode(" Save your changes before selecting different url, selector or device. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col items-center justify-between gap-x-10 gap-y-4 md:flex-row"><h2 class="font-medium"> #${ssrInterpolate(_ctx.result.id)}: Results for `);
      if (_ctx.result.results.url) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: _ctx.result.results.url,
          target: "_blank",
          class: "mr-auto break-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.result.results.url)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.result.results.url), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="mr-auto break-all">${ssrInterpolate(_ctx.result.size)}</span>`);
      }
      _push(`</h2><div class="${ssrRenderClass([{
        "md:w-[320px]": unref(isResultsHeaderVisible),
        "fixed bottom-0 right-0 z-20 border-t bg-white shadow-[0_-1px_6px_0_rgba(0,0,0,0.1)] md:border-none md:bg-transparent md:shadow-none": !unref(isResultsHeaderVisible)
      }, "w-full"])}"><div class="${ssrRenderClass([{
        "flex justify-end p-4 xl:container xl:mx-auto": !unref(isResultsHeaderVisible)
      }, "w-full"])}">`);
      if (unref(isFormDataEdited)) {
        _push(ssrRenderComponent(_component_Button, {
          disabled: unref(isSaving),
          class: ["p-button-lg w-full shrink justify-center", {
            "md:w-[320px]": !unref(isResultsHeaderVisible)
          }],
          onClick: unref(saveFormData)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Save `);
            } else {
              return [
                createTextVNode(" Save ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_Button, {
          class: ["p-button-lg w-full shrink justify-center", {
            "md:w-[320px]": !unref(isResultsHeaderVisible)
          }],
          severity: "success",
          onClick: ($event) => isSelectReportTypeModalVisible.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Generate report `);
            } else {
              return [
                createTextVNode(" Generate report ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></div><div class="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3"><div><label for="wcagScList" class="mb-2 block font-medium"> WCAG SC </label>`);
      _push(ssrRenderComponent(_component_MultiSelect, {
        id: "wcagScList",
        modelValue: unref(selectedItems).selectedWcagSc,
        "onUpdate:modelValue": ($event) => unref(selectedItems).selectedWcagSc = $event,
        options: unref(optionLists).wcagScList,
        filter: "",
        "option-label": (data) => data,
        placeholder: "WCAG SC",
        class: "w-full",
        "max-selected-labels": 3
      }, null, _parent));
      _push(`</div><div><label for="categoryList" class="mb-2 block font-medium"> Test Category </label>`);
      _push(ssrRenderComponent(_component_MultiSelect, {
        id: "categoryList",
        modelValue: unref(selectedItems).selectedCategory,
        "onUpdate:modelValue": ($event) => unref(selectedItems).selectedCategory = $event,
        filter: "",
        options: unref(optionLists).categoryList,
        "option-label": (data) => data,
        placeholder: "Category",
        class: "w-full",
        "max-selected-labels": 2
      }, null, _parent));
      _push(`</div><div><label for="levelList" class="mb-2 block font-medium"> Level </label>`);
      _push(ssrRenderComponent(_component_MultiSelect, {
        id: "levelList",
        modelValue: unref(selectedItems).selectedLevel,
        "onUpdate:modelValue": ($event) => unref(selectedItems).selectedLevel = $event,
        options: unref(optionLists).levelList,
        placeholder: "Level",
        class: "w-full",
        "max-selected-labels": 2
      }, null, _parent));
      _push(`</div><div><label for="statusList" class="mb-2 block font-medium"> Status </label>`);
      _push(ssrRenderComponent(_component_MultiSelect, {
        id: "statusList",
        modelValue: unref(selectedItems).selectedStatus,
        "onUpdate:modelValue": ($event) => unref(selectedItems).selectedStatus = $event,
        options: unref(optionLists).statusList,
        placeholder: "Status",
        class: "w-full",
        "max-selected-labels": 2
      }, null, _parent));
      _push(`</div><div class="md:col-span-2"><label for="search" class="mb-2 block font-medium"> Search </label><div class="p-input-icon-left w-full"><i class="pi pi-search"></i>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "search",
        modelValue: unref(searchValue),
        "onUpdate:modelValue": ($event) => isRef(searchValue) ? searchValue.value = $event : null,
        placeholder: "Search (3 characters minimum)",
        class: "h-10 w-full"
      }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Spinner, { class: "mx-auto w-20" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Spinner, { class: "mx-auto w-20" })
            ];
          }
        })
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        visible: unref(isSelectReportTypeModalVisible),
        "onUpdate:visible": ($event) => isRef(isSelectReportTypeModalVisible) ? isSelectReportTypeModalVisible.value = $event : null,
        modal: "",
        "dismissable-mask": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isSelectReportTypeModalVisible)) {
              _push2(ssrRenderComponent(_component_LazyAuditSelectReportTypeModalContent, {
                "no-axe": !Object.keys(_ctx.result.results).length
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(isSelectReportTypeModalVisible) ? (openBlock(), createBlock(_component_LazyAuditSelectReportTypeModalContent, {
                key: 0,
                "no-axe": !Object.keys(_ctx.result.results).length
              }, null, 8, ["no-axe"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditResults.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const route = useRoute();
    const router = useRouter();
    const auditId = route.params.id;
    const resultId = ref(Number(route.query.resultId));
    const isReloadRequired = ref(false);
    const { data: axeResults } = ([__temp, __restore] = withAsyncContext(() => supabase.from("axe").select("*").eq("audit_id", auditId)), __temp = await __temp, __restore(), __temp);
    const { data: auditInfo } = ([__temp, __restore] = withAsyncContext(() => supabase.from("audits").select("*, projects(name), profiles(username, full_name)").eq("id", auditId).single()), __temp = await __temp, __restore(), __temp);
    if (!axeResults || !auditInfo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Audit not found",
        fatal: true
      });
    }
    const urlAndSelectorOptions = axeResults == null ? void 0 : axeResults.map((result) => {
      var _a3;
      var _a2;
      const screenSize2 = availableScreenSizes.find(
        (availableScreenSize) => {
          var _a32;
          return availableScreenSize.viewport.toString() === ((_a32 = result.size) == null ? void 0 : _a32.toString());
        }
      );
      return {
        id: result.id,
        name: `${(_a2 = result.results) == null ? void 0 : _a2.url} - ${(_a3 = result.selector) != null ? _a3 : ""}`,
        screenSize: screenSize2
      };
    });
    if (!resultId.value) {
      resultId.value = (_a = urlAndSelectorOptions[0]) == null ? void 0 : _a.id;
    }
    const screenSizeOptions = urlAndSelectorOptions.reduce((acc, result) => {
      if (!acc.find((option) => {
        var _a2;
        return option.name === ((_a2 = result.screenSize) == null ? void 0 : _a2.name);
      })) {
        if (result.screenSize) {
          acc.push(result.screenSize);
        }
      }
      return acc;
    }, []);
    const screenSize = ref(
      ((_b = urlAndSelectorOptions.find((option) => resultId.value === option.id)) == null ? void 0 : _b.screenSize) || screenSizeOptions[0]
    );
    const urlAndSelectorOptionsForSelectedScreenSize = computed(
      () => urlAndSelectorOptions.filter(
        (option) => {
          var _a2;
          return ((_a2 = option.screenSize) == null ? void 0 : _a2.name) === screenSize.value.name;
        }
      )
    );
    const changeScreenSize = (value) => {
      var _a2, _b2;
      const previousResultName = (_a2 = urlAndSelectorOptionsForSelectedScreenSize.value.find(
        (value2) => value2.id === resultId.value
      )) == null ? void 0 : _a2.name;
      screenSize.value = value;
      resultId.value = ((_b2 = urlAndSelectorOptionsForSelectedScreenSize.value.find(
        (option) => option.name === previousResultName
      )) == null ? void 0 : _b2.id) || resultId.value;
    };
    const auditResult = computed(
      () => axeResults.find((result) => result.id === resultId.value)
    );
    watch(
      resultId,
      () => {
        router.replace({
          query: {
            resultId: resultId.value
          }
        });
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Accordion = resolveComponent("Accordion");
      const _component_AccordionTab = resolveComponent("AccordionTab");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_InlineMessage = resolveComponent("InlineMessage");
      const _component_AuditResults = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-24 space-y-6" }, _attrs))}>`);
      if (unref(auditInfo) && unref(auditInfo).config) {
        _push(`<!--[--><div class="flex flex-col-reverse gap-x-2 gap-y-4 md:flex-row md:justify-between"><h1 class="font-medium">Audit: ${ssrInterpolate(unref(auditInfo).config.title)}</h1><div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/audit/new?baseAuditId=${unref(auditId)}`,
          class: "p-button p-button-outlined"
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
        _push(`</div></div>`);
        _push(ssrRenderComponent(_component_Accordion, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_AccordionTab, { header: "Audit Information" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
                  if (_push3) {
                    _push3(`<ul class="space-y-1"${_scopeId2}><li${_scopeId2}><span class="font-bold"${_scopeId2}>Id: </span>#${ssrInterpolate(unref(auditId))}</li><li${_scopeId2}><span class="font-bold"${_scopeId2}>Project: </span> ${ssrInterpolate((_a2 = unref(auditInfo).projects) == null ? void 0 : _a2.name)}</li>`);
                    if ((_b2 = unref(auditInfo).config) == null ? void 0 : _b2.description) {
                      _push3(`<li${_scopeId2}><span class="font-bold"${_scopeId2}>Description: </span> ${ssrInterpolate(unref(auditInfo).config.description)}</li>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<li${_scopeId2}><span class="font-bold"${_scopeId2}>Created at: </span><time${_scopeId2}>${ssrInterpolate(new Date(unref(auditInfo).created_at).toLocaleDateString("pl-PL"))}</time></li><li${_scopeId2}><span class="font-bold"${_scopeId2}>Auditor: </span> ${ssrInterpolate((_c = unref(auditInfo).profiles) == null ? void 0 : _c.full_name)} (${ssrInterpolate((_d = unref(auditInfo).profiles) == null ? void 0 : _d.username)}) </li><li${_scopeId2}><span class="font-bold"${_scopeId2}>Status: </span>${ssrInterpolate(unref(auditInfo).status)}</li>`);
                    if ((_g = (_f = (_e = unref(auditInfo).config) == null ? void 0 : _e.basicAuth) == null ? void 0 : _f.username) == null ? void 0 : _g.length) {
                      _push3(`<li${_scopeId2}><span class="font-bold"${_scopeId2}>Basic Authentication:</span><ul class="list-disc pl-8"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(auditInfo).config.basicAuth, (tTValue, tTKey) => {
                        _push3(`<li${_scopeId2}><span class="font-bold first-letter:uppercase"${_scopeId2}>${ssrInterpolate(tTKey)}: </span> \xA0 ${ssrInterpolate(tTValue)}</li>`);
                      });
                      _push3(`<!--]--></ul></li>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(auditInfo).config.pages.length) {
                      _push3(`<li${_scopeId2}><span class="font-bold"${_scopeId2}>Pages:</span><ul class="list-disc space-y-2 pl-8"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(auditInfo).config.pages, (page, index) => {
                        var _a3;
                        _push3(`<li${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtLink, {
                          to: page.url,
                          target: "_blank"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(page.url)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(page.url), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        if ((_a3 = page.selector) == null ? void 0 : _a3.length) {
                          _push3(`<!--[--> - selector: <code class="break-words rounded-md bg-gray-100 px-2 py-1"${_scopeId2}>${ssrInterpolate(page.selector)}</code><!--]-->`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</li>`);
                      });
                      _push3(`<!--]--></ul></li>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<li${_scopeId2}><span class="font-bold"${_scopeId2}>Screen sizes:</span><ul class="list-disc pl-8"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(screenSizeOptions), (screenSize2, index) => {
                      _push3(`<li${_scopeId2}>${ssrInterpolate(screenSize2 == null ? void 0 : screenSize2.name)} [${ssrInterpolate(screenSize2 == null ? void 0 : screenSize2.viewport[0])} x ${ssrInterpolate(screenSize2 == null ? void 0 : screenSize2.viewport[1])}] </li>`);
                    });
                    _push3(`<!--]--></ul></li></ul>`);
                  } else {
                    return [
                      createVNode("ul", { class: "space-y-1" }, [
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Id: "),
                          createTextVNode("#" + toDisplayString(unref(auditId)), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Project: "),
                          createTextVNode(" " + toDisplayString((_h = unref(auditInfo).projects) == null ? void 0 : _h.name), 1)
                        ]),
                        ((_i = unref(auditInfo).config) == null ? void 0 : _i.description) ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("span", { class: "font-bold" }, "Description: "),
                          createTextVNode(" " + toDisplayString(unref(auditInfo).config.description), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Created at: "),
                          createVNode("time", null, toDisplayString(new Date(unref(auditInfo).created_at).toLocaleDateString("pl-PL")), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Auditor: "),
                          createTextVNode(" " + toDisplayString((_j = unref(auditInfo).profiles) == null ? void 0 : _j.full_name) + " (" + toDisplayString((_k = unref(auditInfo).profiles) == null ? void 0 : _k.username) + ") ", 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Status: "),
                          createTextVNode(toDisplayString(unref(auditInfo).status), 1)
                        ]),
                        ((_n = (_m = (_l = unref(auditInfo).config) == null ? void 0 : _l.basicAuth) == null ? void 0 : _m.username) == null ? void 0 : _n.length) ? (openBlock(), createBlock("li", { key: 1 }, [
                          createVNode("span", { class: "font-bold" }, "Basic Authentication:"),
                          createVNode("ul", { class: "list-disc pl-8" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(auditInfo).config.basicAuth, (tTValue, tTKey) => {
                              return openBlock(), createBlock("li", { key: tTKey }, [
                                createVNode("span", { class: "font-bold first-letter:uppercase" }, toDisplayString(tTKey) + ": ", 1),
                                createTextVNode(" \xA0 " + toDisplayString(tTValue), 1)
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        unref(auditInfo).config.pages.length ? (openBlock(), createBlock("li", { key: 2 }, [
                          createVNode("span", { class: "font-bold" }, "Pages:"),
                          createVNode("ul", { class: "list-disc space-y-2 pl-8" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(auditInfo).config.pages, (page, index) => {
                              var _a3;
                              return openBlock(), createBlock("li", { key: index }, [
                                createVNode(_component_NuxtLink, {
                                  to: page.url,
                                  target: "_blank"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(page.url), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                ((_a3 = page.selector) == null ? void 0 : _a3.length) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" - selector: "),
                                  createVNode("code", { class: "break-words rounded-md bg-gray-100 px-2 py-1" }, toDisplayString(page.selector), 1)
                                ], 64)) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Screen sizes:"),
                          createVNode("ul", { class: "list-disc pl-8" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(screenSizeOptions), (screenSize2, index) => {
                              return openBlock(), createBlock("li", { key: index }, toDisplayString(screenSize2 == null ? void 0 : screenSize2.name) + " [" + toDisplayString(screenSize2 == null ? void 0 : screenSize2.viewport[0]) + " x " + toDisplayString(screenSize2 == null ? void 0 : screenSize2.viewport[1]) + "] ", 1);
                            }), 128))
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_AccordionTab, { header: "Audit Information" }, {
                  default: withCtx(() => {
                    var _a2, _b2, _c, _d, _e, _f, _g;
                    return [
                      createVNode("ul", { class: "space-y-1" }, [
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Id: "),
                          createTextVNode("#" + toDisplayString(unref(auditId)), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Project: "),
                          createTextVNode(" " + toDisplayString((_a2 = unref(auditInfo).projects) == null ? void 0 : _a2.name), 1)
                        ]),
                        ((_b2 = unref(auditInfo).config) == null ? void 0 : _b2.description) ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("span", { class: "font-bold" }, "Description: "),
                          createTextVNode(" " + toDisplayString(unref(auditInfo).config.description), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Created at: "),
                          createVNode("time", null, toDisplayString(new Date(unref(auditInfo).created_at).toLocaleDateString("pl-PL")), 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Auditor: "),
                          createTextVNode(" " + toDisplayString((_c = unref(auditInfo).profiles) == null ? void 0 : _c.full_name) + " (" + toDisplayString((_d = unref(auditInfo).profiles) == null ? void 0 : _d.username) + ") ", 1)
                        ]),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Status: "),
                          createTextVNode(toDisplayString(unref(auditInfo).status), 1)
                        ]),
                        ((_g = (_f = (_e = unref(auditInfo).config) == null ? void 0 : _e.basicAuth) == null ? void 0 : _f.username) == null ? void 0 : _g.length) ? (openBlock(), createBlock("li", { key: 1 }, [
                          createVNode("span", { class: "font-bold" }, "Basic Authentication:"),
                          createVNode("ul", { class: "list-disc pl-8" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(auditInfo).config.basicAuth, (tTValue, tTKey) => {
                              return openBlock(), createBlock("li", { key: tTKey }, [
                                createVNode("span", { class: "font-bold first-letter:uppercase" }, toDisplayString(tTKey) + ": ", 1),
                                createTextVNode(" \xA0 " + toDisplayString(tTValue), 1)
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        unref(auditInfo).config.pages.length ? (openBlock(), createBlock("li", { key: 2 }, [
                          createVNode("span", { class: "font-bold" }, "Pages:"),
                          createVNode("ul", { class: "list-disc space-y-2 pl-8" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(auditInfo).config.pages, (page, index) => {
                              var _a3;
                              return openBlock(), createBlock("li", { key: index }, [
                                createVNode(_component_NuxtLink, {
                                  to: page.url,
                                  target: "_blank"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(page.url), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                ((_a3 = page.selector) == null ? void 0 : _a3.length) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" - selector: "),
                                  createVNode("code", { class: "break-words rounded-md bg-gray-100 px-2 py-1" }, toDisplayString(page.selector), 1)
                                ], 64)) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("li", null, [
                          createVNode("span", { class: "font-bold" }, "Screen sizes:"),
                          createVNode("ul", { class: "list-disc pl-8" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(screenSizeOptions), (screenSize2, index) => {
                              return openBlock(), createBlock("li", { key: index }, toDisplayString(screenSize2 == null ? void 0 : screenSize2.name) + " [" + toDisplayString(screenSize2 == null ? void 0 : screenSize2.viewport[0]) + " x " + toDisplayString(screenSize2 == null ? void 0 : screenSize2.viewport[1]) + "] ", 1);
                            }), 128))
                          ])
                        ])
                      ])
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-[2fr_1fr]">`);
        if (!unref(auditInfo).config.noAxe) {
          _push(`<div><label for="url-selector" class="mb-2 block font-medium"> Url and selector </label>`);
          _push(ssrRenderComponent(_component_Dropdown, {
            modelValue: unref(resultId),
            "onUpdate:modelValue": ($event) => isRef(resultId) ? resultId.value = $event : null,
            class: "w-full",
            options: unref(urlAndSelectorOptionsForSelectedScreenSize),
            "option-label": "name",
            "option-value": "id",
            "input-id": "url-selector",
            onChange: ($event) => isReloadRequired.value = true
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass({ "col-span-2": unref(auditInfo).config.noAxe })}"><label for="screen-size" class="mb-2 block font-medium"> Screen size / Device </label>`);
        _push(ssrRenderComponent(_component_Dropdown, {
          "model-value": unref(screenSize),
          class: "w-full",
          "option-label": "name",
          options: unref(screenSizeOptions),
          "input-id": "screen-size",
          "onUpdate:modelValue": changeScreenSize,
          onChange: ($event) => isReloadRequired.value = true
        }, null, _parent));
        _push(`</div></div>`);
        _push(ssrRenderComponent(_component_InlineMessage, {
          style: unref(isReloadRequired) ? null : { display: "none" },
          severity: "warn",
          class: "flex w-full items-center !justify-start"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Refresh the page to make sure the correct audit data is displayed. `);
            } else {
              return [
                createTextVNode(" Refresh the page to make sure the correct audit data is displayed. ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(auditResult)) {
          _push(ssrRenderComponent(_component_AuditResults, { result: unref(auditResult) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-272fff9a.mjs.map
