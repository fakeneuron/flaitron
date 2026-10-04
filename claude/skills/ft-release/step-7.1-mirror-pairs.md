# `/ft-release` §7.1 — Mirror pairs

> Lazy fragment. Loaded by `ft-release` SKILL.md §7.1 (`claude/skills/ft-release/SKILL.md`)
> alongside its sibling `step-7.1-standing-checks.md`. Walk these pairs after the
> standing checks; every pair below blocks the cut.

**Standing mirror-pair check.** Some surfaces restate a fact that is *derived* from another surface — a roster that must list what a directory holds, a Codex description that must name the flags its Claude twin documents, a template's back-link that must resolve from the directory a skill writes it to. Nothing binds the two halves, so an edit to the source silently strands the mirror, and the gap only surfaces when a reader trips over it (CORE-EPIC-420 found four such pairs drifted at once). Each pair below is repo state — a commit in this cut can carry every fix — so all of them **block**: fix inline as Critical/High before cutting the release.

**Two kinds of pair.** Eleven pairs — A, B, C, H, J, M, N, O, P, Q, R — are lifted into the CI `drift` job, and for those the **`ci.yml` step is the shell**: the entry below is a catalogue line (purpose · `Reads:` · `CI step:` · what a finding means and how to fix it), the design notes sit as `#` comments inside the step, and Pair L binds the `Reads:` line to what the step actually reads ([[CORE-631.2]]; before it, both surfaces carried the shell and the directory budget paid for it twice). The other pairs — D, F, I, K, L — need release context or judgment and keep their shell here. `/ft-release` §6.1 has already gated the cut on CI for HEAD, but this cut's own edits (version pins, doc sweeps) can mint a Pair H or Pair Q miss before commit, so run the eleven locally now, on the working tree, under the CI shell:

```sh
for step in $(grep -oE '^      - name: Pair [A-Z] ' .github/workflows/ci.yml | sed 's/.*Pair //'); do
  awk -v s="- name: Pair $step " '
    index($0,s)               {inb=1; next}
    inb && /^      - name: /  {exit}
    inb && /^        run: \|$/ {inr=1; next}
    inb && inr && sub(/^          /,"")' .github/workflows/ci.yml | bash -e \
    && echo "Pair $step ok" || echo "PAIR $step FAILED"
done
```

Eleven `ok` lines. A `FAILED` line is preceded by the step's own findings; read the pair's entry below for what they mean. The runner keys on the `- name: Pair <letter> ` prefix and the `run: |` block scalar — `ci.yml`'s header comment says why both stay fixed — and `bash -e` is the shell GitHub runs a `run:` step in (no `pipefail`), so a step that passes here passes there.

**Pair A — templates roster ↔ `templates/` directory.** Two surfaces restate what `templates/` holds: `README.md`'s repo-layout bullet and `SPEC/layout.md` §"Working in the flaitron repo itself". Adding or removing a file in `templates/` without editing both strands the one left behind.

Reads: `README.md` · `SPEC/layout.md`
CI step: `Pair A — templates roster clause present in both surfaces` — presence of the byte-identical roster clause in both files; `NO ROSTER CLAUSE` is a file that lost it.

The content half stays here, as judgment: every file `ls templates/` prints must be named in the clause (the seed files appear as `PLAN.md` / `tasknote-README.md`, the tasknote templates by their qualifier — `full`, `micro`, `starter`, `sidequest`). A file in the directory named by no clause, or a name in a clause with no file, is the drift.

```sh
ls templates/
grep -n 'tasknote templates (full' README.md SPEC/layout.md
```

**Pair B — Claude skill flags ↔ Codex wrapper descriptions.** The shipped-skill parity check in `step-7.1-standing-checks.md` compares slugs only and explicitly does not compare bodies, so a capability flag added to a Claude `description:` never reaches its Codex mirror. Codex dispatches by natural-language description match, so an unnamed flag is wired but undiscoverable — the CORE-420.3 drift class, minted every time a standalone skill folds into a flag on a survivor.

Reads: `claude/skills/ft-*/SKILL.md` · `codex/skills/<slug>/SKILL.md`
CI step: `Pair B — Claude skill flags ↔ Codex wrapper descriptions` — the `--flag` set each `description:` documents, quote-stripped, must match. Fix a `MISMATCH` by appending the capability to the Codex `description:` in that skill's own voice (`` With `--park`, … ``), not by copying the Claude sentence.

**Pair C — template back-link ↔ skill write target.** Every template whose nav header carries a `← PLAN.md` back-link is written by some skill into a directory one level under `.flaitron/`, so the link is always `../PLAN.md`. A template authored at the wrong depth mints a dead link on every invocation until someone follows it (CORE-420.4).

Reads: `templates/` (for a `../../PLAN.md` back-link)
CI step: `Pair C — template back-link depth` — no template may carry that link. Current write targets — a new template must land in a directory at this same depth, or the check needs a new row rather than a pass:

