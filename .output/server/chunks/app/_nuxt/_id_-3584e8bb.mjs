import { a as useSupabaseClient, e as useRoute, g as createError } from '../server.mjs';
import { defineComponent, ref, withAsyncContext, resolveComponent, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const route = useRoute();
    const auditId = route.params.id;
    const audit = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => supabase.from("audits").select("*").eq("id", auditId)), __temp = await __temp, __restore(), __temp);
    if (!(data == null ? void 0 : data.length)) {
      throw createError({ statusCode: 404, statusMessage: "Audit Not Found" });
    }
    audit.value = data || [];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = resolveComponent("Card");
      _push(`<!--[--><div class="grid"><h1>Edit audit #${ssrInterpolate(unref(route).params.id)}</h1></div>`);
      _push(ssrRenderComponent(_component_Card, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` page in preparation <pre${_scopeId}>${ssrInterpolate(unref(audit)[0])}</pre>`);
          } else {
            return [
              createTextVNode(" page in preparation "),
              createVNode("pre", null, toDisplayString(unref(audit)[0]), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audit/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-3584e8bb.mjs.map
