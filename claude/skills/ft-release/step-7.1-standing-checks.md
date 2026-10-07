# `/ft-release` §7.1 — Standing checks

> Lazy fragment. Loaded by `ft-release` SKILL.md §7.1 (`claude/skills/ft-release/SKILL.md`)
> alongside its sibling `step-7.1-mirror-pairs.md`. Walk these checks after the
> `/ft-audit docs` subroutine returns; they run independently of its findings.

**Standing wiring-consumer derivation check.** `claude/AGENTS-snippet.md` §"One-time symlink wiring" is the declared SSOT for the adopter-wiring roster (CORE-465). Its two doc consumers — `docs/MIGRATION.md` §1.6 and `claude/skills/ft-new-project/SKILL.md` Steps 7–8 — *derive* their staging and verify commands from that block instead of restating its paths, so there is no count to keep aligned. This check guards that property rather than the old count:

```sh
awk '/^### 1\.6 Commit$/,/^### 1\.7 /' docs/MIGRATION.md | grep -n '\.claude/\(commands\|skills\)/ft-'
awk '/^## Step 7 /,/^## Step 9 /' claude/skills/ft-new-project/SKILL.md | grep -n '\.claude/\(commands\|skills\)/ft-'
```

Both must produce no output and exit 1. A hit means someone re-introduced a hand-maintained roster copy into a surface that is supposed to derive one — the CORE-329.2 drift class, which stayed alive for a year because the fix was "keep four counts equal" rather than "stop counting". Fix by restoring the derivation (`grep '^ln -s' … | awk '{print $NF}'`), not by re-syncing the list — fix inline as Critical/High before cutting the release.

This check **replaces** the standing symlink-wiring *count* check that shipped at CORE-329.2 and was retired at CORE-465 as vacuous: with the consumers deriving, the counts cannot disagree.

**Standing shipped-skill parity check.** Independently of the subroutine findings, compare the exported skill inventories:

```sh
find claude/skills -mindepth 1 -maxdepth 1 -type d -exec test -f "{}/SKILL.md" \; -print | sed 's#^claude/skills/##' | sort
find codex/skills -mindepth 1 -maxdepth 1 -type d -exec test -f "{}/SKILL.md" \; -print | sed 's#^codex/skills/##' | sort
```

The two shipped inventories must match exactly by slug. This is parity of exported Flaitron skill names and routing coverage, not byte-identical skill bodies; Codex wrappers may route to `SPEC/procedures/` or to the canonical Claude skill body to avoid duplicated maintenance. A mismatch means a Flaitron skill shipped on one platform surface without the other — fix inline as Critical/High before cutting the release.

**Standing installed-surface policy check.** Independently of the subroutine findings, verify the repo-scoped adopter snippets install exactly the policy subset from `docs/PLATFORMS.md` §"Installed-surface policy", not the full shipped inventories.

Nothing here is a hand-maintained roster. The expected set is **derived** — the shipped Claude skill inventory minus the declared non-adopter categories — and the three platform snippets are **derived surfaces** of `claude/AGENTS-snippet.md` §"One-time symlink wiring", each stating its own substitution in its own file. So a newly shipped adopter skill needs no edit here at all; only a change to *policy* (a new global-only utility or flaitron-self-only skill) touches the exclusion list below. That list is the machine form of `docs/PLATFORMS.md`'s "Global-only utilities" and "Flaitron-self-only" columns:

```text
ft-audit           (forked/overlaid locally under an unprefixed name, never symlinked)
ft-audit-repo      (global-only)
ft-new-project     (global-only)
ft-release         (flaitron-self-only)
```

Run the derivation, then the four set-equality diffs:

```sh
ssot=$(grep '^ln -s ../../.flaitron/core/claude/skills/' claude/AGENTS-snippet.md \
       | awk '{print $3}' | sed -E 's#.*/##' | sort -u)

# Expected = shipped inventory minus the non-adopter categories above.
diff -u <(ls claude/skills | grep '^ft-' \
          | grep -Ev '^(ft-audit|ft-audit-repo|ft-new-project|ft-release)$' \
          | sort) \
        <(printf '%s\n' "$ssot")

# The SSOT's own command half must cover the same set as its skill half.
diff -u <(printf '%s\n' "$ssot") \
        <(grep '^ln -s ../../.flaitron/core/claude/commands/' claude/AGENTS-snippet.md \
          | awk '{print $3}' | sed -E 's#.*/##; s#\.md$##' | sort -u)

# Each derived platform block must be the same set under its substitution.
diff -u <(printf '%s\n' "$ssot") <(grep '^ln -s ../../.flaitron/core/codex/skills/'  codex/AGENTS-snippet.md  | awk '{print $3}' | sed -E 's#.*/##' | sort -u)
diff -u <(printf '%s\n' "$ssot") <(grep '^ln -s ../../.flaitron/core/claude/skills/' cursor/AGENTS-snippet.md | awk '{print $3}' | sed -E 's#.*/##' | sort -u)
diff -u <(printf '%s\n' "$ssot") <(grep '^ln -s ../../.flaitron/core/claude/skills/' grok/AGENTS-snippet.md   | awk '{print $3}' | sed -E 's#.*/##' | sort -u)
```

All four `diff` commands must produce no output and exit 0. A `-` line is a policy-subset skill missing from that surface; a `+` line is a slug installed that policy excludes — the forbidden-install case, now caught by the same diff rather than a separate grep pass.

The anchored `grep` prefixes are load-bearing: `codex/AGENTS-snippet.md` carries a second `ln -s` block (the maintainer hot-reload glob `codex/skills/*`), and an unanchored match would drag `*` into the set.

