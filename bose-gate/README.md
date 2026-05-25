# Bose Gate — protected access + silent analytics layer

A protection/tracking layer wrapped around your existing `Main_4.html`.
The webpage is **never rebuilt** — it's served untouched, gated behind a
server-validated access key, with an invisible engagement tracker injected.

## What it does
- **Fullscreen auth gate** (`/`) — page content is never sent to the browser
  until a key is validated *server-side* and a signed httpOnly session cookie is issued.
- **3 roles**: Admin / Bose / General — each tracked separately.
- **Silent tracking**: login/exit timestamps, session duration, active time per
  section (IntersectionObserver + idle + tab-visibility detection — only active
  time counts), device/browser, IP.
- **Hidden admin dashboard** (`/admin`) — visitor logs, time-per-section,
  most-viewed sections, per-group breakdown, daily visits, reset + export.

## Architecture (why it's actually secure)
- `protected/Main_4.html` lives **outside `/public`** — it is only emitted by
  `/api/content`, which re-checks the session cookie on every request.
- Access keys are stored as **sha256 hashes** in Supabase with **RLS on and no
  policies** → the browser/anon client can read nothing. All DB access goes
  through the server using the service-role key.
- The tracker runs inside the content iframe (same-origin) and beacons to
  `/api/track` / `/api/session-end`. Users see no indication.

> Honest limitation: once an authenticated user loads the page they can
> save/screenshot it — unpreventable for any web content. And silent tracking
> may carry consent/GDPR obligations depending on your viewers/jurisdiction.

## Setup (≈10 min)

### 1. Supabase
1. Create a project at supabase.com.
2. Open **SQL Editor** → paste `supabase/schema.sql` → Run.
   This creates the tables, locks them with RLS, and seeds 3 default keys:
   - Admin   → `BOSE-ADMIN-2026`
   - Bose    → `BOSE-CLIENT-2026`
   - General → `BOSE-GUEST-2026`
3. **Change the keys before going live.** Generate a hash:
   `echo -n "YOUR-NEW-KEY" | sha256sum`
   then update the row in the `access_keys` table.

### 2. Env vars
Copy `.env.example` → `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Settings → API)
- `SESSION_SECRET` → run `openssl rand -hex 32`

### 3. Run locally
```
npm install
npm run dev
```
Open http://localhost:3000 and enter a key.
Admin key lands on `/admin`; other keys land on the proposal.

## Deploy to Vercel
1. Push this folder to a Git repo.
2. Import it in Vercel.
3. Add the 3 env vars (Project → Settings → Environment Variables).
4. Deploy. (The protected HTML is force-included in the bundle via
   `next.config.mjs` → `outputFileTracingIncludes`.)

## Replacing the protected page later
Drop a new file into `protected/` and point `app/api/content/route.ts`
(`path.join(... "Main_4.html")`) at it. The tracker auto-detects any
`<section id="…">`, so no per-section config is needed.

## Tracking accuracy notes
- Active time accrues only when the tab is visible AND there was input within
  the last 30s (idle threshold) AND the section is ≥50% in view.
- Deltas flush every 5s and on tab-hide/close via `sendBeacon`.
