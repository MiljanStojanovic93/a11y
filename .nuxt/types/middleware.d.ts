import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_xzmsy53qnpxagnlftxpwxubjfm/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}