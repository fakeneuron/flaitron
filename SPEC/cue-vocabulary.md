# Operator-cue vocabulary

> Lazy-loaded SPEC module. The canonical operator-facing cue inventory — glyphs, labels, and emission shapes — loaded when composing or interpreting a cue, or when proposing a change to the vocabulary. See [`SPEC/gates.md`](gates.md) for the gate machinery that *fires* these cues, and [`SPEC.md`](../SPEC.md) for the always-loaded core spec.

This module is **reference**: the single source skills emit from and adopters
read. The decisions that consult it — when a banner fires, what a flag
suppresses, when a run parks — are gate machinery and live in
[`SPEC/gates.md`](gates.md). Split out by [[CORE-535.5]] for exactly that
reason: a run loads `gates.md` at a decision point and needs the skip rule and
the flag matrix, not the full glyph inventory.

One cue is deliberately **not** here. [`SPEC/gates.md`](gates.md)
§"Destructive-action escalation" stayed
in [`SPEC/gates.md`](gates.md) because it is machinery, not vocabulary — the
one bounded exception to the two-banner cap, tied to a concrete command about
to execute.


The canonical set of operator-facing cues — the single source skills emit
from and adopters read. Codified from CORE-254.2's vocabulary deliverable;
`SPEC.md` core carries a compact at-a-glance glossary that points here for
the full contract.

