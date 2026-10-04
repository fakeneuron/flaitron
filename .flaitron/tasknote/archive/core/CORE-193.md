---
title: release v4.0.0
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-EPIC-154, CORE-186, CORE-183, CORE-129, CORE-128, CORE-105]
---

# CORE-193 | release v4.0.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-154]] [[CORE-186]] [[CORE-183]] [[CORE-129]] [[CORE-128]] [[CORE-105]]

## 🎯 Goal

Cut flowtron v4.0.0 — major release positioning flowtron as an agent-neutral, multi-runtime tasknote system, headlined by CORE-EPIC-154 (agent-neutral surface + `docs/PLATFORMS.md` + `docs/AGENT-NEUTRALITY.md`) and the AGENTS.md paste-block migration (CORE-129), and shipping the new `/ft-audit-context` bundled skill (CORE-186) plus the Phase 1→2 default-skip gate refinement (CORE-183).

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v3.2.0` → `**Version:** v4.0.0`
- [ ] `docs/MIGRATION.md` — example pin bumped `v3.2.0` → `v4.0.0` (line 289 at time of filing)
- [ ] `SECURITY.md` — example pin bumped `v3.2.0` → `v4.0.0` (line 66 at time of filing)
- [ ] `docs/AGENT-NEUTRALITY.md` — drop stale `(L498-501)` line-number specificity from §"Post-closure protocol §3" ledger row (absorbed unstaged drift fix)
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-193 — flowtron v4.0.0 (...)` commit lands
- [ ] Annotated `v4.0.0` tag created with adopter-facing release notes — Migration block calls out CORE-129's AGENTS.md paste-block migration + CORE-EPIC-154's agent-neutral framing + optional `/ft-audit-context` adoption
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-193.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v3.2.0` → `**Version:** v4.0.0`
- [ ] `docs/MIGRATION.md:289` — bump example pin `(e.g., \`v3.2.0\`)` → `(e.g., \`v4.0.0\`)`
- [ ] `SECURITY.md:66` — bump example pin `(e.g. \`v3.2.0\`)` → `(e.g. \`v4.0.0\`)`
- [ ] `docs/AGENT-NEUTRALITY.md` — stage the already-drafted unstaged edit
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v4.0.0` (subject + summary + Changes since v3.2.0 + Migration block highlighting CORE-129 paste-block migration); push tag to origin

## 🔗 Related

- [[CORE-EPIC-154]] — agent-neutrality multi-agent-portability epic (PLATFORMS.md + AGENT-NEUTRALITY.md + portability re-comb) — primary positioning shift of this release
- [[CORE-129]] — AGENTS.md migration (paste-block target moved from CLAUDE.md to AGENTS.md; runtime-neutral)
- [[CORE-186]] — new `/ft-audit-context` bundled skill (additive; adopters opt-in via standard symlink)
- [[CORE-183]] — Phase 1→2 default-skip gate for `/ft-task` (behavior change; adopters get automatically on bump)
- [[CORE-184]] — audit-family next-move 🔍 flag in `/ft-task` Step 6
- [[CORE-189]] — post-closure copy-paste grammar widened to `/<next-skill> <args>`
- [[CORE-128]] — release v3.2.0 (most recent precedent)
- [[CORE-105]] — release v3.0.0 (canonical major-bump precedent; established Migration-block shape for breaking changes)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 72 commits since v3.2.0 (mixed `feat:` / `fix:` / `docs:` / `chore:`). By Conventional-Commits rote, the commit log alone would classify as **minor** (no `feat!:` or `BREAKING CHANGE:` token in any commit body). However, the PLAN-line target locks **major** v4.0.0 explicitly — file-time decision based on CORE-EPIC-154's positioning shift (agent-neutral multi-runtime framing, `docs/PLATFORMS.md` + `docs/AGENT-NEUTRALITY.md` added to the AI-referenced doc set) and CORE-129's paste-block target rename (`CLAUDE.md` → `AGENTS.md`, with `claude/CLAUDE-snippet.md` → `claude/AGENTS-snippet.md`). User confirmed major at Step 2 of `/ft-release`. Per `/ft-release` Step 2 default, PLAN-line target wins. Recipe pattern is canonical (CORE-128 v3.2.0 minor, CORE-105 v3.0.0 major precedents); v4.0.0-specific deviations: SPEC/versioning.md examples now generic `v1.x` placeholders (retired by CORE-188), so no example-shift needed; the unstaged `docs/AGENT-NEUTRALITY.md` line-number-specificity edit is absorbed into the release commit per user choice at Step 2.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes; MIGRATION.md pin drifted from line 285 (CORE-128) → 289 (+4 from interim content); SECURITY.md pin drifted from line 59 (CORE-128) → 66 (+7); no surprises on cited paths
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v3.2.0` ✓
- `docs/MIGRATION.md:289` — `(e.g., \`v3.2.0\`)` ✓ (drifted from line 285 since CORE-128 by +4)
- `SECURITY.md:66` — `(e.g. \`v3.2.0\`)` ✓ (drifted from line 59 since CORE-128 by +7)
- `docs/AGENT-NEUTRALITY.md` — unstaged edit drops `(L498-501)` from the §"Post-closure protocol §3 + §Model field" ledger row (drift fix; line-number specificity becomes stale immediately after any SPEC edit)
- `SPEC/versioning.md` — patch/minor/major examples now use generic `v1.x` placeholders (CORE-188 retirement); no edits needed this release
- `git describe --tags --abbrev=0` → `v3.2.0` — matches `SPEC.md:3`, no drift ✓
- Omnibus `grep -rnE 'v3\.[012]\.[0-9]+' SPEC.md SPEC/ docs/ README.md templates/ claude/ SECURITY.md CONTRIBUTING.md` (excluding archive) returns exactly the 4 expected hits: SPEC.md:3, MIGRATION.md:289, SECURITY.md:66, plus CONVENTIONS.md:25 (historical `v3.0.0` ref re: CORE-105 — write-once historical context, leave per CORE-046 precedent)

### Commits since v3.2.0 (72 total)

Grouped by adopter-facing area:

**Agent-neutrality (CORE-EPIC-154 + bundled satellite work):**
- feat: CORE-154.1–.5 — file epic + scope children, agent-neutral surface audit + `docs/AGENT-NEUTRALITY.md` ledger, wiring-layer status-quo lock, author `docs/PLATFORMS.md` (two-layer model + plug-in pattern), portability re-comb (ledger /clear+/model + ft-flowtron Key-docs sync)
- feat: CORE-129 — AGENTS.md paste-block migration (snippet renamed `claude/CLAUDE-snippet.md` → `claude/AGENTS-snippet.md`; adopter paste destination flipped `CLAUDE.md` → `AGENTS.md`; backwards-compatible for Claude Code adopters since Claude Code reads both files)
- feat: CORE-137 — drop "Obsidian-style" attribution from SPEC.md wikilink prose
- feat: CORE-139 — generalize "Claude cannot run /clear" to runtime-neutral phrasing
- feat: CORE-138 — generalize PLAN.md [model] grammar lock
- feat: CORE-140 — soften ~/code/ workspace assumption in adopter-facing prose
- feat: CORE-141 — generalize opus|sonnet hardcodes in SKILL prompts to recommended-set framing
- feat: CORE-133/134/135/136 — replace project-specific examples (photard, InvisiPaw, fintown) with stack-neutral wording

**New skills + behavior changes:**
- feat: CORE-186 — new `/ft-audit-context` bundled skill (additive; standard symlink for adoption)
- feat: CORE-184 — audit-family next-move 🔍 flag in `/ft-task` Step 6
- feat: CORE-183 — Phase 1→2 default-skip gate for `/ft-task` (behavior change; ships automatically on bump)
- feat: CORE-189 — widen post-closure copy-paste grammar to `/<next-skill> <args>`
- feat: CORE-132 — user-flavored audit; 8 follow-up tickets filed
- feat: CORE-131 — add `--fast` / `-f` operator force-skip flag to `/ft-task` + `/ft-micro-task`
- feat: CORE-130 — wire missing self-host filing skills to `.claude/` (flowtron-self only)
- feat (untagged ca22626) — add 1-2 sentence accomplishment summary to 🏁 post-commit marker §ft-task

**Doc-set additions (new AI-referenced entries):**
- docs: CORE-157 — add `docs/AGENT-NEUTRALITY.md` to AI-referenced docs (cohort CORE-EPIC-154)
- docs: CORE-159 — add `docs/PLATFORMS.md` to AI-referenced docs

**Doc currency + drift fixes (~40 commits):**
- docs: CORE-192 / 191 / 190 / 188 / 187 / 185 / 182 / 181 / 180 / 179 / 178 / 177(×2) / 176 / 175 / 174 / 173 / 172 / 171 / 170 / 169 / 168 / 167 / 166 / 165 / 164 / 163 / 162 / 161 / 160 / 158 / 156 / 155 / 153 / 152 / 151 / 146 / 144 — clarifications, doc-drift sweeps, audit-family phrasing alignment, retired-recipe cleanup

**Fix commits (5):**
- fix: CORE-150 / 149 / 148 / 147 / 145 — surgical drift fixes (stale pointer labels, missing seed entries, checkbox state in stub examples, placeholder form, viz-command consistency)

**Process / filing (omit from adopter-facing Changes block):**
- chore: CORE-177 / 154.6 / 143 / 142 + chore filings — archives, de-scopes, missing-archive add, stray-symlink delete, starter-task filings

### Archive skim findings

- **CORE-128** (v3.2.0, minor, 2026-05-20) — most recent precedent. 4-edit recipe (SPEC + SPEC/versioning + MIGRATION + SECURITY absorbed). v4.0.0 here drops the SPEC/versioning edit (CORE-188 retirement) and gains the AGENT-NEUTRALITY edit. Migration block was "no required project-side edits" — opposite shape from what v4.0.0 needs.
- **CORE-105** (v3.0.0, major, 2026-05-17) — **canonical major-bump precedent.** Established that "major" can be elected for positioning reasons even when no individual commit carries `feat!:`. Migration block enumerated required adopter actions (re-symlink, new global install). v4.0.0's migration shape is closer to this than to CORE-080 v2.0.0's "no required project-side edits" pattern.
- **CORE-080** (v2.0.0, major, 2026-05-11) — earlier major; demonstrated that "user-elected major without true breaking change" is a valid pattern. v4.0.0 is similar in spirit: no individual commit is breaking, but the cumulative positioning shift (agent-neutrality + AGENTS.md migration) justifies the major bump.
- **CORE-129** (AGENTS.md migration, 2026-05-22) — directly relevant. Migration was non-breaking for Claude Code (reads both `AGENTS.md` and `CLAUDE.md`); adopter action is opt-in (create `AGENTS.md` if absent and paste the snippet there; legacy `CLAUDE.md` paste-block keeps working).

### Adopter migration impact (v3.2.0 → v4.0.0) — major-by-positioning, mostly non-breaking

Three Migration-block themes for the tag draft (refined in §7.2):

1. **AGENTS.md paste-block migration (CORE-129) — non-breaking but recommended.** New adopters via `/ft-new-project` get `AGENTS.md` automatically. Existing adopters with the legacy paste-block in `CLAUDE.md` keep working (Claude Code reads both files). Recommended action: create `AGENTS.md` at repo root and move the flowtron paste-block from `CLAUDE.md` (or paste fresh from `claude/AGENTS-snippet.md`). Required only for non-Claude runtimes (Codex CLI, Cursor, Sourcegraph Amp, Aider).
2. **Agent-neutral surface (CORE-EPIC-154).** Flowtron's contract layer is now agent-neutral; Claude-specific surfaces are explicitly ledgered in `docs/AGENT-NEUTRALITY.md`. New `docs/PLATFORMS.md` documents the two-layer contract/wiring model and the symmetric plug-in pattern for future runtime wiring. No adopter action required; informational.
3. **New skills + behavior changes — additive opt-in / automatic.** `/ft-audit-context` (CORE-186) ships as a new bundled skill — adopters who want it add the standard symlink. Phase 1→2 default-skip gate (CORE-183), audit-family 🔍 flag (CORE-184), wider post-closure copy-paste (CORE-189), `--fast` flag (CORE-131) all ship automatically on submodule bump (symlinked skills).

Non-migration shipments (announce in Changes, not Migration):
- ~40 doc-drift / clarity / audit-phrasing fixes — informational
- 5 surgical `fix:` commits — informational
- Flowtron-self-only changes (CORE-130 self-host wiring) — no adopter impact

### Drift check details

- `SPEC.md:3` confirmed `**Version:** v3.2.0` at HEAD ✓
- `docs/MIGRATION.md:289` confirmed `(e.g., \`v3.2.0\`)` ✓ (line drifted from 285 → 289 since CORE-128 by +4)
- `SECURITY.md:66` confirmed `(e.g. \`v3.2.0\`)` ✓ (line drifted from 59 → 66 since CORE-128 by +7)
- `docs/AGENT-NEUTRALITY.md` — unstaged edit already drops `(L498-501)` from §"Post-closure protocol §3" ledger row; staging in Phase 2
- `SPEC/versioning.md` — NOT touched (CORE-188 retired the example-shift recipe; examples now use generic `v1.x` placeholders)
- `git describe --tags --abbrev=0` → `v3.2.0` ✓
- `CONVENTIONS.md:25` carries historical `v3.0.0` ref re: CORE-105 — write-once historical context, leave (CORE-046 precedent)

### Assumptions (explicit, no clarifying questions needed beyond Step 2 locks)

1. **Bump kind:** `major` (v3.2.0 → v4.0.0). Locked at `/ft-release` Step 2 per user confirmation; PLAN-line shortname `release v4.0.0` confirms.
2. **SPEC/versioning.md edits:** None. CORE-188 retired the example-shift recipe in this very cohort; examples are generic placeholders.
3. **AGENT-NEUTRALITY.md edit:** Absorbed into the release commit per user choice at Step 2 (drift-sweep absorption, not a separate followup).
4. **SECURITY.md pin bump:** Apply (per CORE-128 precedent — the example-pin pattern is canonical in SECURITY.md §"Pin discipline").
5. **Migration block:** Three themes above (AGENTS.md migration, agent-neutral framing, new opt-in skills). All non-breaking for Claude Code adopters; the AGENTS.md migration is the only one with a recommended adopter action. User reviews + edits the rendered tag draft at Phase 4 §7.2.
6. **Tag Changes block:** Groups commits by area (Agent-neutrality / New skills + behavior / Doc-set additions / Doc currency + fixes). Omits chore filings and flowtron-self-only commits.
7. **No follow-up release/fix tasks anticipated:** v4.0.0 is the cut; any post-cut drift surfaces via `/ft-file-followup` at the §7.1 doc-drift sweep, same as CORE-128.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-128 / CORE-105 / CORE-080 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block); v4.0.0-specific deviations: skip SPEC/versioning.md edit (CORE-188 retirement); absorb AGENT-NEUTRALITY.md line-number drift fix
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits; no test surface)

