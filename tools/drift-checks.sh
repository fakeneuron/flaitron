#!/usr/bin/env bash
# Cross-file drift checks — the shell of the CI `drift` job and of the
# `/ft-release` §7.1 release walk (CORE-734.2). Both invoke this file, so
# neither parses the other's shape:
#
#   bash tools/drift-checks.sh            # every check (CI)
#   bash tools/drift-checks.sh 'pair_*' wrapper_name_invariant
#                                         # names or globs pick checks (§7.1)
#
# Self-host repo maintenance, not a workflow tool: adopters never run it, and
# it is not a second CLI carve-out (SPEC/scope-boundaries.md).
#
# Every function IS the shell for its check (CORE-734.4); nothing else
# carries a copy. SPEC/layout.md and step-7.1-standing-checks.md state the
# rule for wrapper_name_invariant, shipped_skill_parity and context_budget
# and point here. Each `pair_*` function has a §7.1 catalogue entry in
# step-7.1-mirror-pairs.md that names it and says what a finding means.
# Design notes sit as `#` comments inside the body, next to the line they
# explain. skill_pin_guard_parity (CORE-729) and final_newline (CORE-621)
# have neither a source rule nor a catalogue entry.
#
# Shape rules — the dispatcher below reads them:
# - One check per top-level function, `name() {` and its closing `}` each at
#   column 0, preceded by a `#` line carrying the check's title. Checks run in
#   file order. A function here that is not a check would run as one.
# - Each check runs as its own `bash -e` process, no `pipefail` — the shell
#   GitHub ran each `run:` step in before the move. A subshell would not do:
#   `set -e` is ignored inside `( … ) || …`. Pair B/J/M fail on an empty
#   `grep -o` under pipefail (CORE-729).
# - Each loop carries a `bad=` accumulator so a finding fails the check. Do not
#   "simplify" that to `out=$(for … done)`: bash's `$( )` parser reads a `case`
#   pattern's closing `)` as the end of the substitution, and the flag checks
#   below die with `syntax error near unexpected token ';;'`.
# - Each check counts what it actually compared in `n` and fails
#   `VACUOUS <check>` on zero (CORE-739.2): a renamed heading, a moved
#   directory or a copy without `.git` empties the loop, and an empty loop
#   finds nothing. The floor is per check, not per row, so one stub with no
#   flags or one glob row with no file stays legal. Count with n=$((n+1)),
#   never ((n++)), which returns 1 from zero and ends a `bash -e` check.
#   skill_pin_guard_parity and pair_h need no counter: an empty read already
#   fails their own guards.
# - bash 3.2 compatible: the §7.1 walk runs on the operator's machine.

