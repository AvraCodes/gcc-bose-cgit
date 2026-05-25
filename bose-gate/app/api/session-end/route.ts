import { NextResponse } from "next/server";
import { readSessionId } from "@/lib/session";
import { admin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST() {
  const sessionId = readSessionId();
  if (!sessionId) return NextResponse.json({ ok: false }, { status: 401 });

  const db = admin();
  const { data } = await db.from("sessions").select("started_at, ended_at").eq("id", sessionId).maybeSingle();
  if (!data) return NextResponse.json({ ok: false }, { status: 404 });

  // Each end beacon refreshes ended_at + duration. Multiple beacons
  // (pagehide, beforeunload) are harmless and simply extend the recorded time.
  const ended = new Date();
  const started = new Date(data.started_at);
  const duration = Math.round((ended.getTime() - started.getTime()) / 1000);
  await db.from("sessions").update({ ended_at: ended.toISOString(), duration_seconds: duration }).eq("id", sessionId);
  return NextResponse.json({ ok: true });
}
