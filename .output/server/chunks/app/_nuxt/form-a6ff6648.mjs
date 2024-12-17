import { computed, nextTick } from 'vue';
import { object, boolean, array, string, number, setLocale } from 'yup';
import { d as defaultViewports } from './screenSizes-4ba45971.mjs';

function useValidation(submitCount) {
  const isSubmitted = computed(() => submitCount.value > 0);
  return {
    isSubmitted
  };
}
function validationRules() {
  setLocale({
    mixed: {
      required: "This is a required field"
    },
    string: {
      email: "This is not a valid email",
      min: ({ min }) => `This field must be at least ${min} ${min === 1 ? "character" : "characters"}`,
      max: ({ max }) => `This field must be at most ${max} ${"characters"}`,
      url: "Page url must be a valid URL"
    },
    array: {
      min: ({ min }) => `This field must have at least ${min} ${min === 1 ? "item" : "items"}`
    }
  });
  const emailRule2 = string().required().email();
  const lettersOnlyRule = string().required().matches(/^\D*$/, "The name should contain letters only");
  const passwordRule2 = string().required().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,})/,
    "8 characters or longer. Combine upper and lowercase letters, numbers and special characters (!@#$%^&*_-)"
  );
  const passwordRepeatRule2 = string().required().test("passwords-match", "Passwords doesn't match", function(value) {
    return this.parent.newPassword === value;
  });
  return {
    emailRule: emailRule2,
    lettersOnlyRule,
    passwordRule: passwordRule2,
    passwordRepeatRule: passwordRepeatRule2
  };
}
const { emailRule, passwordRule, passwordRepeatRule } = validationRules();
const signInSchema = object({
  email: emailRule,
  password: passwordRule
});
const signUpSchema = object({
  email: emailRule,
  newPassword: passwordRule,
  passwordConfirm: passwordRepeatRule
});
object({
  email: emailRule
});
object({
  newPassword: passwordRule,
  newPasswordRepeat: passwordRepeatRule
});
const auditFormSchema = object({
  noAxe: boolean().default(false),
  pages: array().when("noAxe", ([noAxe]) => {
    if (noAxe) {
      return array().of(
        object().shape({
          url: string(),
          selector: string()
        })
      ).default([
        {
          selector: "",
          url: ""
        }
      ]);
    }
    return array().of(
      object().shape({
        url: string().url().required(),
        selector: string()
      }).test("isUnique", `The entry is not unique`, function(currentPage) {
        const pages = this.parent;
        const count = pages.filter(
          (page) => page.selector === currentPage.selector && page.url === currentPage.url
        ).length;
        return count <= 1;
      })
    ).min(1).default([
      {
        selector: "",
        url: ""
      }
    ]);
  }),
  title: string().required(),
  project: number().required(),
  username: string(),
  password: string(),
  viewports: array(array(number().required())).required().min(1).default(defaultViewports),
  description: string().when(
    "noAxe",
    ([noAxe]) => noAxe ? string().required() : string()
  )
});
const accountFormSchema = object({
  email: string().required(),
  username: string().required(),
  fullName: string().required(),
  avatarUrl: string(),
  userType: string()
});
const addProfileToProjectFormSchema = object({
  profile: string().required(),
  project: number().required()
});
const editUserTypeFormSchema = object({
  user: string().required(),
  userType: string().required()
});
const createProjectFormSchema = object({
  name: string().required(),
  description: string()
});
const displayFirstError = async (errors) => {
  if (Object.keys(errors).length) {
    const firstError = document.querySelector(
      `[name="${Object.keys(errors)[0]}"]`
    );
    await nextTick(() => {
      firstError == null ? void 0 : firstError.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      firstError == null ? void 0 : firstError.focus({ preventScroll: true });
    });
  }
};

export { accountFormSchema as a, addProfileToProjectFormSchema as b, createProjectFormSchema as c, displayFirstError as d, editUserTypeFormSchema as e, auditFormSchema as f, signUpSchema as g, signInSchema as s, useValidation as u };
//# sourceMappingURL=form-a6ff6648.mjs.map
