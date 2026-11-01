# Doc-drift sweep history

This is the historical record behind `.flaitron/tasknote/README.md` §"AI-referenced docs". The README owns the current sweep set; this document keeps the rationale, exclusions, and prior detector decisions out of that per-task cold-start surface.

## Sweep-set exclusions

`SPEC/*.md` (lazy modules) and `claude/skills/*/SKILL.md` sit outside this
sweep set, excluded on both counts, so the distinction above does not arise for
them. **Their exclusion is a volume decision, not a laziness one** — the
paragraph above severs lazy-loading from sweep membership, so it cannot also be
the reason these are excluded. The two trees run ~5,800 lines against a
~4,300-line sweep set, and walking them at every closure would roughly double a
per-task step Core Principle #3 exists to keep small.

Nine `docs/` files are likewise outside the set, each for a reason the sweep
would not add to: `docs/PHILOSOPHY.md` is history (nothing live mirrors it —
unlike `docs/VISION.md`, which five surfaces restate); `docs/DOGFOOD.md` is
release-gated (`/ft-release` Step 5 exercises it every cut);
`docs/CONTEXT-BUDGET.md` is CI-enforced and re-measured by `/ft-release` §7.1;
`docs/VERSION-HISTORY.md` is written *by* releases;
`docs/UPGRADING.md` holds frozen rename recipes that change only at the next
rename; `docs/CODEX-VERIFICATION.md` and `docs/HARNESS-SURVEY.md` are dated,
append-only records whose entries describe the day they were taken;
`docs/GATE-DISCIPLINE.md` is a never-loaded teaching doc whose rules are owned
by `SPEC/gates.md` and `SPEC/gate-postures.md`; and this file is the historical
record behind the sweep set. `docs/GLOSSARY.md` states its own exclusion in its
Maintenance line.

## Historical decisions

**Accepted residual risk.** Skill bodies state facts *about* swept docs, so a
contract change can falsify one with no sweep reaching it —
`/ft-release` §7.1 asserted a stale claim about this very
list for a day after CORE-489.3 added `docs/VISION.md` to it. The catch layer is
the epic-audit sweep, which is where CORE-489.N found it; per-task closure is
not expected to. CORE-492 weighed a release-time citation guard for this and
declined: every citation of the shape `` `<path>.md` §"<Section>" `` from
`claude/skills/` into a doc on this list resolved when it checked (2026-08-29;
the count is deliberately not restated — it moves with every skill edit, and
that shape is enough to re-run the scan, treating adopter-relative paths and
bold-line or bullet-lead anchors as resolved), and a resolution check would
not have caught that miss anyway — the section it cited never moved, only the
truth of what was said about it.

**Re-affirmed at CORE-543, on a wider scan.** The same guard was re-filed
2026-09-09 after a lazy split (`CORE-535.3`) left two stale pointers behind. The
scan was widened to every tracked file, both citation forms, and non-markdown
surfaces: **every** `SPEC.md` section citation resolved but three, and all three
were false positives — the ticket's own `PLAN.md` line quoting the pattern, and
two `## Completed` rows *quoting the very drift they record*. That last shape is
structural rather than tunable: a repo that documents its own drift history by
quoting the broken citation makes a resolution gate flag its own archaeology,
and "fixing" the finding corrupts the record. Measured against the three defects
that split actually left, the guard reached one — a YAML comment — while missing
both the bare filename in a shell loop that reddened CI and the ledger row whose
file and section sit in different table cells. The declination stands; CORE-543
was re-scoped to the detector the failure actually wanted (§7.1 **Pair L**,
binding the `drift` CI job to the sources it lifts, plus a `/ft-release`
CI-status gate). Pair L has since been retired: CORE-734.4 made
`tools/drift-checks.sh` the only shell for those checks, leaving no second copy
to bind.

**Landed at CORE-622.3 (2026-09-20), because the false-positive shape moved.**
The third filing came from `/ft-audit-repo` with the two declinations'
evidence changed underneath it: CORE-620 rotated the `## Completed` rows that
quoted their own drift into `.flaitron/PLAN-ARCHIVE.md`, which the check
excludes alongside the tasknote archive (both write-once), and CORE-609 ruled a
bold-lead paragraph a valid target, so the resolver reads `**Title` as well as
`# Title`. Re-measured at HEAD across 132 live files and 611 path-bearing
citations, the only findings were five `§"Fan-out."` citers with the period
inside the quotes — fixed on the citers in the same commit. The guard is §7.1
**Pair Q**, lifted into the CI `drift` job; the two declinations above stay as
the record of why it took three filings, and their objection that a resolver
does not catch claim falsification still holds — Pair Q is a pointer check,
and this sweep set is still the catch layer for the truth of what is said.
