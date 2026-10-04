---
title: conditional-precommit-gate
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: [CORE-087]
---

# CORE-089 | conditional-precommit-gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-087]]

## 🎯 Goal

Make the 📦 ready-to-commit gate conditional: skip autonomously when changes are signal-cleanly mechanical (zero frontend files AND zero privileged ops), with an inline `✅ Closure complete; committing autonomously (rationale)` marker on skip.

## ✅ Acceptance

- [ ] **C1 — SPEC §"Operator-gate cues" gates table** — 📦 row's `Trigger` column flipped from `Always` to **Conditional** with a one-line skip rule pointing at §"Post-closure protocol" for the full signal contract. The two-row table now reads two conditional rows (🛠️ + 📦); the §"Operator-gate cues" intro that CORE-087 softened to "up to two" continues to apply.
- [ ] **C2 — SPEC §"Operator-gate cues" intro prose** sync-confirmed against the new 📦-conditional state. Existing CORE-087 softening ("up to two operator-gate banners"; "banner cue at each one *that fires*") already accommodates a second conditional row — no further edit expected; sync-confirm only.
- [ ] **C3 — SPEC §"Post-closure protocol"** carries the canonical deterministic skip rule for 📦, with three pieces:
  - **(a) Skip signals (deterministic, all must hold to skip):**
    - **Zero frontend files** — no changed path matches the frontend glob set: `**/*.tsx`, `**/*.jsx`, `**/*.ts` (under explicit UI dirs like `viz/`), `**/*.css`, `**/*.scss`, `**/*.html`, `**/*.vue`, `**/*.svelte`, plus any UI dir the adopter declares in `_project/tasknote/README.md`.
    - **Zero privileged-ops paths** — no changed path matches: `**/migrations/**`, `**/auth/**` (or `**/authn/**` / `**/authz/**`), `**/security/**`, `**/secrets/**`, `**/credentials/**`, files matching `.env*`, files with credential-shaped keyword hits (`API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`), and `**/integrations/**` / `**/clients/**` for external-integration code (HTTP / SDK callers to third-party services).
    - **No perf-sensitive narrative concern** — narrative fallback: if the assistant reasoned about performance during execution (hot-path optimization, indexing change, cache invalidation, batch sizing) OR the changed files sit under a project-declared perf-critical directory, the gate fires. Otherwise this signal clears.
  - **(b) Bundled-prompt override** — if a bundled in-📦 prompt is queued (e.g., /close-epic's parent-flip Yes/No), the gate fires regardless of signal state. Autonomous-commit cannot resolve a user-input question.
  - **(c) On skip — autonomous-commit motion** — emit the inline marker `✅ Closure complete; committing autonomously (<concrete-signal-summary>).` (with the parenthetical naming the actual cleared signals, e.g., `4 markdown files; no frontend/privileged surface`), then run the full bundle in one motion: closure review → recap → commit → 🏁 state-marker → suggest-next-move → copy-paste line. Same response shape as the post-commit response that fires *after* commit-go on the non-skip branch — the marker just replaces the banner + commit-go wait.
- [ ] **C4 — "Signal-based rule, no AI override" semantics** spelled out in SPEC: when signals say skip, skip; when signals say fire, fire. The only judgment surface is the perf-sensitive narrative branch, and it biases conservatively toward firing. The assistant cannot escalate (force banner on a clean diff) nor de-escalate (skip when a signal hits).
- [ ] **C5 — Inline marker shape** — `✅ Closure complete; committing autonomously (<concrete-signal-summary>).` Plain prose, not a banner block. Not a new gate. Mirrors the CORE-087 inline-marker pattern at the closure boundary instead of the Phase 1→2 boundary.
- [ ] **C6 — /task SKILL.md Step 6** reshaped from unconditional 📦-banner + wait to the conditional 2-bullet form (skip → marker + autonomous commit + post-commit motion; fire → 📦 banner + wait + post-commit motion).
- [ ] **C7 — /epic-discovery SKILL.md Step 10** — same reshape, scoped to epic-discovery's `.1` closure.
- [ ] **C8 — /close-epic SKILL.md Step 9** — same reshape with the parent-flip override: when Step 8's parent-flip eligibility check yielded an *eligible* state (all children closed), the bundled Yes/No prompt forces the 📦 banner to fire even if signals are clean. When ineligible (open children remain), the rule evaluates normally.
- [ ] **C9 — /micro-task SKILL.md Step 5** — `commit-go` gate adopts the same conditional rule. Note: /micro-task carries no explicit 📦 banner today (just commit-go prose); the reshape adds the conditional language without adding a banner first — same skip rule, same marker, same autonomous-commit motion when signals clear.
- [ ] **C10 — templates/tasknote-template.md** Phase 4 third checkbox at line 70 — text "(surfaces at the 📦 ready-to-commit gate)" syncs to "(surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)" so the canonical template documents the conditional reality. Adopters pick this up on next version bump.
- [ ] **C11 — Out-of-scope skills** untouched — `/release`, `/file-followup`, `/starter-task`, `/audit`, `/new-project`, `/flowtron` carry no closure-style 📦 gate. `/release` has its own commit-go + tag-message gates with a different lifecycle (tag/push/etc.) and stays out per the same pattern CORE-087 used for `/release`. `/file-followup` + `/starter-task` are filing-only (no closure). `/audit` writes to PLAN.md, not a closure-bearing skill. `/new-project` is bootstrapping; commits via different prose. `/flowtron` is read-only info.
- [ ] **C12 — Phase 4 doc-drift sweep** across `_project/tasknote/README.md` §"AI-referenced docs" — SPEC.md gets the contract update; SKILLs and template are not in the AI-referenced doc set. README.md, docs/MIGRATION.md, claude/CLAUDE-snippet.md expected `no change`.
- [ ] **C13 — Meta-validation** — CORE-089's own commit is pure SPEC + 4 SKILLs + 1 template = 6 markdown files, zero frontend, zero privileged-ops paths, no perf narrative. The skip rule should *itself* fire at CORE-089's closure → CORE-089 emits the inline marker and auto-commits. Genuine dogfood of the new rule on the commit that introduces it.

## 🧩 Subtasks

- [ ] **S1 — SPEC.md §"Operator-gate cues" gates table** — flip 📦 row's `Trigger` from `Always` to `Conditional — skipped when the deterministic signal rule clears (see §"Post-closure protocol")`. After-table prose stays as CORE-087 left it (already accommodates conditional gates).
- [ ] **S2 — SPEC.md §"Post-closure protocol" head** — insert a new sub-section ahead of step 1 (or as a structured block under step 1) carrying the deterministic skip rule: (a) signal definitions with concrete glob/path lists for frontend + privileged-ops categories + perf-sensitive narrative fallback; (b) bundled-prompt override (in-📦 user questions force fire); (c) skip motion (marker shape + autonomous-commit + full post-commit response in one motion); (d) "no AI override" semantics spelled out (bidirectional lock; perf narrative biases conservative).
- [ ] **S3 — SPEC.md §"Post-closure protocol" step 1 prose** — reshape from "Surface the bundled ready-to-commit gate behind the 📦 cue and wait for commit-go" to the 2-branch form: signal evaluation → skip path (marker + autonomous-commit) OR fire path (banner + wait as today). Keep the rest of step 1 (bundle parts: closure review / recap / proposed commit message) intact — those still apply, just delivered inline-with-commit on skip vs gated on fire.
- [ ] **S4 — SPEC.md §"🚀 Phase 4: Closure" line 380 + 389** — the Phase 4 closure checkbox text and recap callout mention "📦 ready-to-commit gate" by name; adjust to reference §"Post-closure protocol" for the conditional shape (cite, don't restate). Small word-level touch.
- [ ] **S5 — /task SKILL.md Step 6** — last bullet reshaped to 2-branch conditional matching SPEC's signal rule. Same shape as CORE-087's reshape pattern at Step 4.
- [ ] **S6 — /epic-discovery SKILL.md Step 10** — same reshape, scoped to `.1` Discovery closure. Proposed commit message stays `feat: <ID>.1 — file <EPIC> + scope children`.
- [ ] **S7 — /close-epic SKILL.md Step 9** — same reshape with the parent-flip eligibility override: surface the parent-flip Yes/No prompt as a hard "fire" trigger (when eligible per Step 8); otherwise apply the signal rule normally.
- [ ] **S8 — /micro-task SKILL.md Step 5** — reshape the commit-go bullet to the conditional 2-branch form; preserve the "no banner today" shape (the marker is plain prose; commit-go is a prose ask if signals fire, autonomous if signals clear).
- [ ] **S9 — templates/tasknote-template.md line 70** — sync the Phase 4 third checkbox parenthetical to mention the conditional skip path.
- [ ] **S10 — Phase 3 mental-pass** — markdown rendering (gates table column-alignment, no trailing whitespace, fence langtag consistency), emoji-glyph parity (📦 ✅ 🛠️ 🏁), grep verification that no SKILL still carries the old unconditional 📦-banner prose at top-level (only inside the new "fire" branch sub-bullet).
- [ ] **S11 — Phase 4 closure** — doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; PLAN.md flip CORE-089 to stub form; archive tasknote to `_project/tasknote/archive/core/CORE-089.md`. Per C13: the closure itself should fire the conditional skip rule and autonomously commit (no frontend, no privileged ops, no perf narrative).

## 🔗 Related

- [[CORE-087]] — sibling: conditional Phase 1→2 (🛠️) gate. CORE-089 mirrors the same conditional-skip pattern at the closure boundary; both produce inline `✅ …` markers in place of banner blocks; both keep "no AI override" semantics with signal/rule-based skip determination.
- [[CORE-066]] — defined the R1-R4 gate-UX baseline (banner preview / 👁️ / 🟢 / two-pass recap) that both CORE-087 and CORE-089 build on.
- [[CORE-067]] — original "overly gated" concern; CORE-087 addressed it at Phase 1→2, CORE-088 will check ergonomics post-deploy, CORE-089 addresses it at closure.
- [[CORE-088]] — deferred check-in on CORE-087's skip ergonomics; CORE-089 lands during the check-in window. CORE-088 may absorb early CORE-089 feedback too.
- [[CORE-065]] — trimmed 4→2 gates; established the "operator-gate banner" concept that CORE-087/CORE-089 are now making conditional.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Pure SPEC + SKILL prose edits over the gate-cue contract surface (one-day-old CORE-087 conditional Phase 1→2 pattern, six-day-old CORE-066 gate-UX baseline). No behavioral / schema / executable-code changes. The 📦 ready-to-commit gate is the *only* remaining unconditional banner — making it conditional finishes the conditional-gate motion that CORE-087 started at Phase 1→2 and matches the user's "overly gated" deferred concern from CORE-067. Real ergonomics payoff: every flowtron-internal SPEC/SKILL/template tasknote (the majority of recent closures) would skip both banners under the new rule and commit autonomously. Low-risk extension of an established pattern.

- [x] Read relevant source files

  Read at HEAD: `SPEC.md` (full), `claude/skills/task/SKILL.md` (full), `claude/skills/close-epic/SKILL.md` (full), `claude/skills/epic-discovery/SKILL.md` (full), `claude/skills/micro-task/SKILL.md` (full), `templates/tasknote-template.md`, `_project/tasknote/README.md`. Targeted greps over `SPEC.md` + `SPEC/` + `templates/` + all skills for `📦` / `ready-to-commit` / `Ready to commit` / `commit-go` references — 21 hits total, all surface-accounted-for.

- [x] **Archive skim** — `grep -l -E "📦|ready-to-commit|Ready to commit|commit-go|gate cue|Operator-gate" _project/tasknote/archive/core/*.md` returned the CORE-059 / CORE-065 / CORE-066 / CORE-067 / CORE-087 cohort + incidentals. Load-bearing precedent: **CORE-087** is the direct mirror — it took the 🛠️ Phase 1→2 banner from unconditional → conditional via a Phase-1-checklist-branch signal, with an inline `✅ …` marker on skip. CORE-089 applies the same pattern to 📦 at the closure boundary, with a different signal source (diff-content-based instead of Phase-1-checklist-based) and a different marker text (`Closure complete; committing autonomously …`). CORE-087's tasknote also flags the "skip rule binds to a *signal*, not a raw count" lesson (its Q2 resolution) — CORE-089's signal is the diff content, evaluated deterministically with one narrative fallback (perf-sensitive). **CORE-066** locked the gate-cue contract surface (SPEC + 3 SKILLs); **CORE-065** trimmed 4 → 2 gates; **CORE-067** raised the "overly gated" concern. CORE-089 is the natural conclusion of that arc.

- [x] **Drift check** — all paths and concepts cited in the PLAN.md description still match HEAD:
  - SPEC.md §"Operator-gate cues" gates table at lines 261-264 — 📦 row currently marked `Always` (line 263). Ready for the conditional flip.
  - SPEC.md §"Post-closure protocol" at lines 407-473 — step 1 carries the bundled 📦 banner + commit-go wait prose.
  - SPEC.md §"🚀 Phase 4: Closure" mentions the 📦 gate by name at lines 380 + 389 (recap-bundles-into-gate semantics).
  - /task SKILL.md Step 5 + Step 6 reference the 📦 banner (lines 132, 136, 146 — closure ops auto-run, recap bundles into 📦, "Surface the bundled 📦 ready-to-commit gate").
  - /epic-discovery SKILL.md Step 9 + Step 10 reference the 📦 banner (lines 159, 177, 182, 188 — closure auto-run, recap holds for 📦 bundle, "Surface the bundled 📦 ready-to-commit gate").
  - /close-epic SKILL.md Step 7 + Step 8 + Step 9 reference the 📦 banner (lines 147, 155, 160, 166, 169, 184 — closure auto-run + Step 8 parent-flip eligibility + Step 9 bundle with parent-flip prompt nested inside).
  - /micro-task SKILL.md Step 5 (line 117) — "the user's commit-go (\"commit\", \"go\", \"yes\") is the *only* gate". No explicit 📦 banner today; commit-go is a prose ask.
  - templates/tasknote-template.md line 70 — Phase 4 third checkbox: `Recap drafted (surfaces at the 📦 ready-to-commit gate)`. Direct mention; needs the conditional sync per S9.
  - **No drift in the cited surface.** One small expansion-of-scope beyond what PLAN.md literally listed: /micro-task carries no 📦 banner but does carry the commit-go gate (resolved via AskUserQuestion 2026-05-14 Q1 → "All four"); templates/tasknote-template.md mentions the 📦 gate by name and needs a sync touch (resolved as known edit S9, not a clarifying question).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Resolved scoping (via AskUserQuestion 2026-05-14):**

  | Question | Answer |
  |---|---|
  | Skill scope (just /task + /epic-discovery + /close-epic, or also /micro-task?) | **All four (incl. /micro-task)** — consistent rule across every closure-bearing skill that ends in a commit-go. /micro-task is by definition small-scope, the safest place to autonomize. /release stays out (different lifecycle: tag-message + push gates with their own semantics). |
  | Signal shape ("Signal-based rule, no AI override" — deterministic vs hybrid vs categorical) | **Hybrid: paths bright-line, perf-sensitive narrative.** Frontend + privileged-ops categories reduce to deterministic glob/path lists the assistant evaluates mechanically. Perf-sensitive stays narrative — bright-line is intractable, so on any genuine perf concern the gate fires (conservative bias). "No AI override" means: assistant cannot escalate (force fire on a clean diff) nor de-escalate (skip when a path-signal hits); the only judgment surface is the perf-narrative branch and it's biased toward firing. |
  | Marker rationale text format on skip | **Concrete signals that cleared** — e.g., `✅ Closure complete; committing autonomously (4 markdown files; no frontend/privileged surface).` Maximally informative for transcript scanning; the user sees *why* the gate skipped and can intervene immediately if it looks wrong. Mirrors CORE-087's inline-marker pattern but with diff-aware specificity. |

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Skip rule shape (locked):**

  | Diff content | 📦 gate? | Transition |
  |---|---|---|
  | Frontend file(s) changed (per glob list) OR privileged-ops path(s) changed (per glob list) OR perf-narrative present | **Fire 📦 banner** (per CORE-066 R1 with mandatory preview line + commit-go wait) | Banner serves as the marker; full bundle waits for commit-go |
  | Zero frontend + zero privileged-ops + no perf narrative | **Skip 📦 banner** | Inline `✅ Closure complete; committing autonomously (<concrete-signal-summary>).` then full bundle delivered in one continuous motion |
  | Any branch + bundled in-📦 user prompt queued (e.g., /close-epic parent-flip Yes/No) | **Fire 📦 banner** (override) | User input cannot autonomize; banner forces a wait regardless of signal state |

- **Frontend glob list (deterministic):** `**/*.tsx`, `**/*.jsx`, `**/*.ts` *under explicit UI dirs* (e.g., `viz/`), `**/*.css`, `**/*.scss`, `**/*.html`, `**/*.vue`, `**/*.svelte`, plus any UI dir an adopter declares in their `_project/tasknote/README.md`. The "explicit UI dir" qualifier on `.ts` matters — TypeScript is used backend-side in many adopters; the signal targets UI surface specifically.

- **Privileged-ops glob list (deterministic):**
  - **Migrations:** `**/migrations/**`, `**/alembic/**`, `**/db/migrations/**`, `**/prisma/migrations/**`
  - **Auth:** `**/auth/**`, `**/authn/**`, `**/authz/**`, `**/oauth/**`, `**/session*/**`
  - **Security / secrets:** `**/security/**`, `**/secrets/**`, `**/credentials/**`, `.env*`, files with credential-keyword hits in the diff (`API_KEY`, `SECRET`, `TOKEN`, `PASSWORD` — uppercase to avoid prose collision)
  - **External integrations:** `**/integrations/**`, `**/clients/**` (when housing third-party SDK callers), `**/webhooks/**`. Per-adopter overrides via tasknote/README.md declared dirs.

- **Perf-sensitive narrative fallback (judgment branch):** Fire the banner if the assistant reasoned about performance during execution (hot-path optimization, indexing/query-plan change, cache invalidation pattern, batch sizing, throughput target, p99 SLO concern) OR if the changed files sit under a project-declared perf-critical dir (e.g., `viz/src/perf/` if such existed, or an adopter-declared `**/hot_path/**`). Default-clear: pure SPEC/SKILL/template/doc edits, refactors of non-perf-critical internal code, type-only changes. The narrative branch is the only judgment surface and it biases conservative (fire on doubt).

- **Bundled-prompt override (autonomous-commit constraint):** /close-epic's parent-flip Yes/No prompt is the canonical case — when Step 8 marks parent-flip *eligible* (all children closed), the prompt fires inside the 📦 bundle and demands user input. Autonomous-commit cannot resolve a user-input question, so the gate fires regardless of signal state. Same override applies to any future skill-level bundled prompt nested in the 📦 gate. (Open question deferred: should future skill-prompt designs avoid in-📦 prompts in favor of the inline-marker motion? Out of scope for CORE-089; flag for CORE-088 ergonomics check-in.)

- **Gate count semantics post-CORE-089.** Currently the workflow has 1-or-2 banners after CORE-087 (🛠️ conditional, 📦 always). After CORE-089: **0-or-1-or-2** banners (🛠️ conditional on Phase 1 outcome; 📦 conditional on diff content). Net for an unambiguous + mechanical task: zero banners — same approval-pause surface today's `/micro-task` already implies for its commit-go (which CORE-089 aligns with the rest of the workflow). Underlying behavior is preserved (user can still intervene at any moment via the inline markers' scan-visibility; the autonomous-commit motion preserves recap + closure review + 🏁 + next-move + copy-paste line in one motion).

- **Why the rule lives in §"Post-closure protocol" rather than §"Operator-gate cues":** The signal definitions (glob lists, perf narrative) are content-specific to closure — they don't generalize to other potential gates. §"Operator-gate cues" stays the visual contract surface (banner shapes, preview-line requirement); §"Post-closure protocol" carries the conditional logic specific to the 📦 gate. Cross-ref from the gates table to §"Post-closure protocol" anchors the lookup.

- **CORE-087 dogfood validation precedent:** CORE-087's tasknote noted that *its own* Discovery surfaced 3 clarifying questions → the 🛠️ banner correctly fired (meta-validation: the rule preserves the banner exactly where it adds value). CORE-089 expects the parallel dogfood at *closure*: pure SPEC + 4 SKILLs + 1 template = 6 markdown files, zero frontend paths, zero privileged-ops paths, no perf narrative → the skip rule fires at CORE-089's own closure → CORE-089 commits autonomously with the new inline marker. Genuine dogfood of the new rule on the commit that introduces it (see C13).

- **Adopters** pick up the conditional skip on next flowtron version bump. Existing archived tasknotes / completed flows unaffected (skip is a runtime convention; not a tasknote-shape change). The new template-line wording (S9) is the only line adopters might want to migrate on existing tasknotes, but it's advisory — the live workflow runs off SPEC + SKILLs, not template text.

- **Diff envelope estimate:** ~7 files (SPEC + 4 SKILLs + template); SPEC carries ~3 hunks (gates table + Post-closure protocol head/step1 + Phase 4 closure word-touch); each SKILL gets ~1 small hunk (commit-go bullet reshape); template gets 1-line sync. Magnitude slightly larger than CORE-087's 4-file/+62/-29 envelope due to the deterministic signal definitions in SPEC + /micro-task being in scope.

- **No new tests / no executable code surface** — pure markdown / SKILL prose. Same precedent as CORE-059 / CORE-065 / CORE-066 / CORE-087.

- **CORE-089's own Discovery surfaced 3 clarifying questions via AskUserQuestion → the 🛠️ banner fires at end of Phase 1.** Meta-validation of CORE-087's rule: 🛠️ correctly fires here, because the task shape was genuinely ambiguous (skill scope / signal shape / marker form all needed user resolution).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** CORE-087 (one day ago) set the exact mirror — SPEC.md is the canonical define-once surface for the conditional-gate rule; the gates table lives in §"Operator-gate cues" (visual contract); the rule itself lives in the section that owns the gate's semantics (CORE-087: §"📝 Phase 1: Discovery" exit gate; CORE-089: §"Post-closure protocol" — new §"Conditional skip rule" sub-section). SKILLs then cross-reference at each fire/skip branch point with a 2-bullet Skip/Fire reshape. CORE-089 reuses the pattern verbatim with three deltas: (1) signal source is diff-content not a Phase-1-checklist branch, requiring deterministic glob lists in SPEC; (2) bundled-prompt override needed for /close-epic's parent-flip Yes/No; (3) scope expanded by one skill (/micro-task) and one template line (S9). No new structure introduced.

- **SPEC.md edits** (5 hunks, +98/-15):
  - **§"Operator-gate cues" intro** (lines 242-251): reshaped from "🛠️ conditional; 📦 always fires" to "Both banners are conditional"; added the new "fully unambiguous mechanical task: both banners skip and the assistant runs end-to-end" sentence; cross-ref to new §"Post-closure protocol" §"Conditional skip rule" for the full 📦 rule.
  - **§"Operator-gate cues" gates table** (line 267): 📦 row's `Trigger` column flipped from `Always` to `**Conditional**` with a one-line description naming the signal categories + the bundled-prompt override + cross-ref to §"Conditional skip rule".
  - **§"Operator-gate cues" after-table prose** (lines 281-291): reshaped recap-bundles-into-gate language to reference the dual fire/skip branches; explicit inline marker text quoted; cross-ref to the new §"Conditional skip rule".
  - **§"🚀 Phase 4: Closure"** word-touches (lines 380, 388, 397-400, 407-410): "Gate count stays at 2" → "stays at up-to-2"; Phase 4 third checkbox parenthetical "(surfaces at the 📦 ready-to-commit gate)" → "(...or inline on conditional skip)"; recap-bundles prose softened to "📦 ready-to-commit motion" with explicit fire/skip branch description; the closing "commit-go at the 📦 gate is the bundled approval" rewritten as a fire/skip pair referencing §"Conditional skip rule".
  - **§"Post-closure protocol" new ###"Conditional skip rule" sub-section** (lines 419-485): inserted ahead of step 1 with five components: (a) intro setting up the branch on Step 1 of the protocol; (b) Skip signals — deterministic frontend glob list + privileged-ops glob lists for migrations/auth/security/external-integrations/perf-sensitive narrative fallback; (c) bundled-prompt override (autonomous-commit cannot resolve a user-input question); (d) "No AI override" semantics (bidirectional lock; perf-narrative is the only judgment surface and biases conservative); (e) Skip motion (marker + autonomous-commit) and Fire motion (pointer to step 1). Step 1 reshaped to "Commit (bundled gate, **fire branch**)" with a sentence clarifying that bundled in-📦 prompts are precisely what forces the fire branch via the override.

- **/task SKILL.md edits** (1 hunk, +6/-4, lines 138-150 → 138-150): Step 6 last bullet group reshaped to the conditional 2-bullet form (Skip branch → marker + autonomous-commit motion; Fire branch → 📦 banner + wait); the cross-cutting "one continuous flow" / "🏁 state-marker" / "next-move" / "copy-paste line" bullets carry the dual-branch language.

- **/epic-discovery SKILL.md edits** (1 hunk, +4/-3, lines 184-194): Step 10 first three bullets reshaped to the conditional form with `/epic-discovery`-specific signal commentary (filing diff = PLAN.md + scaffold/archive ≈ always clean; skip branch is the common case). Fire branch flagged for rare cases where the Discovery surfaced a perf-narrative concern.

- **/close-epic SKILL.md edits** (1 hunk, +5/-4, lines 180-198): Step 9 reshaped with the parent-flip override at top: when Step 8's eligibility check yielded `eligible`, the parent-flip Yes/No prompt is a bundled in-📦 user prompt → bundled-prompt override fires the 📦 gate regardless of signals. When `ineligible`, signal rule evaluates normally and skip branch is possible. Skip branch description includes "Heads-up listing of the open children delivered inline alongside the closure review" to keep Step 8's ineligible heads-up surfaced even on autonomous-commit.

- **/micro-task SKILL.md edits** (1 hunk, +5/-2, lines 113-120): Step 5 first two bullets reshaped to the conditional form. Note: /micro-task carries no explicit 📦 banner today — its commit-go is a prose ask, not a banner block. The reshape adopts the same signal rule but maps to "autonomous-commit motion" (skip) vs "prose commit-go ask" (fire). Skip-common observation: micro-tasknote threshold ("small audits, focused doc patches, single-file behavior tweaks") aligns with the rule's clean-diff target, so most micro-tasknotes will skip.

- **templates/tasknote-template.md sync** (1 line, +1/-1): Phase 4 third checkbox parenthetical synced to match SPEC.md line 388. Adopters pick this up on next flowtron version bump.

- **Out-of-scope skills untouched:** `/release` (different lifecycle — tag-message + push gates with their own semantics; line 155, 208, 218, 232 untouched), `/new-project` (bootstrapping commit; line 111, 122 untouched), `/file-followup` + `/starter-task` (filing-only; no closure), `/audit` (writes to PLAN.md; no closure). `/flowtron` is read-only info. Same deferral pattern as CORE-087.

- **Bundled-prompt override design choice (locked):** The only bundled in-📦 prompt today is /close-epic's parent-flip Yes/No. The override is written generically (any bundled in-📦 user prompt forces fire) so future skill-level prompts inherit it automatically. Future ergonomics question — should new skill-prompt designs prefer the inline-marker motion over in-📦 prompts? — deferred to CORE-088's gate-UX check-in (already noted in tasknote Discovery Notes).

- **Meta-validation (C13):** CORE-089's own commit is pure SPEC + 4 SKILLs + 1 template + 1 PLAN.md + 1 tasknote-archive = 8 markdown files (or 7 modified + 1 archive move), zero frontend paths (`viz/` untouched), zero privileged-ops paths (no `migrations/`, `auth/`, `security/`, `secrets/`, `integrations/`, `.env*`, no credential keyword hits), no perf narrative. The skip rule **will fire** at CORE-089's own closure — CORE-089 emits the inline marker and commits autonomously. Genuine dogfood of the new rule on the commit that introduces it.

- **Diff stat:** 7 files changed, +144/-57. SPEC.md absorbs the bulk (+98/-15) — the rest are localized SKILL reshapes (each ~6 lines net) + the 1-line template sync. Magnitude slightly larger than CORE-087's 4-file/+62/-29 envelope due to the deterministic signal definitions in SPEC + the additional skill (/micro-task) + the template sync.

- **No tests added** — pure markdown / SKILL prose; no executable code surface. Same precedent as CORE-059 / CORE-065 / CORE-066 / CORE-087.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Pure markdown / SKILL prose edits — no executable code surface. Test suite N/A.
- **Lint substitute** — grep verifications across the 7 edited files:
  - `git diff --check` clean (no trailing whitespace, no conflict markers).
  - **No SKILL still carries the old unconditional `Surface the bundled 📦 ready-to-commit gate ... and wait for commit-go` prose at top-level** — only inside the new `**Fire branch**` sub-bullet of each SKILL (verified: /task line 146, /epic-discovery line 190, /close-epic line 186). /micro-task uses prose commit-go ask, not a banner, so its "Fire branch" sub-bullet says "surface the prose commit-go ask" instead.
  - **No SPEC text still says "📦 ready-to-commit banner always fires"** or implies the 📦 gate is unconditional — verified via grep: `grep -n "📦.*always\|always.*📦" SPEC.md` returns 0 hits.
  - **Cross-refs resolve** to `SPEC §"Post-closure protocol" §"Conditional skip rule"` from all 4 SKILLs (4 hits) — the sub-section heading exists at SPEC.md line 427.
- **Markdown mental-pass** — gates table column alignment intact with the longer 📦 row Trigger cell (GFM auto-widths cells; verified via Read); sub-bullets under each SKILL's Step 6/9/10/5 use 2-space indent with proper continuation; the new SPEC sub-section uses ### heading depth (consistent with §"Operator-gate cues" peer subsection depth — `### Operator-gate cues` at line 240, so `### Conditional skip rule` peers at line 427 sits one level shallower than its parent `## Post-closure protocol` at line 415 — checked, hierarchy clean); emoji-glyph parity (📦 ✅ 🛠️ 🏁) consistent across SPEC + 4 SKILLs + template; fence langtag `text` consistent with CORE-086 fence-langtags contract.
- **Frontend N/A** — no UI changes. The inline marker (`✅ Closure complete; committing autonomously …`) is a runtime convention for future tasknotes/microtasks; CORE-089 has no UI surface to confirm.
- **Diff stat:** 7 files changed, +144/-57 (SPEC.md +98/-15, /task SKILL.md +6/-4, /epic-discovery +4/-3, /close-epic +5/-4, /micro-task +5/-2, template +1/-1, PLAN.md +2/-1 from closure flip).
- **Visual rendering verified by direct Read** — SPEC.md lines 240-300 (gates table + intro + after-table prose) and lines 415-510 (new §"Conditional skip rule" + reshaped step 1) checked post-edit; no broken markdown, all backticks paired, all fences closed, all anchor cross-refs match the actual heading text.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (per `_project/tasknote/README.md` §"AI-referenced docs"):**

| Entry | Verdict |
|---|---|
| `README.md` | no change — public-facing repo overview; conditional 📦 skip is SPEC-internal runtime convention, not adopter-facing |
| `SPEC.md` | **updated** — 5 hunks: §"Operator-gate cues" intro reshaped to "Both banners are conditional"; gates table 📦 row `Always`→`**Conditional**` with signal/override description; after-table prose reshaped to dual fire/skip branches; §"🚀 Phase 4: Closure" word-touches (gate count "stays at 2"→"up-to-2"; Phase 4 third checkbox parenthetical synced; recap-bundles prose softened; closing commit-go sentence rewritten as fire/skip pair); §"Post-closure protocol" gained new ###"Conditional skip rule" sub-section with deterministic frontend + privileged-ops glob lists + perf-narrative fallback + bundled-prompt override + "No AI override" semantics + Skip/Fire motion descriptions + reshaped step 1 |
| `docs/MIGRATION.md` | no change — adoption procedure unchanged; adopters pick up the conditional skip on next version bump |
| `claude/CLAUDE-snippet.md` | no change — snippet wires skills; gates / markers surface from SPEC + SKILLs at runtime, not from the snippet text |

**Final Summary:**

The 📦 ready-to-commit operator-gate banner is now conditional: when a closure's diff content clears the deterministic signal rule (zero frontend files AND zero privileged-ops paths AND no perf-narrative concern) and no bundled in-📦 user prompt is queued, the workflow skips the approval pause and runs closure review + recap + commit + 🏁 state-marker + next-move suggestion + copy-paste line as one continuous response, with an inline marker `✅ Closure complete; committing autonomously (<concrete-signal-summary>).` standing in for the banner. When any signal hits or a bundled prompt (e.g., /close-epic's parent-flip Yes/No) is queued, the banner fires exactly as before with commit-go wait. Combined with CORE-087, fully unambiguous mechanical tasks now run end-to-end without any approval pause (both 🛠️ and 📦 skip via inline markers); ambiguous or privileged-surface tasks keep the full review ceremony.

