import { P as PrimeIcons, h as useUser, _ as __nuxt_component_0 } from '../server.mjs';
import __nuxt_component_0$1 from './logo-3c5aec70.mjs';
import { useSSRContext, defineComponent, ref, computed, watch, resolveComponent, mergeProps, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_2 } from './AppFooter-f88b9675.mjs';
import { b as useBreakpoints, c as useWindowScroll, d as breakpointsTailwind } from './index-8b092d42.mjs';
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
import './nuxt-link-295e6065.mjs';
import './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  props: {
    isVisible: { type: Boolean }
  },
  emits: ["close-main-menu"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SvgoLogo = __nuxt_component_0$1;
      _push(`<!--[--><div class="${ssrRenderClass([{
        "layout-sidebar--active": _ctx.isVisible
      }, "layout-sidebar"])}"><div id="side-navigation" class="p-sidebar p-component h-full" role="dialog" aria-modal="true"><div class="p-sidebar-header !m-0 !px-4 !py-6">`);
      _push(ssrRenderComponent(_component_SvgoLogo, {
        "aria-label": "main website logo - Snowdog company",
        class: "!h-auto !w-full"
      }, null, _parent));
      _push(`</div><div class="p-sidebar-content !p-0">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div><div class="${ssrRenderClass([{
        "layout-mask--active": _ctx.isVisible
      }, "layout-mask"])}"></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const customerMenuItems = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Home",
        icon: PrimeIcons.HOME,
        to: "/"
      }
    ]
  },
  {
    label: "Audit",
    items: [
      {
        label: "List",
        icon: PrimeIcons.LIST,
        to: "/audit"
      }
    ]
  }
];
const auditorMenuItems = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Home",
        icon: PrimeIcons.HOME,
        to: "/"
      }
    ]
  },
  {
    label: "Audit",
    items: [
      {
        label: "List",
        icon: PrimeIcons.LIST,
        to: "/audit"
      },
      {
        label: "New",
        icon: PrimeIcons.PLUS,
        to: "/audit/new"
      }
    ]
  }
];
const adminMenuItems = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Home",
        icon: PrimeIcons.HOME,
        to: "/"
      }
    ]
  },
  {
    label: "Admin",
    items: [
      {
        label: "Claims",
        icon: PrimeIcons.KEY,
        to: "/admin/"
      },
      {
        label: "Projects",
        icon: PrimeIcons.FOLDER,
        to: "/projects/"
      }
    ]
  },
  {
    label: "Audit",
    items: [
      {
        label: "List",
        icon: PrimeIcons.LIST,
        to: "/audit"
      },
      {
        label: "New",
        icon: PrimeIcons.PLUS,
        to: "/audit/new"
      }
    ]
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isDesktop = breakpoints.greater("lg");
    const isSideNavigationVisible = ref(false);
    const { isAdmin, isAuditor } = useUser();
    const menuItems = computed(
      () => isAdmin.value ? adminMenuItems : isAuditor.value ? auditorMenuItems : customerMenuItems
    );
    watch(isDesktop, (newValue) => {
      isSideNavigationVisible.value = newValue;
    });
    const { y: windowScrollY } = useWindowScroll();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_AppSidebar = _sfc_main$1;
      const _component_Menu = resolveComponent("Menu");
      const _component_AppFooter = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout mx-auto xl:container" }, _attrs))}><div class="${ssrRenderClass([{
        "layout-wrapper--slim": unref(isSideNavigationVisible)
      }, "layout-wrapper"])}"><a id="skip-navigation-link" href="#main-content" class="sr-only -translate-y-16 scale-90 transition focus:not-sr-only focus:absolute focus:z-20 focus:translate-y-0 focus:scale-100"><div class="p-button">Skip Navigation</div></a>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<main id="main-content" tabindex="-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><div style="${ssrRenderStyle(unref(windowScrollY) > 800 ? null : { display: "none" })}" class="${ssrRenderClass([
        typeof _ctx.$route.name === "string" && ["audit-id", "audit-report-id"].includes(_ctx.$route.name) ? "bottom-[80px]" : "bottom-4",
        "fixed right-4 z-20 w-full print:hidden"
      ])}"><div class="flex w-full justify-end px-4 pb-1 xl:container xl:mx-auto"><a class="p-button p-button-rounded p-button-icon-only !h-12 !w-12 !opacity-80 hover:!opacity-100" rounded aria-label="Go back to top" href="#main-content"><i class="pi pi-arrow-up" aria-hidden="true"></i></a></div></div></div><div class="print:hidden">`);
      _push(ssrRenderComponent(_component_AppSidebar, {
        "is-visible": unref(isSideNavigationVisible),
        onCloseMainMenu: ($event) => isSideNavigationVisible.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Menu, {
              model: unref(menuItems),
              class: "layout-menu"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Menu, {
                model: unref(menuItems),
                class: "layout-menu"
              }, null, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden print:block">`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-0064e5c7.mjs.map
