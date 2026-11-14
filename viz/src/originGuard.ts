import type { IncomingMessage, ServerResponse } from 'node:http';
import { endPlain } from './apiResponse.ts';

export const DEV_PORT = 5120;

// Loopback hostnames a request's `Host` may name. One list for
// `server.allowedHosts` (vite.config.ts), devApi's `hostGuard`, and the
// origins below, so those checks cannot drift apart. (vite.config.ts's CSP
// `connect-src` still spells the two names out.)
export const ALLOWED_HOSTS: ReadonlySet<string> = new Set(['localhost', '127.0.0.1']);

export const ALLOWED_ORIGINS: ReadonlySet<string> = new Set(
  [...ALLOWED_HOSTS].map((host) => `http://${host}:${DEV_PORT}`),
);

// Reject cross-origin browser requests to the viz dev API. Tasknote and
// PLAN.md content is readable here; without this guard any website visited
// during `npm run dev` could fetch /api/* and exfiltrate it (compounded
// historically by esbuild `GHSA-67mh-4wv8-2f99` / Vite `GHSA-4w7w-66w2-5vf9`).
// Returns true if the request should proceed; otherwise writes a 403 and
// returns false. Origin-less requests (terminal `curl`, EventSource
// fallbacks) are allowed — DNS rebinding is `hostGuard`'s job (devApi.ts),
// backed by `server.allowedHosts`.
export function originGuard(req: IncomingMessage, res: ServerResponse): boolean {
  // Checked before Origin/Referer because it is the only signal present in the
  // case those two miss: a cross-origin iframe navigation sends no `Origin`
  // (it is a GET navigation, not a CORS request) and `referrerpolicy="no-referrer"`
  // strips the `Referer`, so a hostile page could hold /api/events slots against
  // the MAX_SSE_CLIENTS cap until the operator's own board takes the 503.
  // A sibling loopback-port page can send neither header either (a `no-cors` +
  // `no-referrer` GET) and still arrives as `same-site`, so that value is
  // rejected too — the viz UI only calls /api/* same-origin. Browsers
  // always send this header; `none` (address-bar navigation) and `same-origin`
  // fall through to the exact-origin checks below, and an absent header still
  // passes so terminal `curl` and other non-browser clients keep working.
  const fetchSite = req.headers['sec-fetch-site'];
  if (fetchSite === 'cross-site' || fetchSite === 'same-site') {
    endPlain(res, 403, 'Forbidden: cross-site request');
    return false;
  }
  const origin = req.headers.origin;
  if (typeof origin === 'string' && origin.length > 0) {
    if (!ALLOWED_ORIGINS.has(origin)) {
      endPlain(res, 403, 'Forbidden: cross-origin request');
      return false;
    }
    return true;
  }
  const referer = req.headers.referer;
  if (typeof referer === 'string' && referer.length > 0) {
    try {
      const refOrigin = new URL(referer).origin;
      if (!ALLOWED_ORIGINS.has(refOrigin)) {
        endPlain(res, 403, 'Forbidden: cross-origin referer');
        return false;
      }
    } catch {
      endPlain(res, 403, 'Forbidden: malformed referer');
      return false;
    }
  }
  return true;
}
