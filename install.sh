#!/bin/sh
# flaitron installer — adopter bootstrap, not a workflow CLI.
#
# Installs the flaitron submodule at a verified release tag, wires the agent
# skill links listed in the pinned snippets, links the global /ft-adopt, then
# hands off to /ft-adopt. Commits nothing. Contract and doctrine:
# SPEC/scope-boundaries.md §"What flaitron does NOT provide" and
# docs/CONVENTIONS.md §"Package-manager and marketplace distribution".
#
#   curl -fsSL https://raw.githubusercontent.com/fakeneuron/flaitron/<tag>/install.sh | sh
#   curl -fsSL …/install.sh | sh -s -- update     # move the pin
#
# Environment:
#   FLAITRON_VERSION=vX.Y.Z   pin a release tag (branches such as main are refused)
#   FLAITRON_SHA=<sha>        abort, with nothing changed, unless the tag is this commit
#   FLAITRON_AGENTS=claude,codex,cursor,grok   wire these instead of detecting
#   FLAITRON_NO_GLOBAL=1      skip the machine-side clone and global ft-adopt link
#   FLAITRON_HOME=<dir>       machine-side clone location (default ~/code/flaitron)
#
# Every statement runs inside a function and the last line calls main, so a
# truncated download defines functions and does nothing.

REPO_URL=https://github.com/fakeneuron/flaitron.git
RELEASES_API=https://api.github.com/repos/fakeneuron/flaitron/releases/latest
USER_AGENT='flaitron-install (+https://github.com/fakeneuron/flaitron)'

say() { printf '%s\n' "$*"; }
die() { printf 'flaitron-install: error: %s\n' "$*" >&2; exit 1; }

usage() {
  say "usage: install.sh [install|update]"
  say "  install  (default) install at the latest release, or keep the existing pin"
  say "  update   move the pin to FLAITRON_VERSION, or to the latest release"
}

is_release_tag() {
  case $1 in *'
'*) return 1 ;; esac # grep matches per line; refuse embedded newlines
  printf '%s\n' "$1" | grep -Eq '^v[0-9]+\.[0-9]+\.[0-9]+$'
}

# The release tag at HEAD of repo $1 (empty if none). Another tag on the same
# commit (an rc, a local alias) must not hide it, so not `describe`.
head_release_tag() {
  git -C "$1" tag --points-at HEAD 2>/dev/null |
    grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sed 's/^v//' |
    sort -t . -k1,1n -k2,2n -k3,3n | tail -n 1 | sed 's/^./v&/'
}

# The .gitmodules URL of the entry whose path is .flaitron/core (empty if none).
core_url() {
  key=$(git config -f .gitmodules --get-regexp '^submodule\..*\.path$' 2>/dev/null |
    awk '$2 == ".flaitron/core" {print $1; exit}')
  [ -n "$key" ] || return 0
  git config -f .gitmodules --get "${key%.path}.url" 2>/dev/null || true
}

# Line 1 of a flaitron SPEC.md. Cores before CORE-863 capitalize the name, and
# an adopter's pin or FLAITRON_VERSION may name one, so both casings match.
is_flaitron_tree() {
  [ -f "$1/SPEC.md" ] || return 1
  case "$(head -n 1 "$1/SPEC.md")" in
    '# '[Ff]'laitron — Workflow Specification') return 0 ;;
  esac
  return 1
}

# Latest release: GitHub releases/latest, falling back to the highest semver
# tag from git ls-remote (the unauthenticated API allows 60 calls/h per IP).
resolve_latest() {
  tag=''
  if command -v curl >/dev/null 2>&1; then
    tag=$(curl -fsSL -A "$USER_AGENT" -H 'Accept: application/vnd.github+json' \
      "$RELEASES_API" 2>/dev/null |
      sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)
  fi
  if [ -n "$tag" ] && is_release_tag "$tag"; then
    VERSION=$tag
    VERSION_SOURCE='GitHub releases/latest'
    return 0
  fi
  tag=$(git ls-remote --tags --refs "$REPO_URL" 'v*' 2>/dev/null |
    sed 's|.*refs/tags/||' | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' |
    sed 's/^v//' | sort -t . -k1,1n -k2,2n -k3,3n | tail -n 1)
  [ -n "$tag" ] || die "could not resolve the latest flaitron release (GitHub API and git ls-remote both failed)"
  VERSION="v$tag"
  VERSION_SOURCE='highest semver tag (git ls-remote)'
}