**Labeling convention.** Every operator cue is `<glyph> <UPPERCASE-LABEL>` —
a dedicated glyph paired with a short UPPERCASE word label. The label is
load-bearing, not decorative: if an agent surface fails to render the emoji
(or strips it), the UPPERCASE label still names the cue in plain text. The
glyph is the fast-scan signal; the label is the cross-agent fallback. (The
fallback *mechanics* and per-agent render/emit verification are
CORE-254.5's deliverable — see [`docs/AGENT-COMPAT.md`](../docs/AGENT-COMPAT.md).)

**Casing rule.** Labels are UPPERCASE single words (or tight compounds);
glyphs are single code points (a trailing VS16 for emoji presentation is part
of the glyph, not a second symbol). Each glyph is unique across the table — no
glyph carries two meanings.

## Glyph layers and reuse

Flowtron emits glyphs on three layers, and the uniqueness rule above is scoped
to the **first** one:

1. **Operator cues** — this vocabulary (the tables below). Uniqueness
   enforced here.
2. **Tasknote structure** — body-section headings and nav-header status chips
   ([`SPEC.md`](../SPEC.md) §"Tasknote body shape").
3. **Model tier** — 🔧 / 🧩 / 🧠 / 🔭 ([`SPEC/model.md`](model.md)).

**Cross-layer reuse is permitted when the two meanings are semantically
coherent, and is not a collision.** A heading is not a cue and a chip is not a
cue, so a glyph appearing on two layers still carries one meaning per layer.
Context disambiguates: position (H2 heading vs. nav chip vs. conversational
line) resolves which layer is speaking. The reuses in service today are
deliberate:

| Glyph | Layer 1 (cue) | Layer 2 / 3 |
|---|---|---|
| 🧩 | `MEDIUM` next-task | `## 🧩 Subtasks` heading · `[medium]` tier |
| 🛠️ | Phase 1→2 banner | `## 🛠️ Phase 2` heading |
| ✅ | phase / closure-complete marker | `## ✅ Acceptance` heading · `✅ Completed` chip |
| 🟢 | `GO` commit-ask | `🟢 In progress` chip |
| 🌱 | — | `## 🌱 Starter context` heading · `🌱 Starter` chip |
| 🎯 | — (**not a cue**; the purpose blurb) | `## 🎯 Goal` heading |
| 🔧 / 🧠 / 🔭 | `LIGHT` / `HEAVY` / `XHEAVY` next-task | `[light]` / `[heavy]` / `[xheavy]` tier |

Every row above is *coherent* reuse — the cue and the structure name the same
underlying concept (the 🛠️ banner approves entry into the phase the 🛠️
heading names). Reuse across *unrelated* concepts is not permitted; that would
be a genuine collision.

The 🎯 row is the one entry with an **empty layer-1 cell**, and that is the
point. The purpose blurb ([`SPEC/purpose-blurb.md`](purpose-blurb.md)) emits 🎯
conversationally — the position an operator cue would occupy — while being no
cue at all: it bears no obligation, accepts no reply, and gates nothing. It is
listed here rather than left silent so that the glyph is documented at the
surface it is emitted from; it is deliberately **not** listed in
§"Event cues" / §"Inline asks" below, because the cue tables are for cues, and adding
to it is a vocabulary change of the kind CORE-254.2 / CORE-308 / CORE-353.3
each deliberated. The reuse is coherent by the same rule as every other row:
the blurb *is* the Goal, spoken instead of filed.

**Non-cue glyphs.** A small residual sits outside all three layers — ⚡
(`--fast` active), 🔬 (`--debug` active), 🧭 (deep pre-pass), 🌳 (worktree
/ `## 🌳 Fan-out` heading), 🔁 (`## 🔁 Iterations` log), 🔄 (`## 🔄 Handoff`),
📌 (sidequest), 📋 (spec template), ⚠️ (inline advisory). These are
**legitimate and bounded**: each is scoped to one skill or template, none
collides with a cue, and none carries operator-gate meaning. They are not
governed by this table and do not need to be. Adding to this residual is a
local decision for the owning skill; adding to the **cue table** is a
vocabulary change and needs the deliberation CORE-254.2 / CORE-308 /
CORE-353.3 each gave it.

## Event cues (inline operator prompts)

Default emission shape is an **inline prefix** on the conversational line —
never a banner by default. Event cues take the plain prefix shown in the
Example column below; the obligation-bearing inline *asks* (👁️, and 🟢 when
standalone) take the emphasized variant instead — see §"Emphasized inline ask
shape".

| Cue | Glyph | Label | Fires when | Example |
|---|---|---|---|---|
| DB-command | 🗄️ | `DB` | The operator should run a database / migration / schema command | `🗄️ DB: run \`alembic upgrade head\` to apply the migration` |
| Executable / run | ▶️ | `RUN` | The operator should run a generic or agent-adjacent command (build, test, script, server start) — not a DB command, not NAS-bound, not operator-TTY-bound | `▶️ RUN: \`npm run build\`, then verify the bundle output` |
| NAS-command | 📡 | `NAS` | The operator should run a command on the NAS (not the agent shell, not the local TTY) | `📡 NAS: \`docker compose pull && docker compose up -d\` on the NAS` |
| TTY-command | 💻 | `TERM` | The operator should paste a command into their own TTY (not the agent shell, not the NAS) | `💻 TERM: paste \`ssh nas\` into your TTY` |
| User-action | ✋ | `ACTION` | The operator must perform a manual, non-command action (paste a secret, click a link, approve out-of-band) | `✋ ACTION: paste your API key into \`.env\` before continuing` |

Command destination is the split among ▶️ / 📡 / 💻: ▶️ RUN is the
generic/workspace default; 📡 NAS and 💻 TERM fire only when the command
must run on the NAS or be pasted into the operator's TTY. ✋ ACTION stays
the non-command manual step (a secret, a click, an out-of-band approve) —
pasting a *command* into the TTY is 💻 TERM, not ✋ ACTION.

A destructive 🗄️/▶️/📡/💻 action MAY escalate from inline prefix to a banner — see
[`SPEC/gates.md`](gates.md) §"Destructive-action escalation". ✋ ACTION never escalates (it is a
manual operator step, not an assistant-executed command).

## Inline asks (existing cues, carrying word labels)

The existing inline asks adopt the same glyph+label convention for cross-agent
non-render survival (CORE-254.2 §2 retrofit). Glyphs are unchanged; the
UPPERCASE label is the addition. Wiring these labels into each emission site is
CORE-254.4 — this contract fixes the canonical label.

| Cue | Glyph | Label | Shape | Notes |
|---|---|---|---|---|
| Commit-go | 🟢 | `GO` | inline ask prefix (**emphasized** when standalone) | The single commit-go approval. Emission example: `Reply commit / go to land.` Accepted replies: closed set in §"Accepted gate replies" (`commit` / `go` / `yes` and the other explicit commit verbs named there). Normally bundled inside the 📦 banner, inheriting its salience; when emitted standalone it takes the emphasized shape below |
| Visual-confirm | 👁️ | `CONFIRM` | **emphasized** inline ask | Visual-confirmation ask; see "Emphasized inline ask shape" below. **Covers "visit / open a URL to confirm"** (e.g. `👁️ **CONFIRM** — does the new outline look right at http://localhost:5120?`) — there is no separate visit-URL cue. Accepted replies: conversational assent in §"Accepted gate replies" |
| Audit-family flag | 🔍 | `AUDIT` | inline next-move flag | Prefixes `/ft-audit*` next-move + copy-paste lines |

### Emphasized inline ask shape

👁️ `CONFIRM` is the only cue that **gates task completion** — the work cannot
be called done until the operator answers — while carrying no structural
emphasis. 🛠️/📦 get banner rules; a destructive 🗄️/▶️/📡/💻 escalates to a banner;
🏁/✅ are state markers that need no answer; ✋ `ACTION` is out-of-band and
does not block the assistant; 🟢 `GO` normally rides inside 📦. That left 👁️
alone: an obligation-bearing ask with the emission shape of an aside.

The fix is **structural, not chromatic** — the ask blends in because it has no
line of its own, not because it lacks color (a terminal may render neither).
Emit it on **its own line, blank-line isolated, with the label bolded**:

```markdown
👁️ **CONFIRM** — <the question>
```

Concretely:

```text
Ran lint and the targeted suite on the changed files; all clean.

👁️ **CONFIRM** — does the new outline render correctly at http://localhost:5120?
```

Three properties, each doing work: the **blank lines** lift the ask out of the
surrounding prose, the **bold label** survives monochrome as weight rather than
hue, and the **UPPERCASE label** survives non-render (§"Labeling convention").

**Bound — this is not a banner.** No `---` rules, no `AWAITING APPROVAL`
label, no preview line. Emphasis was raised *within* the inline-ask shape
precisely so 👁️ would not need promoting ([`SPEC/gates.md`](gates.md)
§"Operator-gate cues" → the two-banner cap). Reading this section as license to render 👁️ as a banner
block inverts its purpose.

**Applies to 🟢 `GO` when standalone.** A commit-go emitted outside the 📦
bundle is an obligation-bearing ask with no banner to inherit from, so it takes
the same shape. Inside 📦, the banner already carries it.

**Flags are out of scope here.** `--fast` suppresses the ask and
`--unattended` converts it to a park ([`SPEC/gate-postures.md`](gate-postures.md)
§"Flag precedence and surface matrix").
Neither emits an ask, and this section governs only the asks actually
emitted.

## Accepted gate replies

Two layers. This section is the cite-once owner; skills point here rather
than forking a third token list.

**Closed commit-go set** — 📦 ready-to-commit and standalone 🟢 `GO`.
Accepted replies are `commit`, `commit it`, `go`, `yes`, `y`, `yep`,
`yeah`, `ship`, `ship it`, `land`, `land it`, `approved`, and `do it`
(case-insensitive; surrounding punctuation ignored). This is the named set —
widened by CORE-536 from `commit` / `go` / `yes` to the explicit commit verbs
an operator actually types, and still closed. `ok` / `okay` and
`looks good` / `lgtm` are **not** members: `okay` is too weak to authorize a
commit, and `looks good` / `lgtm` are already the natural 👁️ `CONFIRM`
replies — promoting them would let a visual confirmation bind as commit
authorization. The emission example stays `Reply commit / go to land.`;
every other member is accepted even when the prompt does not print it.

**Conversational assent** — 🛠️ Phase 1→2 and 👁️ `CONFIRM`. Any clear
proceed reply counts, including `go`, `okay`, `looks good`, `yep`, and
`lgtm`. These cues ask whether the plan or UI is right, not whether to
land a commit. Do **not** wait for a token from the closed commit-go
set; that under-accept is the failure this clause exists to stop. The
examples are not a closed list.

`go` and `yep` sit in both layers on purpose. The split is per-cue (see
[`docs/GATE-DISCIPLINE.md`](../docs/GATE-DISCIPLINE.md) §"Rationalizations": approval is per-cue, not ambient), not per-word.

**Destructive-action banners are out.** They remain a safety control
(`--fast` does not suppress them) and are **not** covered by
conversational assent. `okay` / `looks good` do not approve a
destructive command.

## Landmark cues (reaffirmed — unchanged glyphs)

The two approval banners and the two inline state markers keep their existing
glyphs and label text.

| Cue | Glyph | Label / marker text | Shape | Notes |
|---|---|---|---|---|
| Phase 1→2 exit | 🛠️ | `AWAITING APPROVAL — Phase 2: Execution ready` | Banner | [`SPEC/gates.md`](gates.md) §"Operator-gate cues" |
| Ready-to-commit | 📦 | `AWAITING APPROVAL — Ready to commit` | Banner | [`SPEC/gates.md`](gates.md) §"Operator-gate cues" |
| Committed | 🏁 | `<TASK-ID> — committed <sha>` | Inline state-marker | **Carries the 1-2 sentence accomplishment summary** — the recap is anchored here, not a separate cue. Emit **only** after a real closure commit whose paths cover deliverables per [`SPEC.md` §"Paper-complete guard"](../SPEC.md) — never without a SHA, never on PLAN/archive-only when Acceptance required code/docs |
| Phase/closure complete | ✅ | `Phase 1 … complete` / `Closure complete; committing autonomously …` | Inline marker | — |

## Next-task cues

| Cue | Glyph | Label | Shape |
|---|---|---|---|
| Light next-task | 🔧 | `LIGHT` (mechanical) | Next-move suggestion + copy-paste line |
| Medium next-task | 🧩 | `MEDIUM` (moderate) | Next-move suggestion + copy-paste line |
| Heavy next-task | 🧠 | `HEAVY` (design) | Next-move suggestion + copy-paste line |
| Xheavy next-task | 🔭 | `XHEAVY` (exploratory — manual-only) | Next-move suggestion + copy-paste line |
| In-session next-task | 👇 | `HERE` (run here — do not clear) | Copy-paste label line, context-dependent skills only |

The bare 🔧/🧩/🧠/🔭 glyphs are the emitted form in next-move suggestions; the
optional `LIGHT`/`MEDIUM`/`HEAVY`/`XHEAVY` labels are the non-render fallback.
The four **mirror the model tier ladder 1:1** (`[light]`→🔧, `[medium]`→🧩,
`[heavy]`→🧠, `[xheavy]`→🔭; concrete tokens bucket to their inherent tier — see
[`SPEC/model.md` §"Tier ladder vs. the next-move suggestion glyph"](model.md)).
A 🔭 candidate is rare by design — `[xheavy]` is an operator-only filing, never
a chooser default ([`SPEC/model.md`](model.md) §"Category-vs-concrete
matching"). All four also serve as tier glyphs, and 🧩 additionally heads the
`## 🧩 Subtasks` section — coherent cross-layer reuse, not a table collision
(§"Glyph layers and reuse").

👇 (`HERE`) replaces the model glyph on the copy-paste **label line** when the
next-skill is context-dependent (`/ft-file-followup` in any mode /
`/ft-epic-discovery` — clearing the session destroys the context they draw on).
It signals *where* to run, not task weight: the 🔧/🧩/🧠/🔭 model signal stays on
the candidate line just printed above.
