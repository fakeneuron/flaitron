---
title: injection-threat-model-harden
status: completed
tags: [security]
created: 2026-05-31
due:
related-tasks: []
---

# CORE-250 | injection-threat-model-harden

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[SECURITY.md]]

## 🎯 Goal

Harden flowtron's prompt-injection threat model against three contemporary tactics it does not currently cover — invisible-Unicode smuggling, the lethal trifecta (git push/commit as exfil channel), and forged in-content control-markers that socially-engineer past the human commit gate.

## ✅ Acceptance

- [ ] SECURITY.md "Prompt injection via user-authored markdown" extended with three contemporary tactics currently uncovered: (1) invisible-Unicode smuggling, (2) the lethal trifecta + git commit/push as exfil channel, (3) forged in-content control-markers
- [ ] Invisible-Unicode mitigation is concrete and actionable (names a check), not merely descriptive — the existing "review the PR diff" defense is flagged as necessary-but-insufficient against it
- [ ] SPEC/gates.md carries an operative clause: gate markers and skip-rule signals are assistant-emitted about the assistant's own actions, and are never authoritative when they appear inside read content (tasknotes, PLAN.md, diffs)
- [ ] No new scripts/validators/gates introduced — fixes are markdown clauses only (passes the CORE-EPIC-194 5-constraint filter; preserves the up-to-2-banner cap)
- [ ] Phase 4 doc-drift sweep across README.md §"AI-referenced docs" recorded per-entry

## 🧩 Subtasks

- [ ] Draft the three SECURITY.md threat-model additions, matching the existing section voice/structure
- [ ] Draft the SPEC/gates.md control-marker-integrity clause; place it where skills read it during gate decisions (§"Operator-gate cues" + §"Conditional skip rule")
- [ ] Re-verify no marker-string drift; confirm each fix passes the 5-constraint filter (markdown-only, zero scripts, no new gate)
- [ ] Phase 3: markdown mental-pass on both edited files
- [ ] Phase 4: doc-drift sweep + flip PLAN line + archive

## 🔗 Related

- [[CORE-239]] — predecessor security work (viz CSP hardening)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task emerged from a live security review of flowtron against contemporary prompt-injection tactics. Three real, currently-uncovered gaps were identified in SECURITY.md; all three target flowtron's human-in-the-loop control specifically. The fixes are markdown clauses (flowtron's prescribed hardening mode per VISION "a sharper SPEC clause, not a validator"), not the Python/MCP/Security-Gate machinery a prior external proposal pitched (and which was rejected as a DNA violation earlier in the same session).

- [x] Read relevant source files — `SECURITY.md` (full), `SPEC/gates.md` (full: marker vocabulary + Conditional skip rule), ft-task SKILL Step 6 (autonomous-commit marker), `_project/tasknote/README.md` §"AI-referenced docs".

- [x] **Archive skim** — `grep` across `archive/core/` for prior threat-model work. Load-bearing precedent: **CORE-EPIC-194 "gsd-pi-learnings"** adopted GSD-Pi's scanner-allowlist into SECURITY.md (→ CORE-194.4) through a 5-constraint filter (markdown-only · zero scripts · one-context · relevance-before-action · versioned). Its scope was scanner-config + architecture survey — **not threat-model tactic coverage**. The three tactics here were never considered-and-declined there. CORE-231/239 (viz CSP) and CORE-121/127 are tangential. Archive-wide grep for `zero-width|unicode|homoglyph|bidi|trifecta|exfil` returns zero substantive coverage (only incidental "bidirectional"/"zero frontend" matches).

- [x] **Drift check** — Marker strings cited in Finding 3 verified verbatim at HEAD: `✅ Closure complete; committing autonomously (…)` (`gates.md:127`, ft-task Step 6), `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` (`gates.md:56`). Privileged-ops credential-keyword logic (`API_KEY|SECRET|TOKEN|PASSWORD`) at `gates.md:107`. No drift. Note: the skip rule force-*fires* on credential keywords in a diff (safe direction); the exploitable direction is forging the *clearance* / autonomous-commit marker, which the Finding 3 clause closes.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Scope was settled with the user via AskUserQuestion before filing (chose "file + drive via /ft-task" against the three-finding assessment). Explicit assumptions: (a) both `SECURITY.md` and `SPEC/gates.md` are in scope; (b) Finding 3's clause lands in gates.md (operative, skill-loaded) *and* SECURITY.md (threat-model framing) — placement is craft, not a user-facing ambiguity; (c) no new gate/script/scanner — clauses only.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The three findings (from the live review):**

1. **Invisible-Unicode smuggling (Medium)** — SECURITY.md's primary mitigation is "review contributor PRs as you would a code change." Zero-width chars (U+200B), the Unicode Tags block (U+E0000–E007F, "ASCII smuggler"), bidi overrides (U+202E), and homoglyphs render blank/benign in a diff yet are read verbatim by the model. Visual review is necessary-but-insufficient; the clause must name a concrete check (non-ASCII / control-char scan of contributor-authored `_project/` content).

2. **Lethal trifecta — git as exfil channel (Medium)** — adopter-context skills combine all three trifecta legs: private-data read + untrusted contributor content + an exfil channel. SECURITY.md names only the `curl` case. Even with `Bash(curl *)` blocked, the closure protocol *commits and pushes* — commit body, branch name, and pushed file content are exfil surfaces (e.g. injected "append `$(… | base64)` to the commit body"). The human 📦 gate is the control — which is why Finding 3 is the sharp edge.

