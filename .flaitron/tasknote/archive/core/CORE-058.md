---
title: task-skill early model-switch catch
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-046, CORE-049]
---

# CORE-058 | task-skill early model-switch catch

[← PLAN.md](../PLAN.md) · ✅ De-scoped · 🔗 [[CORE-046]] [[CORE-049]]

## 🎯 Goal

Move /task's model-mismatch gate from Step 1.5 (post-skill-load) to a `UserPromptSubmit` hook that fires before the skill loads, so a wrong-model `/task <ID>` invocation is blocked with zero pre-switch context burn.

## ✅ Acceptance

- [ ] N/A — task de-scoped at Phase 1 (premise not viable on current Claude Code; see Discovery Notes + Final Summary)

## 🧩 Subtasks

- [ ] N/A — de-scoped before any execution work

## 🔗 Related

- [[CORE-046]] — v1.1.0 post-closure `/model` + recap-only. Tag-message rationale flagged "the gate still fires on cold starts where the assistant didn't pick the model" — this task aimed at that residual cost.
- [[CORE-049]] — workflow token audit. Sized the always-loaded `/task` floor (~5,076w SPEC.md + task SKILL.md combined) and motivated subsequent trim work; the cold-load cost on a model-mismatch is part of this surface.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** De-scope.
  **Rationale:** The task's premise — a `UserPromptSubmit` hook that compares PLAN.md `[model]` against the active model and blocks before any skill body loads — assumes the hook can read the active session model. Verified against official Claude Code docs (https://code.claude.com/docs/en/hooks.md) and direct inspection of session JSONL files: the `UserPromptSubmit` payload omits `model` / `model_id`. There is no documented session-state file or environment variable that exposes the live model, and `/model` switches do not write transcript entries. The transcript JSONL does record `message.model` on assistant entries (verified at `~/.claude/projects/<project>/<session>.jsonl`), but that schema is undocumented and only populated *after* an assistant response — i.e. empty on cold start, which is exactly the canonical post-closure flow `/clear → /model X → /task NEXT`. Settings.json `model` is the session-default, not the live value. Best-effort detection (transcript-tail + settings.json fallback) was an option, but the user judged the residual-correctness-gap + maintenance cost not worth the savings; closing as not-viable is the right call.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — file paths cited in PLAN.md description (`/task` Step 1.5, `/new-project` for adopter propagation, PLAN.md `[model]` grep target) all accurate at HEAD; no drift in the task framing itself
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### UserPromptSubmit hook payload (verified)

Per Claude Code docs at https://code.claude.com/docs/en/hooks.md, the hook receives JSON on stdin with: `session_id`, `transcript_path`, `cwd`, `permission_mode`, `hook_event_name`, `prompt`. **No `model` field.** Confirmed via the `claude-code-guide` agent.

Blocking semantics: exit code 2 with stderr message → prompt is erased from context entirely (not just hidden from Claude — the slash-command never expands, the skill body never loads). On a successful block the savings are real: ~1,895w (SKILL.md auto-load) + ~906w (PLAN.md Read in Step 1) + ~400w (lazy model fragments on mismatch) ≈ ~3,200w plus generated thinking tokens. Lower than the ~5,000w floor sized in CORE-049 because SPEC.md does *not* auto-load with the skill — confirmed by inspecting this very session's loaded context (only SKILL.md auto-loads on `/task`).

### Active-model detection — workarounds explored

1. **Transcript JSONL tail.** Each assistant entry has `message.model` (e.g. `"claude-opus-4-7"`). Verified by inspecting `~/.claude/projects/-Users-fakeneuron-Code-flowtron/8692c8e4-d867-4ba4-b71c-7a042ae86fd6.jsonl`. Schema is *undocumented* per Anthropic, so any hook depending on it ships fragility. Worse: the file is empty / brand-new immediately after `/clear`, which is exactly when the canonical post-closure flow fires `/task <NEXT-ID>`.
2. **Session state file.** None documented at `~/.claude/sessions/<session_id>.json` or equivalent. `/model` switches don't write transcript entries either (verified by grep across project transcripts).
3. **Environment variables.** `$CLAUDE_CODE_SESSION_ID` is exported; `$ANTHROPIC_MODEL` is an *input* (CLI default), not a live value. No `$CLAUDE_MODEL` / `$CLAUDE_ACTIVE_MODEL` exists.
4. **Settings.json `model`.** Top-level field is the session *default*, not the live value. `/model sonnet` mid-session does not modify the file. So a settings.json read sees the default, not the override — silent miss on the canonical 3-step flow whenever the user's `/model` switch differs from their default.

The best achievable hook would be: tail the transcript for the most recent `message.model`; fall back to `~/.claude/settings.json` `model` on empty transcript. Catches the steady-state mid-session case and the cold-start case where the user's `/model` matches their default. Misses the cold-start case where `/model X` differs from settings-default (e.g. user defaults to opus but did `/model sonnet → /task <opus-tagged>`). Step 1.5 in the skill would still need to stay as defense-in-depth.

### Why de-scope (not best-effort)

Three factors, walked with the user:

