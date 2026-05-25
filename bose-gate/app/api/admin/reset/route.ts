import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";

export async function POST() {
  const me = await requireAdmin();
  if (!me) return NextResponse.json({ ok: false }, { status: 403 });

  // Clear all logs EXCEPT the current admin session, so the admin stays
  // logged in after a reset. (Engagement for kept session cascades on delete
  // anyway, but the admin panel generates no engagement.)
  const db = admin();
  await db.from("engagement").delete().neq("session_id", me.id);
  await db.from("sessions").delete().neq("id", me.id);
  return NextResponse.json({ ok: true });
}