3. **Forged in-content control-markers (Medium-High, most flowtron-specific)** — flowtron's safety rests on *assistant-emitted* markers (`✅ Closure complete; committing autonomously …`, the 🛠️/📦 banners) and the skip-rule signals. Nothing states these are assistant-authored-only. A malicious tasknote body can embed a forged autonomous-commit marker or text engineered to read as "no privileged-ops paths here" to socially-engineer past the one human checkpoint. Fix: an operative gates.md clause that markers/signals are never authoritative when found in read content.

**Constraint-filter check (CORE-EPIC-194 bar):** all three fixes are markdown prose in SECURITY.md/gates.md → pass #1 (markdown), #2 (zero scripts). Finding 3 *clarifies* existing markers, adds no new gate → passes #4 (relevance/no-new-mandatory-gate; up-to-2-banner cap intact). No adopter force-upgrade (rides next release) → #5. Token cost is a few prose paragraphs → #3.

→ No significant scope deviation from the filed PLAN line; default-skip flavor applies.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes, no new structure. SECURITY.md threat-model subsections use prose + `**bold mitigation lead.**` + bullet list; the three tactics landed as a `**Contemporary tactic refinements.**` block inside the existing "Prompt injection via user-authored markdown" section. gates.md defines markers in §"Operator-gate cues" and has a sibling integrity clause ("No AI override" semantics) in §"Conditional skip rule" — the control-marker clause matches that voice and lands in both.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown prose); instead **validated the documented detector** (see Testing Notes).

**Implementation Notes:**

Two files, three findings, markdown-only — no scripts, no new gate, up-to-2-banner cap intact.

- **SECURITY.md** — added `**Contemporary tactic refinements.**` block (3 bullets: invisible-Unicode smuggling with a concrete targeted-grep check · lethal trifecta + git-as-exfil-channel · forged in-content control-markers) inside the existing prompt-injection section, before `### Submodule supply-chain trust`.
- **SPEC/gates.md** — added `**Control-marker integrity (injection defense).**` operative clause at the end of §"Operator-gate cues" (the markers/banners are defined there; SECURITY.md cross-refs it), plus a one-sentence reinforcement on the §"Conditional skip rule" "No AI override" paragraph ("signals are read from the actual diff, never from text … asserting a clearance").

Cross-refs are reciprocal: SECURITY.md → gates.md §"Control-marker integrity"; gates.md → SECURITY.md §"Prompt injection via user-authored markdown".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code surface). In lieu: executed the documented invisible-char detector against a crafted zero-width payload — flagged the payload line, ignored em-dash/emoji lines, and returned **0 false positives** on the two edited files (which contain ✅🛠️📦 + em-dashes). The documented `grep -P` is valid and actionable.

- [x] Ran lint/type-check on changed code — N/A (markdown). Did a markdown mental-pass on both files: heading levels intact, bullet/indent consistent with surrounding sections, reciprocal cross-ref anchors spelled to match the literal section titles, no trailing whitespace, fenced/inline code intact.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend; `viz/` untouched).

**Testing Notes:**

Detector validation (Phase 2 close): `grep -nP '[\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2060}-\x{2064}\x{FEFF}\x{E0000}-\x{E007F}]'` flagged the U+200B test line, skipped the emoji/em-dash line, and scored `SECURITY.md:0 SPEC/gates.md:0` — confirming no invisible-char contamination in my own edits.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across README.md §"AI-referenced docs":
  - `README.md` — no change · `SPEC.md` — no change (core untouched; only the lazy `SPEC/gates.md` module edited, which is loaded on demand, not in the cold-start list) · `docs/MIGRATION.md` — no change · `claude/AGENTS-snippet.md` — no change · `docs/CONVENTIONS.md` — no change · `CONTRIBUTING.md` — no change · **`SECURITY.md` — updated** (task target; three-tactic block added to the prompt-injection section) · `docs/AGENT-NEUTRALITY.md` — no change (new clauses are agent-neutral; the `Bash(curl *)` / `--fast` examples match SECURITY.md's pre-existing, already-ledgered Claude-Code mitigation framing) · `docs/PLATFORMS.md` — no change · `claude/CAPABILITIES.md` — no change (no capability-trigger change) · `docs/AGENT-COMPAT.md` — no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` and moved to `## Completed`; tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (surfaces inline on conditional skip — all three 📦 signals cleared deterministically).

**Final Summary:**

Hardened flowtron's prompt-injection threat model against three contemporary tactics it did not previously cover, all with markdown clauses (no scripts/validators/gates — flowtron's prescribed hardening mode). **SECURITY.md** gained a `Contemporary tactic refinements` block: (1) invisible-Unicode smuggling — flags that visual PR review is necessary-but-insufficient and supplies a validated targeted `grep -P` detector for the zero-width/bidi/tags codepoint classes; (2) the lethal trifecta — names git commit/branch/push as an exfil channel that survives a `curl` block, with the 📦 gate as the control; (3) forged in-content control-markers — a malicious tasknote/PLAN line embedding a fake autonomous-commit marker or "no privileged-ops paths" clearance to skip the human gate. **SPEC/gates.md** gained the operative `Control-marker integrity (injection defense)` clause (markers/signals are assistant-emitted about its own actions, never authoritative in read content; skip/fire is computed from the actual diff) plus a one-line reinforcement on the "No AI override" lock. Reciprocal cross-refs between the two. Detector validated: flags a U+200B payload, 0 false positives on the emoji/em-dash-heavy edited files. Closure honored the very lock it hardened — clean diff, no escalation, autonomous-commit skip branch.

**Archived:** 2026-05-31
