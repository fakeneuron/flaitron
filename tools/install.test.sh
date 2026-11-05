#!/bin/sh
# Sandboxed end-to-end test for install.sh (live network: GitHub API, ls-remote,
# clones). Usage: sh tools/install.test.sh install.sh [shell...]
# HOME, FLAITRON_HOME and every target repo live under a fresh temp dir, so the
# real ~/.claude/skills and ~/code/flaitron are never touched. Run by
# .github/workflows/install-test.yml.
# shellcheck disable=SC2329,SC2317 # helpers are invoked through check(); SC2317 is the pre-0.11 code
set -u
INSTALLER=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
shift
SH=${*:-sh}
W=$(mktemp -d "${TMPDIR:-/tmp}/ft-e2e.XXXXXX")
export HOME="$W/home"
mkdir -p "$HOME"
export GIT_CONFIG_GLOBAL="$W/gitconfig"
git config --global user.email e2e@example.invalid
git config --global user.name e2e
git config --global init.defaultBranch main
FAIL=0
PREV=${E2E_PREV:-v8.1.0}

ok() { printf 'ok   %s\n' "$*"; }
bad() { printf 'FAIL %s\n' "$*"; FAIL=1; }
check() { desc=$1; shift; if "$@"; then ok "$desc"; else bad "$desc"; fi; }
# $SH ("bash --posix") and $CMD ("update" or empty) split on purpose. Set CMD
# as its own statement, never as a `CMD=x run` prefix: POSIX lets a prefix
# assignment on a function call persist (bash --posix, macOS sh keep it).
# shellcheck disable=SC2086
run() { (cd "$1" && shift && env "$@" $SH "$INSTALLER" $CMD) >"$W/out" 2>&1; echo $? >"$W/rc"; }
CMD=''
rc() { cat "$W/rc"; }
out_has() { grep -q -- "$1" "$W/out"; }
out_lacks() { ! grep -Eq -- "$1" "$W/out"; }
mkproj() { mkdir -p "$1" && git -C "$1" init -q && echo '# p' >"$1/AGENTS.md" && git -C "$1" add . && git -C "$1" commit -qm init; }
pin() { git -C "$1/.flaitron/core" describe --tags --exact-match HEAD 2>/dev/null; }
snap() { (cd "$1" && git status --porcelain --untracked-files=all; ls -A); }
links_ok() { for l in "$1"/ft-*; do [ -L "$l" ] && [ -e "$l" ] || return 1; done; }

say() { printf '\n== %s\n' "$*"; }

say "1 fresh install (claude + codex project dirs, global on)"
P1="$W/p1"; mkproj "$P1"; mkdir -p "$P1/.claude" "$P1/.agents"
run "$P1"
check "exit 0" [ "$(rc)" = 0 ]
LATEST=$(sed -n 's/^flaitron \(v[0-9.]*\) (source: .*)$/\1/p' "$W/out")
# Either source is correct: the API falls back to ls-remote when rate limited.
check "prints version + source" grep -Eq '^flaitron v[0-9.]+ \(source: (GitHub releases/latest|highest semver tag \(git ls-remote\))\)$' "$W/out"
check "prints GitHub commit" out_has "^tag commit (GitHub): [0-9a-f]\{40\}$"
SHA=$(sed -n 's/^tag commit (GitHub): //p' "$W/out")
check "prints verified line" out_has "^verified .flaitron/core HEAD = $LATEST = "
check "pin is latest ($LATEST)" [ "$(pin "$P1")" = "$LATEST" ]
check "claude links resolve" links_ok "$P1/.claude/skills"
check "codex links resolve" links_ok "$P1/.agents/skills"
ROSTER=$(grep -c '^ln -s .* \.claude/skills/ft-' "$P1/.flaitron/core/claude/AGENTS-snippet.md")
check "claude link count = pinned roster ($ROSTER)" [ "$(find "$P1/.claude/skills" -name 'ft-*' | wc -l | tr -d ' ')" = "$ROSTER" ]
check "global clone at tag" [ "$(git -C "$HOME/code/flaitron" describe --tags --exact-match HEAD)" = "$LATEST" ]
check "global claude ft-adopt" [ -e "$HOME/.claude/skills/ft-adopt/SKILL.md" ]
check "one agent-home copy: no codex ft-adopt" [ ! -e "$HOME/.agents/skills/ft-adopt" ]
check "one-copy note printed" out_has "^note: global ft-adopt linked for claude only"
if grep -q 'Installer exception' "$HOME/code/flaitron/claude/skills/ft-adopt/SKILL.md"; then
  check "no stale-ft-adopt warning" out_lacks '^warning: the ft-adopt'
else
  check "stale-ft-adopt warning ($LATEST predates the exception)" out_has '^warning: the ft-adopt'
fi
check "nothing committed" [ "$(git -C "$P1" rev-list --count HEAD)" = 1 ]
check "submodule staged" sh -c "git -C '$P1' diff --cached --name-only | grep -qx .gitmodules"
# shellcheck disable=SC2016 # a literal $ft-adopt
check "ends with Next line" [ "$(tail -n 1 "$W/out")" = 'Next: run /ft-adopt (Codex: $ft-adopt)' ]
cp "$W/out" "$W/out.1"