**Why this shape.** The predecessor hardcoded an eleven-slug expected list and repeated it across five `diff`s plus five forbidden-install `grep`s. It went stale the day `/ft-refactor` shipped (CORE-463.5 wired the skill across sixteen surfaces and all four snippets; the gate's own list was not one of them), so every one of its diffs was failing against `main` when CORE-465 found it — a roster gate that had itself drifted out of the roster. Deriving both halves removes the class: the only way to fail now is a genuine policy or wiring divergence. Fix any finding inline as Critical/High before cutting the release.

**Standing self-wiring parity check.** The checks above all compare one *declaration* to another — `claude/AGENTS-snippet.md` and its three derived platform snippets, plus the shipped `claude/skills/` listing. None resolves a symlink, so a slug correctly declared everywhere can still be unwired and unrunnable in flaitron's own checkout: `/ft-spec` shipped at CORE-352.2, passed all three, and sat missing from `.claude/` for a month. This check reads the filesystem instead.

**Local repo-scoped wiring — blocking.** Flaitron is not an adopter; its `.claude/` mirrors the full shipped inventory (`docs/PLATFORMS.md` §"Installed-surface policy" → "Flaitron's own checkout is not an adopter"). Diff both directions:

```sh
diff -u <(ls claude/skills   | grep '^ft-' | sort) <(ls .claude/skills   | grep '^ft-' | sort)
diff -u <(ls claude/commands | grep '^ft-' | sort) <(ls .claude/commands | grep '^ft-' | sort)
find .claude/skills .claude/commands -maxdepth 1 -type l ! -exec test -e {} \; \
     -exec sh -c 'echo "DANGLING  $1 -> $(readlink "$1")"' _ {} \; | sort
find .claude/skills .claude/commands -maxdepth 1 -name 'ft-*' ! -type l -print | sort
[ "$(cd -P .claude/skills/audit 2>/dev/null && pwd)" = "$(cd -P .flaitron/audit-overlay && pwd)" ] || echo "MISWIRED  .claude/skills/audit (want -> ../../.flaitron/audit-overlay/)"
```

All five must produce no output. A `-` line is a shipped skill with no local symlink; a `+` line or a `DANGLING` line is wiring pointing at a slug that no longer ships — or, on an audit link, at a target that moved. The dangling scan is deliberately unfiltered by name: the unprefixed local forks `SPEC/layout.md` §"Skill namespace" requires — `.claude/skills/audit` and `.claude/commands/audit.md` — sit outside every `ft-*` compare, and since [[CORE-721]] the skill link is the only path to the tracked overlay body in `.flaitron/audit-overlay/`. The fourth command catches what the `diff` compares miss: they match on name only, so a skill directory *copied* into `.claude/` instead of symlinked passes both `diff`s and the `-type l`-filtered dangling scan, then silently diverges from source — any output here is a non-symlink entry, the same failure mode one layer in. The fifth pins the skill link to the overlay by resolved path (the wiring `CONTRIBUTING.md` §"Developing flaitron skills & commands" installs — keep the two in step), closing what the scans cannot see, and none of which `/audit` reports as an error: a *deleted* link or one re-pointed at the bundled `claude/skills/ft-audit/` runs the scaffold without flaitron-self's overlay deltas, and a leftover pre-[[CORE-721]] copied `audit/` directory — neither a link nor `ft-*`-named — runs its stale untracked body. `.claude/` is gitignored, so no commit carries the fix; unlike the advisory global half below, it still blocks, because this checkout is the dogfood surface the release ships from (`docs/PLATFORMS.md` §"Installed-surface policy"). Treat any finding as Critical/High and fix it inline before cutting the release: `rm` a retired slug's link; re-create a missing or miswired one, `rm -r`-ing a copied directory first (`ln -sfn` onto a real directory nests the link inside it).

**Machine-global wiring — advisory.** Global installs are discretionary (`docs/MIGRATION.md` §1.0 — "install each you want"), so **missing is deliberately not checked**: an uninstalled global utility is an operator choice, not drift. Only broken links and path-casing drift are reported:

```sh
find ~/.claude/skills ~/.claude/commands -maxdepth 1 -name 'ft-*' -type l ! -exec test -e {} \; \
     -exec sh -c 'echo "DANGLING  $1 -> $(readlink "$1")"' _ {} \; 2>/dev/null | sort
find ~/.claude/skills ~/.claude/commands -maxdepth 1 -name 'ft-*' -type l \
     -exec readlink {} \; 2>/dev/null | sed -E 's#(.*[Ff]l(ow|ai)tron)/.*#\1#' | sort | uniq -c
```

The first command should print nothing — each hit is a link left behind by a retired skill. The v5.15.0 retirements stranded nine between them: five from the `/ft-audit <domain>` fold, one each from `/ft-task --debug` and `/ft-file-followup --park`, and a skill + command pair from `/ft-quality`'s outright retirement. `docs/MIGRATION.md` §"Skills retired so far" is the authoritative table. The second should print exactly **one** line; two or more means the global links point at the same checkout through different path casings, which resolves on a case-insensitive volume and silently stops resolving on a case-sensitive one.

This check is scoped to `~/.claude/` symlink targets, not doc prose — leave README.md's Quickstart `git clone`/`ln -s` example and CONTRIBUTING.md §"Machine-global installs: utilities only"'s `ln -s` example alone: their lowercase `~/code/flaitron` is a generic clone-destination example for any reader, not this machine's path, and normalizing it would publish one maintainer's local casing as adopter instruction (rationale: archived [[CORE-410.4]]). `codex/AGENTS-snippet.md` no longer carries this pattern — its wiring now uses relative `../../.flaitron/core/...` symlink targets, not an absolute `~/code/flaitron` path — so it needs no exclusion here (CORE-544).

`~/.claude/` is machine state — no commit in this cut can carry the fix — so this half **never blocks commit-go**. Fix it out of band (`rm` the dangling links, re-`ln -s` the mis-cased ones) and carry the verdict into the §7.4 closure review as one line, the same flag-don't-block posture as the SOP-currency check in Step 5.

**Glob-free by design.** The scans use `find` (`-name 'ft-*'` where name-filtered) rather than a `for l in ~/.claude/skills/ft-*` loop because zsh — the common interactive shell — *errors* on an unmatched glob (`no matches found`) and aborts the loop before its body runs. A machine with no global installs would abort the check rather than report clean. Do not "simplify" these to globs; the same silent-false-negative class is why the SOP-currency block in Step 5 keeps its `$(echo …)` wrappers.

**Standing README task-counter check.** README.md's "Flaitron is built with flaitron" sentence cites a closed-task count and date range that §5's post-edit version-pin verification never covers — it greps for `vX\.Y\.Z`, not a task count, so this line drifts silently between cuts (CORE-411). Recompute both from the same archive the sentence already points readers to:

```sh
find .flaitron/tasknote/archive -name "*.md" | wc -l
grep -rhoE '^\*\*Archived:\*\* [0-9]{4}-[0-9]{2}-[0-9]{2}' .flaitron/tasknote/archive/*/*.md | awk '{print $2}' | sort | sed -n '1p;$p'
```

The first command is the closed-task count — one archived tasknote per closed task, standalone or epic child. The second prints the earliest and latest `**Archived:**` date; the earliest is stable (2026-04-28) and only the latest moves. The `^` anchor is load-bearing: an unanchored match also catches `**Archived:**` inside prose or a scratch-fixture description elsewhere in an archived note's body, not just its footer stamp — CORE-613 hit exactly this, reporting a latest date one day in the future off CORE-610.2's mid-bullet fixture text (CORE-615). Update that sentence's count and "as of" date to match. A handful of archived tasknotes carry an unfilled `**Archived:** YYYY-MM-DD` placeholder or omit the field (archive-hygiene misses, e.g. CORE-255), so the second command undercounts by that many; if the gap looks material, file a follow-up via `/ft-file-followup` rather than fixing archive hygiene mid-cut. This is a mechanical text substitution, same footing as the 3 version edits in Step 5 — fix inline as Critical/High before cutting the release.

**Standing completed-rotation check (advisory).** Independently of the subroutine findings, count checked rows under `## Completed` in `.flaitron/PLAN.md` (nested epic children included). Past **60**, surface the same one-line warning `/ft-task` Step 1 uses — then continue. Rotation is an operator motion (`SPEC/plan-filing.md` §"`## Completed` rotation"); this check **never blocks the cut** and never rotates. Carry the verdict into the §7.4 closure review as one line, the same flag-don't-block posture as the machine-global wiring half above.

```sh
n=$(awk '/^## Completed$/{f=1;next}/^## /{f=0} f' .flaitron/PLAN.md | grep -c '^\s*- \[x\]')
if [ "$n" -gt 60 ]; then
  echo "⚠️ PLAN.md \`## Completed\` holds $n rows (>60). Consider rotating the oldest rows to \`.flaitron/PLAN-ARCHIVE.md\`. Proceeding."
fi
```

`grep -c` prints `0` on an empty section (and exits 1); the assignment still captures the count. No `OVER` / `exit 1` — a number past the bound is a nudge to rotate after the cut, not a reason to hold the tag.

**Standing viz-majors-outdated check (advisory).** Independently of the subroutine findings, list `viz/` packages whose installed major differs from the registry latest. Surface them, then continue. This is registry-time state (`docs/CONVENTIONS.md` §"Dependency audit cadence" — the same reason `npm audit` is not a `validate` step); the check **never blocks the cut** and never bumps. Carry the verdict into the §7.4 closure review as one line, the same flag-don't-block posture as the completed-rotation check above.

```sh
node -e '
const {execFileSync} = require("node:child_process");
let raw = "{}";
try {
  raw = execFileSync("npm", ["--prefix", "viz", "outdated", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch (e) {
  raw = (e.stdout && String(e.stdout)) || "{}";
}
const data = JSON.parse(raw || "{}");
const maj = (s) => String(s || "").replace(/^[^\d]*/, "").split(".")[0];
const rows = Object.entries(data)
  .filter(([, v]) => maj(v.current) !== maj(v.latest))
  .map(([k, v]) => k + " " + v.current + "→" + v.latest);
if (rows.length) {
  console.log("⚠️ viz majors pending: " + rows.join(", ") + ". Advisory only — do not block the cut.");
}
'
```

`npm outdated` exits 1 when anything is behind, majors or not — swallow that and read stdout. No `OVER` / `exit 1` — a pending major is a nudge to bump or re-park after the cut, not a reason to hold the tag.

**Standing context-budget check.** Flaitron ships per-file byte budgets for the
surfaces an agent loads to run one task. They live in
[`docs/CONTEXT-BUDGET.md`](../../../docs/CONTEXT-BUDGET.md) §"Budgets" and are
restated nowhere — this check measures, that doc decides, and the numbers below
are read from the table, never retyped. Run from the repository root:

```sh
exact=$(awk '/^## Budgets$/,/^## Known over budget/' docs/CONTEXT-BUDGET.md \
        | grep -E '^\| `[^`]+` \| [0-9,]+ \|' \
        | sed -E 's/^\| `([^`]+)` \|.*/\1/' \
        | grep -v '\*' \
        | tr '\n' ' ')
while IFS='|' read -r surface budget; do
  budget=${budget//,/}
  case "$surface" in
    *'**')
      n=$(find "${surface%/\*\*}" -type f -exec cat {} + | wc -c)
      [ "$n" -le "$budget" ] || echo "OVER BUDGET  $surface  $n > $budget"
      ;;
    *'*'*)
      for f in $(eval "ls -d $surface" 2>/dev/null); do
        [ -f "$f" ] || continue
        case " $exact " in *" $f "*) continue ;; esac
        n=$(wc -c < "$f")
        [ "$n" -le "$budget" ] || echo "OVER BUDGET  $f  $n > $budget"
      done
      ;;
    *)
      n=$(wc -c < "$surface")
      [ "$n" -le "$budget" ] || echo "OVER BUDGET  $surface  $n > $budget"
      ;;
  esac
done < <(awk '/^## Budgets$/,/^## Known over budget/' docs/CONTEXT-BUDGET.md \
         | grep -E '^\| `[^`]+` \| [0-9,]+ \|' \
         | sed -E 's/^\| `([^`]+)` \| ([0-9,]+) \|.*/\1|\2/')
```

