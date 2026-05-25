"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Gate() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [shake, setShake] = useState(false);
  const [revealing, setRevealing] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim() || status === "loading") return;
    setStatus("loading");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) {
      setRevealing(true);
      setTimeout(() => {
        router.push(data.role === "admin" ? "/admin" : "/viewer");
      }, 900);
    } else {
      setStatus("error");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-[#0a1426]">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-blue/30 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#2a6fc8]/25 blur-[140px]" />
      </div>

      <AnimatePresence>
        {revealing && (
          <motion.div
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 30, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 h-24 w-24 rounded-full bg-white"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[min(92vw,420px)]"
      >
        <motion.div
          animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-9 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">
            Confidential
          </div>
          <h1 className="mb-1 text-2xl font-light tracking-tight text-white">Protected Access</h1>
          <p className="mb-7 text-sm leading-relaxed text-white/45">
            Enter your access key to continue.
          </p>

          <form onSubmit={submit}>
            <input
              type="password"
              autoFocus
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Access key"
              className={`w-full rounded-xl border bg-black/20 px-4 py-3.5 text-white placeholder-white/30 outline-none transition focus:border-white/40 ${
                status === "error" ? "border-red-400/70" : "border-white/15"
              }`}
            />

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-xs text-red-300"
                >
                  Invalid access key. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-5 w-full rounded-xl bg-white py-3.5 text-sm font-medium text-[#0a1426] transition hover:bg-white/90 disabled:opacity-60"
            >
              {status === "loading" ? "Verifying…" : "Unlock"}
            </button>
          </form>
        </motion.div>
        <p className="mt-5 text-center text-[11px] text-white/25">
          Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
}