# Wrapper-name invariant (SPEC/layout.md §"Skill namespace")
wrapper_name_invariant() {
bad=
n=0
for f in claude/commands/ft-*.md; do
  [ -f "$f" ] || continue
  n=$((n+1))
  grep -q "\`$(basename "$f" .md)\`" "$f" || { echo "NO SELF-NAME  $f"; bad=1; }
done
[ "$n" -gt 0 ] || { echo "VACUOUS wrapper_name_invariant  no command stub examined"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Shipped-skill parity (claude/skills ↔ codex/skills)
shipped_skill_parity() {
# Two empty inventories diff clean, so both empty is the vacuous case; one
# empty side is already a diff.
cl=$(find claude/skills -mindepth 1 -maxdepth 1 -type d -exec test -f "{}/SKILL.md" \; -print | sed 's#^claude/skills/##' | sort)
cx=$(find codex/skills  -mindepth 1 -maxdepth 1 -type d -exec test -f "{}/SKILL.md" \; -print | sed 's#^codex/skills/##' | sort)
[ -n "$cl$cx" ] || { echo "VACUOUS shipped_skill_parity  no skill inventory read"; exit 1; }
diff -u <([ -z "$cl" ] || printf '%s\n' "$cl") <([ -z "$cx" ] || printf '%s\n' "$cx")
}

# Skill/pin guard parity (docs/PLATFORMS.md §"One canonical install path per project")
skill_pin_guard_parity() {
# CORE-729: one byte-identical guard paragraph in each of the seven
# adopter-subset bodies that resolve <root>; edit all seven together.
got=$(grep -h '^\*\*Skill/pin guard\.\*\*' claude/skills/*/SKILL.md | sort | uniq -c | awk '{print $1}' | tr '\n' ' ')
[ "$got" = "7 " ] || { echo "GUARD DRIFT  copies-per-variant: $got (want one variant x7)"; exit 1; }
diff -u <(printf 'claude/skills/%s/SKILL.md\n' ft-close-epic ft-epic-discovery ft-file-followup ft-micro-task ft-refactor ft-seed ft-task) \
        <(grep -l '^\*\*Skill/pin guard\.\*\*' claude/skills/*/SKILL.md)
}

# Context budget (docs/CONTEXT-BUDGET.md §"Budgets")
context_budget() {
# Reads the Budgets table and restates no number. The release-time reading
# of a finding (§"Known over budget") is in step-7.1-standing-checks.md.
bad=
# $exact is the set of non-glob rows, excluded from a glob row's expansion
# so the most specific row wins. Collapse newlines: $(...) keeps them, and
# the case pattern below matches a space-delimited path. Without tr, a
# specific row never exempts its file from the glob row (CORE-690:
# ft-release at 34641 failed the 33000 glob while staying under its own
# 40000 row).
n=0
exact=$(awk '/^## Budgets$/,/^## Known over budget/' docs/CONTEXT-BUDGET.md \
        | grep -E '^\| `[^`]+` \| [0-9,]+ \|' \
        | sed -E 's/^\| `([^`]+)` \|.*/\1/' \
        | grep -v '\*' \
        | tr '\n' ' ')
while IFS='|' read -r surface budget; do
  budget=${budget//,/}
  case "$surface" in
    # A row ending in /** is a directory total: sum every file under it and
    # compare the sum. It is not a glob to expand, and it neither exempts
    # nor is exempted by the per-file rows, so a fragment counts once toward
    # its parent's directory row and again toward any per-file row it
    # matches. `find` on a literal directory, no glob to go unmatched; the
    # same find … -exec cat | wc -c idiom as the §7.1 ledger refresh, so
    # the two agree. This arm sits first because *'*'* would otherwise catch it.
    *'**')
      [ -d "${surface%/\*\*}" ] || { echo "MISSING DIR  $surface"; bad=1; continue; }
      sz=$(find "${surface%/\*\*}" -type f -exec cat {} + | wc -c)
      n=$((n+1))
      [ "$sz" -le "$budget" ] || { echo "OVER BUDGET  $surface  $sz > $budget"; bad=1; }
      ;;
    # Globs stay globs, an allowed exception to step-7.1-standing-checks.md
    # §"Glob-free by design": a newly shipped skill or SPEC/ module is
    # measured with no edit here. Do not turn them into find loops. Unquoted
    # $surface expands under bash; an unmatched pattern stays literal and
    # the -f test skips it.
    *'*'*)
      for f in $surface; do
        [ -f "$f" ] || continue
        case " $exact " in *" $f "*) continue ;; esac
        sz=$(wc -c < "$f")
        n=$((n+1))
        [ "$sz" -le "$budget" ] || { echo "OVER BUDGET  $f  $sz > $budget"; bad=1; }
      done
      ;;
    *)
      sz=$(wc -c < "$surface")
      n=$((n+1))
      [ "$sz" -le "$budget" ] || { echo "OVER BUDGET  $surface  $sz > $budget"; bad=1; }
      ;;
  esac
done < <(awk '/^## Budgets$/,/^## Known over budget/' docs/CONTEXT-BUDGET.md \
         | grep -E '^\| `[^`]+` \| [0-9,]+ \|' \
         | sed -E 's/^\| `([^`]+)` \| ([0-9,]+) \|.*/\1|\2/')
