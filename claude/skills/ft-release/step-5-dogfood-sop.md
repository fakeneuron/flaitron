# `/ft-release` §5 — Dogfood gate + SOP-currency walk

> Lazy fragment. Loaded by `ft-release` SKILL.md §5 (`claude/skills/ft-release/SKILL.md`)
> after the 3 version edits. Walk the dogfood-or-explicit-skip gate, then the
> standing SOP-currency check; both are part of Step 5, not optional appendices.

**Dogfood gate — walk the dogfooded rows (dogfood-or-explicit-skip).** Since CORE-224 the doc set carries `last-verified` version stamps (`docs/AGENT-COMPAT.md` matrix, `claude/CAPABILITIES.md`, and per-agent `docs/PLATFORMS.md` stubs) formatted `vX.Y.Z · YYYY-MM[-DD] (context-tag)`. These are **not** release pins. Per the release-gate obligation (`docs/AGENT-COMPAT.md` §"Reading the cells"), **every row carrying a `dogfooded` history must be resolved at each release** — refreshed from a real verification run at the new version, or recorded as a deliberate skip. Leaving a stale stamp silently untouched is not a valid release state. Walk it now:

1. **Enumerate the dogfooded rows.** Grep the `docs/AGENT-COMPAT.md` matrix for stamps carrying a `(dogfooded…)` tag — today: **Claude**, **Grok**, **Codex**, **Cursor**. (`unverified` / `docs-only` rows are *noted-not-gated*: skip them entirely; they rest on launch coverage until first dogfooded and are exempt from the gate.)
2. **For each dogfooded agent, force a resolution** — AskUserQuestion whether a real flaitron session was run under that agent at `vA.B.C`:
   - **Refreshed** — bump the stamp prefix to `vA.B.C` + today's date, keep `(dogfooded)`, and **drop any prior `; skipped @ …` suffix** (the row is current again).
   - **Skipped** — keep the prefix pinned to the last *real* verification (do **not** bump it), and set/bump the suffix to `; skipped @ vA.B.C`. Result shape: `v4.4.0 · 2026-06-01 (dogfooded; skipped @ vA.B.C)`.

   **Evidence standard for rows this session did not run itself (CORE-588).** Your own agent's row is refreshed on this session's own verification. Every other row is a third-party claim, and a claim refreshes a row only against a **dogfood receipt** — the three `Log:` lines `docs/DOGFOOD.md` §"Reporting the result" defines, pasted verbatim by the operator from that agent's session. Check three things before recording Refreshed: the receipt's version reads `vA.B.C` (a session that read `SPEC.md` before the version edit verified the *previous* release); its "My row" stamp matches what `docs/AGENT-COMPAT.md` holds for that agent right now (a mismatch means it read a different checkout, or nothing); and its Phase-1 drive names a task and an exit-gate decision. **No receipt, a paraphrase, a wrong version, or a report of having run something else (an agent describing its own `/ft-release` drive, a `/ft-task` it ran, "confirmed compatibility") → Skipped**, with a one-line note in Implementation Notes naming what was offered instead. A skip is never a demotion — the prefix keeps the last real verification and the row is refreshed at the next receipt — so a missing receipt costs nothing but the stamp, whereas an unearned Refreshed backdates a claim nobody can check. Do not send the operator to fetch a receipt mid-walk unless they offer; record the skip and continue. **The status clause is not scored (CORE-614).** A receipt in `docs/DOGFOOD.md`'s fenced template whose `git status` clause reads clean of session-written files passes on the three checks above even when the session also mentions pre-existing dirt — a same-checkout receipt made mid-cut always sees this walk's own version-pin edits, which is the only way it can read `vA.B.C` — and a session that self-invalidates on that dirt has still produced a receipt; resolve it on the three checks, not on its verdict about itself (the CORE-613 Codex row).
3. **Before writing, check for a concurrent write — at walk start and again immediately before every write.** Run `git status --porcelain -- docs/AGENT-COMPAT.md claude/CAPABILITIES.md docs/PLATFORMS.md`.
   - **At walk start** it must return empty. The walk has written nothing yet, so any dirt here is foreign — **STOP**, show `git diff -- <the three files>` to the operator, and reconcile by hand (typically: a parallel dogfood session wrote its own stamp despite `docs/DOGFOOD.md` §"Reporting the result"; have it report a receipt instead, revert its write, and resolve the row here). There is no "own earlier edit" exception at this point — the one exception, a resume of an interrupted walk, is handled by the ledger below, not by judgment.
   - **Before each subsequent write** the *only* dirt allowed is the resolutions this walk has already applied. Keep a **ledger** in Implementation Notes as you go — one line per row, written the moment its edit lands (`Claude → vA.B.C · YYYY-MM-DD (dogfooded) — written`) — and compare the diff against it: a hunk on a row the ledger does not name, or a ledger row whose stamp no longer reads as written, is a concurrent writer → **STOP** and reconcile as above. On a resume, the ledger in the parked note is the same reference. This replaces the earlier self-judged "isn't this session's own edit" check, which is the exact judgment CORE-501 recorded sessions getting wrong.

