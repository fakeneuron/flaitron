# Gate discipline

> Lazy-loaded SPEC module. The historical excuse table and symptom list moved
> to [`docs/GATE-DISCIPLINE.md`](../docs/GATE-DISCIPLINE.md) ([[CORE-660]], after
> the [[CORE-659]] decay window). This module keeps the three section homes a
> new hatch still writes into, and the full text of §"Refused carve-outs",
> which [`SPEC/gate-postures.md`](gate-postures.md) deep-links.

[[CORE-659]] removed both live "read this before skipping a gate" triggers and
recorded window-start SHA `f8c44275`. [[CORE-660]] recounted the window on
2026-10-02: 34 tasknotes archived after that SHA. The string
`✅ Closure complete; committing autonomously` appears in one of them,
`archive/core/CORE-659.md`, inside the instruction that tells this task to
count it — not as an emitted closure line. No independent emitted marker, and
none of the 22 excuse rows or 22 symptom bullets, recurred in that record, so
the catalog is reference material now, not a skip-path load.

**This is prose, not a gate.** Nothing here is ticked, scored, or verified by
tooling. It exists because [`docs/VISION.md`](../docs/VISION.md) §"What we
won't accept" sets the standing remedy for recurring drift: *a sharper SPEC
clause, not a validator.* Reading a rationalization and recognizing your own
draft sentence in it is the entire mechanism.

Scope is [`SPEC/gates.md`](gates.md)'s surface — the two banners, the skip
rule, the flag matrix and precedence ladder, the destructive escalation, 🏁
emission, and accepted-reply matching. Shortcuts against the Phase 1 / Phase 3
checklists belong to [`SPEC.md`](../SPEC.md), not here.

A new escape hatch or gate-surface change still arrives with a matching
§"Rationalizations" row and a §"Red Flags" line in *this* file
([`SPEC/gates.md`](gates.md) §"Gate discipline — read before skipping a gate",
CORE-386/CORE-388). The historical catalog is not a second home for those rows.

## Rationalizations

No row in the pre-window catalog was observed again inside the decay window.
The 22 excuse/refutation rows live in
[`docs/GATE-DISCIPLINE.md`](../docs/GATE-DISCIPLINE.md) §"Rationalizations".
Add a new row in this table when [`SPEC/gates.md`](gates.md) gains an escape
hatch or a gate-surface change.

| The excuse | Why it's wrong | Refuted by |
|---|---|---|

## Red Flags

No symptom in the pre-window catalog was observed again inside the decay
window. The 22 observer-symptom bullets live in
[`docs/GATE-DISCIPLINE.md`](../docs/GATE-DISCIPLINE.md) §"Red Flags".
Add a new bullet here alongside any new §"Rationalizations" row.

## Refused carve-outs

One argument on this surface has been raised twice and refused twice. It is
recorded here in full so the next raise finds the answer rather than
re-litigating it. The decay window did not raise it a third time. It stays in
this module because [`SPEC/gate-postures.md`](gate-postures.md) §"Park conversions"
points here for the full reasoning, not because the window saw it again.

**"The visual baseline passes byte-identical, so the `--unattended` 👁️ → park
conversion should carve out."** The strongest form is not "probably fine": it
is that a committed baseline passing byte-identical is a recorded human
approval **replayed**, not an inference, and that an intentional visual change
fails it and parks anyway. It still does not carve out, for two reasons.

**The premise is unverifiable, and this posture is why.** Nothing distinguishes
a golden a human approved from one a `--update-snapshots`-style regeneration
minted with nobody looking, and `--unattended` is the declaration that nobody
is present to attest which it was.

**And "does this baseline cover the surface I changed?" is the
gating-vs-corroborating split renamed** — the same judgment, made by the
assistant about its own diff, arriving one step earlier where no gate watches
it. Note what the carve-out would actually buy: where output provably did not
change, the Phase 3 box is *already* `N/A`, no ask is emitted, and nothing
parks. It bites only where the baseline's relation to the change is a
judgment — which is precisely where it stops being evidence.

Provenance: the gating-vs-corroborating split was offered as CORE-495 Q1 and
declined by the operator, on the ground that a second judgment surface would
mint exactly the "the tests probably cover it" excuse the historical
§"Rationalizations" catalog exists to close. CORE-503 raised the sharper
baseline form and was refused on the grounds above. The refusal lives here
rather than in a closed tasknote precisely so it is findable;
[`SPEC/gate-postures.md`](gate-postures.md) §"Park conversions" points at it
from the decision point.
