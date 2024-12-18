import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "blank" | "default" | "simple"
declare module "../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_vy4kg3cbw3g6iuey5zpvtdq57i/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}