**Implementation Notes:**

Four doc edits in order (Phase 2), plus two edits absorbed from the §7.1 doc-drift sweep:

1. `SPEC.md:3` — `**Version:** v3.2.0` → `**Version:** v4.0.0`.
2. `docs/MIGRATION.md:289` — example pin `(e.g., \`v3.2.0\`)` → `(e.g., \`v4.0.0\`)`.
3. `SECURITY.md:66` — example pin `(e.g. \`v3.2.0\`)` → `(e.g. \`v4.0.0\`)`.
4. `docs/AGENT-NEUTRALITY.md` — drop `(L498-501)` from §"Post-closure protocol §3 + §Model field" ledger row (already on disk as unstaged edit at `/ft-release` start; staged here per user choice at Step 2).
5. `docs/MIGRATION.md:10` — scope the `CLAUDE.md` requirement to the `/ft-new-project` Quick path as a project-validity heuristic; manual §1.1–1.6 path no longer claims `CLAUDE.md` is required (§7.1 Finding #1 Medium, absorbed inline).
6. `README.md:36` — same scoping in the §"Bootstrapping a new project" preamble (§7.1 Finding #1 Medium, absorbed inline).

Verified post-edit: `grep -rnE 'v3\.2\.0' SPEC.md SPEC/ docs/ README.md templates/ claude/ SECURITY.md CONTRIBUTING.md` (excluding archive) returns empty — live doc set clean. Total diff: 5 files, +9/−8. (`SPEC/versioning.md` deliberately untouched per CORE-188; `CONVENTIONS.md:25` historical `v3.0.0` reference left per CORE-046 write-once precedent.)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change in the release commit)

**Testing Notes:**

No automated check applies. Markdown lint mental-pass: 3 edits are single-token version-string substitutions (surrounding prose unchanged); the AGENT-NEUTRALITY.md edit deletes a 9-character parenthetical inside a table cell (table structure intact, surrounding prose unchanged). No frontmatter touched; no fenced blocks broken. Viz suite untouched and not re-run — viz code is unchanged in this release commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `Skill(ft-audit-docs)` subroutine, 5 passes, 9-file AI-referenced scope:
  - `README.md` — Pass 2 Medium absorbed (CLAUDE.md "required" framing scoped to /ft-new-project heuristic)
  - `SPEC.md` — version-line bump (Phase 2)
  - `docs/MIGRATION.md` — example-pin bump (Phase 2) + Pass 2 Medium absorbed (CLAUDE.md preamble scoping)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change (historical v3.0.0 ref at line 25 is write-once)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — example-pin bump (Phase 2)
  - `docs/AGENT-NEUTRALITY.md` — line-number-specificity drift fix absorbed (Phase 2)
  - `docs/PLATFORMS.md` — no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/` (executed at §7.3)
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v4.0.0 — major release positioning flowtron as an agent-neutral, multi-runtime tasknote system. Headline shipments: CORE-EPIC-154 (agent-neutral surface audit + `docs/AGENT-NEUTRALITY.md` ledger + `docs/PLATFORMS.md` two-layer model + symmetric plug-in pattern for future Codex CLI / Cursor / grok wiring); CORE-129 (AGENTS.md paste-block migration — `claude/CLAUDE-snippet.md` renamed to `claude/AGENTS-snippet.md`; adopter paste destination flipped `CLAUDE.md` → `AGENTS.md`; backwards-compatible for Claude Code adopters since Claude Code reads both files); new `/ft-audit-context` bundled skill (CORE-186, additive); Phase 1→2 default-skip gate refinement to `/ft-task` (CORE-183, behavior change); `--fast` operator force-skip flag (CORE-131); audit-family next-move 🔍 flag (CORE-184); widened post-closure copy-paste grammar (CORE-189).

**Six doc-only edits land in this release commit:** SPEC.md:3 version bump v3.2.0 → v4.0.0; MIGRATION.md:289 + SECURITY.md:66 example-pin bumps; AGENT-NEUTRALITY.md line-number-specificity drift fix (absorbed unstaged); MIGRATION.md:10 + README.md:36 `CLAUDE.md`-requirement scoping (absorbed §7.1 Finding #1 — Medium cross-doc consistency catch tying the preamble framing back to the agent-neutrality headline). `SPEC/versioning.md` deliberately untouched (CORE-188 retired the example-shift recipe in this same cohort).

**Adopter migration — major-by-positioning, mostly non-breaking.** Three themes: (1) AGENTS.md migration is non-breaking for Claude Code (reads both files); recommended action is to move the paste-block from `CLAUDE.md` to `AGENTS.md` for runtime-neutrality. Required only for non-Claude runtimes. (2) Agent-neutral surface is informational; no required action. (3) New skills (`/ft-audit-context`) and behavior changes (Phase 1→2 default-skip, `--fast` flag, etc.) ship automatically on submodule bump (symlinked); `/ft-audit-context` is a global-install skill — adopters who want it install per MIGRATION §1.0.

**Archived:** 2026-05-24
