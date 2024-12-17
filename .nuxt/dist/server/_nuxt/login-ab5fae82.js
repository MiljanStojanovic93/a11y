import { _ as __nuxt_component_0 } from "./nuxt-link-295e6065.js";
import { defineComponent, watchEffect, resolveComponent, unref, isRef, withCtx, createTextVNode, useSSRContext } from "vue";
import { u as useSupabaseUser, a as useSupabaseClient, e as useToast, n as navigateTo } from "../server.mjs";
import { s as signInSchema, u as useValidation, d as displayFirstError } from "./form-a6ff6648.js";
import "hookable";
import "destr";
import "devalue";
import "klona";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "vee-validate";
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
import "yup";
import "./screenSizes-4ba45971.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    const { auth } = useSupabaseClient();
    const toast = useToast();
    const { useFieldModel, handleSubmit, errors, submitCount } = useForm({
      validationSchema: signInSchema
    });
    const [email, password] = useFieldModel(["email", "password"]);
    const { isSubmitted } = useValidation(submitCount);
    const onInvalidSubmit = ({ errors: errors2 }) => displayFirstError(errors2);
    handleSubmit(async ({ email: email2, password: password2 }) => {
      const { data, error } = await auth.signInWithPassword({
        email: email2,
        password: password2
      });
      if (error) {
        toast.add({
          severity: "error",
          summary: error.message,
          life: 3e3
        });
      }
      if (data.user) {
        toast.add({
          severity: "success",
          summary: "You successfully logged in",
          life: 3e3
        });
        await auth.updateUser({ email: data.user.email });
      }
    }, onInvalidSubmit);
    watchEffect(() => {
      if (user.value) {
        navigateTo("/");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = resolveComponent("InputText");
      const _component_Password = resolveComponent("Password");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Button = resolveComponent("Button");
      _push(`<!--[--><div class="mb-8"><h1 class="Login">Log in</h1><span>Please enter your details</span></div><form class="flex flex-col" novalidate><span class="mb-4 w-full"><label for="email"> Email </label>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "email",
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        "data-testid": "login-email-field",
        class: ["p-inputtext-lg md:w-25rem w-full", [{ "p-invalid": unref(errors).email && unref(isSubmitted) }]],
        type: "email",
        name: "email"
      }, null, _parent));
      if (unref(errors).email && unref(isSubmitted)) {
        _push(`<small class="p-error mt-1">${ssrInterpolate(unref(errors).email)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span><span class="mb-4 w-full"><label for="password"> Password </label>`);
      _push(ssrRenderComponent(_component_Password, {
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        "input-id": "password",
        "data-testid": "login-password-field",
        class: ["p-inputtext-lg md:w-25rem w-full", [{ "p-invalid": unref(errors).password && unref(isSubmitted) }]],
        "input-class": "w-full",
        feedback: false,
        "toggle-mask": "",
        pt: {
          input: {
            name: "password"
          }
        }
      }, null, _parent));
      if (unref(errors).password && unref(isSubmitted)) {
        _push(`<small class="p-error mt-1">${ssrInterpolate(unref(errors).password)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span><div class="mb-4 flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "reset-password",
        class: "text-600 hover:text-primary transition-duration-300 ml-auto cursor-pointer transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Forgot your password? `);
          } else {
            return [
              createTextVNode(" Forgot your password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Log In",
        class: "p-button-lg mb-4 w-full",
        type: "submit",
        "data-testid": "login-submit-button"
      }, null, _parent));
      _push(`<p class="mt-4"> Don’t have an account yet? `);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign up`);
          } else {
            return [
              createTextVNode("Sign up")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></form><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-ab5fae82.js.map