# The commit GitHub reports for a tag (peeled, for annotated tags).
remote_commit() {
  refs=$(git ls-remote "$REPO_URL" "refs/tags/$1" "refs/tags/$1^{}" 2>/dev/null) ||
    die "git ls-remote $REPO_URL failed"
  peeled=$(printf '%s\n' "$refs" | awk -v r="refs/tags/$1^{}" '$2 == r {print $1}')
  if [ -n "$peeled" ]; then
    printf '%s\n' "$peeled"
  else
    printf '%s\n' "$refs" | awk -v r="refs/tags/$1" '$2 == r {print $1}'
  fi
}

# Agent → snippet path (in the pin), project link dir, global link dir.
agent_snippet() {
  case $1 in
    claude) say claude/AGENTS-snippet.md ;;
    codex) say codex/AGENTS-snippet.md ;;
    cursor) say cursor/AGENTS-snippet.md ;;
    grok) say grok/AGENTS-snippet.md ;;
  esac
}
agent_dir() {
  case $1 in
    claude) say .claude/skills ;;
    codex) say .agents/skills ;;
    cursor) say .cursor/skills ;;
    grok) say .grok/skills ;;
  esac
}
agent_adopt_source() {
  case $1 in
    codex) say codex/skills/ft-adopt ;;
    *) say claude/skills/ft-adopt ;;
  esac
}

detect_agents() {
  if [ -n "${FLAITRON_AGENTS:-}" ]; then
    AGENTS=$(printf '%s\n' "$FLAITRON_AGENTS" | tr ',' ' ')
    for a in $AGENTS; do
      case $a in claude | codex | cursor | grok) ;; *) die "unknown agent in FLAITRON_AGENTS: $a (use claude, codex, cursor, grok)" ;; esac
    done
    [ -n "$(printf '%s' "$AGENTS" | tr -d ' ')" ] || die "FLAITRON_AGENTS names no agent (use claude, codex, cursor, grok)"
    AGENTS_SOURCE='FLAITRON_AGENTS'
    return 0
  fi
  AGENTS=''
  # Project directories first. Cursor and Grok also load .claude/skills (and
  # Grok .agents/ and .cursor/), so they get their own dir only when alone.
  [ -d .claude ] && AGENTS="$AGENTS claude"
  [ -d .agents ] && AGENTS="$AGENTS codex"
  [ -d .cursor ] && [ ! -d .claude ] && AGENTS="$AGENTS cursor"
  [ -d .grok ] && [ ! -d .claude ] && [ ! -d .agents ] && [ ! -d .cursor ] && AGENTS="$AGENTS grok"
  if [ -n "$AGENTS" ]; then
    AGENTS_SOURCE='project directories'
    return 0
  fi
  # Then installed CLIs and home directories.
  has_claude='' has_codex='' has_cursor=''
  if command -v claude >/dev/null 2>&1 || [ -d "$HOME/.claude" ]; then has_claude=1; AGENTS="$AGENTS claude"; fi
  if command -v codex >/dev/null 2>&1 || [ -d "$HOME/.codex" ]; then has_codex=1; AGENTS="$AGENTS codex"; fi
  if [ -z "$has_claude" ] && { command -v cursor-agent >/dev/null 2>&1 || [ -d "$HOME/.cursor" ]; }; then
    has_cursor=1
    AGENTS="$AGENTS cursor"
  fi
  if [ -z "$has_claude$has_codex$has_cursor" ] && { command -v grok >/dev/null 2>&1 || [ -d "$HOME/.grok" ]; }; then
    AGENTS="$AGENTS grok"
  fi
  if [ -n "$AGENTS" ]; then
    AGENTS_SOURCE='installed CLIs / home directories'
  else
    AGENTS=' claude'
    AGENTS_SOURCE='default'
  fi
}

