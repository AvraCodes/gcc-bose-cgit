import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "bg_session";
const secret = () => process.env.SESSION_SECRET || "dev-insecure-secret";

// Cookie value = "<sessionId>.<hmac>". HMAC stops tampering with the id.
function sign(id: string) {
  const mac = crypto.createHmac("sha256", secret()).update(id).digest("hex");
  return `${id}.${mac}`;
}

export function verify(value?: string | null): string | null {
  if (!value) return null;
  const parts = value.split(".");
  if (parts.length !== 2) return null;
  const [id, mac] = parts;
  if (!id || !mac) return null;
  const expected = crypto.createHmac("sha256", secret()).update(id).digest("hex");
  try {
    if (crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return id;
  } catch {
    return null;
  }
  return null;
}

export function setSessionCookie(id: string) {
  cookies().set(COOKIE, sign(id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });
}

export function readSessionId(): string | null {
  return verify(cookies().get(COOKIE)?.value);
}

export function clearSessionCookie() {
  cookies().delete(COOKIE);
}

export function hashKey(key: string) {
  return crypto.createHash("sha256").update(key.trim()).digest("hex");
}
