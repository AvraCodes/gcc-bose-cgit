import { NextResponse } from "next/server";
import { readSessionId } from "@/lib/session";
import { admin } from "@/lib/supabase";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The invisible tracker. Injected before </body>. Runs INSIDE the iframe,
// same-origin, so the httpOnly session cookie is sent automatically.
//
// Visibility model: each second we credit time to the ONE section that owns
// the vertical center of the viewport (falling back to the section with the
// most visible pixels). This is correct for sections of ANY height — a
// ratio-threshold approach silently fails for sections taller than the screen.
const TRACKER = `
<script>
(function(){
  var IDLE_MS = 30000;   // 30s with no input => idle
  var FLUSH_MS = 5000;   // push deltas every 5s
  var active = {};       // sectionId -> accumulated active seconds (unflushed, fractional)
  var lastTick = Date.now();
  var lastInput = Date.now();
  var idle = false;

  function activeNow(){ return !idle && document.visibilityState === "visible"; }

  ["mousemove","keydown","scroll","click","touchstart","touchmove","wheel"].forEach(function(ev){
    window.addEventListener(ev, function(){ lastInput = Date.now(); idle = false; }, { passive: true });
  });

  // Which section currently owns the viewport's vertical center?
  function focalSection(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var center = vh / 2;
    var secs = document.querySelectorAll("section[id]");
    var best = null, bestVisible = 0;
    for (var i = 0; i < secs.length; i++){
      var r = secs[i].getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= vh) continue;            // off-screen
      if (r.top <= center && r.bottom >= center) return secs[i].id; // owns the center
      var visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);    // visible px
      if (visible > bestVisible){ bestVisible = visible; best = secs[i].id; }
    }
    return best;
  }

  setInterval(function(){
    var now = Date.now();
    if (now - lastInput > IDLE_MS) idle = true;
    var dt = (now - lastTick) / 1000;
    lastTick = now;
    if (dt > 0 && dt < 5 && activeNow()){   // ignore long gaps (throttled bg tabs)
      var id = focalSection();
      if (id) active[id] = (active[id] || 0) + dt;
    }
  }, 1000);

  function flush(useBeacon){
    var payload = [];
    for (var id in active){
      var whole = Math.floor(active[id]);
      if (whole > 0){ payload.push({ section: id, seconds: whole }); active[id] -= whole; }
    }
    if (!payload.length) return;
    var body = JSON.stringify({ events: payload });
    if (useBeacon && navigator.sendBeacon){
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: body, keepalive: true });
    }
  }
  setInterval(function(){ flush(false); }, FLUSH_MS);

  function end(){
    flush(true);
    if (navigator.sendBeacon) navigator.sendBeacon("/api/session-end", new Blob([JSON.stringify({})], { type: "application/json" }));
  }
  document.addEventListener("visibilitychange", function(){ if (document.visibilityState === "hidden") flush(true); });
  window.addEventListener("pagehide", end);
  window.addEventListener("beforeunload", end);
})();
</script>
`;

export async function GET() {
  const sessionId = readSessionId();
  if (!sessionId) return new NextResponse("Unauthorized", { status: 401 });

  // Confirm the session still exists.
  const db = admin();
  const { data } = await db.from("sessions").select("id").eq("id", sessionId).maybeSingle();
  if (!data) return new NextResponse("Unauthorized", { status: 401 });

  const file = path.join(process.cwd(), "protected", "Main_4.html");
  let html = await fs.readFile(file, "utf8");
  html = html.replace("</body>", TRACKER + "</body>");

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