4. **Apply each agent's resolution across all its stamp locations together** (so the matrix and the footers never drift): Claude → `docs/AGENT-COMPAT.md` matrix row + `claude/CAPABILITIES.md` §"Last verified"; Grok + Codex + Cursor → `docs/AGENT-COMPAT.md` matrix rows + their `docs/PLATFORMS.md` per-agent footers.

5. **Re-verify from file state.** After the last row is resolved, and again at §7.4 before commit-go, prove every ledger row is what the files hold — not what this session remembers writing (CORE-586's Claude refresh was overwritten to a skip mid-walk and nothing re-read it):

   ```sh
   # one line per ledger row: <expected stamp> and the files that must carry it
   while IFS='|' read -r stamp files; do
     for f in $(echo "$files"); do
       grep -qF -- "$stamp" "$f" || echo "MISSING  $f  ← $stamp"
     done
   done <<'LEDGER'
   vA.B.C · YYYY-MM-DD (dogfooded)|docs/AGENT-COMPAT.md claude/CAPABILITIES.md
   vP.Q.R · YYYY-MM-DD (dogfooded; skipped @ vA.B.C)|docs/AGENT-COMPAT.md docs/PLATFORMS.md
   LEDGER
   ```

   Fill the heredoc from the ledger (one line per row; `(echo …)` splits the path list under zsh, keep it). Must print nothing. Any `MISSING` line means a concurrent writer clobbered a stamp after this walk wrote it → **STOP**, `git diff` the file, reconcile, re-apply from the ledger, and re-run until clean. A stamp shared by two rows (two agents refreshed the same day) is one heredoc line naming all their files — `grep -q` on `docs/AGENT-COMPAT.md` cannot tell the rows apart, so also eyeball the matrix once against the ledger's per-agent names.

**Stamp-write ownership under parallel dogfooding.** This walk resolves *every* dogfooded row, not just the row for the agent driving this session — so if another agent session is dogfooding in parallel (e.g. exercising `/ft-release` or `docs/DOGFOOD.md` independently toward the same release), only apply step 4's file writes here if **this** session is the one carrying the cut through to §7's tag/push. If this session is the parallel one instead, do not write the stamp files — report the refreshed/skipped verdict and evidence conversationally back to the operator so the release-driving session's own walk can apply it. Writing from both sides races: a row resolved before its real result exists (correct when written) can be overtaken and need hand reconciliation before tagging (CORE-406). **Mechanical backstop (CORE-501):** step 3's dirty check above catches this exact race even when a session misjudges its own role — neither side commits mid-cut, so a second writer's `git status --porcelain` on these three files will show the first writer's uncommitted dirt before it overwrites anything. **Why it still raced a third time (CORE-588, the CORE-586 cut):** the check only runs in sessions that load *this* fragment, and the parallel writers were Grok / Cursor / Codex sessions running `docs/DOGFOOD.md`, whose result section then told them to "update the stamp" — a second writer with no check at all, and one both CORE-406 and CORE-501 had left untouched. That section is now report-only (a receipt, never an edit), step 3 has no self-judged exception, and step 5 re-reads every stamp from file state so a clobber is caught before the tag rather than by hand.

**Grep residue is expected for skipped rows.** A skipped stamp keeps its old prefix on purpose, so the version-pin grep in Step 5 will still surface the pre-release `vX.Y.Z` inside it — that is a *recorded skip*, not drift. Confirm every remaining `vX.Y.Z` hit is either (a) a stamp on a row you just resolved as skipped, (b) a write-once archived tasknote under `.flaitron/tasknote/archive/` (these keep their historical version refs), or (c) a `last-verified:` stamp in `SPEC/procedures/*.md` (a SOP↔source sync stamp, **never** a release pin — see the SOP-currency check below). Any other hit is real drift — fix it before continuing.

**Standing SOP-currency check (flag-don't-bump).** `SPEC/procedures/*.md` carries a third kind of currency stamp: `last-verified: <version> · <YYYY-MM-DD>`, tracking when the agent-neutral SOP was last re-checked against the upstream surfaces its `source:` and `restates:` fields declare (schema: `SPEC/procedures/README.md` §"Frontmatter schema"). Unlike the dogfood rows above, **a release cut never bumps this stamp** — it records a SOP↔upstream sync event, not a release pin (CORE-361 / CORE-356 precedent). But nothing else surfaces its drift either, which is how CORE-390's fold sat un-mirrored in the SOP for two weeks until CORE-395 caught it by hand. Walk it now — **flag only**:

For each `SPEC/procedures/<procedure>.md`, read its `source:`, its `restates:`, and the **date** half of `last-verified:`, then walk both tiers since that date, ignoring commits that also touched the SOP:

```sh
for sop in SPEC/procedures/*.md; do
  [ "$(basename "$sop")" = "README.md" ] && continue
  src=$(sed -n 's/^source: *//p' "$sop")
  restates=$(sed -n 's/^restates: *//p' "$sop")
  stamp=$(sed -n 's/^last-verified: *//p' "$sop" | sed 's/.*· *//')
  echo "== $sop  (source: $src, verified: $stamp)"

  # Tier 1 — mirrored surfaces: one adjudicable candidate per drifting commit.
  # $(echo …) splits the path list in zsh too — a bare $src does NOT split there
  # and would silently match no paths, reporting clean. Do not "simplify" it.
  for c in $(git log --format=%H --since="$stamp" -- $(echo "$src")); do
    git show --name-only --pretty=format: "$c" | grep -qx "$sop" \
      || git log -1 --format='   DRIFT CANDIDATE  %h %s' "$c"
  done

  # Tier 2 — restated contract surfaces: one advisory count per path.
  for r in $(echo "$restates"); do
    n=$(for c in $(git log --format=%H --since="$stamp" -- "$r"); do
          git show --name-only --pretty=format: "$c" | grep -qx "$sop" || echo x
        done | wc -l | tr -d ' ')
    [ "$n" -gt 0 ] && echo "   note: $n $r commits since stamp — skim if the SOP restates a changed section"
  done
done
```

**Run the block as written** — the `$(echo "$src")` wrappers are a portability guard, not noise. Both fields hold space-separated path lists, and zsh (the common interactive shell) does not word-split a bare `$src`; it would match no paths and print a clean verdict for a drifting SOP. A silent false negative is the one failure a drift detector must not have, so keep the wrappers even though bash and `sh` split without them.

Anchor on the **date**, not the stamp's version and not the SOP's last-touched commit. The version decouples from the date whenever a SOP is re-checked mid-cycle (CORE-395 stamped `v5.14.1` on 2026-08-02; the tag itself is dated 2026-07-27), so a version anchor reports every post-tag commit as false drift. A last-touched-commit anchor is worse: a *touch* is not a *verification* — CORE-387 touched the SOP after CORE-390 touched `source:`, so anchoring there hides the older drift entirely. Commits that changed both files in one commit are in-sync mirrors, which is why both tiers filter them.

**Why the second tier is a count, not more candidates.** A SOP tracks two kinds of upstream. `source:` names surfaces it mirrors, where a commit that skipped the SOP is probably drift and worth naming. `restates:` names broad contract (`SPEC.md`) that the whole repo edits, where most commits touch nothing the SOP restates — listing each one measured at 12-16 candidates per cut against the 0-2 this check is designed around, which is how an advisory check gets rubber-stamped into uselessness (CORE-409). The count keeps that drift *visible* without demanding a verdict on each commit. Note that `source:` accepts **multiple** space-separated paths and directories: a bare `SKILL.md` anchor misses drift that lands only in a skill's lazy fragments or in `templates/`.

Resolution — this check **flags, it does not fix and it does not bump**:

- **No candidates** — state "SOP currency: clean" and continue. A tier-2 note alone is still clean; mention the count in the verdict.
- **Candidates found** — surface them, then adjudicate each with the user: a commit with no neutral-layer surface (e.g. a change to a Claude-only skill-dispatch field) is dismissed with a one-line reason; anything else means the SOP has genuinely fallen behind. For a real finding, **file a follow-up** via `/ft-file-task` (a SOP re-check is a full tasknote — CORE-395 was +73/−3 across five insertion points — and does not belong inside a release cut). Then continue the cut.
- **Tier-2 note** — skim the SOP's restated sections against the named path only if the count looks material or a candidate already suggests the SOP is behind. It never demands a per-commit verdict, and on its own it never blocks or files anything.

**This is advisory, not a gate.** Unlike the dogfood gate above it never blocks commit-go: a stale SOP is a filed follow-up, not a reason to hold a release. Record the verdict (clean, or candidates + their adjudication + the follow-up ID) in Implementation Notes, and carry the one-line summary into the §7.4 closure review.