| Template | Written by | Write target |
|---|---|---|
| `tasknote-template.md` | `/ft-task` (`--loop` included), `/ft-epic-discovery`, `/ft-close-epic`, `/ft-release` | `.flaitron/tasknote/<ID>.md` |
| `tasknote-micro-template.md` | `/ft-micro-task` | `.flaitron/tasknote/<ID>.md` |
| `tasknote-starter-template.md` | `/ft-file-followup --starter` | `.flaitron/tasknote/<ID>.md` |
| `sidequest-template.md` | `/ft-file-followup --park` | `.flaitron/sidequest/<ID>.md` |
| `spec-template.md` | by hand (no skill since CORE-573) | `.flaitron/specs/<slug>.md` (no back-link today) |

**Pair D — README counter ↔ archive count.** Already owned by the Standing README task-counter check in `step-7.1-standing-checks.md`; not restated here. Two derivations of one number in the same step is the drift class this block exists to catch.

**Pair F — park-priority flag roster ↔ mirror surfaces.** `/ft-file-followup`'s park mode documents four priority flags (`--low`, `--med`, `--fut`, `--high`) in its usage line, and four contract-layer surfaces restate that roster in their own shapes — `SPEC/tasknote-selection.md`'s park signature, `AGENTS.md`'s peer-skill roster, `docs/GLOSSARY.md`'s **sidequest** entry, and `docs/MIGRATION.md`'s retired-`ft-sidequest` replacement cell. Nothing binds them, and every frontmatter-derived check is correctly blind to these prose rosters (CORE-433.2 fixed four sites by hand after CORE-399 left them stale; this pair closes the class).

Each mirror must name all four flags. Formats differ by surface (pipe-joined, slash-separated, comma-listed, or table-escaped) — the check counts presence, not byte identity:

```sh
for f in SPEC/tasknote-selection.md AGENTS.md docs/GLOSSARY.md docs/MIGRATION.md; do
  for flag in --low --med --fut --high; do
    grep -q -e "$flag" "$f" || echo "MISSING PARK FLAG $f $flag"
  done
done
```

Must print nothing. `grep -e` is load-bearing on BSD/macOS `grep`: bare `--low` is parsed as a flag, not a pattern. Fix a miss by updating the named mirror to match `claude/skills/ft-file-followup/SKILL.md`'s usage line (`--park [--low|--med|--fut|--high]`) in that surface's established shape — do not normalize every mirror to one string.

Command stubs — the same roster, one layer down, and globbed rather than named. `claude/commands/*.md` see-also sentences restate the park signature for operators, and the fixed mirror list above never covered them: CORE-399 added `--high` to the surfaces it named, and CORE-433.2 / CORE-440 / CORE-443 each re-verified only *those* surfaces, so `ft-starter-task.md` and `ft-epic-discovery.md` sat three flags deep across three separate correction passes until CORE-460.2. A glob, not a list, is the point — a stub added later is covered the day it lands:

```sh
for f in $(grep -l -e '--park' claude/commands/*.md); do
  grep -q -E -e '--(low|med|fut|high)' "$f" || continue
  for flag in --low --med --fut --high; do
    grep -q -e "$flag" "$f" || echo "MISSING PARK FLAG $f $flag"
  done
done
```

Must print nothing. The `continue` guard is the load-bearing half: a stub may legitimately name `--park` with **no** priority roster at all (the since-retired `ft-spec.md` pointed at park mode in one clause without restating the flags), and demanding four flags there would mint a false positive. Only a stub that already commits to a partial roster is held to the full one. Fix a miss the same way as above — extend that stub's own sentence, don't normalize the wording.

**Pair G — retired.** Guarded the `/ft-goal-task` `--worktree` roster against its two mirror surfaces; [[CORE-571]] folded the skill into `/ft-task --loop` without the flag, so there is nothing left to mirror. The letter is kept so later pair citations stay stable.

**Pair H — validation command roster ↔ 5 restatement sites.** `AGENTS.md` §"Validation" is the source of truth for the seven commands that define "passing" (4 viz + `node --test` + 2 × `node --check`). Four other surfaces restate that roster — `.github/workflows/ci.yml`, `docs/CONVENTIONS.md` §"GitHub Actions CI", `.flaitron/tasknote/README.md` §"Project quick commands", and `/ft-release` SKILL.md's Step 6 fence — and nothing bound them, so a release-gate edit that skipped the two `node --check`s left `/ft-release` narrower than CI with no detector (CORE-430.N F2; CORE-433.4). A roster command lands in `validate` one commit at a time — [[CORE-622.4]] added `run build` and five mirrors sat stale until an audit read them — which is why this pair runs per push.

Reads: `AGENTS.md` · `.github/workflows/ci.yml` · `docs/CONVENTIONS.md` · `.flaitron/tasknote/README.md` · `claude/skills/ft-release/SKILL.md` (Step 6 only) — plus the roster's own `tools/update-adopters.test.mjs` / `tools/update-adopters.mjs` strings
CI step: `Pair H — validation roster ↔ its restatement sites (AGENTS.md §"Validation")` — two halves. Presence: each site names all seven command strings (`MISSING VALIDATION CMD <site> :: <cmd>`); formats differ, so presence, not byte identity. CI verbatim: `AGENTS.md`'s fences vs the `validate` job's `run:` steps minus the install step, byte-for-byte and in order — a `-` line is an AGENTS command CI dropped or reordered; a `+` line is a CI command AGENTS does not name. Fix a miss by updating the named mirror to match `AGENTS.md` §"Validation" in that surface's established shape — do not normalize every restatement to one fence.