1. **The miss case is the canonical flow.** The post-closure `/clear → /model X → /task NEXT` runs on cold start. Any user who has settings-default ≠ their preferred per-task model (legitimate setup — opus default + occasional sonnet for mechanical tasks) hits the miss path on most invocations. The hook would be a band-aid that fails in the most common scenario.
2. **Maintenance cost on undocumented surface.** The transcript JSONL schema is not part of Claude Code's public contract. A Claude Code update could rename `message.model`, restructure the file, or stop writing assistant entries that way. Flowtron would then ship a silently-broken hook into adopter projects until someone notices.
3. **Step 1.5 already works.** It costs ~3,200w of context on mismatch, which is meaningful but not catastrophic. The current behavior is correct, well-tested, and adopter-propagated. The hook would add deployment complexity (per-adopter `.claude/settings.json` merge logic in `/new-project`) for a partial improvement. Marginal value vs. real cost.

### Adopter-propagation analysis (deferred — N/A on de-scope)

Briefly mapped the propagation problem before de-scoping (in case it informs future revisits):
- Hook script could ship at `claude/hooks/task-model-gate.sh` and symlink into `<adopter>/.claude/hooks/` analogous to existing command/skill symlinks (no precedent for this in flowtron — no `claude/hooks/` directory exists today).
- `.claude/settings.json` `hooks` config can't symlink in from a submodule path; the file must live in the adopter root. `/new-project` would need to write or merge it (new capability — current `/new-project` only writes `_project/PLAN.md`, `_project/tasknote/`, and appends to `CLAUDE.md`).
- Bumping flowtron in already-adopted projects would need a one-shot to install the hook+settings entry. Adopters of v1.x today would see no automatic change.

Net: nontrivial new surface, three new files (`claude/hooks/task-model-gate.sh`, settings.json fragment in `claude/CLAUDE-snippet.md`, an entry in MIGRATION.md), and a step in `/new-project` — all paying for a correctness-gap-leaving improvement. User agreed: not the right tradeoff.

### Archive skim

- **[[CORE-046]]** (v1.1.0 post-closure `/model` + recap-only, 2026-05-07) — direct ancestor. The v1.1.0 tag message explicitly noted "the gate still fires on cold starts where the assistant didn't pick the model"; CORE-058 was filed to close that residual gap. Findings here invert the conclusion: the gap is structural at the Claude Code platform layer, not at the flowtron layer.
- **[[CORE-049]]** (workflow token audit, 2026-05-08) — sized the always-loaded `/task` floor at ~5,076w (SPEC.md + task SKILL.md). This task's nominal savings (~3,200w on mismatch) sits in that surface. Audit's core finding ("the wins land on sibling surfaces, not the always-loaded `/task` floor") is reinforced here: the `/task` floor is hard to trim further without platform-layer changes.
- **[[CORE-042.9]]** (SKILL-side lazy-load, 2026-05-07) — established the lazy-load pattern that already minimizes the model-edge-case context cost (`SPEC/model.md` and `step-1.5-model-edge.md` only load on mismatch/legacy). Step 1.5 today is already the leanest skill-side design; the only further reduction was the (now de-scoped) hook.

### Pre-de-scope walk-with-user

Surfaced four options via AskUserQuestion: (1) best-effort hook + Step 1.5 fallback, (2) re-scope to skill-side tightening, (3) de-scope as not-viable, (4) park as blocked. User chose (3) and explicitly skipped both adopter-propagation and `/micro-task`-extension follow-ups.

## 🛠️ Phase 2: Execution

- [ ] N/A — de-scoped at Phase 1 per SPEC §"📝 Phase 1: Discovery" ("De-scope jumps directly to Phase 4 closure")

**Implementation Notes:** Skipped on de-scope.

## 🧪 Phase 3: Testing & Linting

- [ ] N/A — de-scoped at Phase 1

**Testing Notes:** Skipped on de-scope.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
  - `README.md` — **no change.** Public-facing repo overview is silent on model-gate internals.
  - `SPEC.md` — **no change.** No workflow contract modification (Step 1.5 stays as-is in `task` SKILL.md; SPEC §"Post-closure protocol" + `SPEC/model.md` unchanged).
  - `docs/MIGRATION.md` — **no change.** No adoption-procedure modification (no new files to symlink, no settings.json step added).
  - `claude/CLAUDE-snippet.md` — **no change.** Adopter paste-block unaffected.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

De-scoped at Phase 1. The premise — a `UserPromptSubmit` hook that compares PLAN.md `[model]` against the active session model and blocks before any skill body loads — is not viable on current Claude Code: the hook payload omits `model`, and no documented session-state file, environment variable, or stable transcript schema exposes the live model. The best achievable workaround (tail the undocumented assistant-message JSONL + fall back to settings.json default) misses the canonical post-closure flow `/clear → /model X → /task NEXT` whenever the user's `/model` switch differs from their settings-default — which is precisely the cold-start case this task aimed at. Adopter propagation would also have required new surfaces (`claude/hooks/`, settings.json merge logic in `/new-project`, MIGRATION.md step) for a correctness-gap-leaving improvement.

Step 1.5 in `claude/skills/task/SKILL.md` stays as the canonical model gate. Cost on mismatch is ~3,200w of pre-switch context (SKILL.md auto-load + PLAN.md read + lazy `SPEC/model.md` + `step-1.5-model-edge.md`) plus generated thinking tokens — meaningful but not catastrophic, and structurally as lean as the skill-side design can get post-[[CORE-042.9]] lazy-load.

**Revisit conditions:** if Anthropic adds `model` to the `UserPromptSubmit` payload, or publishes a stable session-state surface (env var or documented JSONL schema), file a follow-up. The Step 1.5 surface is already lean, so the revisit cost is low — porting the existing logic into a hook script is a small task once the platform supports reliable detection.

**Doc-drift canary:** clean. No AI-referenced doc updates required.

**Archived:** 2026-05-09
