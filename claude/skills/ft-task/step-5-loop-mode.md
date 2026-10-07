# Loop mode — goal-loop drive (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `task` SKILL.md Step 0 when `--loop` is present in `args`. Carries the whole of loop mode: the scaffold addendum (§Step 3b), the Phase 1 verify-command rule (§Step 4), the Phase 2↔3 loop body (§Step 5), and the one-time post-loop 👁️ ask (§Step 6). The contract it drives is `SPEC/loop.md` — **Read it alongside this fragment**; treat it as authoritative when this file is silent or in tension. See `claude/skills/ft-task/SKILL.md` for the always-loaded core flow.

The value prop: some work is *converge-until-a-check-passes* rather than *do-it-once*. A goal loop repeats execute→verify against a fixed, **machine-checkable** Acceptance target until every check passes, a budget (`loop-max`) is exhausted, or a per-cycle relevance check says stop. All of it lives in a normal tasknote using `templates/tasknote-template.md` — plus three additive loop frontmatter keys and a `## 🔁 Iterations` log. No custom template, no replacement phases, no new gate banners: the loop *collapses* gates rather than adding them (§Step 5).

Loop mode changes the **Phase 2↔3 drive** and one Phase 1 obligation. Path resolution, locate, the model gate, pre-flight, scaffold/promote/resume routing, Phase 4 closure, and the post-closure protocol are byte-identical to a plain `/ft-task` run. `--fast` is largely redundant here — the loop already runs with `--fast` semantics once it starts — and reaches only the pre-loop Phase 1 surface. `--unattended` composes as on any run; the loop-specific conversions are named in `unattended-mode.md` §"Conversion map" and repeated at the step where each fires. `--debug` composes too, but a goal loop assumes the target is known and verifiable while debug mode assumes it must be discovered first — pairing them is rarely right.

**When to reach for `--loop`.** The "done" signal is one or more machine-checkable commands: drive a flaky suite to green, iterate a perf number under a threshold, satisfy a linter/type-checker across many sites, make a fuzzer/property test stop finding cases. Plain `/ft-task` (or `/ft-micro-task`) covers one-pass feature work, refactors with a clear diff, and anything with no repeatable verify command to loop on.

## Step 3b — scaffold addendum (fresh scaffold only)

After copying the template, apply the loop shape per `SPEC/loop.md`:

1. **Add the three additive frontmatter keys** to the YAML block:
   ```yaml
   loop: true
   loop-max: <N>          # hard iteration ceiling; ask the operator, default 10
   loop-last-run:         # set to the date of the last cycle once the loop runs
   ```
   Additive per the write-once policy — legacy/non-loop tools ignore them.
2. **Inject a `## 🔁 Iterations` section** between `## 🧪 Phase 3` and `## 🚀 Phase 4`, per `SPEC/loop.md` §"`## 🔁 Iterations` log":
   ```markdown
   ## 🔁 Iterations

   <!-- one append-only line per cycle:
   - **1** · relevance: proceed · verify: ✅ pass · committed `<sha>`
   - **2** · relevance: proceed · verify: ❌ fail (<what>) · no commit → retry
   - **N** · relevance: stop (<reason>) · loop terminated -->
   ```
3. `loop-max` is asked at scaffold or during Phase 1 (default 10) — the runaway backstop, independent of the relevance gate.

On the 3a promote and 3c resume paths, add the keys + section only if absent; a loop that parked mid-cycle resumes at Step 5 with the `## 🔁 Iterations` log as its memory. The 🎯 purpose blurb at Step 1 names the loop — the operator is about to watch an execute→verify cycle rather than a single pass — but not the `loop-max` budget, which is asked here.

## Step 4 — Phase 1: the verify-command rule

Work the Phase 1 checklist exactly as a plain run (the 🛠️ exit gate is a **one-time pre-loop event**, not re-run per cycle). Loop mode adds one obligation while populating `## ✅ Acceptance`:

Every criterion must be **loop-verifiable** — it carries a verify command: a concrete shell / test invocation whose exit status (or a grep on its output) is the pass/fail signal. The union of all verify commands passing **is** the termination condition. Record each criterion with its command inline:

```markdown
## ✅ Acceptance

- [ ] All unit tests pass — `npm --prefix viz test`
- [ ] No type errors — `npm --prefix viz run typecheck`
- [ ] Endpoint returns 200 for the happy path — `curl -sf localhost:8000/health`
```

**Taste criteria → one-time 👁️ ask (split out of the loop).** A criterion only judgeable by eye — visual polish, "reads naturally", subjective UX — is not loop-verifiable. Do not fake a command for it. Move it to a clearly marked **`### 👁️ One-time visual checks (outside the loop)`** subsection under Acceptance; it is checked once, after the loop converges (§Step 6), never inside the cycle.

**Relationship to the plain rule.** A plain `/ft-task` run carries a deliberately weaker form (SPEC §"🧪 Phase 3": name the command *where one exists*, mark the rest `judgment`). The strict form here is what makes the loop terminable, so do not relax it — a task that cannot meet it is not stuck, it is a plain `/ft-task`.

**Edge case — no machine-verifiable criteria.** If *every* criterion is taste-only, this is not a goal loop — there is nothing to converge on. Stop and tell the operator to drop `--loop` (a plain run with a Phase 3 👁️ confirmation). Do not enter the loop. Under `--unattended` this is a wrong-flag stop with nothing yet worth preserving, so report it and halt without parking.

Set `loop-max` here if not set at scaffold (default 10). Populate `## 🧩 Subtasks` with the ordered per-cycle work and declare YAML `touches:` as usual.