**Pair I — `claude/CAPABILITIES.md` flag rows ↔ non-Claude trigger tables.** `claude/CAPABILITIES.md` is the Claude-side roster of operator flags that change how a skill runs, one table row per flag; `docs/PLATFORMS.md` §"Non-Claude capability triggers" is its non-Claude mirror, one `###` section per agent reusing the same four-column shape (`claude/CAPABILITIES.md`'s own pattern note says so). Nothing bound them. Pair B is frontmatter-derived and blind here; Pair G names `docs/PLATFORMS.md` but greps the *whole file*, so an unrelated `--worktree` in the Claude worked example satisfied it while both non-Claude tables sat two flags short — a gate that existed and still lagged the surface it guarded (CORE-460.3; `--park` / `--worktree` had been missing since they shipped, because CORE-456.2 and CORE-438.5 were each about the flags they *were* adding).

Both the roster and the section list are **derived, not listed** — a flag added to `CAPABILITIES.md`, or an agent section that later grows a flag row, is covered the day it lands:

```sh
flags=$(grep -oE '^\| \*\*`--[a-z-]+`' claude/CAPABILITIES.md \
        | grep -oE -e '--[a-z-]+' | tr '\n' ' ')
awk '/^## Non-Claude capability triggers$/,/^## When this doc is useful$/' docs/PLATFORMS.md \
| awk -v flags="$flags" '
    BEGIN { RS = "\n### "; n = split(flags, F, " ") }
    NR == 1 { next }
    { split($0, L, "\n"); sec = L[1]; hit = 0
      for (i = 1; i <= n; i++) if (F[i] != "" && index($0, F[i])) hit = 1
      if (!hit) next
      for (i = 1; i <= n; i++) if (F[i] != "" && !index($0, F[i]))
        print "MISSING TRIGGER FLAG " sec " :: " F[i] }'
```

Must print nothing. Fix a miss by adding a row to that agent's table in its established four-column shape (`Trigger | Syntax | What it controls in flaitron | When to reach for it`), written from the matching `claude/CAPABILITIES.md` row and re-stated for that platform's availability story — not paraphrased from memory, and not normalized to Claude's wording.

Four properties are deliberate, and a future edit should preserve them:

- **`tr '\n' ' '` is load-bearing on macOS.** BWK `awk` rejects a newline inside a `-v` assignment (`awk: newline in string`), so the derived roster must reach `awk` space-separated. The `F[i] != ""` guards absorb the trailing separator.
- **The section guard is Pair F's `continue` idiom one level up.** A section naming *no* flag is skipped, not failed; only one that already commits to a partial roster is held to the full one. At mint time this exempted Codex's then-flagless table alongside the three stub sections, which have no table at all — demanding four flags there would have minted false positives on the check's first run, which is how a gate gets "temporarily" commented out. The exemption is self-clearing, and Codex has already spent it: CORE-460.4 backfilled that table to 11 rows and Codex entered the gate with no edit to this check. The stub sections remain exempt until they grow a first flag row.
- **The row-shape anchor `^| **\`--`** selects flag rows only.** `CAPABILITIES.md`'s non-flag triggers (`Effort / thinking level`, `/model <name>`, `/clear`, `Structured ask`, `Sub-agent`) are correctly excluded: they are platform-native controls, not portable skill-body flags, and each agent documents its own spelling.
- **`docs/AGENT-COMPAT.md` is deliberately *not* a mirror here.** Its own §"Scope of this matrix" declares the matrix structural and defers per-agent triggers to this table; CORE-460.3 de-enumerated its Grok/Cursor rows to a pointer rather than adding a third roster to police. Same for the thin `grok/` + `cursor/AGENTS-snippet.md`, which own wiring commands only. Recorded here so a later reader does not read their absence as an oversight.

**Pair J — command-stub `argument-hint:` ↔ the flags that stub documents.** `claude/commands/ft-*.md`'s `argument-hint:` is the only flag roster Claude Code surfaces to the operator *at the moment they type the slash command*, and nothing binds it to the prose in the file it lives in. Every other check is blind here: Pair B reads `claude/skills/*/SKILL.md` `description:` frontmatter, Pair I reads `CAPABILITIES.md` ↔ `PLATFORMS.md`, and Pair F does glob `claude/commands/*.md` but only for the four park-priority flags. So a stub can document a flag in its own `description:` and its own Usage bullet while the hint never names it — or carry no `argument-hint:` at all, which is what `/ft-epic-discovery` had done with `--deep` since the flag shipped, alongside the since-retired `/ft-stats --write` (CORE-475 found both on one pass). CORE-460.2 had already traced this exact class one field over: CORE-399's pattern survey named `ft-file-followup`'s `argument-hint` but not the two command stubs restating the same roster.

Reads: `claude/commands/ft-*.md`
CI step: `Pair J — command-stub argument-hint ↔ documented flags` — one-directional, prose → hint, from the stub's own `description:` and own-slug spans only (the step's comments say why cross-references are invisible and why the reverse direction is not checked). `MISSING HINT` is a stub that documents at least one flag and carries no `argument-hint:` line at all; `MISSING HINT FLAG` is a documented flag the hint never names. Fix by adding or extending that stub's `argument-hint:` in the house shape — required positional first, optional segments bracketed, short alias joined with `|` (`<TASK-ID> [--fast | -f] [--unattended]`) — never by deleting the flag from the prose to quiet the check.

