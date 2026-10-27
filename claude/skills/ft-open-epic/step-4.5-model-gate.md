# Step 4.5 — `.1` model gate + resume entry (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `ft-open-epic` SKILL.md Step 1.5 when `$ARGUMENTS` carries a filed `<AREA>-<N>.1` (§"Resume entry"), and by its Step 4.5 when the `.1` row's `[model]` verdict is anything but Satisfied (§"Step 4.5 — Model gate"). See `claude/skills/ft-open-epic/SKILL.md` for the always-loaded default flow, and `SPEC/model.md` §"Category-vs-concrete matching" for the tier ladder every verdict below reads.

The gate exists because Step 2 item 4 files a `[heavy]` or `[frontier]` epic's `.1` as `[frontier]` by rule. The operator is never asked, and the Steps 5–10 drive would otherwise run that Discovery on whatever model filed it. Filing is cheap and model-independent, while the Discovery is the expensive part, and every child inherits its output. So the seam sits after the Step 4 filing commit and before the Step 5 scaffold. A stop here leaves a clean tree, and the resume entry picks up from the filed rows on the right model.

## Step 4.5 — Model gate

Compare the `.1` row's `[model]` token with the active model per `SPEC/model.md` §"Category-vs-concrete matching". SKILL.md handles **Satisfied** (proceed silently to Step 5). The rest route here. The gate runs identically on a fresh run and on a resume, so it is idempotent: re-entering on the wrong model stops again.

### Category under-tier — STOP with a choice

The `.1`'s category tag outranks the active model's tier (e.g. a `[frontier]` `.1` on Opus). This is **stronger than `/ft-task`'s advisory** for the same verdict (`claude/skills/ft-task/step-1.5-model-edge.md` §"Category under-tier"). There, an operator filed the tag and could have chosen otherwise. Here, Step 2 chose it by rule a moment ago. STOP and offer two paths via AskUserQuestion:

1. **Stop and switch** (recommended). Print, then write nothing further and end the run with no scaffold:
   - The filing state: `committed <sha>` from Step 4. When Step 4 left the filing uncommitted, print a ✋ `ACTION` to commit it, or otherwise clean the tree, before re-invoking, because the resume runs the foreign-dirt gate. On a resume this run filed nothing, so print neither.
   - The pick for the tagged tier on the active platform. Read `docs/PLATFORMS.md` §"Tier × platform map" and print it per `SPEC/model.md` §"Effort recommendations" → "Printing a cell" (Claude Code `[frontier]` → `Fable @ high`). A ⚠️ cell adds the platform switch its note names. When the pick is the active model at a higher effort, the fix is the effort setting, not `/model`.
   - The re-entry line on its own, as inline code with no trailing punctuation: `` `/ft-open-epic <AREA>-<N>.1` ``, with ` --deep` appended when `deep-mode = true`.
2. **Proceed here** on the active model. **The `.1` tag stays as filed.** The ladder labels the task's cognitive load, not the model, and the tag feeds nothing downstream (children seed from the *epic* token), so it should stay a true record that the Discovery was frontier work. Once Step 5 has scaffolded the note, write one line into its Discovery Notes: `Ran under-tier on <active model> by operator choice at the Step 4.5 gate.` Then continue at Step 5.

An **`[xheavy]` `.1`** (filed from an `[xheavy]` epic) always lands here, as it does in `/ft-task`. Proceeding is the expected choice in that manual-only territory.

### Concrete mismatch

The `.1` carries a concrete token (e.g. `[fable]`, from a concrete epic token) and the active model is a different concrete model. Read `<root>claude/skills/ft-task/step-1.5-model-edge.md` and follow its §"Mismatch" unchanged, with `<SKILL>` = `/ft-open-epic` and `<TASK-ID>` = the `.1`. Its option 1 re-invocation *is* the resume entry: print it ID-first as `` `/ft-open-epic <AREA>-<N>.1` ``, with ` --deep` appended when `deep-mode = true`, because Step 1.5 resumes only when the ID leads. Print the filing state from option 1 above alongside it. Its option 2 retags the `.1` row's `[model]` in place, and that edit rides the Step 10 closure commit. Its "proceed to Step 2" reads as "continue at Step 5" here. A concrete tag is a pin, and a pin naming the wrong model is false rather than merely under-served. That is why this branch retags while the category branch keeps the tag.