say "2 rerun is idempotent"
run "$P1"
check "exit 0" [ "$(rc)" = 0 ]
check "no CREATED/BACKUP/REPLACED/MOVED" out_lacks '^(CREATED|BACKUP|REPLACED|MOVED)'
check "keeps pin" out_has "source: existing pin"
check "pin unchanged" [ "$(pin "$P1")" = "$LATEST" ]

say "3 update to $PREV, then back to latest"
CMD=update
run "$P1" FLAITRON_VERSION="$PREV"
check "exit 0" [ "$(rc)" = 0 ]
check "pin moved to $PREV" [ "$(pin "$P1")" = "$PREV" ]
check "global moved to $PREV" [ "$(git -C "$HOME/code/flaitron" describe --tags --exact-match HEAD)" = "$PREV" ]
run "$P1"
check "exit 0" [ "$(rc)" = 0 ]
# Compare against this run's own resolution: a release cut between runs, or a
# source switch, can legitimately change "latest".
RESOLVED=$(sed -n 's/^flaitron \(v[0-9.]*\) (source: .*)$/\1/p' "$W/out")
check "update printed its resolution" [ -n "$RESOLVED" ]
check "pin moved to resolved latest ($RESOLVED)" [ "$(pin "$P1")" = "$RESOLVED" ]
LATEST=$RESOLVED
check "links still resolve" links_ok "$P1/.claude/skills"
CMD=''
run "$P1" FLAITRON_VERSION="$PREV"
check "install never moves a pin" [ "$(rc)" != 0 ]
check "pin still latest" [ "$(pin "$P1")" = "$LATEST" ]
# Case-insensitive filesystems (macOS default): a differently-cased
# FLAITRON_HOME is the same clone, and its links must read as unchanged.
if [ -d "$HOME/CODE/flaitron" ]; then
  run "$P1" FLAITRON_HOME="$HOME/CODE/flaitron"
  check "mis-cased FLAITRON_HOME: exit 0" [ "$(rc)" = 0 ]
  check "mis-cased FLAITRON_HOME: no BACKUP/REPLACED" out_lacks '^(BACKUP|REPLACED|CREATED)'
fi

say "4 refusals leave the tree unchanged"
P2="$W/p2"; mkproj "$P2"; before=$(snap "$P2")
run "$P2" FLAITRON_VERSION=main
check "main refused" [ "$(rc)" != 0 ]
check "main: unchanged" [ "$(snap "$P2")" = "$before" ]
run "$P2" FLAITRON_SHA=deadbeef00 FLAITRON_NO_GLOBAL=1
check "bad SHA refused" [ "$(rc)" != 0 ]
check "bad SHA: says nothing changed" out_has "nothing changed"
check "bad SHA: unchanged" [ "$(snap "$P2")" = "$before" ]
mkdir -p "$W/notrepo"; run "$W/notrepo"
check "outside a repo refused" [ "$(rc)" != 0 ]
P3="$W/fakeft"; mkproj "$P3"; printf '# Flaitron — Workflow Specification\n' >"$P3/SPEC.md"; before=$(snap "$P3") # brand-casing: fixture (pre-CORE-863 heading)
run "$P3"
check "flaitron repo refused" [ "$(rc)" != 0 ]
check "flaitron repo: unchanged" [ "$(snap "$P3")" = "$before" ]
printf '# flaitron — Workflow Specification\n' >"$P3/SPEC.md"; before=$(snap "$P3")
run "$P3"
check "flaitron repo (lowercase heading) refused" [ "$(rc)" != 0 ]
check "flaitron repo (lowercase heading): unchanged" [ "$(snap "$P3")" = "$before" ]
P4="$W/foreign"; mkproj "$P4"; mkdir -p "$P4/.flaitron/core"; echo x >"$P4/.flaitron/core/README.md"; before=$(snap "$P4")
run "$P4"
check "foreign core refused" [ "$(rc)" != 0 ]
check "foreign core: unchanged" [ "$(snap "$P4")" = "$before" ]
P5="$W/adopted"; mkproj "$P5"; mkdir -p "$P5/.flaitron"; echo x >"$P5/.flaitron/PLAN.md"
run "$P5"
check "adopted project refused" [ "$(rc)" != 0 ]
run "$P2" FLAITRON_AGENTS=bogus
check "unknown agent refused" [ "$(rc)" != 0 ]
run "$P2" FLAITRON_SHA=abc FLAITRON_NO_GLOBAL=1
check "too-short FLAITRON_SHA refused" [ "$(rc)" != 0 ]
P11="$W/symcore"; mkproj "$P11"; mkdir -p "$P11/.flaitron"; ln -s "$W/elsewhere" "$P11/.flaitron/core"; before=$(snap "$P11")
run "$P11"
check "symlinked .flaitron/core refused" [ "$(rc)" != 0 ]
check "symlinked core: unchanged" [ "$(snap "$P11")" = "$before" ]
run "$P2" FLAITRON_AGENTS=,
check "empty agent list refused" [ "$(rc)" != 0 ]
run "$P2" FLAITRON_HOME=relative/flaitron
check "relative FLAITRON_HOME refused" [ "$(rc)" != 0 ]
check "relative FLAITRON_HOME: no clone in the project" [ ! -e "$P2/relative" ]
P6="$W/symroot"; mkproj "$P6"; mkdir -p "$W/elsewhere"; ln -s "$W/elsewhere" "$P6/.claude"; before=$(snap "$P6")
run "$P6" FLAITRON_NO_GLOBAL=1
check "symlinked skill root refused" [ "$(rc)" != 0 ]
check "symlinked root: unchanged" [ "$(snap "$P6")" = "$before" ]
# Registered but uninitialized submodule: refused without any clone/init.
P9="$W/uninit"; mkproj "$P9"; mkdir -p "$P9/.flaitron/core"
git -C "$P9" config -f .gitmodules submodule.x.path .flaitron/core
git -C "$P9" config -f .gitmodules submodule.x.url https://github.com/octocat/Hello-World.git
before=$(snap "$P9")
run "$P9" FLAITRON_VERSION=main
check "uninit + main refused" [ "$(rc)" != 0 ]
check "uninit + main: unchanged" [ "$(snap "$P9")" = "$before" ]
run "$P9"
check "uninit foreign URL refused" [ "$(rc)" != 0 ]
check "uninit foreign: unchanged" [ "$(snap "$P9")" = "$before" ]
git -C "$P9" config -f .gitmodules submodule.x.url https://github.com/fakeneuron/flaitron.git
before=$(snap "$P9")
run "$P9"
check "uninit flaitron refused (not checked out)" out_has "registered but not checked out"
check "uninit flaitron: unchanged" [ "$(snap "$P9")" = "$before" ]
check "uninit: nothing cloned" [ ! -e "$P9/.git/modules" ]