Positional arguments are out of scope. `/ft-audit` (`<domain> [scope]`) and `/ft-audit-repo` (`all` / path) take arguments but no flags, so this pair is silent on their absent hints. Recorded here so a later reader does not read that silence as an oversight.

**Pair K — no-runtime mirror labels ↔ the canonical section they cite.** `docs/VISION.md` §"What we won't accept" is the canonical justification for flaitron's rejections; several surfaces restate one of them where it bears locally, and each restatement is a *labeled* mirror that names its source (`docs/CONVENTIONS.md` §"Canonical source with labeled mirrors" ratifies the pattern). Nothing binds the label to the thing it labels. Rename or delete a canonical bullet and every citation to it silently becomes a pointer to nothing; drop a pointer in an unrelated edit and the restatement reads as unsourced duplication to the next auditor — which is exactly what happened, from outside the repo, in the cross-repo sweep that routed CORE-487. Every pair above is blind here: B, E, and J are frontmatter- and flag-derived, I reads `CAPABILITIES.md` ↔ `PLATFORMS.md`, and the Phase 4 doc-drift sweep walks `docs/VISION.md` for staleness but is blind to whether the *citations pointing at it* still resolve — reading a doc for drift says nothing about labels held in five other files (CORE-491; VISION.md joined the sweep set at CORE-489.3).

**K1 — every citation resolves to a real canonical bullet.** `SPEC/scope-boundaries.md`'s PR-archetype bullets each carry `PR-rejection mirror of "<title>" in `docs/VISION.md`` or `… "<title>" above`. The cited title must still lead a bullet in the section named:

```sh
grep -oE 'PR-rejection mirror of "[^"]+" (in `docs/VISION\.md`|above)' SPEC/scope-boundaries.md |
while IFS= read -r cite; do
  title=$(printf '%s\n' "$cite" | sed -E 's/^PR-rejection mirror of "([^"]+)".*/\1/')
  case "$cite" in
    *'docs/VISION.md'*) src="docs/VISION.md"; sec="^## What we won.t accept$" ;;
    *)                  src="SPEC/scope-boundaries.md"; sec="^## What flaitron does NOT provide$" ;;
  esac
  awk -v s="$sec" '$0~s{f=1;next} f&&/^#/{exit} f&&/^- /' "$src" |
    grep -qF -- "$title" || echo "K1 MISS: \"$title\" not a bullet lead in $src"
done
```

**K2 — every point-of-use restatement still names its source.** Three sections restate one rejection as it applies to their own surface; each must still name `VISION.md`:

```sh
printf '%s\n' \
  'docs/EXTERNAL-AGENTS.md|^## Not an Orchestration Runtime|12' \
  'SPEC/gate-postures.md|^\*\*Runtime stays out\.\*\*|6' \
  'SPEC/loop.md|^## Runtime vs\. contract|12' |
while IFS='|' read -r file pat n; do
  grep -A"$n" -e "$pat" "$file" | grep -q 'VISION\.md' \
    || echo "K2 MISS: $file — section '$pat' no longer names VISION.md"
done
```

Both must print nothing. Fix a K1 miss by updating the citation in `SPEC/scope-boundaries.md` to the canonical bullet's current lead — never by renaming the canonical bullet back to satisfy the check. Fix a K2 miss by restoring the pointer in that section's own established shape.

- **It guards labels, not prose — on purpose.** Every pair above compares *derivable* rosters: a flag set, a directory listing, a command list. Paraphrase is not derivable, and the restatements legitimately differ in shape because each applies the rule to a different surface. A byte-match across them would be brittle and would push authors toward one flattened wording, which is the value the pattern exists to keep. Wording drift stays with "markdown is the schema; the assistant catches drift" (`docs/VISION.md` §"Schema validators") — the same reason flaitron declines a validator. What is mechanical is the *label*, and that is all this pair claims.
- **The two halves are asymmetric because the surfaces are.** `SPEC/scope-boundaries.md`'s mirror is a per-bullet list with a quoted title, so K1 can resolve each citation exactly. The other three are prose sections with no quoted title, so K2 falls back to presence-of-pointer — weaker, and the weaker half is the one that catches the drift CORE-487 was filed for. Pair F's "counts presence, not byte identity" idiom, one surface over.
- **`grep -qF --` and the `^- ` filter are both load-bearing.** `-F` stops `/` and `.` in a title like `Graph / multi-agent execution runtimes` from being read as a pattern; `--` stops a future title beginning with `-` from being parsed as a flag. Restricting to `^- ` means a title mentioned in surrounding prose cannot satisfy the check — only an actual bullet lead does. Titles are cited as *prefixes* of the canonical lead (`"Loop runners"` ⊂ `**Loop runners, schedulers, and session tooling.**`), so the assertion is substring-within-a-bullet-line, not equality.
- **`docs/PHILOSOPHY.md`, `docs/WORKTREES.md`, and `README.md` are deliberately not in K2.** PHILOSOPHY and README state the rule as narrative identity rather than as a sourced restatement, and WORKTREES carries a one-clause caveat rather than a section. Adding them would police three surfaces whose job is not to be a mirror. Recorded here so a later reader does not read their absence as an oversight.
- **`SPEC.md`'s always-loaded summaries are deliberately not in K2 either — they mirror the contract, not the justification.** §"What flaitron does NOT provide" and §"Loop tasks" each restate a rejection, so both read as K2 candidates; each cites the `SPEC/` module that owns the **contract** (`SPEC/scope-boundaries.md`, `SPEC/loop.md`), where K2 asserts presence of the **justification** (`grep -q 'VISION\.md'`). They are labeled mirrors of a different canonical, one layer down — [[CORE-558.2]] restored them as compactions of their module *"with no new claim, so the mirror relationship is unchanged"* — and adding a `VISION.md` pointer to always-loaded SPEC core to satisfy this check would spend the budget the shrink exists to protect ([[CORE-558.5]]). Naming the class rather than the one section is deliberate: the same restore minted three summaries in this shape (§"Cross-repo edit remit" is the third), so a bullet naming only one would invite the same re-filing against its sibling. Nothing binds a `SPEC.md` summary to the module it cites — [[CORE-558.2]]'s link-and-citation validator was a one-off Phase 3 run, not a standing check — and this pair does not claim to; the gap is recorded here as scope, not coverage.
- **Release-gate only, like D and F–I.** The `drift` CI job runs the release-context-free subset (A, B, C, H, J, M, N, O, P, Q) per `docs/CONVENTIONS.md` §"GitHub Actions CI"; promoting K there is a separate call, not implied by minting it.

