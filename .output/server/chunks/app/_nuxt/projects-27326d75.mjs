import { u as useSupabaseUser, a as useSupabaseClient } from '../server.mjs';
import { defineComponent, ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "projects",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const projects = ref([]);
    if (user.value) {
      const { data } = ([__temp, __restore] = withAsyncContext(() => supabase.from("projects").select("*")), __temp = await __temp, __restore(), __temp);
      projects.value = data || [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>Projects list</h1>`);
      if (unref(projects).length) {
        _push(`<ul><!--[-->`);
        ssrRenderList(unref(projects), ({ id, name }) => {
          _push(`<li>${ssrInterpolate(name)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<p>Your projects list is empty</p>`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=projects-27326d75.mjs.map
