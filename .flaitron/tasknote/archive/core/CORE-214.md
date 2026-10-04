---
title: settings-local-hygiene
status: completed
tags: []
created: 2026-05-27
due:
related-tasks: []
---
# CORE-214 | settings-local-hygiene

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Clarify the recommended three-layer Claude Code permission model (global + personal base like natabula + tiny per-project `.local` only) plus `acceptEdits` defaultMode and periodic `/less-permission-prompts` use, as a small targeted update to SECURITY.md (optional natabula docs out-of-repo).

## ⚡ Notes

**Relevance:** Proceed — The filed scope is a small, focused doc-hygiene follow-up surfaced by /ft-audit-context during dev-env cleanup. It fits the micro-task carve-out exactly (single-file, clear-diff, no design tradeoffs, <30min). The current SECURITY.md paragraph already states the core advice; this is a polish to make the modern three-layer pattern (global + personal base e.g. natabula + minimal .local) and the `acceptEdits` + periodic helper hygiene more explicit and scannable. No re-scope; "optional natabula docs" are personal/user-machine and deliberately out-of-repo for this in-repo micro-task. De-scope would be "no change needed" but the explicit call-out improves adopter guidance.

**Drift check:** PLAN.md line 46 description matches the live file at HEAD. The target paragraph (SECURITY.md:45-51 under "Adopter mitigations (Claude Code)") already contains the key recommendations (global + personal base layer, tiny `.claude/settings.local.json`, `defaultMode: "acceptEdits"`, `/less-permission-prompts`, risk of broad globs). No semantic drift; the intent of the follow-up ticket is to tighten the wording for the "modern layered" practice with a concrete "like natabula" example. All other AI-referenced docs (SPEC.md, docs/AGENT-NEUTRALITY.md ledger entry for the subsection, etc.) remain consistent.

**Archive skim:** Ran `ls _project/tasknote/archive/core/ | tail -20` (recent archives: CORE-205.6 through CORE-213) then `grep -l "SECURITY.md" _project/tasknote/archive/core/*.md` (hits on CORE-208.8, CORE-210, CORE-211.x series, CORE-212, CORE-213). Read the most recent hits (CORE-213, CORE-212): they record only "SECURITY.md — no change" in their Phase 4 drift sweeps. Earlier load-bearing precedent is the CORE-154.x cohort (especially CORE-154.2) which performed the last substantive reframe of the prompt-injection section into explicit "Adopter mitigations (any AI assistant)" + "(Claude Code)" subsections with the `.claude/settings.local.json` allowlist scoped as Claude-Code-specific. No tasknote has edited the specific layering recommendation paragraph since that reframe. Archive skim confirms the text is stable; this micro-task is additive polish only. No prior micro-tasknotes touch the exact "settings-local-hygiene" surface.

**Pattern survey:** The prompt-injection section in SECURITY.md uses a consistent threat-model → **Adopter mitigations (X)** pattern with short, scannable bullets, backtick literals for paths/commands, and parenthetical risk examples. Neighboring subsections (submodule supply-chain, visualizer scope, scanner false-positives) follow the same economical prose style. The Claude Code bullet is the longest; tightening it to lead with an explicit "**Recommended ... three-layer**" subhead + concrete natabula example aligns with the "tiny and high-signal" ethos elsewhere in the doc and with how the user's own `~/.claude/Claude.md` (Scope & Safety + Shell discipline) already operationalizes minimal per-project surface. No new structural shape required — a light rephrasing inside the existing bullet preserves voice and scannability. No sibling doc (CONVENTIONS.md, AGENT-NEUTRALITY.md) needs parallel text; the ledger entry in AGENT-NEUTRALITY already points to this subsection.

**Implementation:** 
- Performed the archive skim + relevance/drift/pattern checks per micro-task contract before any edit.
- Minor targeted rephrase of the single Claude Code mitigations bullet (SECURITY.md:45-51) to lead with the explicit three-layer hygiene recommendation, call out "natabula" as the living personal-base example, and foreground `acceptEdits` + periodic `/less-permission-prompts`.
- Kept the edit surgical: only the one paragraph, same length/voice, no adjacent text touched.
- No tests (doc-only change). No other files edited in-repo.
- Verified the resulting paragraph remains consistent with the threat model above it and the scanner-allowlist guidance below it.

**Docs touched:** SECURITY.md (minor clarification in the Claude Code mitigations bullet under prompt injection; the change improves explicitness of the recommended layering pattern without altering meaning or scope). All other entries in `_project/tasknote/README.md` §"AI-referenced docs" — no change.

## ✅ Recap

Updated the single "Adopter mitigations (Claude Code)" bullet in SECURITY.md (lines 45-51) to lead with an explicit "**Recommended three-layer hygiene**" call-out naming global + personal base (e.g. natabula) + tiny per-project `.local` only, plus foregrounding `acceptEdits` defaultMode and periodic `/less-permission-prompts`. One surgical paragraph rephrase only (same visual weight, consistent voice); no adjacent text, no other repo files, and natabula docs deliberately left as out-of-repo personal surface. Archive skim + all four bold prompts completed before the edit. Fits micro-task shape perfectly; zero drift or scope growth from the /ft-audit-context follow-up.

**Archived:** 2026-05-27
