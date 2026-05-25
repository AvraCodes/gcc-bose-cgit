import { redirect } from "next/navigation";
import { readSessionId } from "@/lib/session";
import { admin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Server component: gate the viewer. If no valid session, bounce to /.
export default async function Viewer() {
  const id = readSessionId();
  if (!id) redirect("/");
  const { data } = await admin().from("sessions").select("id").eq("id", id).maybeSingle();
  if (!data) redirect("/");

  // The protected HTML is loaded same-origin from /api/content (which
  // re-checks the cookie). The injected tracker runs inside this iframe.
  return (
    <iframe
      src="/api/content"
      title="content"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