**Pair L — `drift` CI job ↔ the §7.1 sources and catalogue entries it carries.** `docs/CONVENTIONS.md` §"GitHub Actions CI" states the relationship: three `drift` steps are *copies* of a check whose shell lives elsewhere — the wrapper-name invariant in `SPEC/layout.md` §"Skill namespace", shipped-skill parity and the context budget in `step-7.1-standing-checks.md` — and the eleven `Pair *` steps *are* the shell for their pair, catalogued above by a `Reads:` line. Nothing bound either relationship until this pair. [[CORE-535.3]] repaired Pair A's roster grep from `SPEC.md` to `SPEC/layout.md` here and missed the CI twin, so the `drift` job failed on every push from that commit through the entire v5.25.0 cut, reddening the README badge with no gate reading it ([[CORE-546]]). Pair H binds the *`validate`* job's `run:` steps to `AGENTS.md` §"Validation"; the `drift` job had no equivalent. This is it — extended by [[CORE-631.2]] to the catalogue rows when the shell moved into `ci.yml`.

What is compared is the **set of repo paths each check reads** — derivable from a fence, from a `run:` block, and from a `Reads:` line alike, and exactly what drifted. Byte identity is not available: a CI copy legitimately adds `bad=` accumulators, `|| exit 1`, and its own findings prose, and a catalogue line is prose.

```sh
top=" $(ls -A | tr '\n' ' ') "
paths() { sed -e 's/echo "[^"]*"//g' -e '/^[[:space:]]*#/d' -e 's/\\\././g' \
          | grep -oE '(\.?[A-Za-z0-9_-]+/)+[A-Za-z0-9_*.-]*|\b[A-Z][A-Za-z0-9_-]*\.(md|yml)\b' \
          | while IFS= read -r t; do
              case "$t" in */*) case "$top" in *" ${t%%/*} "*) printf '%s\n' "$t" ;; esac ;;
                         *) printf '%s\n' "$t" ;; esac
            done | sort -u; }
ci_paths() { awk -v s="$1" '
        index($0,"- name: "s)    {inb=1; next}
        inb && /^      - name: / {inb=0}
        inb' .github/workflows/ci.yml | paths; }

# Source rows — the shell lives in the named file; repair the CI copy to match it.
printf '%s\n' \
  'Wrapper-name invariant|SPEC/layout.md|^[*][*]Wrapper-name invariant' \
  'Shipped-skill parity|claude/skills/ft-release/step-7.1-standing-checks.md|^[*][*]Standing shipped-skill parity check' \
  'Context budget|claude/skills/ft-release/step-7.1-standing-checks.md|^[*][*]Standing context-budget check' |
while IFS='|' read -r step src pat; do
  ci=$(ci_paths "$step")
  s7=$(awk -v p="$pat" '
        $0~p                     {ins=1; next}
        ins && inf && /^```$/    {inf=0; next}
        ins && !inf && /^```sh$/ {inf=1; next}
        ins && !inf && /^[*][*]/ {ins=0}
        ins && inf' "$src" | paths)
  [ "$ci" = "$s7" ] || {
    echo "PAIR L MISS: $step — CI drift job and its source disagree on paths (repair the CI copy)"
    diff <(printf '%s\n' "$ci") <(printf '%s\n' "$s7") | sed 's/^/         /'
  }
done

# Catalogue rows — the shell lives in ci.yml; repair the entry's `Reads:` line to match it.
for p in A B C H J M N O P Q R; do
  ci=$(ci_paths "Pair $p ")
  rd=$(awk -v p="^[*][*]Pair $p " '
        $0~p                     {ins=1; next}
        ins && /^[*][*]/         {ins=0}
        ins && /^Reads: /' claude/skills/ft-release/step-7.1-mirror-pairs.md | paths)
  [ -n "$ci" ] || echo "PAIR L MISS: Pair $p — no CI step, or it reads no path"
  [ "$ci" = "$rd" ] || {
    echo "PAIR L MISS: Pair $p — CI step and its §7.1 Reads: line disagree on paths (repair the Reads: line)"
    diff <(printf '%s\n' "$ci") <(printf '%s\n' "$rd") | sed 's/^/         /'
  }
done
```