**When `fast-mode = true`:** write the verify commands + the taste-split directly, skipping extra AskUserQuestion pauses (the operator asserts the Acceptance shape).

## Step 5 — Phase 2↔3: the loop body (inline, self-paced)

Instead of running Phase 2 then Phase 3 once, **iterate the execute→verify cycle inline** until convergence, budget exhaustion, or a relevance stop, per `SPEC/loop.md`. The loop is autonomous by construction, so it runs with **`--fast` semantics** (`SPEC/loop.md` §"Gate collapse") regardless of whether `--fast` was passed: 📦 → commit-per-verified-iteration; 👁️ → suppressed inside the loop (taste criteria were split to the one-time post-loop ask); 🛠️ → the one-time pre-loop event already behind you.

**Per-cycle procedure** (repeat until a termination condition):

1. **Per-cycle relevance gate** (`SPEC/loop.md` §"Per-cycle relevance gate"). Before doing work, ask: *is another iteration still the right work?* Terminate cleanly (not a failure) if: all Acceptance verify commands already pass (goal met — the normal clean exit); the intended change is empty / a no-op; or Discovery-level assumptions no longer hold (the target moved → hand back to the operator).
2. **Execute (Phase 2).** On the **first** cycle, do the pattern survey before the first edit. Each cycle makes the **minimal** change targeting the currently-failing verify command(s). The minimal refactor gate applies unchanged.
3. **Verify (Phase 3).** Run the Acceptance verify commands (targeted — only what the change could affect, or the full set near convergence), plus lint/type-check and the **Verification receipt** on changed code — each command as `command → exit code` with the first failure line when non-zero. The per-cycle `## 🔁 Iterations` entry is the receipt's home inside the loop; Testing Notes carries the converged set.
4. **Commit-or-retry.**
   - **All pass** → commit autonomously (`feat: <TASK-ID> — <cycle summary>` or `fix:`/`chore:`), append a `## 🔁 Iterations` line with the sha, update `loop-last-run:` to today. If this pass means *every* Acceptance criterion is now green → converged; break to §Step 6.
   - **Any fail** → append a `## 🔁 Iterations` line noting the failure, **no commit**, and loop back to 1 with the failure as new evidence.
5. **Budget check.** If the cycle count reaches `loop-max` without convergence → **soft stop** (`SPEC/loop.md` §"max-iterations budget"): halt, record budget-exhaustion in `## 🔁 Iterations`, and **hand the tasknote back to the operator** — not auto-parked, not auto-closed; the operator raises the budget, re-scopes, or parks. Never silently keep going past `loop-max`. This is not an `--unattended` conversion: the budget stop is the same hand-back either way.

**Destructive-action carve-out (does NOT collapse).** A cycle that needs a destructive or irreversible command — a migration, `git push`, `rm`, a release step — cannot fire a blocking banner into an autonomous loop, so **park the tasknote via `status: blocked`** (Read `SPEC/blocked.md`, flip status, update the nav header to `⏸ Blocked`, log the reason in `## 🔁 Iterations`) and stop. The operator resumes with the destructive step under a real gate (Step 3c). **When `unattended-mode = true`**, also write `park-reason: destructive — <the command>` so a caller reading the file alone can classify the stop; a prerequisite ✋ `ACTION` parks the same way as `prerequisite`.

**Hard dependency mid-loop.** Same as a plain run — Read `SPEC/blocked.md` and park, writing `park-reason: dependency — <the dependency>` (mandatory under `--unattended`, recommended otherwise). The `## 🔁 Iterations` log preserves the loop's memory across the park.

## Step 6 — one-time taste checks, then closure

Once the loop converges (all Acceptance verify commands green):

1. **One-time taste checks.** If Phase 1 split any criteria into `### 👁️ One-time visual checks`, surface them now as a single emphasized `👁️ **CONFIRM**` prose ask — own line, blank-line isolated, bold label per SPEC/cue-vocabulary.md §"Emphasized inline ask shape" (suppressed when `fast-mode = true`, where the operator owns visual confirmation). This is the *only* 👁️ ask in the whole run. **When `unattended-mode = true`** the suppression does not apply — park here with `park-reason: visual-confirm — <the split-out criteria, and where to look>` and stop before Phase 4. A converged loop is not a finished task while a taste criterion is unchecked.
2. **One-time External review.** Run SPEC.md §"🧪 Phase 3" → "The external review" now, once, against the converged diff — never per cycle, for the same reason the taste checks were split out: the loop's termination condition is its verify commands, and a grader that re-reads the whole diff every iteration is not one of them. The per-cycle `## 🔁 Iterations` entries stay receipts; this grade goes in Testing Notes with each finding's disposition. A **blocker** re-opens the loop rather than closure — fix it in a further iteration and re-converge; under `unattended-mode` one the run cannot fix parks `park-reason: input-needed — <the blocker>`, exactly as the taste-check park above stops a converged-but-unfinished run. Suppressed by neither `--fast` nor `--unattended`.
3. **Phase 4 closure and the post-closure protocol run exactly as `/ft-task` Steps 5–6.** Two loop-specific notes: a soft stop at `loop-max` closes with the unmet criteria annotated, never silently unticked; and because the loop ran under `--fast` semantics, the closure commit routes to the Skip branch behind the `✅` marker as on any `--fast` run. Per-cycle commits are intermediate — the closure commit still lands PLAN/archive under the paper-complete guard.

**Recap addition.** The evidence-based recap states the convergence: how many iterations ran, which verify target closed the loop, and (if applicable) that `loop-max` was hit or a taste check remains for the operator.