say "5 backups + existing global clone on a branch"
P7="$W/p7"; mkproj "$P7"; mkdir -p "$P7/.claude/skills/ft-task"; echo mine >"$P7/.claude/skills/ft-task/SKILL.md"
ln -s /nonexistent/custom "$P7/.claude/skills/ft-update"
ln -s ../../.flaitron/custom/skills/ft-refactor "$P7/.claude/skills/ft-refactor"
git -C "$HOME/code/flaitron" switch -q -c local-branch
run "$P7"
check "exit 0" [ "$(rc)" = 0 ]
check "BACKUP for directory" out_has "^BACKUP  .claude/skills/ft-task -> .flaitron/backup/.claude/skills/ft-task.bak."
check "BACKUP for foreign symlink" out_has "^BACKUP  .claude/skills/ft-update -> "
check "BACKUP (not REPLACED) for custom flaitron link" out_has "^BACKUP  .claude/skills/ft-refactor -> "
check "backup content kept" sh -c "cat '$P7'/.flaitron/backup/.claude/skills/ft-task.bak.*/SKILL.md | grep -qx mine"
check "no backup inside skill dir" sh -c "! ls '$P7/.claude/skills' | grep -q bak"
check "links resolve" links_ok "$P7/.claude/skills"
check "branch clone left alone" out_has "code/flaitron alone (on branch local-branch)"
check "global link kept (OK)" out_has "^OK      $HOME/.claude/skills/ft-adopt$"

say "6 FLAITRON_AGENTS=grok, matching FLAITRON_SHA prefix, no global"
P8="$W/p8"; mkproj "$P8"
run "$P8" FLAITRON_AGENTS=grok FLAITRON_NO_GLOBAL=1 FLAITRON_SHA="$(printf '%.12s' "$SHA")"
check "exit 0" [ "$(rc)" = 0 ]
check "grok links resolve" links_ok "$P8/.grok/skills"
check "no .claude dir" [ ! -e "$P8/.claude" ]
check "skip global printed" out_has "skip global: FLAITRON_NO_GLOBAL=1"

say "7 Cursor-only detection + dirty global clone left alone"
git -C "$HOME/code/flaitron" switch -q --detach "$LATEST"
echo dirt >>"$HOME/code/flaitron/README.md"
P10="$W/p10"; mkproj "$P10"; mkdir -p "$P10/.cursor"
run "$P10"
check "exit 0" [ "$(rc)" = 0 ]
check "detected cursor from project dir" out_has "^agents: cursor (source: project directories)$"
check "cursor links resolve" links_ok "$P10/.cursor/skills"
check "dirty clone left alone" out_has "code/flaitron alone (uncommitted changes)"
check "no second agent-home copy" [ ! -e "$HOME/.cursor/skills/ft-adopt" ]
check "names the existing copy" out_has "^global ft-adopt already at $HOME/.claude/skills/ft-adopt"

printf '\nfirst run output:\n'; cat "$W/out.1"
rm -rf "$W"
[ "$FAIL" = 0 ] && printf '\nALL PASS (%s)\n' "$SH" || printf '\nFAILURES (%s)\n' "$SH"
exit "$FAIL"
