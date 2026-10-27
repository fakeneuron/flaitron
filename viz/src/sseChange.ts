// Wire format for SSE `change` events. Node-free so the client and the
// vite plugin share one encoder/decoder without pulling `watchSet`'s
// `node:path` into the browser bundle.

// Which watched path kind fired, and so which endpoints the client must
// refetch. `plan` covers /api/plan *and* /api/plan-archive: PLAN-ARCHIVE.md is
// deliberately unwatched because rotation always edits PLAN.md in the
// same motion, so the planPath event is the only signal rotated history moved.
export type ChangeScope = 'plan' | 'active' | 'archive';

export const ALL_CHANGE_SCOPES: readonly ChangeScope[] = ['plan', 'active', 'archive'];

// Sticky "the server's file watcher died" event. Shared so the frame the server
// writes and the listener the client registers cannot drift apart.
export const SSE_DEGRADED_EVENT = 'degraded';

function isChangeScope(value: unknown): value is ChangeScope {
  return value === 'plan' || value === 'active' || value === 'archive';
}

// Omitting `scopes` encodes an unscoped change — the client fail-opens and
// refetches everything, same as an unattributed payload.
export function formatChangePayload(
  project: string | undefined,
  scopes?: Iterable<ChangeScope>,
): string {
  if (!project) return JSON.stringify({});
  const list = scopes === undefined ? [] : [...scopes];
  return JSON.stringify(list.length > 0 ? { project, scopes: list } : { project });
}

export interface ChangeData {
  // `null` means unattributed — the client fail-opens and refreshes.
  project: string | null;
  // `null` means unscoped — absent, empty, malformed, or carrying only scope
  // values this client does not know (a newer server). Fail open in every case:
  // dropping an unrecognized scope would silently stop refreshing the board.
  scopes: ChangeScope[] | null;
}

const UNATTRIBUTED: ChangeData = { project: null, scopes: null };

export function parseChangeData(data: unknown): ChangeData {
  if (typeof data !== 'string' || data.length === 0) return UNATTRIBUTED;
  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return UNATTRIBUTED;
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return UNATTRIBUTED;
  }
  const { project, scopes } = parsed as { project?: unknown; scopes?: unknown };
  if (typeof project !== 'string' || project.length === 0) return UNATTRIBUTED;
  const known = Array.isArray(scopes) ? scopes.filter(isChangeScope) : [];
  return { project, scopes: known.length > 0 ? known : null };
}