Must print nothing. A `<` line is a path the CI step reads and its source or `Reads:` line does not; a `>` line is the reverse. **Fix direction follows where the shell lives.** For the three source rows, repair the CI copy to match its source, never the reverse — the v5.25.0 failure was precisely a CI copy left behind by a correct §7.1 repair. For the eleven catalogue rows, the `ci.yml` step is the shell, so repair the `Reads:` line to say what the step now reads — unless the step's new read is itself the mistake, in which case the step is wrong on its own terms, not because the catalogue disagrees. A `no CI step` miss is a catalogue entry whose step was renamed or removed: restore the `Pair <letter> ` name prefix, or retire the entry.

- **The step-name prefix is the join key.** The mapping's first field matches `- name: ` by `index()` prefix, so a step keeps its binding when its parenthetical changes — at v5.25.0 the wrapper-name step read `(SPEC.md §"Skill namespace")` and still resolved. Catalogue rows join on `Pair <letter> ` (trailing space included, so `Pair A` never swallows a hypothetical `Pair AB`). The §7.1 local runner in the preamble keys on the same prefix.
- **Bracket classes, not `\*`, in the passed patterns.** The anchors travel through `-v p=` and are applied as *dynamic* regexes, where awk processes string escapes first: `^\*\*Pair B ` arrives as `^**Pair B ` — a malformed quantifier that silently matches far more than intended, which during development swallowed every later fence in the file. `[*][*]` has no escape to lose. Same family as §"Glob-free by design" in the standing checks: a matcher that fails open reports clean instead of reporting the truth.
- **`echo`-argument text, `#`-comment lines, and regex escapes are normalized out of both sides.** The adaptation delta lives in the findings messages; the design notes that moved into `ci.yml` with the shell ([[CORE-631.2]]) name paths freely as comments; and a grep pattern writes `SPEC/unattended-candidacy\.md` where the `Reads:` line writes the path. Stripping all three compares what each check *reads* rather than what it *says*. The `$top` filter drops any token whose first segment is not a repo-root entry — `s/` from a `sed` expression, `Acceptance/` from an awk regex, `SPEC_DIR/` from a placeholder — so a `Reads:` line never has to list noise to pass. Every mapped step still yields at least one path after the strip; the catalogue loop asserts it, so a step is never silently vacuous.
- **Coverage is the fourteen `drift` checks, and only those.** `docs/CONVENTIONS.md` §"GitHub Actions CI" deliberately keeps SOP currency, the README task counter, installed-surface policy, self-wiring, Pairs D, F, I, and K, and Pair A's content half in §7.1 alone. Pair L claims nothing about them, and nothing about the unbound final-newline step ([[CORE-621]]), which has no source and no catalogue entry. A new step added to the `drift` job needs a mapping row or a catalogue entry here, or it ships unbound.
- **Release-gate only, like D, F, I and K.** Promoting L into the `drift` job would make the job the sole judge of its own fidelity to a source it would then also be carrying — recorded here so a later reader does not read its absence as an oversight.

**Pair M — skill `description:` ↔ its command stub's `argument-hint:`.** A skill's `description:` is the surface an agent *dispatches* from: what Claude Code, Codex, Cursor or Grok matches natural language against when it picks which skill to run. A flag absent from it is wired, documented for humans in the body, named in the stub, and still invisible to that agent. Every other check is blind to this, and the blindness is structural rather than accidental: Pair B compares `description:` to `description:`, so it *derives* its work from the very field that is short. When a skill documents no flags at all, B's two halves derive `[]`, compare equal, and pass. [[CORE-554]] found three at once: `/ft-micro-task` named none of its two, `/ft-goal-task` none of its three, and `/ft-task` omitted `--fast`, the last two because their flags appeared only inside `args="…"` illustrations that Pair B's quote-strip correctly discards. M runs opposite to J, and the two compose into a chain — J is prose → hint, M is hint → `description:`, and Pair B then carries the flag across to Codex — which is why M covers only the Claude half and needs no Codex twin.