# Refuse a skill root that is (or sits under) a symlink: links written through
# it would land somewhere this script cannot see.
check_skill_root() {
  parent=${1%/*}
  if [ -L "$parent" ] || [ -L "$1" ]; then
    die "refusing: $1 (or its parent) is a symlink; wire it by hand (docs/MIGRATION.md §1.2)"
  fi
}

backup() {
  # $1 path to move aside, $2 backup root, $3 path relative to that root
  stamp=$(date +%Y%m%d%H%M%S)
  dest="$2/$3.bak.$stamp"
  mkdir -p "${dest%/*}"
  mv "$1" "$dest" || die "could not back up $1"
  say "BACKUP  $1 -> $dest"
}

# Link $2 -> $1. Replaces only symlinks into this install ($5/$6, the owned
# target prefix and its as-typed spelling); backs anything else up first,
# custom flaitron links included. A link that already resolves to the target
# directory — however spelled (case, symlinked parents) — is left as is.
link_one() {
  target=$1 link=$2 broot=$3 brel=$4 owned=$5 owned2=${6:-$5}
  if [ -L "$link" ]; then
    current=$(readlink "$link")
    # Same directory by device + inode, not by string: `pwd -P` keeps the
    # typed case in bash. -ef is not POSIX but dash, bash, ksh, zsh and
    # busybox sh all support it.
    # shellcheck disable=SC3013
    if [ "$current" = "$target" ] || (cd "${link%/*}" 2>/dev/null && [ "${link##*/}" -ef "$target" ]); then
      say "OK      $link"
      return 0
    fi
    case $current in
      "$owned"* | "$owned2"*)
        rm "$link"
        ln -s "$target" "$link" || die "could not link $link"
        say "REPLACED $link -> $target (was $current)"
        return 0
        ;;
    esac
    backup "$link" "$broot" "$brel"
  elif [ -e "$link" ]; then
    backup "$link" "$broot" "$brel"
  fi
  ln -s "$target" "$link" || die "could not link $link"
  say "CREATED $link -> $target"
}

report_dangling() {
  for l in "$1"/ft-*; do
    if [ -L "$l" ] && [ ! -e "$l" ]; then
      say "DANGLING $l -> $(readlink "$l") (left for /ft-update)"
    fi
  done
}