# A renamed `## Budgets` heading or reshaped row leaves the read empty.
[ "$n" -gt 0 ] || { echo "VACUOUS context_budget  no Budgets-table surface measured"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Final newline (.editorconfig insert_final_newline)
final_newline() {
# `.flaitron/tasknote/archive/` is excluded like pair_p/pair_q below: it's
# write-once history predating this check, not a live surface to ratchet.
bad=
n=0
while IFS= read -r f; do
  case "$f" in .flaitron/tasknote/archive/*) continue ;; esac
  [ -s "$f" ] || continue
  n=$((n+1))
  [ -z "$(tail -c1 "$f")" ] || { echo "NO FINAL NEWLINE  $f"; bad=1; }
done < <(git grep -Il '' -- .)
# Outside a git checkout `git grep` lists nothing.
[ "$n" -gt 0 ] || { echo "VACUOUS final_newline  no tracked text file examined"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair B — Claude skill flags ↔ Codex wrapper descriptions
pair_b() {
# The sed that strips double-quoted segments is load-bearing, not
# incidental: descriptions carry args="CORE-004 --debug --fast"-style
# illustrations, and counting those inflates the Claude set with flags
# the description never *documents* — dropping the strip takes this check
# from three real findings to six, half of them noise (CORE-420.5
# measured both). Pairs J and M reuse this pipeline verbatim; a change to
# what counts as a documented flag belongs in B, J and M together.
# Two empty flag sets compare equal, so only a pair with a flag on either
# side counts toward the floor.
bad=
n=0
for d in claude/skills/ft-*/SKILL.md; do
  s=$(basename "$(dirname "$d")"); c="codex/skills/$s/SKILL.md"; [ -f "$c" ] || continue
  cf=$(grep -m1 '^description:' "$d" | sed -E 's/"[^"]*"//g' | grep -oE '\-\-[a-z][a-z-]+' | sort -u | tr '\n' ' ')
  xf=$(grep -m1 '^description:' "$c" | sed -E 's/"[^"]*"//g' | grep -oE '\-\-[a-z][a-z-]+' | sort -u | tr '\n' ' ')
  [ -z "$cf$xf" ] || n=$((n+1))
  [ "$cf" = "$xf" ] || { echo "MISMATCH $s | claude:[$cf] codex:[$xf]"; bad=1; }
done
[ "$n" -gt 0 ] || { echo "VACUOUS pair_b  no Codex-paired flag set compared"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair C — template back-link depth
pair_c() {
# grep on a missing templates/ exits 2, which `if` reads as clean.
n=$(find templates -type f | wc -l)
[ "$n" -gt 0 ] || { echo "VACUOUS pair_c  no template file examined"; exit 1; }
if grep -rn '](\.\./\.\./PLAN\.md)' templates/; then
  echo "template back-link is one level too deep; skills write templates one level under .flaitron/"
  exit 1
fi
}

# Pair H — validation roster ↔ ci.yml (AGENTS.md §"Validation")
pair_h() {
# AGENTS §Validation fences vs the validate job's `- run:` steps, minus
# the install step, byte-for-byte and in order. The presence half that
# grepped the prose sites (CONVENTIONS, the tasknote README, /ft-release
# Step 6) went when CORE-734.7 made them point at AGENTS.md instead of
# restating the roster; ci.yml is the one copy a reader cannot replace
# with a pointer, because a runner executes it.
ssot=$(awk '/^## Validation$/,/^## Dev Server$/' AGENTS.md | grep -E '^(npm --prefix viz |node --)' || true)
ci=$(grep -E '^      - run: ' .github/workflows/ci.yml | sed 's/^      - run: //' | grep -vx 'npm --prefix viz ci' || true)
# Two empty extractions diff clean, so a renamed heading or reshaped
# fence would pass with nothing bound; an empty side is a finding. The
# `|| true`s keep `bash -e` from exiting on the empty grep before the
# finding can say which side it is.
[ -n "$ssot" ] || { echo "NO VALIDATION ROSTER  AGENTS.md"; exit 1; }
[ -n "$ci" ] || { echo "NO VALIDATE RUN STEPS  .github/workflows/ci.yml"; exit 1; }
diff -u <(printf '%s\n' "$ssot") <(printf '%s\n' "$ci") || exit 1
}

# Pair J — command-stub argument-hint ↔ documented flags
pair_j() {
# Both halves derive from the stub itself — one file per skill, no
# cross-file join and no listed roster, so a stub added or a flag landed
# later is covered the day it lands. Four properties are deliberate:
# - The flag source is stub-local and structural, which is what makes
#   cross-references invisible. A flag counts only from the stub's own
#   description: line, or from a backticked span that invokes the stub's
#   *own* slug. See-also sentences never reach description:, and every
#   cross-reference in a body carries either a foreign slug inside the
#   span (`/ft-task --fast` in ft-micro-task.md) or no slug at all
#   (`--fast` in ft-close-epic.md's "there is no --fast here"). The span
#   rule excludes both shapes, so no phrase blocklist is needed or
#   wanted; that version breaks the first time someone rewords a
#   sentence.
# - ${s} braces and the trailing [^a-z-] are both load-bearing. zsh
#   parses a bare $s[ as an array subscript and dies with `bad math
#   expression`; grep then receives an empty pattern, matches every span,
#   and the check quietly reports cross-references as drift instead of
#   failing loudly. The character class stops /ft-audit from swallowing
#   /ft-audit-repo — every span ends in a backtick, so a slug at the end
#   of one still has a character to match.
# - The quote-strip is Pair B's pipeline verbatim — same sed, same
#   load-bearing reason CORE-420.5 measured.
# - It is one-directional (prose → hint), on purpose. A hint may
#   legitimately name more than the prose documents: short aliases
#   (-f / -d / -p), which the --[a-z] extraction never sees, and
#   ft-file-followup's --low/--med/--fut/--high, which are --park's
#   arguments (park-mode.md §"Step P2" owns them). Checking the reverse
#   would report every one of those as drift. The same asymmetry costs a
#   little coverage — ft-close-epic names --unattended only inside a
#   negation clause, derives an empty set and passes vacuously — which is
#   the `continue` idiom: a stub documenting no flag is skipped, not
#   failed. The floor counts flags checked across every stub, so the
#   skip stays legal while all stubs skipping does not.
bad=
n=0
for f in claude/commands/ft-*.md; do
  s=$(basename "$f" .md)
  own=$( { grep -m1 '^description:' "$f" | sed -E 's/"[^"]*"//g'
           grep -o '`[^`]*`' "$f" | grep -E -- "/${s}[^a-z-]" ; } \
         | grep -oE -e '--[a-z][a-z-]+' | sort -u | tr '\n' ' ')
  [ -z "$own" ] && continue
  hint=$(grep -m1 '^argument-hint:' "$f") \
    || { echo "MISSING HINT $s :: $own"; bad=1; n=$((n+1)); continue; }
  for fl in $(printf '%s' "$own"); do
    n=$((n+1))
    case "$hint" in *"$fl"*) ;; *) echo "MISSING HINT FLAG $s $fl"; bad=1 ;; esac
  done
done
[ "$n" -gt 0 ] || { echo "VACUOUS pair_j  no documented flag checked"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair M — skill description ↔ command-stub argument-hint
pair_m() {
# claude/commands/ft-*.md's argument-hint: is the ground truth, and Pair J
# is what makes it trustworthy — J holds each hint to the flags its own
# stub documents, so the hint cannot quietly fall behind. Both halves are
# one file each with no cross-file join. Five properties are deliberate:
# - The flag extraction is Pair B's pipeline verbatim — same quote-strip,
#   same load-bearing reason CORE-420.5 measured. A change to what counts
#   as a *documented* flag belongs in B, J and M together, or the three
#   start disagreeing.
# - It runs opposite to Pair J, and the two compose into a chain. J is
#   prose → hint; M is hint → description:. Together they carry a flag
#   from the stub's Usage bullet all the way to the dispatch surface, and
#   Pair B then carries it across to Codex — which is why M covers only
#   the Claude half and needs no Codex twin.
# - The park-priority exemption names --park's four arguments, and is not
#   a blocklist. ft-file-followup's hint carries --low/--med/--fut/--high;
#   its description: documents the --park mode they modify and would bloat
#   past readability listing all four. They are arguments, not skill
#   modes: park-mode.md §"Step P2" owns the mapping and
#   SPEC/tasknote-selection.md states it (CORE-734.5 retired Pair F, which
#   mirrored them elsewhere). The case names exactly that set; do not grow
#   it into a general skip list for whatever fires next.
# - Short aliases are invisible by construction. The --[a-z] extraction
#   never sees -f / -d / -p, so a hint's [--fast | -f] contributes only
#   --fast, exactly as in B and J. No description is ever asked to spell
#   an alias.
# - It is silent on a flag named in a description: but in no hint. That is
#   J's MISSING HINT FLAG one layer down when the stub's prose documents
#   it, and otherwise a mismatch no pair claims. Anyone closing that gap
#   should mint a new pair rather than make M bidirectional, which would
#   report every deliberate asymmetry above as drift.
bad=
n=0
for d in claude/skills/ft-*/SKILL.md; do
  s=$(basename "$(dirname "$d")"); c="claude/commands/$s.md"
  [ -f "$c" ] || { echo "MISSING STUB  $s"; bad=1; n=$((n+1)); continue; }
  df=" $(grep -m1 '^description:' "$d" | sed -E 's/"[^"]*"//g' \
         | grep -oE '\-\-[a-z][a-z-]+' | sort -u | tr '\n' ' ')"
  for fl in $(grep -m1 '^argument-hint:' "$c" | grep -oE '\-\-[a-z][a-z-]+' | sort -u); do
    case "$fl" in --low|--med|--fut|--high) continue ;; esac
    n=$((n+1))
    case "$df" in *" $fl "*) ;; *) echo "UNDOCUMENTED FLAG $s $fl"; bad=1 ;; esac
  done
done
[ "$n" -gt 0 ] || { echo "VACUOUS pair_m  no argument-hint flag checked"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair N — "[unattended]" candidacy mirrors ↔ SPEC/unattended-candidacy.md
pair_n() {
# Trigger is naming the module, not an allowlist of filers — a skill that
# starts Reading SPEC/unattended-candidacy.md is bound the day it does.
# claude/skills/ft-release/ is excluded because this pair's catalogue
# entry lives there; it is not a filer.
# Vacuous at birth, on purpose: at the module's own landing (CORE-577.2)
# no filer named it yet, so the loop iterated nothing and the step passed
# empty. Filers have named it since, and the CORE-739.2 floor now fails
# that state: no filer left means the trigger grep went dry.
# Whether the label still resolves is Pair Q's half: N checked its own
# labels against a heading in the module until CORE-622.3 generalised
# that resolution to every path-bearing citation. N keeps the two
# presence halves Q cannot know about — that a filer emits the literal,
# and that its citation is *labeled* as a mirror.
bad=
n=0
for f in $(grep -rl 'SPEC/unattended-candidacy\.md' claude/skills --include='*.md' | grep -v '^claude/skills/ft-release/'); do
  n=$((n+1))
  grep -q 'unattended-candidates:' "$f" || { echo "NO CANDIDATES LITERAL  $f"; bad=1; }
  grep -qE 'mirror of `SPEC/unattended-candidacy\.md` §"[^"]+"' "$f" || { echo "NO LABELED MIRROR  $f"; bad=1; }
done
[ "$n" -gt 0 ] || { echo "VACUOUS pair_n  no filer naming SPEC/unattended-candidacy.md"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair O — filing runners ↔ SPEC §"Filing commits"
pair_o() {
# Trigger is the `auto-commit = ` literal, not an allowlist of runners — a
# skill that starts setting the flag is bound the day it does.
# claude/skills/ft-release/ is excluded because this pair's catalogue
# entry lives there; it is not a filer.
# - The --quiet exclusion is what separates the two reads. The pre-check
#   runs `git diff --cached --quiet` to learn whether the index is empty;
#   the post-stage verification runs `git diff --cached` to *read* it.
#   Both share a prefix, so a presence grep would pass on the pre-check
#   alone — precisely the state /ft-refactor was in between CORE-591 and
#   CORE-593. grep -qv on the second stage asks for at least one line
#   that is not the probe.
# - Three citation shapes count, on purpose. Runners write the citation
#   as `SPEC/x.md` §"…" (backticked), SPEC/x.md §"…" (bare), or
#   ](../../../SPEC/x.md) §"…" (a markdown link). The [`)]? class absorbs
#   the closing backtick or paren; the same three shapes are what Pair Q
#   extracts, so a citation that passes here is one Q resolves. A fourth
#   shape needs a class edit in both, not a new pair.
# - STALE CITATION retired into Pair Q at CORE-622.3: this block used to
#   open each named module and anchor `^## Filing commits`; Q resolves the
#   same citation against a heading-or-bold-lead prefix instead.
bad=
n=0
for f in $(grep -rl 'auto-commit = ' claude/skills --include='*.md' | grep -v '^claude/skills/ft-release/'); do
  n=$((n+1))
  grep -e 'git diff --cached' "$f" | grep -qv -e '--quiet' || { echo "NO POST-STAGE DIFF  $f"; bad=1; }
  grep -qE 'SPEC/[A-Za-z0-9_.-]+\.md[`)]? §"Filing commits"' "$f" || { echo "NO RESOLVING CITATION  $f"; bad=1; }
done
[ "$n" -gt 0 ] || { echo "VACUOUS pair_o  no runner setting auto-commit"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair P — archived-tasknote integrity (docs/CONVENTIONS.md §"Archived-tasknote integrity floor")
pair_p() {
# Archived tasknotes are historical records (SPEC.md §"Write-once
# policy"), so the check applies from a date floor forward and never asks
# for a backfill: a note whose **Archived:** stamp is before the floor —
# or has no parseable YYYY-MM-DD stamp at all — is exempt.
# - The floor is a constant. It marks the day the check started existing;
#   moving it either way is a backfill or an amnesty. docs/CONVENTIONS.md
#   §"Archived-tasknote integrity floor" is the documented source.
# - Token match, not em-dash match. The archive writes the annotation nine
#   ways (`N/A —`, `N/A,`, `not-met`, `not met**:`, `not met).`); the
#   check accepts N/A or not met / not-met, case-insensitive, anywhere on
#   the box's line. A punctuation variant is a style miss, not a closure
#   miss, and reddening CI over it would teach operators to edit archived
#   notes.
# - Unparseable stamp → exempt, and that is a known gap. Two legacy notes
#   (CORE-410.3, CORE-577.6) hold the template's YYYY-MM-DD placeholder.
#   A closure that leaves the placeholder unfilled is therefore invisible
#   here — a stamp miss, owned by CORE-610.4's stamp-fill gate on the
#   closure surfaces. Do not "fix" it by treating an unstamped note as
#   post-floor: that retroactively binds the two legacy files.
# - [[ "$d" < "$floor" ]], not [ "$d" \> … ]. ISO dates compare
#   lexically, and the [[ form works in bash and zsh alike; the [ form
#   with an escaped operator fails in zsh with `condition expected`.
# - || true on both substitutions is load-bearing. This shell is bash -e,
#   and an assignment whose command substitution ends in a grep that
#   matched nothing exits the step — without the guard the first *clean*
#   post-floor note (no bare boxes → grep -v returns 1) would fail the
#   job, the exact inversion of what the step is for. Found on the
#   mutated-copy proof in CORE-610.2; every earlier step avoids the trap
#   by ending its pipelines in sort/tr, which this one cannot.
# - Only ## ✅ Acceptance is read. ## 🧩 Subtasks is exempt by contract
#   (SPEC.md §"Acceptance tick-through"); the awk window closes at the
#   next ## heading, so Subtasks boxes never enter the grep.
bad=
n=0
floor=2026-09-20
for f in .flaitron/tasknote/archive/*/*.md; do
  d=$(grep -m1 -oE '^\*\*Archived:\*\* +[0-9]{4}-[0-9]{2}-[0-9]{2}' "$f" | sed -E 's/.* //' || true)
  [ -n "$d" ] || continue
  [[ "$d" < "$floor" ]] && continue
  n=$((n+1))
  grep -q '^status: completed$' "$f" || { echo "STATUS NOT COMPLETED  $f"; bad=1; }
  bare=$(awk '/^## ✅ Acceptance/{a=1;next} a&&/^## /{a=0} a' "$f" | grep -E '^ *- \[ \]' | grep -viE 'N/A|not[ -]met' || true)
  [ -z "$bare" ] || { printf '%s\n' "$bare" | sed "s|^|UNANNOTATED BOX  $f  |"; bad=1; }
done
[ "$n" -gt 0 ] || { echo "VACUOUS pair_p  no post-floor archived note examined"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair Q — section citations resolve (heading or bold-lead)
pair_q() {
# Scope is every tracked .md except the two write-once archives, which
# quote their own drift history by design. A citation is skipped when its
# path or section carries a placeholder (<…>, …) or a regex escape (\),
# or when its path is absolute or ~-rooted — an out-of-repo pointer (the
# brand/ kit cites the operator's private layer) that no checkout can
# resolve, so it is neither a miss nor a match; the '~/' pattern is
# quoted because bash tilde-expands an unquoted case pattern. A
# .flaitron/core/ prefix is the adopter view of this repo and is
# stripped; a pre-rename .flowtron/ path (v5-era history kept as
# written — closed PLAN rows, UPGRADING's v4 recipe) resolves at its
# v6 location, so it gets the same treatment; the four skill-local path variables (<SPEC_DIR>, <SKILL_DIR>,
# <FT>, <tasknote dir>) resolve to what every Step 0 sets them to, so a
# skill→module citation is read, not skipped. A path is tried
# repo-root-relative, then relative to the citing file.
# - Prefix match, heading-level-blind, and substring-of-line. `# <Title>`
#   is a substring of `## <Title>` and `### <Title>` alike, and
#   `**<Title>` matches a bold-lead wherever it opens; both are prefixes,
#   so §"Three postures" still resolves after the heading grows a suffix,
#   while §"Phase 4: Closure" does *not* resolve against
#   `## 🚀 Phase 4: Closure` — cite the emoji. A `# <Title>` inside a
#   fence satisfies the match; that fails open, not closed, and is
#   accepted for the same reason Pair N accepted it.
# - || true on each extraction pipeline is load-bearing. Under
#   `bash -eo pipefail` a grep -oE with no match ends the brace group, and
#   the shapes after it are silently dropped for that file — a fail-open
#   this shell (bash -e, no pipefail) would not show. Same family as
#   Pair P's || true note.
# - | is the field separator because no title carries one. The live set
#   has none; a title that ever does needs a different separator here,
#   not a quoting fix.
bad=
n=0
while IFS= read -r f; do
  while IFS='|' read -r path sec; do
    case "$path$sec" in ''|*'<'*|*'…'*|*'\'*|/*|'~/'*) continue ;; esac
    n=$((n+1))
    path=${path#.flowtron/core/}; path=${path#.flaitron/core/}
    case "$path" in .flowtron/*) path=.flaitron/${path#.flowtron/} ;; esac
    case "$path" in
      ./*|../*) t="$(dirname "$f")/$path" ;;
      *) t="$path"; [ -f "$t" ] || t="$(dirname "$f")/$path" ;;
    esac
    [ -f "$t" ] || { printf 'MISSING FILE  %s — %s §"%s"\n' "$f" "$path" "$sec"; bad=1; continue; }
    grep -qF -e "# $sec" -e "**$sec" "$t" || { printf 'STALE SECTION  %s — %s §"%s"\n' "$f" "$path" "$sec"; bad=1; }
  done < <({ grep -oE '`[^`]+\.md` §"[^"]+"' "$f" | sed -E 's/^`([^`]+)` §"(.*)"$/\1|\2/' || true
             grep -oE '\]\([^)]+\.md\) §"[^"]+"' "$f" | sed -E 's/^\]\(([^)]+)\) §"(.*)"$/\1|\2/' || true
             grep -oE '(^|[^`(/A-Za-z0-9_.<>-])[A-Za-z0-9_./-]+\.md §"[^"]+"' "$f" | sed -E 's/^[^A-Za-z0-9_.]*([^ ]+) §"(.*)"$/\1|\2/' || true
           } | sed -E 's#^<SPEC_DIR>/#SPEC/#; s#^<SKILL_DIR>/#./#; s#^<FT>/##; s#^<tasknote dir>/#.flaitron/tasknote/#')
done < <(git ls-files '*.md' | grep -v -e '^\.flaitron/tasknote/archive/' -e '^\.flaitron/PLAN-ARCHIVE\.md$')
# Outside a git checkout `git ls-files` lists nothing.
[ "$n" -gt 0 ] || { echo "VACUOUS pair_q  no section citation examined"; exit 1; }
[ -z "$bad" ] || exit 1
}

# Pair R — checked PLAN stub rows carry a shortname pipe
pair_r() {
# SPEC/plan-filing.md §"`## Completed` archive convention": the
# Phase 4 stub rewrite requires `| shortname` — "so visualizers have
# a row title" — and copies the trailing bracket-token run verbatim
# from the original row, never reconstructing it from `[model]`
# alone. CORE-632.2's unattended close did neither: it wrote
# `- [x] **CORE-632.2** Completed 2026-09-20.`, dropping both
# `[light]🔧 [unattended]` and `| readme-logo-webp`, and nothing
# caught it (CORE-635). This is presence, not the full task-line
# grammar (SPEC/plan-parser.md's fixtures own that — see FX-462 in
# SPEC/fixtures/plan/exclusions.md): a checked, bold-ID row whose
# line ends in the stub's `Completed YYYY-MM-DD.` tail must carry a
# `| ` pipe somewhere before it. The inline-audit-fix exception
# (§"Exception — inline audit fixes") ends in "fixed inline."
# instead, so it never matches the tail and needs no carve-out.
bad=
n=0
for f in .flaitron/PLAN.md .flaitron/PLAN-ARCHIVE.md; do
  [ -f "$f" ] || continue
  while IFS= read -r line; do
    n=$((n+1))
    case "$line" in *' | '*) continue ;; esac
    echo "NO SHORTNAME  $f :: $line"
    bad=1
  done < <(grep -E '^[[:space:]]*- \[[xX]\] \*\*[^*]+\*\*.*Completed [0-9]{4}-[0-9]{2}-[0-9]{2}\.$' "$f")
done
[ "$n" -gt 0 ] || { echo "VACUOUS pair_r  no checked stub row examined"; exit 1; }
[ -z "$bad" ] || exit 1
}

self=$(CDPATH='' cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")
cd "$(dirname "$self")/.." || exit 2

if [ "${1-}" = --run ]; then "$2"; exit; fi

[ $# -gt 0 ] || set -- '*'
fns=$(sed -n 's/^\([a-z][a-z0-9_]*\)() {$/\1/p' "$self")
# Every pattern must match a check: a typo beside a valid name would otherwise
# skip its check and still exit 0.
for pat in "$@"; do
  hit=''
  # shellcheck disable=SC2254  # an unquoted glob is the point
  for fn in $fns; do case "$fn" in $pat) hit=1; break ;; esac; done
  [ -n "$hit" ] || { echo "no check matches: $pat" >&2; exit 2; }
done
fail=''
for fn in $fns; do
  for pat in "$@"; do
    # shellcheck disable=SC2254
    case "$fn" in $pat)
      if bash -e "$self" --run "$fn"; then echo "$fn ok"; else echo "$fn FAILED"; fail=1; fi
      break ;;
    esac
  done
done
[ -z "$fail" ] || exit 1
