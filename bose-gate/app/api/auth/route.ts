import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/supabase";
import { hashKey, setSessionCookie } from "@/lib/session";

export const runtime = "nodejs";

function parseUA(ua: string) {
  const device = /Mobi|Android|iPhone|iPad/i.test(ua) ? "Mobile" : "Desktop";
  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";
  return { device, browser };
}

export async function POST(req: NextRequest) {
  const { key } = await req.json().catch(() => ({ key: "" }));
  if (!key || typeof key !== "string") {
    return NextResponse.json({ ok: false, error: "Key required" }, { status: 400 });
  }

  const db = admin();
  const { data: keyRow } = await db
    .from("access_keys")
    .select("id, role, label, active")
    .eq("key_hash", hashKey(key))
    .maybeSingle();

  if (!keyRow || !keyRow.active) {
    return NextResponse.json({ ok: false, error: "Invalid access key" }, { status: 401 });
  }

  const ua = req.headers.get("user-agent") || "";
  const { device, browser } = parseUA(ua);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    null;

  const { data: session, error } = await db
    .from("sessions")
    .insert({
      key_id: keyRow.id,
      role: keyRow.role,
      label: keyRow.label,
      user_agent: ua,
      browser,
      device,
      ip,
    })
    .select("id")
    .single();

  if (error || !session) {
    return NextResponse.json({ ok: false, error: "Session failed" }, { status: 500 });
  }

  setSessionCookie(session.id);
  return NextResponse.json({ ok: true, role: keyRow.role });
}
