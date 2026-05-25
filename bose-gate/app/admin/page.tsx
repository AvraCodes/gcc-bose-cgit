"use client";

import { useEffect, useState, useCallback } from "react";

type Data = {
  totals: { totalVisits: number; activeNow: number; uniqueDays: number };
  sessions: any[];
  byGroup: Record<string, { visits: number; activeSeconds: number }>;
  topSections: { section: string; seconds: number }[];
  sectionByGroup: Record<string, Record<string, number>>;
  daily: { day: string; visits: number }[];
};

function fmt(sec?: number | null) {
  const s = Math.max(0, Math.round(sec || 0));
  if (s < 60) return s + "s";
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return `${m}m ${r}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}
function dt(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Admin() {
  const [data, setData] = useState<Data | null>(null);
  const [needKey, setNeedKey] = useState(false);
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin", { cache: "no-store" });
    if (res.status === 403) { setNeedKey(true); return; }
    const d = await res.json();
    if (d.ok) { setData(d); setNeedKey(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (needKey) return;
    const t = setInterval(load, 15000); // live-ish refresh
    return () => clearInterval(t);
  }, [needKey, load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/auth", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }),
    });
    const d = await res.json();
    if (d.ok && d.role === "admin") { setKey(""); load(); }
    else setErr(d.role && d.role !== "admin" ? "That key is not an admin key." : "Invalid admin key.");
  }

  if (needKey) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a1426]">
        <form onSubmit={login} className="w-[min(92vw,360px)] rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h1 className="mb-1 text-xl font-light text-white">Admin Analytics</h1>
          <p className="mb-5 text-sm text-white/40">Admin key required.</p>
          <input type="password" autoFocus value={key} onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-white/40" />
          {err && <p className="mt-2 text-xs text-red-300">{err}</p>}
          <button className="mt-4 w-full rounded-xl bg-white py-3 text-sm font-medium text-[#0a1426]">Enter</button>
        </form>
      </div>
    );
  }

  if (!data) return <div className="flex h-screen items-center justify-center bg-[#0a1426] text-white/50">Loading analytics…</div>;

  const maxSection = Math.max(1, ...data.topSections.map((s) => s.seconds));
  const maxDaily = Math.max(1, ...data.daily.map((d) => d.visits));

  return (
    <div className="min-h-screen bg-[#0a1426] px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-light">Analytics</h1>
            <p className="text-sm text-white/40">Bose GCC Proposal — access & engagement</p>
          </div>
          <div className="flex gap-2">
            <a href="/api/admin/export" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5">Export JSON</a>
            <button
              onClick={async () => { if (confirm("Clear ALL logs permanently?")) { await fetch("/api/admin/reset", { method: "POST" }); load(); } }}
              className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10">Reset logs</button>
          </div>
        </div>

        {/* stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["Total visits", data.totals.totalVisits],
            ["Active now", data.totals.activeNow],
            ["Active days", data.totals.uniqueDays],
            ["Groups", Object.keys(data.byGroup).length],
          ].map(([label, val]) => (
            <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-3xl font-light">{val as number}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{label as string}</div>
            </div>
          ))}
        </div>

        {/* group breakdown + daily */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 text-sm uppercase tracking-wider text-white/50">By group</h2>
            {Object.entries(data.byGroup).map(([g, v]) => (
              <div key={g} className="mb-3 flex items-center justify-between text-sm">
                <span>{g}</span>
                <span className="text-white/50">{v.visits} visits · {fmt(v.activeSeconds)} active</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 text-sm uppercase tracking-wider text-white/50">Daily visits</h2>
            <div className="flex h-32 items-end gap-2">
              {data.daily.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-[#2a6fc8]" style={{ height: `${(d.visits / maxDaily) * 100}%` }} />
                  <span className="text-[9px] text-white/30">{d.day.slice(5)}</span>
                </div>
              ))}
              {!data.daily.length && <p className="text-sm text-white/30">No data yet.</p>}
            </div>
          </div>
        </div>

        {/* time per section */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm uppercase tracking-wider text-white/50">Most viewed sections (active time)</h2>
          {data.topSections.slice(0, 20).map((s) => (
            <div key={s.section} className="mb-2.5">
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-mono">{s.section}</span>
                <span className="text-white/50">{fmt(s.seconds)}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-blue to-[#6ab0f0]" style={{ width: `${(s.seconds / maxSection) * 100}%` }} />
              </div>
            </div>
          ))}
          {!data.topSections.length && <p className="text-sm text-white/30">No engagement recorded yet.</p>}
        </div>

        {/* visitor log */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm uppercase tracking-wider text-white/50">Visitor log</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-white/40">
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4">Group</th><th className="py-2 pr-4">Login</th>
                  <th className="py-2 pr-4">Exit</th><th className="py-2 pr-4">Duration</th>
                  <th className="py-2 pr-4">Active</th><th className="py-2 pr-4">Device</th>
                  <th className="py-2 pr-4">Browser</th><th className="py-2 pr-4">IP</th>
                </tr>
              </thead>
              <tbody>
                {data.sessions.map((s) => (
                  <tr key={s.id} className="border-b border-white/5">
                    <td className="py-2 pr-4">{s.label}</td>
                    <td className="py-2 pr-4 text-white/60">{dt(s.started_at)}</td>
                    <td className="py-2 pr-4 text-white/60">{dt(s.ended_at)}</td>
                    <td className="py-2 pr-4">{fmt(s.duration_seconds)}</td>
                    <td className="py-2 pr-4">{fmt(s.active_seconds)}</td>
                    <td className="py-2 pr-4 text-white/60">{s.device}</td>
                    <td className="py-2 pr-4 text-white/60">{s.browser}</td>
                    <td className="py-2 pr-4 font-mono text-[11px] text-white/40">{s.ip || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
