import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ ok: false }, { status: 403 });
  const db = admin();

  const { data: sessions } = await db
    .from("sessions")
    .select("id, role, label, started_at, ended_at, duration_seconds, active_seconds, browser, device, ip, day")
    .order("started_at", { ascending: false })
    .limit(500);

  const { data: engagement } = await db
    .from("engagement")
    .select("session_id, section, seconds");

  // Exclude admin sessions: the admin is the observer, not a tracked visitor.
  const list = (sessions || []).filter((s) => s.role !== "admin");
  const visitorIds = new Set(list.map((s) => s.id));
  const eng = (engagement || []).filter((e) => visitorIds.has(e.session_id));

  // Visits per role/group
  const byGroup: Record<string, { visits: number; activeSeconds: number }> = {};
  for (const s of list) {
    byGroup[s.label] = byGroup[s.label] || { visits: 0, activeSeconds: 0 };
    byGroup[s.label].visits++;
    byGroup[s.label].activeSeconds += s.active_seconds || 0;
  }

  // Time per section (overall) + per group
  const sessionGroup: Record<string, string> = {};
  list.forEach((s) => (sessionGroup[s.id] = s.label));
  const sectionTotals: Record<string, number> = {};
  const sectionByGroup: Record<string, Record<string, number>> = {};
  for (const e of eng) {
    sectionTotals[e.section] = (sectionTotals[e.section] || 0) + Number(e.seconds);
    const g = sessionGroup[e.session_id] || "Unknown";
    sectionByGroup[g] = sectionByGroup[g] || {};
    sectionByGroup[g][e.section] = (sectionByGroup[g][e.section] || 0) + Number(e.seconds);
  }
  const topSections = Object.entries(sectionTotals)
    .map(([section, seconds]) => ({ section, seconds: Math.round(seconds) }))
    .sort((a, b) => b.seconds - a.seconds);

  // Daily visits
  const daily: Record<string, number> = {};
  for (const s of list) daily[s.day] = (daily[s.day] || 0) + 1;

  // Active now = sessions with no exit beacon yet, started within the last 30 min
  const now = Date.now();
  const activeNow = list.filter(
    (s) => !s.ended_at && now - new Date(s.started_at).getTime() < 1000 * 60 * 30
  ).length;

  return NextResponse.json({
    ok: true,
    totals: {
      totalVisits: list.length,
      activeNow,
      uniqueDays: Object.keys(daily).length,
    },
    sessions: list,
    byGroup,
    topSections,
    sectionByGroup,
    daily: Object.entries(daily).map(([day, visits]) => ({ day, visits })).sort((a, b) => a.day.localeCompare(b.day)),
  });
}
