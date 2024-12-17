import { createClient } from '@supabase/supabase-js';
import { g as getCookie, c as createError } from './index.mjs';
import { a as useRuntimeConfig } from './nitro/node-server.mjs';

const serverSupabaseClient = async (event) => {
  const {
    supabase: { url, key, cookieName }
  } = useRuntimeConfig().public;
  let supabaseClient = event.context._supabaseClient;
  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
      auth: {
        detectSessionInUrl: false,
        persistSession: false,
        autoRefreshToken: false
      }
    });
    event.context._supabaseClient = supabaseClient;
  }
  const { data } = await supabaseClient.auth.getSession();
  if (data?.session?.user?.aud !== "authenticated") {
    const accessToken = getCookie(event, `${cookieName}-access-token`);
    const refreshToken = getCookie(event, `${cookieName}-refresh-token`);
    if (!accessToken || !refreshToken)
      return supabaseClient;
    await supabaseClient.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken
    });
  }
  return supabaseClient;
};

const serverSupabaseUser = async (event) => {
  const client = await serverSupabaseClient(event);
  const { data: { user: supabaseUser }, error } = await client.auth.getUser();
  if (error) {
    throw createError({ statusMessage: error?.message });
  }
  event.context._user = error ? null : supabaseUser;
  return event.context._user;
};

export { serverSupabaseUser as s };
//# sourceMappingURL=serverSupabaseUser.mjs.map