_Technical:_ SPEC.md updated in 5 hunks — §"Operator-gate cues" intro+table+after-table reshaped to dual-conditional language; §"🚀 Phase 4: Closure" word-touches (gate-count, Phase 4 checkbox parenthetical, recap-bundles prose, closing commit-go sentence); §"Post-closure protocol" gained new ### "Conditional skip rule" sub-section carrying deterministic glob lists for frontend (`**/*.tsx|jsx|ts under UI dirs|css|scss|html|vue|svelte`) and privileged-ops categories (migrations: `**/migrations/**`/`**/alembic/**`/etc.; auth: `**/auth/**`/`**/authn/**`/`**/authz/**`/`**/oauth/**`/`**/session*/**`; security/secrets: `**/security/**`/`**/secrets/**`/`**/credentials/**`/`.env*` + credential-keyword diff hits; external integrations: `**/integrations/**`/`**/clients/**`/`**/webhooks/**`) + perf-narrative fallback (judgment-branch, biased conservative) + bundled-prompt override (autonomous-commit cannot resolve user-input questions, so any in-📦 prompt forces fire) + "No AI override" semantics spelled out (bidirectional lock; perf-narrative is the only valve and biases conservative) + Skip motion (marker + autonomous-commit) and Fire motion (pointer to reshaped step 1). `/task` SKILL Step 6, `/epic-discovery` SKILL Step 10, `/close-epic` SKILL Step 9, and `/micro-task` SKILL Step 5 all reshaped to the conditional 2-bullet (Skip/Fire) form. `/close-epic`'s reshape adds the parent-flip override at top: Step 8's eligibility check directly drives the fire-branch lock when eligible. `/micro-task`'s reshape preserves its banner-free shape — Skip → autonomous; Fire → prose commit-go ask. `templates/tasknote-template.md` Phase 4 third checkbox parenthetical synced to match SPEC.md line 388. Out-of-scope skills (`/release`, `/new-project`, `/file-followup`, `/starter-task`, `/audit`, `/flowtron`) untouched. Diff stat: 7 files, +144/-57. No new behavioral gates introduced; gate count drops from "up-to-2 (🛠️ conditional, 📦 always)" to "0-or-1-or-2 (🛠️ conditional, 📦 conditional)". **Meta-validation (C13):** CORE-089's own commit is 7 markdown files modified + 1 tasknote-archive move = 8 markdown-only files, zero frontend paths, zero privileged-ops paths, no perf narrative → the new skip rule fires at CORE-089's own closure. CORE-089 emits the inline marker and commits autonomously — genuine dogfood of the new rule on the commit that introduces it. Verification ask: skim `SPEC.md` §"Operator-gate cues" (gates table + reshaped intro/after-table prose), §"Post-closure protocol" §"Conditional skip rule" (the new ### sub-section), and any one of the 4 SKILL reshapes to confirm the contract reads cleanly.

**Archived:** 2026-05-14
