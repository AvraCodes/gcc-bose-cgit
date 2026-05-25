import { readSessionId } from "@/lib/session";
import { admin } from "@/lib/supabase";

// Returns the session row only if it is an ADMIN session. Else null.
export async function requireAdmin() {
  const id = readSessionId();
  if (!id) return null;
  const db = admin();
  const { data } = await db.from("sessions").select("id, role").eq("id", id).maybeSingle();
  if (!data || data.role !== "admin") return null;
  return data;
}
