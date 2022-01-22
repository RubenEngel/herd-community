import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_API_KEY
);

export const authHeaders = () => {
  return {
    headers: {
      authorization: supabase.auth.session()?.access_token
        ? `Bearer ${supabase.auth.session()?.access_token}`
        : "",
    },
  };
};
