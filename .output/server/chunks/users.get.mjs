import { d as defineEventHandler, c as createError } from './index.mjs';
import { s as serverSupabaseUser } from './serverSupabaseUser.mjs';
import { createClient } from '@supabase/supabase-js';
import { a as useRuntimeConfig } from './nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';

const serverSupabaseServiceRole = (event) => {
  const {
    supabase: { serviceKey },
    public: {
      supabase: { url }
    }
  } = useRuntimeConfig();
  if (!serviceKey) {
    throw new Error("Missing `SUPABASE_SERVICE_KEY` in `.env`");
  }
  if (!event.context._supabaseServiceRole) {
    const auth = {
      detectSessionInUrl: false,
      persistSession: false,
      autoRefreshToken: false
    };
    const supabaseClient = createClient(url, serviceKey, { auth });
    event.context._supabaseServiceRole = supabaseClient;
  }
  return event.context._supabaseServiceRole;
};

const users_get = defineEventHandler(async (event) => {
  const serverUser = await serverSupabaseUser(event);
  if (!(serverUser == null ? void 0 : serverUser.app_metadata.claims_admin)) {
    return;
  }
  const SR = serverSupabaseServiceRole(event);
  const { data, error } = await SR.auth.admin.listUsers();
  if (error) {
    throw createError({ statusMessage: error.message });
  }
  return data;
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