`$exact` is the set of non-glob rows, excluded from the glob row's expansion so
the most specific row wins (`ft-release`'s own row exempts it from the glob
row's cap). The `tr '\n' ' '` is load-bearing: command substitution keeps the
awk rows as newlines, and `case " $exact "` only matches a space-delimited
path. Without it the exemption never fires, and a file between the glob cap
and its own row (ft-release at 34,641 against 33,000 / 40,000, CORE-690) fails
the glob. A row ending in `/**` is a **directory total**: the `**` arm sums
every file under that directory with the same `find … -exec cat | wc -c`
idiom the ledger refresh below uses, and compares the sum — it is not a glob to
expand, and it neither exempts nor is exempted by the per-file rows, so a
fragment counts once toward its parent's directory row and again toward any
per-file row it matches. The arm sits first in the `case` because `*'*'*`
would otherwise catch it. No `OVER BUDGET` line — nothing to do. For each one
printed:

- **Listed in §"Known over budget" with an open owner** — its owning task line
  is still `- [ ]` in `.flaitron/PLAN.md`. Informational: note it in the §7.4
  closure review and carry on. This is the in-flight case, not a failure.
- **Not listed, or listed with an owner whose PLAN line is closed** —
  blocking. Either the surface regrew past its budget, or a task that promised to
  bring it under closed without doing so. Fix inline as Critical/High before
  cutting the release: trim the surface, or — if the growth is deliberate and
  defensible — raise the budget in `docs/CONTEXT-BUDGET.md` with the reason, in
  this cut, as an explicit decision rather than a silent drift.

**Lifted into the CI `drift` job.** The block above also runs, unmodified
except for a `bad=` accumulator and `exit 1`
(`docs/CONVENTIONS.md` §"GitHub Actions CI"), on every push to `main` and every pull request —
it catches a budget regression on the commit that lands it rather than at the
next cut. CI cannot apply the §"Known over budget" judgment above (it needs
`.flaitron/PLAN.md` ownership context CI does not have), so an `OVER BUDGET`
finding there is expected while a surface is mid-flight under an open owner;
the release-time interpretation above still governs. `/ft-release` §7.1
**Pair L** (`step-7.1-mirror-pairs.md`) binds the CI copy to this block.

**Refresh the ledger in this cut.** `docs/CONTEXT-BUDGET.md` §"Ledger" carries
measured numbers and a `Measured YYYY-MM-DD at vX.Y.Z` stamp. The budget command
above measures only the budgeted surfaces, which is a minority of the ledger, so
it cannot refresh the ledger on its own. Run these four instead — one per
§"Ledger" subsection, in the order that section presents them:

```sh
# Always loaded to run one task
wc -c SPEC.md claude/skills/ft-task/SKILL.md claude/skills/ft-task/preamble.md AGENTS.md \
      .flaitron/tasknote/README.md templates/tasknote-template.md

# Lazy SPEC/ modules
wc -c SPEC/*.md SPEC/procedures/*.md | sort -rn

# Skill bodies (SKILL.md only)
wc -c claude/skills/*/SKILL.md | sort -rn

# Adopter-side always-loaded
wc -c claude/AGENTS-snippet.md templates/tasknote-README.md templates/PLAN.md
```

Then the two whole-directory totals that §"Skill bodies" cites in prose, which
the `SKILL.md`-only glob above does not reach:

```sh
find claude/skills/ft-release -type f -exec cat {} + | wc -c
find claude/skills/ft-task    -type f -exec cat {} + | wc -c
```

Each command's output maps to exactly one §"Ledger" subsection, so the refresh
is a mechanical substitution — the same footing as the version edits in Step 5.
Update the stamp as well. A row these commands do not measure is one the doc has
deliberately left unmeasured; §"Ledger" says which and why, and this check does
not restate that decision.

The doc is deliberately absent from
`.flaitron/tasknote/README.md` §"AI-referenced docs" (its own closing section
says why), so this check is the *only* thing that keeps those numbers honest —
skipping the refresh silently retires the ledger.

**Why the refresh commands are wider than the budget one.** They were the same
command until [[CORE-539]]. It measured `SPEC.md`, `SPEC/gates.md`, and the skill
bodies — exactly the budgeted set, which is right for the budget comparison but
reached only 21 of the ledger's then-46 rows. "Refresh the ledger from that
output" therefore covered under half of it, and the remaining rows decayed with
no cut able to catch them: measured at HEAD against a ledger stamped the *same
day*, `.flaitron/tasknote/README.md` was +290, `templates/PLAN.md` +65, and the
`ft-task` whole-directory total +1,777. Do not re-narrow these back into one
command — the two halves have different jobs. Widening what the budget gate
*blocks on* is a separate decision and belongs in `docs/CONTEXT-BUDGET.md`
§"Budgets", not here.

**Why this check exists.** [[CORE-EPIC-223]] split `SPEC.md` at ~40,000 chars,
verified the result with `wc -c` in its Phase 3, and wrote the number into no
contract. Three months later `SPEC.md` had passed 77,000 — the split had no ratchet, and
[[CORE-508]] later confirmed no byte cap was documented anywhere in the repo. This
is that ratchet. It clears the [[CORE-487]] bar for a new standing check: a byte
count is *derivable*, not a prose paraphrase, so it cannot cry wolf the way the
citation guard [[CORE-492]] declined would have.

**On the globs.** `claude/skills/*/SKILL.md`, `SPEC/*.md`, and
`SPEC/procedures/*.md` stay globs despite §"Glob-free by design" above, but
`for f in $surface` would not expand them: zsh does not glob-expand an unquoted
parameter (bash does), so the loop body ran once on the literal pattern, hit
`[ -f "$f" ] || continue`, and silently measured nothing. The loop therefore
expands through `eval "ls -d $surface"`, which re-parses the pattern as a
command word in either shell; an unmatched pattern prints nothing instead of
aborting with `no matches found`, so the Glob-free hazard is covered too. Keeping
them as globs is also what makes a newly shipped skill or `SPEC/` module
measured with no edit to this check. Do not "fix" them into `find` loops;
`wc -c`'s own multi-file output is what makes the result readable at a glance.
The two whole-directory totals above do use `find`, on literal directory paths —
no glob to go unmatched, and no loop.
