# Step 0 — Flag parse, conflict refusals, and mode dispatch (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `claude/skills/ft-file-followup/SKILL.md`
> Step 0 when `args` carries any `-`-prefixed token. Carries the flag walk, the
> two flag-conflict refusals with the shared `⏸ … stop` shape, and the three mode
> dispatches (`park-mode.md`, `starter-mode.md`, the unattended posture) with
> their inline markers. A flagless filing never reads it. See the host SKILL for
> the always-loaded flow.

`park-mode`, `starter-mode`, and `unattended-mode` were all initialized to
`false` by the host SKILL before this Read. Treat `args` as an **unordered flag
set** plus free text — recognize each token independently; order never matters.
Walk the tokens:

- **`--park` or `-p`** → set `park-mode = true`.
- **`--starter`** (no short alias) → set `starter-mode = true`.
- **`--unattended`** (no short alias) → set `unattended-mode = true`.
- **`--low` / `--med` / `--medium` / `--fut` / `--future` / `--high`** → a park-mode priority flag; strip and carry. Outside park mode these are meaningless — surface the usage notice below rather than silently ignoring them.
- **A `<AREA>-<NUMBER>` token** → the proposed task ID.
- **Any other `--`-prefixed token** → surface a one-line usage notice (``Unknown arg `<arg>`. Usage: `/ft-file-followup [TASK-ID] [--park [--low|--med|--fut|--high]] [--starter] [--unattended]`.``) and ask whether the user meant `--park`, a priority flag, `--starter`, `--unattended`, or the default flow. Do not proceed silently. **When `unattended-mode = true` there is nobody to ask** — emit the notice and stop, in the terminal shape below.
- **Remaining free text** → the idea text (park mode) or drafting context (default and starter flows).

**`--park` and `--unattended` do not compose.** Park mode preserves an operator's
tangential mid-session thought and resumes *their* interrupted work inline; both
halves presume an operator to have the thought. Refuse the combination terminally
rather than inventing an unattended park:

```markdown
⏸ --unattended stop — flag-conflict: `--park` presumes a present operator. Use the default flow to file the row; nothing written.
```

**`--starter` composes with neither `--park` nor `--unattended`.** A starter body
is AI-drafted rich context that exists to be reviewed, so it keeps the review
gate `--unattended` suppresses; and a filing writes one artifact, not a stub
and a starter. Refuse both terminally, in the same shape:

```markdown
⏸ --unattended stop — flag-conflict: `--starter` presumes a reviewer. Use the default flow to file the row; nothing written.
⏸ stop — flag-conflict: `--starter` and `--park` write different artifacts. Pick one; nothing written.
```

Every other terminal stop in the host SKILL takes the same
`⏸ --unattended stop — <cause>: <one line>` shape (`SPEC/gate-postures.md`
§"`--unattended` operator posture" → "Pre-scaffold stops"). `⏸` is the existing
nav chip, not a new cue glyph; the two-banner cap is untouched.

**When `park-mode = true`, Read `<SKILL_DIR>park-mode.md` now and follow it
instead of the host SKILL's Steps 2–5.** Park mode is a distinct filing contract — it keeps
Step 1a's pre-flight checks and this step's path resolution, then bypasses the
AskUserQuestion collection, the review gate, the downstream-impact reconciliation
scan, the conversational paragraph, and the Step 5 hand-off. It writes a stub at
`.flaitron/sidequest/<ID>.md` alongside the PLAN.md line, replies in ≤70 words,
and continues the interrupted work inline. It also runs **no `[unattended]`
candidacy** (host SKILL Step 3): the proposal is a review-gate motion and park has no
review gate; the row is judged when the stub is promoted or run. Emit the inline marker
`📌 --park active — no review gate, no reconcile scan; stub + PLAN line, then resume inline.`

**When `starter-mode = true`, Read `<SKILL_DIR>starter-mode.md` now** (it Reads
`<SPEC_DIR>starter.md` in turn) **and apply it as an overlay on the host
SKILL's Steps 2–5.** Starter mode is the same filing contract with a heavier artifact: Steps
1–1a, the collection, the review gate, the reconciliation scan, and the
pre-check / post-stage commit discipline all run as written here; the fragment
substitutes the `## 🌱 Starter context` body for the conversational paragraph,
the starter-file write plus the `Filed with starter at …` PLAN suffix for the
bare line, a two-path `chore: file <ID> starter` commit for the one-path one,
and the promotion hand-off for the default one. Emit the inline marker
`🌱 --starter active — every gate kept; starter file + PLAN line with pointer, then hand off.`

**When `unattended-mode = true`** the caller declares that **no operator is
present to answer a gate**. This skill has three: the Step 2 AskUserQuestion
collection, the Step 3 review gate, and — inside Step 3 — the reconciliation
scan's user-confirm. The posture suppresses the first two. It does **not**
suppress the third: `SPEC/gate-postures.md` §"What `--unattended` never relaxes" holds
the reconciliation user-confirm, so the scan still runs — and because the
confirm is unavailable rather than waived, an unconfirmed proposal is reported,
never applied. What authorizes the Step 4 commit without any operator act is the duty in `SPEC.md`
§"Deferred hand-off filing", not discretion — contract in
`SPEC/plan-filing.md` §"Filing commits" → "Unattended filing authority".
Emit the inline marker:

```markdown
⚡ --unattended active — no operator present: ID auto-allocated, collection + review gate suppressed, reconcile scan reports but applies nothing. Filing commits on the SPEC §"Deferred hand-off filing" duty.
```
