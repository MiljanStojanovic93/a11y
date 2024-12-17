import { useSSRContext, defineComponent, resolveComponent, withCtx, createVNode, withAsyncContext, ref, computed, unref, isRef, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, defineAsyncComponent } from 'vue';
import { f as auditFormSchema, u as useValidation, d as displayFirstError } from './form-a6ff6648.mjs';
import { c as useToast, a as useSupabaseClient, e as useRoute, f as useRouter, u as useSupabaseUser, h as useUser, i as isSupabaseError, S as SupabaseError, n as navigateTo, b as useNuxtApp } from '../server.mjs';
import { u as useFetch } from './fetch-e4d6a898.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useForm, useFieldArray } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { a as availableScreenSizes } from './screenSizes-4ba45971.mjs';
import 'yup';
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

const __nuxt_component_0_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./AuditProcessingDialog-e6f7122e.mjs').then((m) => m.default || m));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuditForm",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const {
      useFieldModel,
      handleSubmit,
      errors,
      submitCount,
      resetForm,
      setValues
    } = useForm({ validationSchema: toTypedSchema(auditFormSchema) });
    const { isSubmitted } = useValidation(submitCount);
    const {
      fields: pages,
      push: pushPage,
      remove: removePage
    } = useFieldArray("pages");
    const title = useFieldModel("title");
    const project = useFieldModel("project");
    const username = useFieldModel("username");
    const password = useFieldModel("password");
    const viewports = useFieldModel("viewports");
    const noAxe = useFieldModel("noAxe");
    const description = useFieldModel("description");
    const toast = useToast();
    const supabase = useSupabaseClient();
    const route = useRoute();
    const router = useRouter();
    const baseAuditId = route.query.baseAuditId;
    if (baseAuditId) {
      const { data: baseAudit, error } = ([__temp, __restore] = withAsyncContext(() => supabase.from("audits").select("*, projects(id)").eq("id", baseAuditId).single()), __temp = await __temp, __restore(), __temp);
      if (error) {
        const errorWithUpdatedMessage = {
          ...error,
          message: `Failed to copy configuration from audit #${baseAuditId}. ${error.message}`
        };
        const { $handleError } = useNuxtApp();
        $handleError(errorWithUpdatedMessage);
      } else {
        setValues({
          pages: baseAudit.config.noAxe ? [{ selector: "", url: "" }] : baseAudit.config.pages,
          title: baseAudit.config.title,
          project: (_a = baseAudit.projects) == null ? void 0 : _a.id,
          username: baseAudit.config.basicAuth.username,
          password: baseAudit.config.basicAuth.password,
          viewports: baseAudit.config.viewports,
          noAxe: baseAudit.config.noAxe,
          description: baseAudit.config.description
        });
        router.replace({ query: {} });
      }
    }
    const user = useSupabaseUser();
    const projects = ref([]);
    const userProjectIds = ref([]);
    const { isAdmin } = useUser();
    const isAllowedToAddAuditToSelectedProject = computed(
      () => project.value && (isAdmin.value || userProjectIds.value.includes(project.value))
    );
    if (user.value) {
      const { data: projectsData } = ([__temp, __restore] = withAsyncContext(() => supabase.from("projects").select("*")), __temp = await __temp, __restore(), __temp);
      projects.value = projectsData || [];
      const { data: profileProjectData } = ([__temp, __restore] = withAsyncContext(() => supabase.from("profile_project").select("project_id").eq("profile_id", user.value.id)), __temp = await __temp, __restore(), __temp);
      userProjectIds.value = (profileProjectData == null ? void 0 : profileProjectData.map((item) => item.project_id)) || [];
    }
    const isLoading = ref(false);
    const isAuditProcessingDialogVisible = ref(false);
    const newAuditId = ref();
    const selectedProjectName = computed(
      () => {
        var _a2;
        return ((_a2 = projects.value.find((item) => item.id === project.value)) == null ? void 0 : _a2.name) || "this project";
      }
    );
    const onInvalidSubmit = ({ errors: errors2 }) => displayFirstError(errors2);
    handleSubmit(async (values) => {
      var _a2;
      try {
        isLoading.value = true;
        let config = {
          basicAuth: {
            password: "",
            username: ""
          },
          pages: [],
          title: values.title,
          viewports: values.viewports.map(
            (viewport) => viewport ? viewport.filter(Boolean) : []
          ),
          noAxe: values.noAxe,
          description: values.description || ""
        };
        if (!values.noAxe) {
          config = {
            ...config,
            basicAuth: {
              password: values.password || "",
              username: values.username || ""
            },
            pages: values.pages || []
          };
        }
        const { data: newAudit, error } = await supabase.from("audits").insert({
          project_id: values.project,
          profile_id: user.value.id,
          status: "draft",
          config
        }).select().single();
        if (error) {
          if (isSupabaseError(error)) {
            throw new SupabaseError(error);
          }
          throw new Error((error == null ? void 0 : error.message) || "");
        }
        if (noAxe.value) {
          values.viewports.forEach(async (viewport) => {
            const { error: error2 } = await supabase.from("axe").insert({
              audit_id: newAudit.id,
              size: viewport == null ? void 0 : viewport.toString()
            }).select().single();
            if (error2) {
              throw isSupabaseError(error2) ? new SupabaseError(error2) : new Error((error2 == null ? void 0 : error2.message) || "");
            }
          });
          navigateTo(`/audit/${newAudit.id}`);
        } else {
          const { error: apiTestError } = await useFetch("/api/test", {
            method: "POST",
            body: newAudit
          }, "$V8eGduHtxW");
          if (apiTestError.value) {
            toast.add({
              severity: "error",
              summary: (_a2 = apiTestError.value) == null ? void 0 : _a2.message,
              life: 3e3
            });
          } else {
            newAuditId.value = newAudit.id;
            isAuditProcessingDialogVisible.value = true;
          }
        }
      } catch (error) {
        const { $handleError } = useNuxtApp();
        $handleError(error);
      } finally {
        isLoading.value = false;
      }
    }, onInvalidSubmit);
    const onAuditProcessingDialogClose = (resetAuditForm = true) => {
      isAuditProcessingDialogVisible.value = false;
      newAuditId.value = void 0;
      isLoading.value = false;
      resetAuditForm && resetForm();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputSwitch = resolveComponent("InputSwitch");
      const _component_Accordion = resolveComponent("Accordion");
      const _component_AccordionTab = resolveComponent("AccordionTab");
      const _component_InputText = resolveComponent("InputText");
      const _component_Button = resolveComponent("Button");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_MultiSelect = resolveComponent("MultiSelect");
      const _component_Password = resolveComponent("Password");
      const _component_LazyAuditProcessingDialog = __nuxt_component_0_lazy;
      _push(`<section${ssrRenderAttrs(_attrs)}><h2 class="mb-4">Configuration</h2><form><div class="mb-4 grid grid-cols-[48px_1fr] items-center gap-3">`);
      _push(ssrRenderComponent(_component_InputSwitch, {
        id: "no-axe",
        modelValue: unref(noAxe),
        "onUpdate:modelValue": ($event) => isRef(noAxe) ? noAxe.value = $event : null,
        "data-testid": "audit-no-axe-field"
      }, null, _parent));
      _push(`<label for="no-axe" class="cursor-pointer"> Skip Axe automatic tests. I only want to test manually. </label></div>`);
      _push(ssrRenderComponent(_component_Accordion, {
        "active-index": [0, 1],
        multiple: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(noAxe)) {
              _push2(ssrRenderComponent(_component_AccordionTab, { header: "Pages" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(pages), (page, index) => {
                      _push3(`<div class="mb-4 grid gap-6 border-b border-b-gray-300 pb-4"${_scopeId2}><div class="grid gap-6 md:grid-cols-2 md:items-start md:gap-x-8"${_scopeId2}><div class="w-full"${_scopeId2}><label${ssrRenderAttr("for", `url-${index}`)}${_scopeId2}>Url</label>`);
                      _push3(ssrRenderComponent(_component_InputText, {
                        id: `url-${index}`,
                        modelValue: page.value.url,
                        "onUpdate:modelValue": ($event) => page.value.url = $event,
                        class: ["w-full", [
                          {
                            "p-invalid": (unref(errors)[`pages[${index}].url`] || unref(errors)[`pages[${index}]`]) && unref(isSubmitted)
                          }
                        ]],
                        "data-testid": `audit-page-url-field-${index}`,
                        name: `pages[${index}].url`
                      }, null, _parent3, _scopeId2));
                      if (unref(errors)[`pages[${index}].url`] && unref(isSubmitted)) {
                        _push3(`<small class="p-error mt-1"${_scopeId2}>${ssrInterpolate(unref(errors)[`pages[${index}].url`])}</small>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="w-full"${_scopeId2}><label${ssrRenderAttr("for", `selector-${index}`)}${_scopeId2}>HTML Selector</label>`);
                      _push3(ssrRenderComponent(_component_InputText, {
                        id: `selector-${index}`,
                        modelValue: page.value.selector,
                        "onUpdate:modelValue": ($event) => page.value.selector = $event,
                        name: `pages[${index}].selector`,
                        class: ["w-full", [
                          {
                            "p-invalid": (unref(errors)[`pages[${index}].selector`] || unref(errors)[`pages[${index}]`]) && unref(isSubmitted)
                          }
                        ]],
                        "aria-describedby": `selector-help-${index}`,
                        "data-testid": `audit-page-selector-field-${index}`
                      }, null, _parent3, _scopeId2));
                      _push3(`<small${ssrRenderAttr("id", `selector-help-${index}`)}${_scopeId2}> Use .class or #id to choose selector to test, just one selector allowed. If empty whole document will be tested. </small></div>`);
                      if (unref(errors)[`pages[${index}]`] && unref(isSubmitted)) {
                        _push3(`<small class="p-error w-full"${_scopeId2}>${ssrInterpolate(unref(errors)[`pages[${index}]`])}</small>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      if (index !== 0) {
                        _push3(ssrRenderComponent(_component_Button, {
                          label: "Remove page",
                          variant: "secondary",
                          class: "tracking-wider md:justify-self-start",
                          icon: "pi pi-times",
                          "data-testid": `audit-remove-page-button-${index}`,
                          outlined: "",
                          pt: {
                            icon: { "aria-hidden": true }
                          },
                          onClick: ($event) => unref(removePage)(index)
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                    _push3(ssrRenderComponent(_component_Button, {
                      label: "Add page",
                      class: "w-full tracking-wider md:w-auto",
                      icon: "pi pi-plus",
                      outlined: "",
                      "data-testid": "audit-add-page-button",
                      pt: {
                        icon: { "aria-hidden": true }
                      },
                      onClick: ($event) => unref(pushPage)({ url: "", selector: "" })
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(pages), (page, index) => {
                        return openBlock(), createBlock("div", {
                          key: `page-${index}`,
                          class: "mb-4 grid gap-6 border-b border-b-gray-300 pb-4"
                        }, [
                          createVNode("div", { class: "grid gap-6 md:grid-cols-2 md:items-start md:gap-x-8" }, [
                            createVNode("div", { class: "w-full" }, [
                              createVNode("label", {
                                for: `url-${index}`
                              }, "Url", 8, ["for"]),
                              createVNode(_component_InputText, {
                                id: `url-${index}`,
                                modelValue: page.value.url,
                                "onUpdate:modelValue": ($event) => page.value.url = $event,
                                class: ["w-full", [
                                  {
                                    "p-invalid": (unref(errors)[`pages[${index}].url`] || unref(errors)[`pages[${index}]`]) && unref(isSubmitted)
                                  }
                                ]],
                                "data-testid": `audit-page-url-field-${index}`,
                                name: `pages[${index}].url`
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "data-testid", "name", "class"]),
                              unref(errors)[`pages[${index}].url`] && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                                key: 0,
                                class: "p-error mt-1"
                              }, toDisplayString(unref(errors)[`pages[${index}].url`]), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "w-full" }, [
                              createVNode("label", {
                                for: `selector-${index}`
                              }, "HTML Selector", 8, ["for"]),
                              createVNode(_component_InputText, {
                                id: `selector-${index}`,
                                modelValue: page.value.selector,
                                "onUpdate:modelValue": ($event) => page.value.selector = $event,
                                name: `pages[${index}].selector`,
                                class: ["w-full", [
                                  {
                                    "p-invalid": (unref(errors)[`pages[${index}].selector`] || unref(errors)[`pages[${index}]`]) && unref(isSubmitted)
                                  }
                                ]],
                                "aria-describedby": `selector-help-${index}`,
                                "data-testid": `audit-page-selector-field-${index}`
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "name", "aria-describedby", "data-testid", "class"]),
                              createVNode("small", {
                                id: `selector-help-${index}`
                              }, " Use .class or #id to choose selector to test, just one selector allowed. If empty whole document will be tested. ", 8, ["id"])
                            ]),
                            unref(errors)[`pages[${index}]`] && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                              key: 0,
                              class: "p-error w-full"
                            }, toDisplayString(unref(errors)[`pages[${index}]`]), 1)) : createCommentVNode("", true)
                          ]),
                          index !== 0 ? (openBlock(), createBlock(_component_Button, {
                            key: 0,
                            label: "Remove page",
                            variant: "secondary",
                            class: "tracking-wider md:justify-self-start",
                            icon: "pi pi-times",
                            "data-testid": `audit-remove-page-button-${index}`,
                            outlined: "",
                            pt: {
                              icon: { "aria-hidden": true }
                            },
                            onClick: ($event) => unref(removePage)(index)
                          }, null, 8, ["data-testid", "onClick"])) : createCommentVNode("", true)
                        ]);
                      }), 128)),
                      createVNode(_component_Button, {
                        label: "Add page",
                        class: "w-full tracking-wider md:w-auto",
                        icon: "pi pi-plus",
                        outlined: "",
                        "data-testid": "audit-add-page-button",
                        pt: {
                          icon: { "aria-hidden": true }
                        },
                        onClick: ($event) => unref(pushPage)({ url: "", selector: "" })
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AccordionTab, { header: "General" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-4"${_scopeId2}><div class="w-full"${_scopeId2}><label for="title"${_scopeId2}>Title</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "title",
                    modelValue: unref(title),
                    "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                    class: ["w-full", [{ "p-invalid": unref(errors).title && unref(isSubmitted) }]],
                    "data-testid": "audit-title-field",
                    name: "title"
                  }, null, _parent3, _scopeId2));
                  if (unref(errors).title && unref(isSubmitted)) {
                    _push3(`<small class="p-error mt-1"${_scopeId2}>${ssrInterpolate(unref(errors).title)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="w-full"${_scopeId2}><label id="project-label" for="project"${_scopeId2}> Project </label>`);
                  _push3(ssrRenderComponent(_component_Dropdown, {
                    id: "project",
                    modelValue: unref(project),
                    "onUpdate:modelValue": ($event) => isRef(project) ? project.value = $event : null,
                    options: unref(projects),
                    "option-label": "name",
                    "option-value": "id",
                    placeholder: "Select",
                    class: ["md:w-14rem w-full", [{ "p-invalid": unref(errors).project && unref(isSubmitted) }]],
                    "data-testid": "audit-project-field",
                    name: "project",
                    "aria-labelledby": "project-label"
                  }, null, _parent3, _scopeId2));
                  if (unref(errors).project && unref(isSubmitted)) {
                    _push3(`<small class="p-error mt-1"${_scopeId2}>${ssrInterpolate(unref(errors).project)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="col-span-2"${_scopeId2}><label for="description"${_scopeId2}>Description</label>`);
                  _push3(ssrRenderComponent(_component_Textarea, {
                    id: "description",
                    modelValue: unref(description),
                    "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                    name: "description",
                    class: "w-full",
                    rows: "5",
                    "aria-describedby": unref(noAxe) ? "description-help" : void 0
                  }, null, _parent3, _scopeId2));
                  if (unref(noAxe)) {
                    _push3(`<small id="description-help" class="block"${_scopeId2}> In case the audit only includes manual tests, be sure to disclose exactly what you&#39;ll be testing. </small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(errors).description && unref(isSubmitted)) {
                    _push3(`<small class="p-error mt-1"${_scopeId2}>${ssrInterpolate(unref(errors).description)}</small>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-4" }, [
                      createVNode("div", { class: "w-full" }, [
                        createVNode("label", { for: "title" }, "Title"),
                        createVNode(_component_InputText, {
                          id: "title",
                          modelValue: unref(title),
                          "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                          class: ["w-full", [{ "p-invalid": unref(errors).title && unref(isSubmitted) }]],
                          "data-testid": "audit-title-field",
                          name: "title"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        unref(errors).title && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "p-error mt-1"
                        }, toDisplayString(unref(errors).title), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "w-full" }, [
                        createVNode("label", {
                          id: "project-label",
                          for: "project"
                        }, " Project "),
                        createVNode(_component_Dropdown, {
                          id: "project",
                          modelValue: unref(project),
                          "onUpdate:modelValue": ($event) => isRef(project) ? project.value = $event : null,
                          options: unref(projects),
                          "option-label": "name",
                          "option-value": "id",
                          placeholder: "Select",
                          class: ["md:w-14rem w-full", [{ "p-invalid": unref(errors).project && unref(isSubmitted) }]],
                          "data-testid": "audit-project-field",
                          name: "project",
                          "aria-labelledby": "project-label"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "class"]),
                        unref(errors).project && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "p-error mt-1"
                        }, toDisplayString(unref(errors).project), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "col-span-2" }, [
                        createVNode("label", { for: "description" }, "Description"),
                        createVNode(_component_Textarea, {
                          id: "description",
                          modelValue: unref(description),
                          "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                          name: "description",
                          class: "w-full",
                          rows: "5",
                          "aria-describedby": unref(noAxe) ? "description-help" : void 0
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-describedby"]),
                        unref(noAxe) ? (openBlock(), createBlock("small", {
                          key: 0,
                          id: "description-help",
                          class: "block"
                        }, " In case the audit only includes manual tests, be sure to disclose exactly what you'll be testing. ")) : createCommentVNode("", true),
                        unref(errors).description && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                          key: 1,
                          class: "p-error mt-1"
                        }, toDisplayString(unref(errors).description), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AccordionTab, {
              header: unref(noAxe) ? "Screen sizes / Devices" : "Axe configuration"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass({ "grid gap-6 md:grid-rows-2 md:gap-4": !unref(noAxe) })}"${_scopeId2}><div class="grid"${_scopeId2}><label id="viewports" class="${ssrRenderClass({ "sr-only": unref(noAxe) })}"${_scopeId2}> Screen sizes / Devices </label>`);
                  _push3(ssrRenderComponent(_component_MultiSelect, {
                    modelValue: unref(viewports),
                    "onUpdate:modelValue": ($event) => isRef(viewports) ? viewports.value = $event : null,
                    "aria-labelledby": "viewports",
                    options: unref(availableScreenSizes),
                    "option-label": "name",
                    "option-value": "viewport",
                    placeholder: "Select screen sizes",
                    "max-selected-labels": 3,
                    name: "viewports",
                    class: [{ "p-invalid": unref(errors).viewports && unref(isSubmitted) }]
                  }, {
                    option: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="align-items-center flex"${_scopeId3}><div${_scopeId3}>${ssrInterpolate(slotProps.option.name)} [${ssrInterpolate(slotProps.option.viewport.join(" x "))}] </div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "align-items-center flex" }, [
                            createVNode("div", null, toDisplayString(slotProps.option.name) + " [" + toDisplayString(slotProps.option.viewport.join(" x ")) + "] ", 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (!unref(noAxe)) {
                    _push3(`<div class="grid w-full gap-6 gap-x-8 md:grid-cols-2"${_scopeId2}><div class="w-full"${_scopeId2}><label for="username"${_scopeId2}>Basic Auth username</label>`);
                    _push3(ssrRenderComponent(_component_InputText, {
                      id: "username",
                      modelValue: unref(username),
                      "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                      class: "w-full",
                      "data-testid": "audit-auth-username-field",
                      name: "username"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="w-full"${_scopeId2}><label for="password"${_scopeId2}>Basic Auth password</label>`);
                    _push3(ssrRenderComponent(_component_Password, {
                      id: "password",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      class: "w-full",
                      "input-class": "w-full",
                      "data-testid": "audit-auth-password-field",
                      name: "password",
                      feedback: false,
                      "toggle-mask": "",
                      pt: {
                        input: {
                          autocomplete: "off"
                        }
                      }
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: { "grid gap-6 md:grid-rows-2 md:gap-4": !unref(noAxe) }
                    }, [
                      createVNode("div", { class: "grid" }, [
                        createVNode("label", {
                          id: "viewports",
                          class: { "sr-only": unref(noAxe) }
                        }, " Screen sizes / Devices ", 2),
                        createVNode(_component_MultiSelect, {
                          modelValue: unref(viewports),
                          "onUpdate:modelValue": ($event) => isRef(viewports) ? viewports.value = $event : null,
                          "aria-labelledby": "viewports",
                          options: unref(availableScreenSizes),
                          "option-label": "name",
                          "option-value": "viewport",
                          placeholder: "Select screen sizes",
                          "max-selected-labels": 3,
                          name: "viewports",
                          class: [{ "p-invalid": unref(errors).viewports && unref(isSubmitted) }]
                        }, {
                          option: withCtx((slotProps) => [
                            createVNode("div", { class: "align-items-center flex" }, [
                              createVNode("div", null, toDisplayString(slotProps.option.name) + " [" + toDisplayString(slotProps.option.viewport.join(" x ")) + "] ", 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "options", "class"])
                      ]),
                      !unref(noAxe) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid w-full gap-6 gap-x-8 md:grid-cols-2"
                      }, [
                        createVNode("div", { class: "w-full" }, [
                          createVNode("label", { for: "username" }, "Basic Auth username"),
                          createVNode(_component_InputText, {
                            id: "username",
                            modelValue: unref(username),
                            "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                            class: "w-full",
                            "data-testid": "audit-auth-username-field",
                            name: "username"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode("label", { for: "password" }, "Basic Auth password"),
                          createVNode(_component_Password, {
                            id: "password",
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            class: "w-full",
                            "input-class": "w-full",
                            "data-testid": "audit-auth-password-field",
                            name: "password",
                            feedback: false,
                            "toggle-mask": "",
                            pt: {
                              input: {
                                autocomplete: "off"
                              }
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])) : createCommentVNode("", true)
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              !unref(noAxe) ? (openBlock(), createBlock(_component_AccordionTab, {
                key: 0,
                header: "Pages"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(pages), (page, index) => {
                    return openBlock(), createBlock("div", {
                      key: `page-${index}`,
                      class: "mb-4 grid gap-6 border-b border-b-gray-300 pb-4"
                    }, [
                      createVNode("div", { class: "grid gap-6 md:grid-cols-2 md:items-start md:gap-x-8" }, [
                        createVNode("div", { class: "w-full" }, [
                          createVNode("label", {
                            for: `url-${index}`
                          }, "Url", 8, ["for"]),
                          createVNode(_component_InputText, {
                            id: `url-${index}`,
                            modelValue: page.value.url,
                            "onUpdate:modelValue": ($event) => page.value.url = $event,
                            class: ["w-full", [
                              {
                                "p-invalid": (unref(errors)[`pages[${index}].url`] || unref(errors)[`pages[${index}]`]) && unref(isSubmitted)
                              }
                            ]],
                            "data-testid": `audit-page-url-field-${index}`,
                            name: `pages[${index}].url`
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "data-testid", "name", "class"]),
                          unref(errors)[`pages[${index}].url`] && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                            key: 0,
                            class: "p-error mt-1"
                          }, toDisplayString(unref(errors)[`pages[${index}].url`]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode("label", {
                            for: `selector-${index}`
                          }, "HTML Selector", 8, ["for"]),
                          createVNode(_component_InputText, {
                            id: `selector-${index}`,
                            modelValue: page.value.selector,
                            "onUpdate:modelValue": ($event) => page.value.selector = $event,
                            name: `pages[${index}].selector`,
                            class: ["w-full", [
                              {
                                "p-invalid": (unref(errors)[`pages[${index}].selector`] || unref(errors)[`pages[${index}]`]) && unref(isSubmitted)
                              }
                            ]],
                            "aria-describedby": `selector-help-${index}`,
                            "data-testid": `audit-page-selector-field-${index}`
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "name", "aria-describedby", "data-testid", "class"]),
                          createVNode("small", {
                            id: `selector-help-${index}`
                          }, " Use .class or #id to choose selector to test, just one selector allowed. If empty whole document will be tested. ", 8, ["id"])
                        ]),
                        unref(errors)[`pages[${index}]`] && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "p-error w-full"
                        }, toDisplayString(unref(errors)[`pages[${index}]`]), 1)) : createCommentVNode("", true)
                      ]),
                      index !== 0 ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        label: "Remove page",
                        variant: "secondary",
                        class: "tracking-wider md:justify-self-start",
                        icon: "pi pi-times",
                        "data-testid": `audit-remove-page-button-${index}`,
                        outlined: "",
                        pt: {
                          icon: { "aria-hidden": true }
                        },
                        onClick: ($event) => unref(removePage)(index)
                      }, null, 8, ["data-testid", "onClick"])) : createCommentVNode("", true)
                    ]);
                  }), 128)),
                  createVNode(_component_Button, {
                    label: "Add page",
                    class: "w-full tracking-wider md:w-auto",
                    icon: "pi pi-plus",
                    outlined: "",
                    "data-testid": "audit-add-page-button",
                    pt: {
                      icon: { "aria-hidden": true }
                    },
                    onClick: ($event) => unref(pushPage)({ url: "", selector: "" })
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_AccordionTab, { header: "General" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-4" }, [
                    createVNode("div", { class: "w-full" }, [
                      createVNode("label", { for: "title" }, "Title"),
                      createVNode(_component_InputText, {
                        id: "title",
                        modelValue: unref(title),
                        "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                        class: ["w-full", [{ "p-invalid": unref(errors).title && unref(isSubmitted) }]],
                        "data-testid": "audit-title-field",
                        name: "title"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      unref(errors).title && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "p-error mt-1"
                      }, toDisplayString(unref(errors).title), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "w-full" }, [
                      createVNode("label", {
                        id: "project-label",
                        for: "project"
                      }, " Project "),
                      createVNode(_component_Dropdown, {
                        id: "project",
                        modelValue: unref(project),
                        "onUpdate:modelValue": ($event) => isRef(project) ? project.value = $event : null,
                        options: unref(projects),
                        "option-label": "name",
                        "option-value": "id",
                        placeholder: "Select",
                        class: ["md:w-14rem w-full", [{ "p-invalid": unref(errors).project && unref(isSubmitted) }]],
                        "data-testid": "audit-project-field",
                        name: "project",
                        "aria-labelledby": "project-label"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "class"]),
                      unref(errors).project && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "p-error mt-1"
                      }, toDisplayString(unref(errors).project), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "col-span-2" }, [
                      createVNode("label", { for: "description" }, "Description"),
                      createVNode(_component_Textarea, {
                        id: "description",
                        modelValue: unref(description),
                        "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                        name: "description",
                        class: "w-full",
                        rows: "5",
                        "aria-describedby": unref(noAxe) ? "description-help" : void 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-describedby"]),
                      unref(noAxe) ? (openBlock(), createBlock("small", {
                        key: 0,
                        id: "description-help",
                        class: "block"
                      }, " In case the audit only includes manual tests, be sure to disclose exactly what you'll be testing. ")) : createCommentVNode("", true),
                      unref(errors).description && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                        key: 1,
                        class: "p-error mt-1"
                      }, toDisplayString(unref(errors).description), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_AccordionTab, {
                header: unref(noAxe) ? "Screen sizes / Devices" : "Axe configuration"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: { "grid gap-6 md:grid-rows-2 md:gap-4": !unref(noAxe) }
                  }, [
                    createVNode("div", { class: "grid" }, [
                      createVNode("label", {
                        id: "viewports",
                        class: { "sr-only": unref(noAxe) }
                      }, " Screen sizes / Devices ", 2),
                      createVNode(_component_MultiSelect, {
                        modelValue: unref(viewports),
                        "onUpdate:modelValue": ($event) => isRef(viewports) ? viewports.value = $event : null,
                        "aria-labelledby": "viewports",
                        options: unref(availableScreenSizes),
                        "option-label": "name",
                        "option-value": "viewport",
                        placeholder: "Select screen sizes",
                        "max-selected-labels": 3,
                        name: "viewports",
                        class: [{ "p-invalid": unref(errors).viewports && unref(isSubmitted) }]
                      }, {
                        option: withCtx((slotProps) => [
                          createVNode("div", { class: "align-items-center flex" }, [
                            createVNode("div", null, toDisplayString(slotProps.option.name) + " [" + toDisplayString(slotProps.option.viewport.join(" x ")) + "] ", 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "options", "class"])
                    ]),
                    !unref(noAxe) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid w-full gap-6 gap-x-8 md:grid-cols-2"
                    }, [
                      createVNode("div", { class: "w-full" }, [
                        createVNode("label", { for: "username" }, "Basic Auth username"),
                        createVNode(_component_InputText, {
                          id: "username",
                          modelValue: unref(username),
                          "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                          class: "w-full",
                          "data-testid": "audit-auth-username-field",
                          name: "username"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "w-full" }, [
                        createVNode("label", { for: "password" }, "Basic Auth password"),
                        createVNode(_component_Password, {
                          id: "password",
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          class: "w-full",
                          "input-class": "w-full",
                          "data-testid": "audit-auth-password-field",
                          name: "password",
                          feedback: false,
                          "toggle-mask": "",
                          pt: {
                            input: {
                              autocomplete: "off"
                            }
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])) : createCommentVNode("", true)
                  ], 2)
                ]),
                _: 1
              }, 8, ["header"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div aria-live="assertive">`);
      if (unref(project) && !unref(isAllowedToAddAuditToSelectedProject)) {
        _push(`<small class="mb-4 mt-3 block text-red-700"> You don&#39;t have permission to add an audit to the ${ssrInterpolate(unref(selectedProjectName))}. To gain access please contact the administrator. </small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Button, {
        label: unref(isLoading) ? "Sending..." : "Send",
        type: "submit",
        class: "p-button-lg w-full",
        "data-testid": "audit-submit-button",
        loading: unref(isLoading),
        disabled: unref(isLoading) || !unref(isAllowedToAddAuditToSelectedProject)
      }, null, _parent));
      _push(`</form>`);
      if (unref(newAuditId)) {
        _push(ssrRenderComponent(_component_LazyAuditProcessingDialog, {
          visible: unref(isAuditProcessingDialogVisible),
          "onUpdate:visible": ($event) => isRef(isAuditProcessingDialogVisible) ? isAuditProcessingDialogVisible.value = $event : null,
          "audit-id": unref(newAuditId),
          onClose: (options) => onAuditProcessingDialogClose(options == null ? void 0 : options.resetAuditForm),
          onHide: onAuditProcessingDialogClose
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuditForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = resolveComponent("Card");
      const _component_AuditForm = _sfc_main$1;
      _push(`<!--[--><div class="grid"><h1>New audit</h1></div>`);
      _push(ssrRenderComponent(_component_Card, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AuditForm, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AuditForm)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audit/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-2059aca1.mjs.map