wire_project() {
  for a in $AGENTS; do
    snippet=".flaitron/core/$(agent_snippet "$a")"
    dir=$(agent_dir "$a")
    [ -f "$snippet" ] || die "pinned snippet missing: $snippet"
    # The roster is the snippet's literal ln -s block; nothing is restated here.
    roster=$(awk -v d="$dir/" '$1 == "ln" && $2 == "-s" && NF == 4 && index($4, d) == 1 &&
      $3 ~ /^\.\.\/\.\.\/\.flaitron\/core\/[a-z]+\/skills\/[a-z0-9-]+$/ {print $3, $4}' "$snippet")
    [ -n "$roster" ] || die "no ln -s roster for $dir in $snippet"
    mkdir -p "$dir"
    say "wiring $a ($dir) from $snippet"
    printf '%s\n' "$roster" | while read -r target link; do
      link_one "$target" "$link" .flaitron/backup "$link" ../../.flaitron/core/
    done
    report_dangling "$dir"
  done
}

verify_commit() {
  # $1 repo dir — HEAD must equal the tag's commit and the commit GitHub reported
  head=$(git -C "$1" rev-parse HEAD)
  tagc=$(git -C "$1" rev-parse "$VERSION^{commit}" 2>/dev/null) || tagc=''
  if [ "$head" != "$EXPECTED" ] || [ "$tagc" != "$EXPECTED" ]; then
    die "integrity check failed in $1: HEAD $head, tag $VERSION ${tagc:-missing}, GitHub $EXPECTED"
  fi
}

checkout_tag() {
  # $1 repo dir
  if ! git -C "$1" rev-parse -q --verify "refs/tags/$VERSION^{commit}" >/dev/null; then
    git -C "$1" fetch -q --tags origin || die "git fetch failed in $1"
  fi
  git -C "$1" -c advice.detachedHead=false checkout -q "$VERSION" || die "checkout $VERSION failed in $1"
}

install_submodule() {
  if [ -n "$CORE_PIN$CORE_HEAD" ]; then
    if [ "$CORE_HEAD" = "$EXPECTED" ]; then
      say "submodule .flaitron/core already at $VERSION"
    else
      [ -z "$(git -C .flaitron/core status --porcelain)" ] || die ".flaitron/core has local changes; resolve them first"
      checkout_tag .flaitron/core
      git add .flaitron/core
      say "MOVED   .flaitron/core ${CORE_PIN:-$CORE_HEAD} -> $VERSION"
    fi
  else
    mkdir -p .flaitron
    git submodule add -q "$REPO_URL" .flaitron/core || die "git submodule add failed"
    checkout_tag .flaitron/core
    git add .flaitron/core
    say "CREATED .flaitron/core (submodule) at $VERSION"
  fi
  verify_commit .flaitron/core
}

install_global() {
  fh_typed=${FLAITRON_HOME:-$HOME/code/flaitron}
  fh=$fh_typed
  cloned=''
  if [ ! -e "$fh" ]; then
    mkdir -p "${fh%/*}"
    git clone -q "$REPO_URL" "$fh" || die "git clone into $fh failed"
    git -C "$fh" -c advice.detachedHead=false checkout -q "$VERSION" || die "checkout $VERSION failed in $fh"
    verify_commit "$fh"
    say "CREATED $fh (clone) at $VERSION"
    cloned=1
  fi
  # On-disk spelling from here on, so new links carry it and an existing
  # ~/Code/flaitron reads as the same clone as ~/code/flaitron.
  fh=$(cd "$fh" && pwd -P) || die "cannot resolve $fh"
  if [ -n "$cloned" ]; then
    : # fresh clone, already at the verified tag
  elif ! is_flaitron_tree "$fh" || [ ! -d "$fh/.git" ]; then
    say "skip global: $fh exists and is not a flaitron clone"
    return 0
  elif branch=$(git -C "$fh" symbolic-ref -q --short HEAD); then
    say "leaving $fh alone (on branch $branch)"
  elif [ -n "$(git -C "$fh" status --porcelain)" ]; then
    say "leaving $fh alone (uncommitted changes)"
  elif [ "$(git -C "$fh" rev-parse HEAD)" = "$EXPECTED" ]; then
    say "global clone $fh already at $VERSION"
  elif [ "$COMMAND" = update ]; then
    checkout_tag "$fh"
    verify_commit "$fh"
    say "MOVED   $fh -> $VERSION"
  else
    say "leaving $fh at $(git -C "$fh" describe --tags 2>/dev/null || git -C "$fh" rev-parse --short HEAD) (run update to move it)"
  fi
  # One agent-home copy of ft-adopt, never one per agent: agents read each
  # other's home dirs and resolve by slug, so a second copy shadows the first
  # (docs/PLATFORMS.md §"One canonical install path per project").
  agents=${AGENTS# }
  a=${agents%% *}
  gdir="$HOME/$(agent_dir "$a")"
  # An ft-adopt already in any agent home is the machine's one copy; adding
  # another, even from a later project with a different agent, would shadow it.
  for d in .claude/skills .agents/skills .cursor/skills .grok/skills; do
    if [ "$HOME/$d" != "$gdir" ] && { [ -e "$HOME/$d/ft-adopt" ] || [ -L "$HOME/$d/ft-adopt" ]; }; then
      say "global ft-adopt already at $HOME/$d/ft-adopt; not adding a second agent-home copy (docs/PLATFORMS.md)"
      gdir=''
      break
    fi
  done
  if [ -n "$gdir" ]; then
    mkdir -p "$gdir"
    link_one "$fh/$(agent_adopt_source "$a")" "$gdir/ft-adopt" \
      "$HOME/.local/state/flaitron/backup" "${gdir#"$HOME"/}/ft-adopt" "$fh/" "$fh_typed/"
    case $agents in
      *' '*) say "note: global ft-adopt linked for $a only (one agent-home copy per slug, docs/PLATFORMS.md); if another agent drives this machine, link its ft-adopt by hand (docs/MIGRATION.md §1.0)" ;;
    esac
  fi
  if ! grep -q 'Installer exception' "$fh/claude/skills/ft-adopt/SKILL.md" 2>/dev/null; then
    say "warning: the ft-adopt in $fh predates this installer; its Step 0 will stop on the .flaitron/core just installed. Move that clone to a release that ships install.sh (or set FLAITRON_HOME), or adopt by hand (docs/MIGRATION.md §1.3-1.7)"
  fi
}

main() {
  exec </dev/null # never read the rest of a piped script as input
  set -eu
  export GIT_TERMINAL_PROMPT=0
  COMMAND=${1:-install}
  case $COMMAND in
    install | update) ;;
    -h | --help | help) usage; exit 0 ;;
    *) usage >&2; die "unknown command: $COMMAND" ;;
  esac
  command -v git >/dev/null 2>&1 || die "git is required"

  top=$(git rev-parse --show-toplevel 2>/dev/null) || die "not inside a git repository (run git init first)"
  cd "$top" || die "cannot cd to $top"
  if is_flaitron_tree .; then die "refusing: this is the flaitron repository itself"; fi
  if [ -f .flaitron/PLAN.md ]; then
    die "flaitron is already adopted here (.flaitron/PLAN.md exists); bump with /ft-update instead"
  fi

  if [ -n "${FLAITRON_VERSION:-}" ] && ! is_release_tag "$FLAITRON_VERSION"; then
    die "FLAITRON_VERSION must be a release tag like v8.3.0 ('$FLAITRON_VERSION' refused; branches such as main are not pins)"
  fi

  # Existing submodule: must be flaitron, checked out, at a release tag. Read
  # only — nothing here initializes or fetches.
  CORE_PIN='' CORE_HEAD=''
  if [ -L .flaitron/core ]; then
    die "refusing: .flaitron/core is a symlink (a hand-managed checkout)"
  elif [ -e .flaitron/core ]; then
    case $(core_url) in
      https://github.com/fakeneuron/flaitron | https://github.com/fakeneuron/flaitron.git | git@github.com:fakeneuron/flaitron.git) ;;
      *) die "refusing: .flaitron/core exists and is not the flaitron submodule" ;;
    esac
    if [ ! -e .flaitron/core/.git ]; then
      die ".flaitron/core is registered but not checked out; run 'git submodule update --init .flaitron/core' first"
    fi
    is_flaitron_tree .flaitron/core || die "refusing: .flaitron/core does not hold flaitron"
    CORE_HEAD=$(git -C .flaitron/core rev-parse HEAD)
    CORE_PIN=$(head_release_tag .flaitron/core)
  fi

  # Version.
  if [ "$COMMAND" = install ] && [ -n "$CORE_HEAD" ]; then
    if [ -z "$CORE_PIN" ] || ! is_release_tag "$CORE_PIN"; then
      die ".flaitron/core is not at a release tag; run 'update' (optionally with FLAITRON_VERSION) to pin one"
    fi
    if [ -n "${FLAITRON_VERSION:-}" ] && [ "$FLAITRON_VERSION" != "$CORE_PIN" ]; then
      die ".flaitron/core is pinned to $CORE_PIN; install never moves a pin, run 'update' to move it to $FLAITRON_VERSION"
    fi
    VERSION=$CORE_PIN
    VERSION_SOURCE="existing pin (use 'update' to move it)"
  elif [ -n "${FLAITRON_VERSION:-}" ]; then
    VERSION=$FLAITRON_VERSION
    VERSION_SOURCE='FLAITRON_VERSION'
  else
    resolve_latest
  fi
  say "flaitron $VERSION (source: $VERSION_SOURCE)"

  # Integrity, before anything changes.
  EXPECTED=$(remote_commit "$VERSION")
  [ -n "$EXPECTED" ] || die "tag $VERSION not found on $REPO_URL"
  if [ -n "${FLAITRON_SHA:-}" ]; then
    [ "${#FLAITRON_SHA}" -ge 7 ] || die "FLAITRON_SHA must be at least 7 hex characters"
    case $EXPECTED in
      "$FLAITRON_SHA"*) ;;
      *) die "FLAITRON_SHA mismatch: GitHub reports $VERSION = $EXPECTED; nothing changed" ;;
    esac
  fi
  say "tag commit (GitHub): $EXPECTED"
  say "note: flaitron tags are unsigned and releases carry no checksums; the check is local tag == commit GitHub reports"

  detect_agents
  say "agents: $(printf '%s' "$AGENTS" | sed 's/^ //') (source: $AGENTS_SOURCE)"
  for a in $AGENTS; do check_skill_root "$(agent_dir "$a")"; done
  if [ "${FLAITRON_NO_GLOBAL:-}" != 1 ]; then
    case ${FLAITRON_HOME:-/} in /*) ;; *) die "FLAITRON_HOME must be an absolute path" ;; esac
    first=${AGENTS# } # the first agent gets the one global link
    check_skill_root "$HOME/$(agent_dir "${first%% *}")"
  fi

  install_submodule
  say "verified .flaitron/core HEAD = $VERSION = $EXPECTED"
  wire_project
  if [ "${FLAITRON_NO_GLOBAL:-}" = 1 ]; then
    say "skip global: FLAITRON_NO_GLOBAL=1"
  else
    install_global
  fi
  say "staged, not committed: .gitmodules .flaitron/core (links are untracked files)"
  say "Next: run /ft-adopt (Codex: \$ft-adopt)"
}

main "$@"
