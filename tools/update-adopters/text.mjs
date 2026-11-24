// update-adopters markdown text helpers: pure functions of text (no git, no fs) — the fence scan, the Workflow-block and pin-line rewrites, snippet link and Codex roster reads; the rules they implement are in apply.mjs's "Follow-through" and wiring.mjs's "Skill wiring" headers (CORE-EPIC-931).

import { SUBMODULE_PATH } from './workspace.mjs';

// `Pinned to:` is natabula wave-bump's sed expression (first match per line).
// The Workflow heading is matched exactly, not by wave-bump's `^## Workflow`
// prefix, so a project's own `## Workflows (CI)` section is never replaced;
// the section ends at the next H1 or H2 (wave-bump: H2 only), or at a
// `<!-- <name>:start -->` marker line, kept, so a marked section that follows
// keeps its opening marker (CORE-916).
export const PIN_LINE = /(Pinned to: )v\d+\.\d+\.\d+/;
const WORKFLOW_HEADING = /^## Workflow[ \t]*\r?$/;
const SECTION_END = /^#{1,2} |^<!-- [a-z0-9-]+:start -->[ \t]*\r?$/;
// A CommonMark fence line: up to 3 spaces, then 3+ backticks or tildes.
const FENCE = /^ {0,3}(`{3,}|~{3,})/;

// Per line, the index of the fence line that opened the fenced code block it
// sits in (fence lines included), or -1 outside one. viz/src/fence.ts's rules,
// pinned by SPEC/fixtures/fence/cases.json (CORE-922): a backtick opener's info
// string may not contain a backtick; a fence closes on a run of the opening
// character at least as long, with nothing but whitespace after it (a `\r`
// included); an unclosed fence runs to EOF.
export function fenceOpeners(lines) {
  let open = -1;
  return lines.map((line, i) => {
    const m = FENCE.exec(line);
    const info = m ? line.slice(m[0].length) : '';
    if (open === -1) {
      if (m && !(m[1][0] === '`' && info.includes('`'))) open = i;
      return open;
    }
    const at = open;
    const run = FENCE.exec(lines[open])[1];
    if (m && m[1][0] === run[0] && m[1].length >= run.length && !info.trim()) open = -1;
    return at;
  });
}

// Per line, whether it is a heading candidate: false for every line inside a
// fenced code block, fence lines included, so a fenced `# comment` or
// `## Workflow` is never read as a heading (CORE-853).
function headingLines(lines) {
  return fenceOpeners(lines).map((o) => o === -1);
}

// The indices of AGENTS.md's unfenced `## Workflow` headings.
function workflowHeadings(lines) {
  const ok = headingLines(lines);
  return lines.flatMap((l, i) => (ok[i] && WORKFLOW_HEADING.test(l) ? [i] : []));
}

// Each `Pinned to: vX.Y.Z` (first per line) rewritten to `tag`.
export function rewritePinLines(text, tag) {
  return text
    .split('\n')
    .map((line) => line.replace(PIN_LINE, `$1${tag}`))
    .join('\n');
}

// The `## Workflow` block inside claude/AGENTS-snippet.md's paste fence (the
// first ```markdown fence after `## Block to paste into AGENTS.md`), without
// the fence lines; null when the snippet has no such block or it does not
// open with a `## Workflow` heading.
export function workflowPasteBlock(snippet) {
  const lines = snippet.split('\n');
  const heading = lines.findIndex((l) => /^## Block to paste into AGENTS\.md/.test(l));
  if (heading === -1) return null;
  const open = lines.findIndex((l, i) => i > heading && /^```markdown/.test(l));
  if (open === -1) return null;
  const close = lines.findIndex((l, i) => i > open && /^```/.test(l));
  if (close === -1) return null;
  const body = lines.slice(open + 1, close);
  return WORKFLOW_HEADING.test(body[0] ?? '') ? body.join('\n') : null;
}

// `agents` with its one `## Workflow` section — that heading through the line
// before the next H1/H2 heading or `<!-- <name>:start -->` marker, or to EOF —
// replaced by `block`, one blank line kept before that next line (wave-bump's
// awk output shape). Lines inside code fences are never section ends.
function replaceWorkflowSection(agents, block) {
  const lines = agents.split('\n');
  const ok = headingLines(lines);
  const start = workflowHeadings(lines)[0];
  const next = lines.findIndex((l, i) => i > start && ok[i] && SECTION_END.test(l));
  const before = lines.slice(0, start).join('\n');
  const head = start > 0 ? `${before}\n` : '';
  if (next === -1) return `${head}${block}\n`;
  return `${head}${block}\n\n${lines.slice(next).join('\n')}`;
}

// What the follow-through does to AGENTS.md's text `agents` for the target's
// paste `block` (null when the snippet has none): `{ text }` with the rewritten
// file, `{ text: null }` when there is no unfenced `## Workflow` heading, or
// `{ skip }` with the ⬆-line note. SPEC/fixtures/workflow-block/cases.json pins
// it (CORE-921) — the byte contract /ft-update Step 3.5 follows too.
export function workflowFollowThrough(agents, block) {
  const headings = workflowHeadings(agents.split('\n')).length;
  if (headings === 0) return { text: null };
  if (headings > 1) return { skip: 'more than one ## Workflow heading' };
  if (block === null) return { skip: 'snippet block not found' };
  return { text: replaceWorkflowSection(agents, block) };
}

// The links a non-Codex snippet wires: every `ln -s <src> <dst>` line inside a
// fenced code block whose info string starts `sh` (wave-bump's parse), kept
// only when <dst> is one slug directly under `skillsDir` and <src> reaches
// into the default submodule path — the shape every shipped block has. `src`
// is returned with that path swapped for `subPath`, so a vendored submodule
// gets links that resolve.
export function snippetLinks(snippet, skillsDir, subPath = SUBMODULE_PATH) {
  const links = [];
  const prefix = `../../${SUBMODULE_PATH}/`;
  const lines = snippet.split('\n');
  const openers = fenceOpeners(lines);
  for (const [i, line] of lines.entries()) {
    const o = openers[i];
    const info = o === -1 ? '' : lines[o].slice(FENCE.exec(lines[o])[0].length).trim();
    const m = /^sh\b/.test(info) && /^ln -s +(\S+) +(\S+)\s*$/.exec(line);
    if (!m) continue;
    const [, src, dst] = m;
    if (!src.startsWith(prefix) || !new RegExp(`^${skillsDir.replace(/\./g, '\\.')}/[a-z0-9-]+$`).test(dst)) continue;
    links.push({ dst, target: `../../${subPath}/${src.slice(prefix.length)}` });
  }
  return links;
}

// The Codex roster, read the way codex/reconcile-skills.md reads it: every
// `ln -s` line whose last field is `.agents/skills/ft-<slug>`, the slug kept.
// The link target is built, not parsed (`../../<FT>/codex/skills/<slug>`).
export function codexRoster(snippet) {
  const slugs = [];
  for (const line of snippet.split('\n')) {
    if (!/^ln -s /.test(line)) continue;
    const m = /^\.agents\/skills\/(ft-[a-z-]+)$/.exec(line.trim().split(/\s+/).at(-1));
    if (m) slugs.push(m[1]);
  }
  return slugs;
}
