// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type InjectionType<A extends Plugin> = A extends Plugin<infer T> ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_vy4kg3cbw3g6iuey5zpvtdq57i/node_modules/nuxt/dist/app/plugins/revive-payload.server").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_vy4kg3cbw3g6iuey5zpvtdq57i/node_modules/nuxt/dist/app/plugins/revive-payload.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_vy4kg3cbw3g6iuey5zpvtdq57i/node_modules/nuxt/dist/head/runtime/plugins/unhead").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_vy4kg3cbw3g6iuey5zpvtdq57i/node_modules/nuxt/dist/pages/runtime/plugins/router").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_vy4kg3cbw3g6iuey5zpvtdq57i/node_modules/nuxt/dist/pages/runtime/plugins/prefetch.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxtjs+supabase@1.0.2_rollup@3.28.1/node_modules/@nuxtjs/supabase/dist/runtime/plugins/auth-redirect").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxtjs+supabase@1.0.2_rollup@3.28.1/node_modules/@nuxtjs/supabase/dist/runtime/plugins/supabase.server").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxtjs+supabase@1.0.2_rollup@3.28.1/node_modules/@nuxtjs/supabase/dist/runtime/plugins/supabase.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.7.0_@parcel+watcher@2.3.0_@types+node@18.17.14_eslint@8.48.0_optionator@0.9.3_rollup@3_vy4kg3cbw3g6iuey5zpvtdq57i/node_modules/nuxt/dist/app/plugins/chunk-reload.client").default> &
  InjectionType<typeof import("../../plugins/error").default> &
  InjectionType<typeof import("../../plugins/helpers").default> &
  InjectionType<typeof import("../../plugins/primevue").default>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
