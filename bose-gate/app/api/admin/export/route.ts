import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ ok: false }, { status: 403 });
  const db = admin();
  const { data: sessions } = await db.from("sessions").select("*").order("started_at", { ascending: false });
  const { data: engagement } = await db.from("engagement").select("*");
  const blob = JSON.stringify({ exportedAt: new Date().toISOString(), sessions, engagement }, null, 2);
  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="bose-analytics-${Date.now()}.json"`,
    },
  });
}
