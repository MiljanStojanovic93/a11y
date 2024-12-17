import { u as useSupabaseUser, a as useSupabaseClient, i as isSupabaseError, S as SupabaseError, b as useNuxtApp } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, resolveComponent, mergeProps, withCtx, unref, isRef, openBlock, createBlock, withModifiers, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { a as accountFormSchema, u as useValidation, d as displayFirstError } from "./form-a6ff6648.js";
import "destr";
import "devalue";
import "klona";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "vee-validate";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "vue-router";
import "h3";
import "ufo";
import "cookie-es";
import "ohash";
import "defu";
import "@supabase/supabase-js";
import "yup";
import "./screenSizes-4ba45971.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const initialValues = {
      email: "",
      username: "",
      fullName: "",
      avatarUrl: "",
      userType: ""
    };
    const types = ["auditor", "viewer"];
    const isLoading = ref(true);
    if (user.value) {
      const { data: profile } = ([__temp, __restore] = withAsyncContext(() => supabase.from("profiles").select("username, full_name, avatar_url, user_type").eq("id", user.value.id).single()), __temp = await __temp, __restore(), __temp);
      if (profile) {
        initialValues.email = user.value.email || "";
        initialValues.username = profile.username || "";
        initialValues.fullName = profile.full_name || "";
        initialValues.avatarUrl = profile.avatar_url || "";
        initialValues.userType = profile.user_type || "";
      }
      isLoading.value = false;
    }
    const { useFieldModel, handleSubmit, errors, submitCount } = useForm({
      validationSchema: accountFormSchema,
      initialValues
    });
    const email = useFieldModel("email");
    const username = useFieldModel("username");
    const fullName = useFieldModel("fullName");
    const avatarUrl = useFieldModel("avatarUrl");
    const userType = useFieldModel("userType");
    const { isSubmitted } = useValidation(submitCount);
    const onInvalidSubmit = ({ errors: errors2 }) => displayFirstError(errors2);
    const updateProfile = handleSubmit(async (values) => {
      var _a;
      try {
        isLoading.value = true;
        const user2 = useSupabaseUser();
        if ((_a = user2.value) == null ? void 0 : _a.id) {
          const { error } = await supabase.from("profiles").update({
            username: values.username,
            full_name: values.fullName,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("id", user2.value.id);
          if (error) {
            if (isSupabaseError(error)) {
              throw new SupabaseError(error);
            }
            throw new Error((error == null ? void 0 : error.message) || "");
          }
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
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid" }, _attrs))}><h1>Account Profile</h1>`);
      _push(ssrRenderComponent(_component_Card, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(user)) {
              _push2(`<form${_scopeId}><div class="mb-6 grid gap-6 md:grid-cols-2 md:items-start md:gap-x-8"${_scopeId}><span class="w-full"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
              _push2(ssrRenderComponent(_component_InputText, {
                id: "email",
                modelValue: unref(email),
                "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                disabled: "",
                readonly: "",
                class: ["w-full", [{ "p-invalid": unref(errors).email && unref(isSubmitted) }]],
                "data-testid": "account-email-field",
                name: "email"
              }, null, _parent2, _scopeId));
              if (unref(errors).email && unref(isSubmitted)) {
                _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).email)}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span><span class="w-full"${_scopeId}><label for="username"${_scopeId}>Username</label>`);
              _push2(ssrRenderComponent(_component_InputText, {
                id: "username",
                modelValue: unref(username),
                "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                class: ["w-full", [{ "p-invalid": unref(errors).username && unref(isSubmitted) }]],
                "data-testid": "account-username-field",
                name: "username"
              }, null, _parent2, _scopeId));
              if (unref(errors).username && unref(isSubmitted)) {
                _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).username)}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span><span class="w-full"${_scopeId}><label for="full_name"${_scopeId}>Full name</label>`);
              _push2(ssrRenderComponent(_component_InputText, {
                id: "full_name",
                modelValue: unref(fullName),
                "onUpdate:modelValue": ($event) => isRef(fullName) ? fullName.value = $event : null,
                class: ["w-full", [{ "p-invalid": unref(errors).fullName && unref(isSubmitted) }]],
                "data-testid": "account-fullName-field",
                name: "fullName"
              }, null, _parent2, _scopeId));
              if (unref(errors).fullName && unref(isSubmitted)) {
                _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).fullName)}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span><span class="w-full"${_scopeId}><label for="avatar_url"${_scopeId}>Avatar url (soon)</label>`);
              _push2(ssrRenderComponent(_component_InputText, {
                id: "avatar_url",
                modelValue: unref(avatarUrl),
                "onUpdate:modelValue": ($event) => isRef(avatarUrl) ? avatarUrl.value = $event : null,
                class: ["w-full", [{ "p-invalid": unref(errors).avatarUrl && unref(isSubmitted) }]],
                "data-testid": "account-avatarUrl-field",
                name: "avatarUrl",
                disabled: "",
                readonly: ""
              }, null, _parent2, _scopeId));
              if (unref(errors).avatarUrl && unref(isSubmitted)) {
                _push2(`<small class="p-error mt-1"${_scopeId}>${ssrInterpolate(unref(errors).avatarUrl)}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span><span class="w-full"${_scopeId}><label for="user_type"${_scopeId}>User type (soon)</label>`);
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
              _push2(`</span></div>`);
              _push2(ssrRenderComponent(_component_Button, {
                label: unref(isLoading) ? "Loading ..." : "Update",
                type: "submit",
                class: "p-button-lg w-full",
                "data-testid": "account-submit-button",
                loading: unref(isLoading)
              }, null, _parent2, _scopeId));
              _push2(`</form>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(user) ? (openBlock(), createBlock("form", {
                key: 0,
                onSubmit: withModifiers(unref(updateProfile), ["prevent"])
              }, [
                createVNode("div", { class: "mb-6 grid gap-6 md:grid-cols-2 md:items-start md:gap-x-8" }, [
                  createVNode("span", { class: "w-full" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                      disabled: "",
                      readonly: "",
                      class: ["w-full", [{ "p-invalid": unref(errors).email && unref(isSubmitted) }]],
                      "data-testid": "account-email-field",
                      name: "email"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    unref(errors).email && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).email), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("span", { class: "w-full" }, [
                    createVNode("label", { for: "username" }, "Username"),
                    createVNode(_component_InputText, {
                      id: "username",
                      modelValue: unref(username),
                      "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                      class: ["w-full", [{ "p-invalid": unref(errors).username && unref(isSubmitted) }]],
                      "data-testid": "account-username-field",
                      name: "username"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    unref(errors).username && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).username), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("span", { class: "w-full" }, [
                    createVNode("label", { for: "full_name" }, "Full name"),
                    createVNode(_component_InputText, {
                      id: "full_name",
                      modelValue: unref(fullName),
                      "onUpdate:modelValue": ($event) => isRef(fullName) ? fullName.value = $event : null,
                      class: ["w-full", [{ "p-invalid": unref(errors).fullName && unref(isSubmitted) }]],
                      "data-testid": "account-fullName-field",
                      name: "fullName"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    unref(errors).fullName && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).fullName), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("span", { class: "w-full" }, [
                    createVNode("label", { for: "avatar_url" }, "Avatar url (soon)"),
                    createVNode(_component_InputText, {
                      id: "avatar_url",
                      modelValue: unref(avatarUrl),
                      "onUpdate:modelValue": ($event) => isRef(avatarUrl) ? avatarUrl.value = $event : null,
                      class: ["w-full", [{ "p-invalid": unref(errors).avatarUrl && unref(isSubmitted) }]],
                      "data-testid": "account-avatarUrl-field",
                      name: "avatarUrl",
                      disabled: "",
                      readonly: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    unref(errors).avatarUrl && unref(isSubmitted) ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error mt-1"
                    }, toDisplayString(unref(errors).avatarUrl), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("span", { class: "w-full" }, [
                    createVNode("label", { for: "user_type" }, "User type (soon)"),
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
                  "data-testid": "account-submit-button",
                  loading: unref(isLoading)
                }, null, 8, ["label", "loading"])
              ], 40, ["onSubmit"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-924a8d3e.js.map
