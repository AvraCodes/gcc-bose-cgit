import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key.
// RLS denies all anon access to these tables, so every read/write
// must go through here — never from the browser.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function admin() {
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
