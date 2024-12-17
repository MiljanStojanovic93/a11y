import { _ as __nuxt_component_0 } from './Spinner-e14ec5b8.mjs';
import { useSSRContext, defineComponent, ref, computed, withAsyncContext, resolveComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, createCommentVNode, isRef, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { a as useSupabaseClient, c as useToast, d as useConfirm, u as useSupabaseUser, i as isSupabaseError, S as SupabaseError, b as useNuxtApp } from '../server.mjs';
import { e as editUserTypeFormSchema, u as useValidation, c as createProjectFormSchema, b as addProfileToProjectFormSchema, d as displayFirstError } from './form-a6ff6648.mjs';
import { useForm } from 'vee-validate';
import { u as useFetch } from './fetch-e4d6a898.mjs';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
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
import 'yup';
import './screenSizes-4ba45971.mjs';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ProfileTable",
  __ssrInlineRender: true,
  props: {
    profiles: {}
  },
  setup(__props) {
    const props = __props;
    const nodes = computed(
      () => props.profiles.map((profile) => ({
        data: {
          userType: profile.user_type,
          ...profile,
          name: `${profile.email} ${profile.username ? `[${profile.username}]` : ""}`
        }
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TreeTable = resolveComponent("TreeTable");
      const _component_Column = resolveComponent("Column");
      _push(ssrRenderComponent(_component_TreeTable, mergeProps({
        value: unref(nodes),
        paginator: true,
        rows: 10,
        "rows-per-page-options": [10, 25, 50],
        "auto-layout": true
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "id",
              header: "Id",
              expander: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "name",
              header: "User"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "email",
              header: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "userType",
              header: "User Type"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "id",
                header: "Id",
                expander: ""
              }),
              createVNode(_component_Column, {
                field: "name",
                header: "User"
              }),
              createVNode(_component_Column, {
                field: "email",
                header: "Email"
              }),
              createVNode(_component_Column, {
                field: "userType",
                header: "User Type"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfileTable.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProjectTable",
  __ssrInlineRender: true,
  props: {
    projects: {}
  },
  setup(__props) {
    const props = __props;
    const nodes = computed(
      () => props.projects.map(
        (project) => ({
          data: {
            ...project
          }
        })
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TreeTable = resolveComponent("TreeTable");
      const _component_Column = resolveComponent("Column");
      _push(ssrRenderComponent(_component_TreeTable, mergeProps({
        "auto-layout": true,
        value: unref(nodes),
        paginator: true,
        rows: 10,
        "rows-per-page-options": [10, 25, 50]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "id",
              header: "Id",
              expander: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "name",
              header: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "description",
              header: "Description"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "id",
                header: "Id",
                expander: ""
              }),
              createVNode(_component_Column, {
                field: "name",
                header: "Name"
              }),
              createVNode(_component_Column, {
                field: "description",
                header: "Description"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectTable.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ClaimTable",
  __ssrInlineRender: true,
  props: {
    profilesToProjects: {},
    isLoading: { type: Boolean }
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const filters = ref({ name: "", email: "", role: "" });
    const confirm = useConfirm();
    const props = __props;
    const confirmRemovalPermission = (userId, projectId) => {
      confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          emit("remove", { userId, projectId });
        }
      });
    };
    const emit = __emit;
    const nodes = computed(() => {
      const projectsMap = [];
      props.profilesToProjects.forEach((item) => {
        var _a;
        const { projectId, name, email, userId, metadata } = item;
        if (!projectsMap[projectId]) {
          projectsMap[projectId] = {
            key: `${projectId}_${userId}`,
            data: {
              name,
              projectId,
              action: false
            },
            children: []
          };
        }
        (_a = projectsMap[projectId].children) == null ? void 0 : _a.push({
          key: `${projectId}_${userId}`,
          data: {
            email,
            userId,
            projectId,
            action: true,
            role: metadata.user_role
          }
        });
      });
      return Object.values(projectsMap);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TreeTable = resolveComponent("TreeTable");
      const _component_Column = resolveComponent("Column");
      const _component_InputText = resolveComponent("InputText");
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_TreeTable, mergeProps({
        "auto-layout": true,
        value: unref(nodes),
        filters: unref(filters),
        "filter-mode": "lenient",
        paginator: true,
        rows: 10,
        "rows-per-page-options": [10, 25, 50]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "name",
              header: "Project Name",
              expander: "",
              sortable: ""
            }, {
              filter: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, {
                    modelValue: unref(filters)["name"],
                    "onUpdate:modelValue": ($event) => unref(filters)["name"] = $event,
                    type: "text",
                    class: "p-column-filter",
                    placeholder: "Filter by name"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_InputText, {
                      modelValue: unref(filters)["name"],
                      "onUpdate:modelValue": ($event) => unref(filters)["name"] = $event,
                      type: "text",
                      class: "p-column-filter",
                      placeholder: "Filter by name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "email",
              header: "User Email"
            }, {
              filter: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, {
                    modelValue: unref(filters)["email"],
                    "onUpdate:modelValue": ($event) => unref(filters)["email"] = $event,
                    type: "text",
                    class: "p-column-filter",
                    placeholder: "Filter by email"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_InputText, {
                      modelValue: unref(filters)["email"],
                      "onUpdate:modelValue": ($event) => unref(filters)["email"] = $event,
                      type: "text",
                      class: "p-column-filter",
                      placeholder: "Filter by email"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "role",
              header: "User Role"
            }, {
              filter: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, {
                    modelValue: unref(filters)["role"],
                    "onUpdate:modelValue": ($event) => unref(filters)["role"] = $event,
                    type: "text",
                    class: "p-column-filter",
                    placeholder: "Filter by role"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_InputText, {
                      modelValue: unref(filters)["role"],
                      "onUpdate:modelValue": ($event) => unref(filters)["role"] = $event,
                      type: "text",
                      class: "p-column-filter",
                      placeholder: "Filter by role"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: "Action",
              name: "action"
            }, {
              body: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (scope.node.data.action) {
                    _push3(ssrRenderComponent(_component_Button, {
                      type: "button",
                      "aria-label": "Remove permission",
                      title: "Remove permission",
                      loading: _ctx.isLoading,
                      disabled: _ctx.isLoading,
                      severity: "danger",
                      onClick: ($event) => confirmRemovalPermission(
                        scope.node.data.userId,
                        scope.node.data.projectId
                      )
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
                } else {
                  return [
                    scope.node.data.action ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      type: "button",
                      "aria-label": "Remove permission",
                      title: "Remove permission",
                      loading: _ctx.isLoading,
                      disabled: _ctx.isLoading,
                      severity: "danger",
                      onClick: ($event) => confirmRemovalPermission(
                        scope.node.data.userId,
                        scope.node.data.projectId
                      )
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Remove ")
                      ]),
                      _: 2
                    }, 1032, ["loading", "disabled", "onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "name",
                header: "Project Name",
                expander: "",
                sortable: ""
              }, {
                filter: withCtx(() => [
                  createVNode(_component_InputText, {
                    modelValue: unref(filters)["name"],
                    "onUpdate:modelValue": ($event) => unref(filters)["name"] = $event,
                    type: "text",
                    class: "p-column-filter",
                    placeholder: "Filter by name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "email",
                header: "User Email"
              }, {
                filter: withCtx(() => [
                  createVNode(_component_InputText, {
                    modelValue: unref(filters)["email"],
                    "onUpdate:modelValue": ($event) => unref(filters)["email"] = $event,
                    type: "text",
                    class: "p-column-filter",
                    placeholder: "Filter by email"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "role",
                header: "User Role"
              }, {
                filter: withCtx(() => [
                  createVNode(_component_InputText, {
                    modelValue: unref(filters)["role"],
                    "onUpdate:modelValue": ($event) => unref(filters)["role"] = $event,
                    type: "text",
                    class: "p-column-filter",
                    placeholder: "Filter by role"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                header: "Action",
                name: "action"
              }, {
                body: withCtx((scope) => [
                  scope.node.data.action ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    type: "button",
                    "aria-label": "Remove permission",
                    title: "Remove permission",
                    loading: _ctx.isLoading,
                    disabled: _ctx.isLoading,
                    severity: "danger",
                    onClick: ($event) => confirmRemovalPermission(
                      scope.node.data.userId,
                      scope.node.data.projectId
                    )
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Remove ")
                    ]),
                    _: 2
                  }, 1032, ["loading", "disabled", "onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClaimTable.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "EditUserTypeForm",
  __ssrInlineRender: true,
  props: {
    users: {}
  },
  emits: ["after-submit"],
  setup(__props, { emit: __emit }) {
    const { useFieldModel, handleSubmit, errors, submitCount, resetForm } = useForm(
      {
        validationSchema: editUserTypeFormSchema
      }
    );
    const [user, userType] = useFieldModel(["user", "userType"]);
    const types = ["auditor", "viewer"];
    const supabase = useSupabaseClient();
    const toast = useToast();
    const isLoading = ref(false);
    const emit = __emit;
    const { isSubmitted } = useValidation(submitCount);
    const setClaim = async (uid, claim, value) => {
      const { data, error } = await supabase.rpc("set_claim", { uid, claim, value });
      return { data, error };
    };
    const onInvalidSubmit = ({ errors: errors2 }) => displayFirstError(errors2);
    const editUserType = handleSubmit(async ({ user: id, userType: userRole }) => {
      var _a;
      try {
        isLoading.value = true;
        const authUser = useSupabaseUser();
        if ((_a = authUser.value) == null ? void 0 : _a.id) {
          const { error } = await setClaim(id, "user_role", userRole);
          if (error) {
            if (isSupabaseError(error)) {
              throw new SupabaseError(error);
            }
            throw new Error((error == null ? void 0 : error.message) || "");
          }
          toast.add({
            severity: "success",
            summary: "Successfully edit user type",
            life: 3e3
          });
          resetForm();
          emit("after-submit");
        }
      } catch (error) {
        const { $handleError } = useNuxtApp();
        $handleError(error);
      } finally {
        isLoading.value = false;
      }
    }, onInvalidSubmit);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = resolveComponent("Card");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_Card, mergeProps({ class: "mb-6" }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="mb-4"${_scopeId}><legend class="mb-4 font-bold underline"${_scopeId}>Update user type</legend><div class="mb-6 grid gap-3 md:grid-cols-2"${_scopeId}><div${_scopeId}><label for="user_id"${_scopeId}> User </label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "user_id",
              modelValue: unref(user),
              "onUpdate:modelValue": ($event) => isRef(user) ? user.value = $event : null,
              options: _ctx.users,
              "option-label": ({ full_name, email, user_type }) => `${full_name != null ? full_name : email} [${user_type != null ? user_type : "user type not set"}]`,
              "option-value": "id",
              placeholder: "Select",
              class: ["md:w-14rem w-full", [{ "p-invalid": unref(errors).user && unref(isSubmitted) }]],
              "data-testid": "claims-user-field",
              name: "user"
            }, null, _parent2, _scopeId));
            if (unref(errors).user && unref(isSubmitted)) {
              _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).user)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="user_type"${_scopeId}>User type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "user_type",
              modelValue: unref(userType),
              "onUpdate:modelValue": ($event) => isRef(userType) ? userType.value = $event : null,
              options: types,
              placeholder: "Select",
              class: ["md:w-14rem w-full", [{ "p-invalid": unref(errors).userType && unref(isSubmitted) }]],
              "data-testid": "account-userType-field",
              name: "userType"
            }, null, _parent2, _scopeId));
            if (unref(errors).userType && unref(isSubmitted)) {
              _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).userType)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: unref(isLoading) ? "Loading ..." : "Update",
              type: "submit",
              class: "p-button-lg w-full",
              "data-testid": "edit-user-type-submit-button",
              loading: unref(isLoading),
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                class: "mb-4",
                onSubmit: unref(editUserType)
              }, [
                createVNode("legend", { class: "mb-4 font-bold underline" }, "Update user type"),
                createVNode("div", { class: "mb-6 grid gap-3 md:grid-cols-2" }, [
                  createVNode("div", null, [
                    createVNode("label", { for: "user_id" }, " User "),
                    createVNode(_component_Dropdown, {
                      id: "user_id",
                      modelValue: unref(user),
                      "onUpdate:modelValue": ($event) => isRef(user) ? user.value = $event : null,
                      options: _ctx.users,
                      "option-label": ({ full_name, email, user_type }) => `${full_name != null ? full_name : email} [${user_type != null ? user_type : "user type not set"}]`,
                      "option-value": "id",
                      placeholder: "Select",
                      class: ["md:w-14rem w-full", [{ "p-invalid": unref(errors).user && unref(isSubmitted) }]],
                      "data-testid": "claims-user-field",
                      name: "user"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "option-label", "class"]),
                    unref(errors).user && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).user), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { for: "user_type" }, "User type"),
                    createVNode(_component_Dropdown, {
                      id: "user_type",
                      modelValue: unref(userType),
                      "onUpdate:modelValue": ($event) => isRef(userType) ? userType.value = $event : null,
                      options: types,
                      placeholder: "Select",
                      class: ["md:w-14rem w-full", [{ "p-invalid": unref(errors).userType && unref(isSubmitted) }]],
                      "data-testid": "account-userType-field",
                      name: "userType"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    unref(errors).userType && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).userType), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createVNode(_component_Button, {
                  label: unref(isLoading) ? "Loading ..." : "Update",
                  type: "submit",
                  class: "p-button-lg w-full",
                  "data-testid": "edit-user-type-submit-button",
                  loading: unref(isLoading),
                  disabled: unref(isLoading)
                }, null, 8, ["label", "loading", "disabled"])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EditUserTypeForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CreateProjectForm",
  __ssrInlineRender: true,
  emits: ["after-submit"],
  setup(__props, { emit: __emit }) {
    const { useFieldModel, handleSubmit, errors, submitCount, resetForm } = useForm(
      {
        validationSchema: createProjectFormSchema
      }
    );
    const [name, description] = useFieldModel(["name", "description"]);
    const supabase = useSupabaseClient();
    const toast = useToast();
    const isLoading = ref(false);
    const emit = __emit;
    const { isSubmitted } = useValidation(submitCount);
    const onInvalidSubmit = ({ errors: errors2 }) => displayFirstError(errors2);
    const createProject = handleSubmit(async ({ name: name2, description: description2 }) => {
      var _a;
      try {
        isLoading.value = true;
        const authUser = useSupabaseUser();
        if ((_a = authUser.value) == null ? void 0 : _a.id) {
          const { error } = await supabase.from("projects").insert({ name: name2, description: description2 });
          if (error) {
            if (isSupabaseError(error)) {
              throw new SupabaseError(error);
            }
            throw new Error((error == null ? void 0 : error.message) || "");
          }
          toast.add({
            severity: "success",
            summary: "Successfully create new project",
            life: 3e3
          });
          resetForm();
          emit("after-submit");
        }
      } catch (error) {
        const { $handleError } = useNuxtApp();
        $handleError(error);
      } finally {
        isLoading.value = false;
      }
    }, onInvalidSubmit);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = resolveComponent("Card");
      const _component_InputText = resolveComponent("InputText");
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_Card, mergeProps({ class: "mb-6" }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="mb-4"${_scopeId}><legend class="mb-4 font-bold underline"${_scopeId}>Create project</legend><div class="mb-6 grid gap-3 md:grid-cols-2"${_scopeId}><div${_scopeId}><label for="project_name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "project_name",
              modelValue: unref(name),
              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
              class: ["w-full", [{ "p-invalid": unref(errors).name && unref(isSubmitted) }]],
              "data-testid": "create-project-name-field",
              name: "name"
            }, null, _parent2, _scopeId));
            if (unref(errors).name && unref(isSubmitted)) {
              _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).name)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="project_description"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "project_description",
              modelValue: unref(description),
              "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
              class: ["w-full", [{ "p-invalid": unref(errors).description && unref(isSubmitted) }]],
              "data-testid": "create-project-name-field",
              name: "description"
            }, null, _parent2, _scopeId));
            if (unref(errors).description && unref(isSubmitted)) {
              _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).description)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: unref(isLoading) ? "Loading ..." : "Create",
              type: "submit",
              class: "p-button-lg w-full",
              "data-testid": "create-project-submit-button",
              loading: unref(isLoading),
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                class: "mb-4",
                onSubmit: unref(createProject)
              }, [
                createVNode("legend", { class: "mb-4 font-bold underline" }, "Create project"),
                createVNode("div", { class: "mb-6 grid gap-3 md:grid-cols-2" }, [
                  createVNode("div", null, [
                    createVNode("label", { for: "project_name" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "project_name",
                      modelValue: unref(name),
                      "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                      class: ["w-full", [{ "p-invalid": unref(errors).name && unref(isSubmitted) }]],
                      "data-testid": "create-project-name-field",
                      name: "name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    unref(errors).name && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).name), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { for: "project_description" }, "Description"),
                    createVNode(_component_InputText, {
                      id: "project_description",
                      modelValue: unref(description),
                      "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                      class: ["w-full", [{ "p-invalid": unref(errors).description && unref(isSubmitted) }]],
                      "data-testid": "create-project-name-field",
                      name: "description"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    unref(errors).description && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).description), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createVNode(_component_Button, {
                  label: unref(isLoading) ? "Loading ..." : "Create",
                  type: "submit",
                  class: "p-button-lg w-full",
                  "data-testid": "create-project-submit-button",
                  loading: unref(isLoading),
                  disabled: unref(isLoading)
                }, null, 8, ["label", "loading", "disabled"])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreateProjectForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AddProfileToProjectForm",
  __ssrInlineRender: true,
  props: {
    profiles: {},
    projects: {}
  },
  emits: ["after-submit"],
  setup(__props, { emit: __emit }) {
    const { useFieldModel, handleSubmit, errors, submitCount, resetForm } = useForm(
      {
        validationSchema: addProfileToProjectFormSchema
      }
    );
    const [profile, project] = useFieldModel(["profile", "project"]);
    const supabase = useSupabaseClient();
    const toast = useToast();
    const isLoading = ref(false);
    const emit = __emit;
    const { isSubmitted } = useValidation(submitCount);
    const onInvalidSubmit = ({ errors: errors2 }) => displayFirstError(errors2);
    const addProfileToProject = handleSubmit(async ({ profile: profile2, project: project2 }) => {
      var _a;
      try {
        isLoading.value = true;
        const authUser = useSupabaseUser();
        if ((_a = authUser.value) == null ? void 0 : _a.id) {
          const { error } = await supabase.from("profile_project").insert({
            profile_id: profile2,
            project_id: project2
          });
          if (error) {
            if (isSupabaseError(error)) {
              throw new SupabaseError(error);
            }
            throw new Error((error == null ? void 0 : error.message) || "");
          }
          emit("after-submit");
          toast.add({
            severity: "success",
            summary: "You successfully added profile to project",
            life: 3e3
          });
          resetForm();
        }
      } catch (error) {
        const { $handleError } = useNuxtApp();
        $handleError(error);
      } finally {
        isLoading.value = false;
      }
    }, onInvalidSubmit);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = resolveComponent("Card");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_Card, _attrs, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><legend class="mb-4 w-full font-bold"${_scopeId}>Add profile to projects</legend><div class="mb-6 grid gap-3 md:grid-cols-2"${_scopeId}><div${_scopeId}><label for="profile_id"${_scopeId}>User</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "profile_id",
              modelValue: unref(profile),
              "onUpdate:modelValue": ($event) => isRef(profile) ? profile.value = $event : null,
              options: _ctx.profiles,
              "option-label": ({ full_name, email, user_type }) => `${full_name != null ? full_name : email} [${user_type != null ? user_type : "user type not set"}]`,
              "option-value": "id",
              placeholder: "Select",
              class: ["w-full", [{ "p-invalid": unref(errors).profile && unref(isSubmitted) }]],
              "data-testid": "claims-user-field",
              name: "client"
            }, null, _parent2, _scopeId));
            if (unref(errors).profile && unref(isSubmitted)) {
              _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).profile)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mr-2" for="project"${_scopeId}> Project </label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "project",
              modelValue: unref(project),
              "onUpdate:modelValue": ($event) => isRef(project) ? project.value = $event : null,
              options: _ctx.projects,
              "option-label": ({ id, name }) => `${name} [${id}]`,
              "option-value": "id",
              placeholder: "Select",
              class: ["w-full", [{ "p-invalid": unref(errors).project && unref(isSubmitted) }]],
              "data-testid": "claims-project-field",
              name: "project"
            }, null, _parent2, _scopeId));
            if (unref(errors).project && unref(isSubmitted)) {
              _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).project)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: unref(isLoading) ? "Loading ..." : "Update",
              type: "submit",
              class: "p-button-lg w-full",
              "data-testid": "audit-submit-button",
              loading: unref(isLoading),
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", { onSubmit: unref(addProfileToProject) }, [
                createVNode("legend", { class: "mb-4 w-full font-bold" }, "Add profile to projects"),
                createVNode("div", { class: "mb-6 grid gap-3 md:grid-cols-2" }, [
                  createVNode("div", null, [
                    createVNode("label", { for: "profile_id" }, "User"),
                    createVNode(_component_Dropdown, {
                      id: "profile_id",
                      modelValue: unref(profile),
                      "onUpdate:modelValue": ($event) => isRef(profile) ? profile.value = $event : null,
                      options: _ctx.profiles,
                      "option-label": ({ full_name, email, user_type }) => `${full_name != null ? full_name : email} [${user_type != null ? user_type : "user type not set"}]`,
                      "option-value": "id",
                      placeholder: "Select",
                      class: ["w-full", [{ "p-invalid": unref(errors).profile && unref(isSubmitted) }]],
                      "data-testid": "claims-user-field",
                      name: "client"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "option-label", "class"]),
                    unref(errors).profile && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).profile), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      class: "mr-2",
                      for: "project"
                    }, " Project "),
                    createVNode(_component_Dropdown, {
                      id: "project",
                      modelValue: unref(project),
                      "onUpdate:modelValue": ($event) => isRef(project) ? project.value = $event : null,
                      options: _ctx.projects,
                      "option-label": ({ id, name }) => `${name} [${id}]`,
                      "option-value": "id",
                      placeholder: "Select",
                      class: ["w-full", [{ "p-invalid": unref(errors).project && unref(isSubmitted) }]],
                      "data-testid": "claims-project-field",
                      name: "project"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "option-label", "class"]),
                    unref(errors).project && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).project), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createVNode(_component_Button, {
                  label: unref(isLoading) ? "Loading ..." : "Update",
                  type: "submit",
                  class: "p-button-lg w-full",
                  "data-testid": "audit-submit-button",
                  loading: unref(isLoading),
                  disabled: unref(isLoading)
                }, null, 8, ["label", "loading", "disabled"])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddProfileToProjectForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const toast = useToast();
    const isLoading = ref(false);
    const isFetching = ref(true);
    const profiles = ref([]);
    const authData = ref([]);
    const projects = ref([]);
    const profileProject = ref([]);
    const getAuthDataById = (id) => authData.value.find((user) => user.id === id);
    const getUsersWithEmails = computed(
      () => profiles.value.map(
        (profile) => {
          var _a2;
          return {
            ...profile,
            email: ((_a2 = getAuthDataById(profile.id)) == null ? void 0 : _a2.email) || ""
          };
        }
      )
    );
    const getProfileProject = computed(
      () => profileProject.value.map(
        ({ profile_id: profileId, project_id: projectId }) => {
          var _a2, _b, _c;
          const user = getAuthDataById(profileId);
          const projectData = projects.value.find(
            (project) => project.id === projectId
          );
          return {
            email: (_a2 = user == null ? void 0 : user.email) != null ? _a2 : "",
            name: (_b = projectData == null ? void 0 : projectData.name) != null ? _b : "",
            userId: (_c = user == null ? void 0 : user.id) != null ? _c : "",
            projectId: projectData.id,
            metadata: (user == null ? void 0 : user.app_metadata) || {}
          };
        }
      )
    );
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/users", "$4y9e2A2xrw")), __temp = await __temp, __restore(), __temp);
    authData.value = ((_a = data.value) == null ? void 0 : _a.users) || [];
    async function fetchProfiles() {
      try {
        const { data: data2 } = await supabase.from("profiles").select("*");
        profiles.value = data2 || [];
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }
    async function fetchProjects() {
      try {
        const { data: data2 } = await supabase.from("projects").select("*");
        projects.value = data2 || [];
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    async function fetchProjectProfile() {
      try {
        const { data: data2 } = await supabase.from("profile_project").select("*");
        profileProject.value = data2 || [];
      } catch (error) {
        console.error("Error fetching project profiles:", error);
      }
    }
    async function removeProfileFromProject(payload) {
      isLoading.value = true;
      try {
        const { error } = await supabase.from("profile_project").delete().eq("profile_id", payload.userId).eq("project_id", payload.projectId);
        if (error) {
          if (isSupabaseError(error)) {
            throw new SupabaseError(error);
          }
          throw new Error((error == null ? void 0 : error.message) || "");
        }
        fetchProjectProfile();
        toast.add({
          severity: "success",
          summary: "Permission deleted",
          life: 3e3
        });
      } catch (error) {
        const { $handleError } = useNuxtApp();
        $handleError(error);
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Spinner = __nuxt_component_0;
      const _component_Card = resolveComponent("Card");
      const _component_ProfileTable = _sfc_main$6;
      const _component_ProjectTable = _sfc_main$5;
      const _component_ClaimTable = _sfc_main$4;
      const _component_EditUserTypeForm = _sfc_main$3;
      const _component_CreateProjectForm = _sfc_main$2;
      const _component_AddProfileToProjectForm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid" }, _attrs))}><h1>Admin page</h1>`);
      if (unref(isFetching)) {
        _push(ssrRenderComponent(_component_Spinner, { class: "mx-auto my-10 w-40" }, null, _parent));
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_Card, { class: "mb-6 overflow-auto" }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<section class="mr-4"${_scopeId}><h2 class="underline"${_scopeId}>Profile list</h2>`);
              if (unref(getUsersWithEmails).length) {
                _push2(ssrRenderComponent(_component_ProfileTable, { profiles: unref(getUsersWithEmails) }, null, _parent2, _scopeId));
              } else {
                _push2(`<p class="ml-4"${_scopeId}> Profile list is empty. </p>`);
              }
              _push2(`</section>`);
            } else {
              return [
                createVNode("section", { class: "mr-4" }, [
                  createVNode("h2", { class: "underline" }, "Profile list"),
                  unref(getUsersWithEmails).length ? (openBlock(), createBlock(_component_ProfileTable, {
                    key: 0,
                    profiles: unref(getUsersWithEmails)
                  }, null, 8, ["profiles"])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "ml-4"
                  }, " Profile list is empty. "))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Card, { class: "mb-6 overflow-auto" }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<section class="mr-4"${_scopeId}><h2 class="underline"${_scopeId}>Project list</h2>`);
              if (unref(projects).length) {
                _push2(ssrRenderComponent(_component_ProjectTable, { projects: unref(projects) }, null, _parent2, _scopeId));
              } else {
                _push2(`<p class="ml-4"${_scopeId}> Project list is empty. </p>`);
              }
              _push2(`</section>`);
            } else {
              return [
                createVNode("section", { class: "mr-4" }, [
                  createVNode("h2", { class: "underline" }, "Project list"),
                  unref(projects).length ? (openBlock(), createBlock(_component_ProjectTable, {
                    key: 0,
                    projects: unref(projects)
                  }, null, 8, ["projects"])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "ml-4"
                  }, " Project list is empty. "))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Card, { class: "mb-6 overflow-auto" }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<section class="mr-4"${_scopeId}><h2 class="underline"${_scopeId}>Profile per Project list</h2>`);
              if (unref(getProfileProject).length) {
                _push2(ssrRenderComponent(_component_ClaimTable, {
                  "is-loading": unref(isLoading),
                  "profiles-to-projects": unref(getProfileProject),
                  onRemove: removeProfileFromProject
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<p class="ml-4"${_scopeId}> Profile per Project list is empty. </p>`);
              }
              _push2(`</section>`);
            } else {
              return [
                createVNode("section", { class: "mr-4" }, [
                  createVNode("h2", { class: "underline" }, "Profile per Project list"),
                  unref(getProfileProject).length ? (openBlock(), createBlock(_component_ClaimTable, {
                    key: 0,
                    "is-loading": unref(isLoading),
                    "profiles-to-projects": unref(getProfileProject),
                    onRemove: removeProfileFromProject
                  }, null, 8, ["is-loading", "profiles-to-projects"])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "ml-4"
                  }, " Profile per Project list is empty. "))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_EditUserTypeForm, {
          users: unref(getUsersWithEmails),
          onAfterSubmit: fetchProfiles
        }, null, _parent));
        _push(ssrRenderComponent(_component_CreateProjectForm, { onAfterSubmit: fetchProjects }, null, _parent));
        _push(ssrRenderComponent(_component_AddProfileToProjectForm, {
          profiles: unref(getUsersWithEmails),
          projects: unref(projects),
          onAfterSubmit: ($event) => fetchProjectProfile()
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-61baf342.mjs.map