Reads: `claude/skills/ft-*/SKILL.md` · `claude/commands/<slug>.md`
CI step: `Pair M — skill description ↔ command-stub argument-hint` — `UNDOCUMENTED FLAG` is a flag the stub's hint offers the operator that the skill's own `description:` never documents (Pair F's `--low`/`--med`/`--fut`/`--high` are exempt by name, not as a general skip list); `MISSING STUB` is a shipped skill with no command stub at all. Fix an `UNDOCUMENTED FLAG` by adding a clause to that skill's `description:` in the house shape — `` With `--flag`, <active verb> `` or `` `--flag` <verb>s … `` — written from the skill's own Step 0 parse so the clause states what the flag actually does, and **never** by deleting the flag from the `argument-hint:` to quiet the check. Expect a fix here to cascade: Pair B will then demand the Codex twin. M is silent on a flag named in a `description:` but in no hint — that is J's `MISSING HINT FLAG` one layer down, and a gap to close with a new pair rather than by making M bidirectional.

**Pair N — `[unattended]` candidacy mirrors ↔ `SPEC/unattended-candidacy.md`.** [[CORE-EPIC-577]] made every filing surface *propose* `[unattended]` candidates at its write step, under one rule that lives once in `SPEC/unattended-candidacy.md`: attended, the candidates ride the surface's existing confirm gate; under `--fast` / `--unattended` the filer emits an `unattended-candidates:` line and writes no token. Each filer carries a labeled mirror at its write step (`docs/CONVENTIONS.md` §"Canonical source with labeled mirrors") plus that literal, so the emission shape is the same string on every surface and an operator-less caller can grep for one thing. Nothing bound the mirrors to the module: a filer that Reads the module and paraphrases the line degrades differently from its siblings with no detector — and the `.N` audit's promise is precisely that every surface degrades *identically*. The `.3`–`.6` children of that epic landed mirrors one commit at a time, which is why this pair runs per push.

Reads: `claude/skills` (every `*.md`, minus `claude/skills/ft-release/`) · `SPEC/unattended-candidacy.md`
CI step: `Pair N — "[unattended]" candidacy mirrors ↔ SPEC/unattended-candidacy.md` — trigger is naming the module, not an allowlist of filers. `NO CANDIDATES LITERAL` is a filer that cites the module but never emits the line it defines; `NO LABELED MIRROR` is a citation with no label in the fixed shape `` mirror of `SPEC/unattended-candidacy.md` §"<section>" ``. Fix both on the filer, in the module's §"Surfaces and mirrors" shape. Whether the label still *resolves* is Pair Q's half; N keeps the two presence halves Q cannot know about.

**Pair O — filing runners ↔ `SPEC/plan-filing.md` §"Filing commits".** Five skill bodies commit their own filing at hand-off — `/ft-file-followup` (default, `--park`, `--starter`), `/ft-audit`, and `/ft-refactor` — and `/ft-seed` commits its row edits the same way ([[CORE-619]]), all under one contract that lives once in §"Filing commits": a pre-check that sets `auto-commit = `, a post-stage read of the **whole** index (`git diff --cached`, no pathspec, not `--quiet`) so a foreign hunk is seen before the commit publishes it, and a citation naming the section that owns the rule. Each runner restates the motion in its own step shape, and nothing bound them: [[CORE-563]] minted the contract and four runners, [[CORE-591]] patched `/ft-refactor`'s pre-check only, and the runner sat without a post-stage read until [[CORE-593]] — three commits over one rule, each leaving a different runner short, with no detector between them. A partial repair is exactly what shipped three times in a row, which is why this pair runs per push.

Reads: `claude/skills` (every `*.md`, minus `claude/skills/ft-release/`) · the `SPEC/<module>.md` each runner cites
CI step: `Pair O — filing runners ↔ SPEC §"Filing commits"` — trigger is the `auto-commit = ` literal, not an allowlist of runners. `NO POST-STAGE DIFF` is a runner that sets the flag but never reads the staged index before committing — every `git diff --cached` it carries is the pre-check's `--quiet` probe; `NO RESOLVING CITATION` is a runner with no path-bearing `` `SPEC/<module>.md` §"Filing commits" `` citation (a bare `per §"Filing commits"` shorthand is fine *alongside* one, not instead of it). Fix both on the runner, in the shape `ft-file-followup/starter-mode.md` uses (a `git add` / `git diff --cached` / `git commit` fence plus a **Post-stage verification** paragraph — [[CORE-593]] is the worked example). The citation half asks only that a runner *name* a module path next to the section, so a module split that moves the section needs no edit here — whether the named module still carries the heading is Pair Q's question.

**Pair P — archived tasknotes ↔ SPEC.md §"Acceptance tick-through".** Closure's contract is one paragraph: tick every `## ✅ Acceptance` box the work satisfied, annotate the rest in place (`N/A — <reason>` / `not met — <reason>`), flip YAML `status:` to `completed`, then move the note. Nothing executed it. The 2026-09-19 `/ft-audit-repo` pass found 13 of 132 September archivals carrying only bare `- [ ]` under Acceptance — [[CORE-608]]'s closure line says "all three ticked" above three unticked boxes — and [[CORE-593]] archived with `status: in-progress`; `[unattended]` closures missed at 24% against 6% attended ([[CORE-EPIC-610]]). Every other pair reads skill bodies, stubs, or contract modules; none reads the archive. An archival lands one commit at a time, usually under `--fast` or `--unattended`, which is exactly where the miss rate is highest — a detector that fires only at the next cut would let a whole cut's worth accumulate, which is why this pair runs per push.

Reads: `.flaitron/tasknote/archive/*/*.md`
CI step: `Pair P — archived-tasknote integrity (docs/CONVENTIONS.md §"Archived-tasknote integrity floor")` — from a date floor forward (`floor=2026-09-20`, a constant in the step; `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor" is the documented source, and it never moves). `STATUS NOT COMPLETED` is a post-floor note whose frontmatter still reads `in-progress` (or a near-miss like `complete`); `UNANNOTATED BOX` is a post-floor note with an unticked Acceptance box that carries neither annotation token (`N/A` or `not met` / `not-met`, case-insensitive, anywhere on the line — the canonical em-dash form is what closure writes; the tolerance keeps a punctuation variant from inviting an edit to a write-once record). Both are closure misses on a note that has already been moved, and the archive is write-once — so the fix is **not** to edit the archived note. Re-open it: flip `status:` and annotate or tick the box as the pre-archive closure write it should have been, in the same commit as whatever closure it belonged to, and say so in the commit message. [[CORE-610.3]] puts the same two greps in front of the archive move so a post-floor miss should not reach this pair at all. An unstamped note is exempt and invisible here — a stamp miss belongs to CORE-610.4's stamp-fill gate, not this pair.

**Pair Q — `§"Title"` citations ↔ the heading or bold-lead they name.** Live markdown carries some 600 path-bearing section citations — `` `SPEC/gates.md` §"Conditional skip rule" `` and its bare and `[link](path)` shapes — and every one is a pointer that goes stale the moment its target is renamed, moved by a lazy split, or demoted from heading to prose. Pairs K, N and O each resolved the citations of *one* file; the other ~130 surfaces had no detector, and [[CORE-535.3]]'s split is the recorded case of a correct move that left pointers behind. [[CORE-492]] and [[CORE-543]] each declined this guard on the same three findings — zero genuine dangles, false positives from `## Completed` rows quoting the drift they record, and the split's real defects lying outside any `§` citation — and Pair L took the third. The first two are what changed: [[CORE-620]] rotated the archaeology into `.flaitron/PLAN-ARCHIVE.md`, [[CORE-609]] ruled a `**Title.**` bold-lead a valid target, and the sweep that filed [[CORE-622.3]] found the false-positive set reduced to placeholders. `docs/CONVENTIONS.md` §"Section citations may target a heading or a bold-lead paragraph" is the documented rule. A citation lands or goes stale one commit at a time, which is why this pair runs per push.

Reads: every tracked `*.md` except `.flaitron/tasknote/archive/` and `.flaitron/PLAN-ARCHIVE.md`; a `.flaitron/core/` prefix is stripped; a pre-rename `.flowtron/` path is read at its `.flaitron/` location; `<SPEC_DIR>` resolves to `SPEC/` and `<tasknote dir>` to `.flaitron/tasknote/`
CI step: `Pair Q — section citations resolve (heading or bold-lead)` — `MISSING FILE` is a citation whose path resolves neither from the repo root nor from the citing file's directory — an absolute or `~`-rooted path is out of repo, unresolvable from any checkout, and skipped rather than reported ([[CORE-651.2]]; the `brand/` kit's citations of the operator's private layer are the live case); `STALE SECTION` is one whose target has no line carrying `# <Title>` or `**<Title>` as a prefix — a heading at any level, or a bold-lead. Fix either on the **citer**: repoint the path to where the section now lives, or update the title to the heading's current text — never rename a heading back, and never move a sentence-ending period inside the quotes (`§"Fan-out."` was the only class of break the landing sweep found, five sites). A citation that is deliberately illustrative belongs in the placeholder shape (`` `<file>.md` §"<Section>" ``) so the skip rule reads it as one. Pairs N and O are instances — their `STALE LABEL` / `STALE CITATION` halves retired into this pair at [[CORE-622.3]]; K stays separate, its mirrors being `docs/VISION.md` bullets, not `§` citations. Bare-section citations (`SPEC §"Task-line format"`, `per §"Filing commits"`) are out of scope: their target is whatever the sentence last named, which a line-local grep cannot know. The path-bearing shape is the contract for a checkable citation.

**Pair R — checked PLAN stub rows ↔ `SPEC/plan-filing.md` §"`## Completed` archive convention".** Phase 4's stub rewrite (`- [x] **TASK-ID** [model] | shortname — Completed YYYY-MM-DD.`) requires `| shortname` — "so visualizers have a row title" — and must copy the trailing bracket-token run verbatim from the original row, never reconstructing it from `[model]` alone. [[CORE-632.2]]'s unattended close did neither: it wrote `- [x] **CORE-632.2** Completed 2026-09-20.`, dropping both `[light]🔧 [unattended]` and `| readme-logo-webp` in the same rewrite, and nothing caught it — an operator skim during [[CORE-635]] did. `SPEC/fixtures/plan/exclusions.md`'s `FX-462` now pins the shape: the row still fails `viz/src/parser.ts`'s `TASK_LINE` grammar and surfaces as `unparsed`, but nothing runs that parser as a gate over the live `PLAN.md` — this pair is presence, not the full task-line grammar, and greps the working file directly.

Reads: `.flaitron/PLAN.md` · `.flaitron/PLAN-ARCHIVE.md`
CI step: `Pair R — checked PLAN stub rows carry a shortname pipe` — `NO SHORTNAME` is a checked, bold-ID row ending in `Completed YYYY-MM-DD.` with no `| ` pipe anywhere in the line. The inline-audit-fix exception (§"Exception — inline audit fixes") ends in `fixed inline.` instead, so it never matches the tail and needs no carve-out. Fix a finding by restoring `| shortname` — and any other trailing bracket token (`[model]`, `[unattended]`, `[handoff]`) the original row carried — to the flagged line, copied verbatim from the row's pre-closure form (git history, or the archived tasknote's `title:`).
