import { _ as __nuxt_component_0 } from './nuxt-link-295e6065.mjs';
import { defineComponent, resolveComponent, unref, isRef, withCtx, createTextVNode, useSSRContext } from 'vue';
import { a as useSupabaseClient, c as useToast, n as navigateTo } from '../server.mjs';
import { g as signUpSchema, u as useValidation, d as displayFirstError } from './form-a6ff6648.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useForm } from 'vee-validate';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const toast = useToast();
    const { useFieldModel, handleSubmit, errors, submitCount } = useForm({
      validationSchema: signUpSchema
    });
    const [email, newPassword, passwordConfirm] = useFieldModel([
      "email",
      "newPassword",
      "passwordConfirm"
    ]);
    const { isSubmitted } = useValidation(submitCount);
    const onInvalidSubmit = ({ errors: errors2 }) => displayFirstError(errors2);
    handleSubmit(async ({ email: email2, newPassword: newPassword2 }) => {
      const { data, error } = await supabase.auth.signUp({
        email: email2,
        password: newPassword2
      });
      if (error) {
        toast.add({
          severity: "error",
          summary: error.message,
          life: 3e3
        });
      }
      if (data.user) {
        navigateTo("/login");
        toast.add({
          severity: "success",
          summary: "Account successfully created. Please check your email to verify your account."
        });
      }
    }, onInvalidSubmit);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = resolveComponent("InputText");
      const _component_Password = resolveComponent("Password");
      const _component_Button = resolveComponent("Button");
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="mb-4"><h1 class="Login">Register</h1><span>Let&#39;s get started</span></div><form class="flex flex-col" novalidate><span class="mb-4 w-full"><label for="email"> Email </label>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "email",
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        "data-test-id": "register-email-field",
        class: ["p-inputtext-lg md:w-25rem w-full", [{ "p-invalid": unref(errors).email && unref(isSubmitted) }]],
        name: "email"
      }, null, _parent));
      if (unref(errors).email && unref(isSubmitted)) {
        _push(`<small class="p-error mt-1">${ssrInterpolate(unref(errors).email)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span><span class="mb-4 w-full"><label for="new-password"> Password </label>`);
      _push(ssrRenderComponent(_component_Password, {
        modelValue: unref(newPassword),
        "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
        "input-id": "new-password",
        "data-testid": "register-password-field",
        class: ["p-inputtext-lg md:w-25rem w-full", [{ "p-invalid": unref(errors).newPassword && unref(isSubmitted) }]],
        "input-class": "w-full",
        feedback: false,
        "toggle-mask": "",
        pt: {
          input: {
            name: "newPassword"
          }
        }
      }, null, _parent));
      if (unref(errors).newPassword && unref(isSubmitted)) {
        _push(`<small class="p-error mt-1">${ssrInterpolate(unref(errors).newPassword)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span><span class="mb-10 w-full"><label for="password-confirm"> Confirm password </label>`);
      _push(ssrRenderComponent(_component_Password, {
        modelValue: unref(passwordConfirm),
        "onUpdate:modelValue": ($event) => isRef(passwordConfirm) ? passwordConfirm.value = $event : null,
        "input-id": "password-confirm",
        "data-testid": "register-confirm-password-field",
        class: ["p-inputtext-lg md:w-25rem w-full", [{ "p-invalid": unref(errors).passwordConfirm && unref(isSubmitted) }]],
        "input-class": "w-full",
        feedback: false,
        "toggle-mask": "",
        pt: {
          input: {
            name: "passwordConfirm"
          }
        }
      }, null, _parent));
      if (unref(errors).passwordConfirm && unref(isSubmitted)) {
        _push(`<small class="p-error mt-1">${ssrInterpolate(unref(errors).passwordConfirm)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
      _push(ssrRenderComponent(_component_Button, {
        class: "p-button-lg mb-4 w-full",
        type: "submit",
        label: "Sign Up",
        "data-testid": "register-submit-button"
      }, null, _parent));
      _push(`<p class="mt-4"> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "hover:text-primary transition-duration-300 cursor-pointer transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-1904781f.mjs.map