### Legacy — no `[model]` on the `.1` row

This never happens on a fresh run, because Step 4 always writes a token. On a resume it can happen, since a hand-filed `.1` may lack one. Follow the same fragment's §"Legacy entry — PLAN.md `[model]` is absent (no `[model]` on the line)" to write a token into the `.1` row, then re-run this gate on it. The edit rides the Step 10 closure commit.

## Resume entry

`/ft-open-epic <AREA>-<N>.1 [--deep]` scaffolds and drives an already-filed, unstarted epic Discovery. Step 1.5 sets `resume-mode = true` when the first token matches `<AREA>-<N>.1`. A trailing `--deep` also takes Step 1.5's `--deep` bullet (set `deep-mode = true`, load its fragment); without it `deep-mode = false`. `--unattended` is refused there on both forms. The resume **replaces Steps 2–4 and Step 1's scope check**. Nothing is filed and no filing commit is made.

1. **Pre-flight.** Step 0 and Step 1's first two bullets run as usual (PLAN.md exists; foreign-dirt gate). Step 1's single-task-scope check is skipped because the rows already exist. Resolve **Area** now: look up the ID prefix in `.flaitron/tasknote/README.md` §"Archive layout" (never derived). No row → stop and ask. `<area>` below is that folder.
2. **Locate the rows.** Find the parent `**<AREA>-EPIC-<N>**` row and the `**<AREA>-<N>.1**` row nested under it. If either is missing, stop and ask. Do not invent an entry. If the `.1` row is checked, the parent is checked, either row sits under `## Completed`, or `.flaitron/tasknote/archive/<area>/<AREA>-<N>.1.md` exists, the Discovery is already closed. **Stop. Do not scaffold**, the same non-negotiable status gate `/ft-task` applies. Surface the conflict and ask whether a different ID was meant. No reply re-opens this ID.
3. **Refuse an existing note.** The resume only scaffolds and never adopts a note. If `.flaitron/tasknote/<AREA>-<N>.1.md` exists, stop. For `in-progress`, it is in flight: continue conversationally, or take `SPEC/blocked.md` §"Resuming an interrupted run" when the session that started it is gone. For `starter` / `blocked`, point at `/ft-task <AREA>-<N>.1`, which owns those lifecycles. For anything else, treat it as closed, as in step 2.
4. **Recover the locked inputs from the rows.** Print them in one plain line. There is no confirm, because the rows are the record:
   - **Area** — resolved in step 1; `<next-N>` is `<N>`.
   - **Shortname** — the parent row's `| <shortname>`.
   - **Epic model** — the parent row's `[model]`, which seeds Step 7's per-child tokens. The `.1` row's `[model]` is what Step 4.5 gates.
   - **Audit present** — whether a `**<AREA>-<N>.N**` row exists.
   - **Priority** — the section heading the parent sits under.
   - **M** — from the `.1` row's concrete range (`.2..4` → M=3), which Step 4 writes as numbers. When the row carries the literal `(M+1)` or a hand-written description, ask M in one AskUserQuestion.
   - **`related-tasks:`** — `[<AREA>-EPIC-<N>]` only. Step 2's predecessor IDs aren't recorded in the rows; the operator can add them in the note.
5. **Continue at Step 4.5** (normally Satisfied now), then Step 5 onward unchanged, with two readings. Step 6's Relevance rationale comes from the parent row's description and the operator, since no Step 1 conversation ran. Step 10's commit message takes the plain `.1` form, since the filing is already committed.

The resume cannot tell a post-STOP state from a hand-filed epic (parent, `.1` and `.N` rows written by hand), so it admits any filed, unstarted `.1`. `/ft-task <ID>.1` stays a valid way to run one too (`SPEC/epic.md` §"Epic lifecycle" step 2). It has none of this skill's `.1`-specific steps, and it applies only the advisory under-tier note.
