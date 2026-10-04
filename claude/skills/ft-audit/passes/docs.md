# docs — /ft-audit pass library

> Loaded by `SKILL.md` §1 step 1. Supplies the `docs` domain's deltas; the
> dispatcher owns the shared procedure (arg grammar, caps, finding format,
> closing sections, PLAN write step, core hard rules).

**Attribution slug:** `audit-docs`

## Scope & rubric hints (→ dispatcher §1)

- **Default scope (`all`/empty):** `<default doc-set glob>` _(forker: set this)_
- **Extra scope tokens:** `ai-referenced` → walk `.flaitron/tasknote/README.md` §"AI-referenced docs".
- **Rubric slots** (contracts the docs must reflect, not generic good writing):
  - `<rubric file 1>` — _(forker: e.g. `.flaitron/tasknote/README.md` §"AI-referenced docs" — canonical doc-set contract)_
  - `<rubric file 2>` — _(forker: e.g. `README.md` — public-facing first impression)_
  - `<rubric file 3>` — _(forker: e.g. `docs/ARCHITECTURE.md` — design source-of-truth)_
- **Verification gates:**
  ```sh
  <markdown lint if any>
  <link-check if any>
  ```
  Failures become Medium findings in pass 2. Skip entirely if no doc tooling is configured.

## The 5 passes (→ dispatcher §2)

1. **Claims vs. code** — prose asserts behavior, file paths, exports, commands, or APIs that the codebase no longer provides. Examples: README says "run `npm start`" but the script was removed; docstring claims behavior the function no longer has; in-tree SKILL.md file-tree out of sync with disk; ADR describes a pattern the code abandoned. _(forker: add project-specific examples — e.g. "OpenAPI annotations vs. actual route signatures", "config-file comments vs. how the code reads each field")_
2. **Cross-doc consistency** — the same fact stated differently in two places. Examples: version pin in `README.md` vs. `package.json` vs. `docs/MIGRATION.md`; command syntax in `CLAUDE.md` differs from `docs/`; port number in one doc disagrees with another; key term ("session" vs. "session token") used inconsistently. _(forker: add your project's known fact-duplication hotspots)_
3. **Cross-references** — broken links and lost navigability. Examples: relative `[link](path)` whose target doesn't exist; `[[wikilink]]` whose target isn't a real task / file / heading; dangling section anchors (`#some-section` after a heading rename); orphan doc no other doc links to (likely indexable but unreachable). _(forker: add your project's link conventions — Obsidian wikilinks, Foam, plain relative, etc.)_
4. **Currency** — stale time-locked content and version pins. Examples: "as of YYYY-MM-DD" dates predating the current quarter; "today's set" lists that no longer match reality; pinned versions (`v1.2.3`) for tools / deps the project has since bumped; copyright year; "next release" / "upcoming" sections that already shipped. _(forker: add your project's version-pinning patterns — submodule pins, lockfiles, docs-with-version-strings)_
5. **Stale content** — content describing a state the project has moved past. Examples: section describing pre-refactor architecture; TODO stubs predating the current phase; "legacy" sections that should move to a historical archive or be deleted; commented-out doc blocks; deprecated patterns still in tutorials.

## Severity guide (→ dispatcher §3)

- **Critical** — security-relevant doc lying (e.g. doc says "TLS enforced" but it isn't), adopter-misleading instruction that breaks installs, broken canonical cross-link integrity (referenced spec / contract doesn't resolve).
- **High** — doc that misleads on a user-visible behavior; install or usage step that fails as written; missing-doc gap for a shipped feature.
- **Medium** — cross-doc inconsistency, stale version pin, dead link inside the doc set.
- **Low** — nit, formatting drift, minor word-choice inconsistency.

## Specialist additions

- **Finding format:** Location may be a section heading; tie "Why it matters" to user-facing accuracy / adopter-misleading risk / maintenance cost.
- **Carve-out note** (dispatcher §5): doc audits hit the trivial-fix carve-out often — most doc-drift fixes are exactly skip-the-tasknote sized.
- **Hard rules:**
  - **Don't audit code, audit the docs about the code.** If the docs are accurate but the code is wrong, that's a code finding — out of scope here. Use the `general` / `backend` / etc. domain for that.
  - **Archived tasknotes are write-once.** Skip `.flaitron/tasknote/archive/` entirely — those are historical records, not living docs.
  - _(forker: append project-specific hard rules if any.)_
