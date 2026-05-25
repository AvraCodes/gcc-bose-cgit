import { NextRequest, NextResponse } from "next/server";
import { readSessionId } from "@/lib/session";
import { admin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sessionId = readSessionId();
  if (!sessionId) return NextResponse.json({ ok: false }, { status: 401 });

  const { events } = await req.json().catch(() => ({ events: [] }));
  if (!Array.isArray(events) || !events.length) return NextResponse.json({ ok: true });

  const db = admin();
  let total = 0;
  for (const e of events) {
    const section = String(e.section || "").slice(0, 80);
    const seconds = Math.max(0, Math.min(3600, Number(e.seconds) || 0));
    if (!section || !seconds) continue;
    total += seconds;
    await db.rpc("add_engagement", { p_session: sessionId, p_section: section, p_delta: seconds });
  }
  if (total > 0) {
    const { data: cur } = await db.from("sessions").select("active_seconds").eq("id", sessionId).maybeSingle();
    await db.from("sessions").update({ active_seconds: (cur?.active_seconds || 0) + total }).eq("id", sessionId);
  }
  return NextResponse.json({ ok: true });
}
