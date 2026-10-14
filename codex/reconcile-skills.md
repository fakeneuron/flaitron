# Reconcile pinned Codex skills

Shared inline procedure for Codex-selected adoption/update and manual repair.
Read this from the **executing skill bundle** before a checkout; derive all
install data from the **adopter's current pin**. An older pin need not contain
this procedure. Run from the project root, setting `FT_DIR` to the relative
submodule path resolved by the caller (default `.flaitron/core`). This block
does not fetch, checkout, stage, access agent homes, or wire other platforms.

The literal `ln -s` roster in `<FT>/codex/AGENTS-snippet.md` remains derived
from Claude's canonical snippet. No second roster lives here. Retirement
names come from the exact single-slug rows of the pinned
`docs/MIGRATION.md` retired-skills table; grouped/wildcard rows remain
report-only under update Step 4.6. A name alone never proves ownership.

```sh
(
  ft_dir=${FT_DIR:-.flaitron/core}
  case "$ft_dir" in
    /*|..|../*|*/../*|*/..) printf 'CONFLICT invalid relative pin path: %s\n' "$ft_dir"; exit 1 ;;
  esac
  ft_snippet="$ft_dir/codex/AGENTS-snippet.md"
  ft_migration="$ft_dir/docs/MIGRATION.md"
  [ -f "$ft_snippet" ] && [ -f "$ft_migration" ] || {
    printf 'CONFLICT pinned Codex snippet or migration table unavailable\n'; exit 1;
  }
  # Never write through redirected skill roots, including dangling symlinks.
  for ft_root in .agents .agents/skills; do
    if [ -L "$ft_root" ] || { [ -e "$ft_root" ] && [ ! -d "$ft_root" ]; }; then
      printf 'CONFLICT skill root: %s\n' "$ft_root"; exit 1
    fi
  done
  ft_slugs=$(awk '/^ln -s / && $NF ~ /^\.agents\/skills\/ft-[a-z-]+$/ {sub(/^.*\//, "", $NF); print $NF}' "$ft_snippet")
  [ -n "$ft_slugs" ] || { printf 'CONFLICT empty pinned Codex roster\n'; exit 1; }
  # Check the whole source set before making any links.
  for ft_slug in $ft_slugs; do
    [ -f "$ft_dir/codex/skills/$ft_slug/SKILL.md" ] || {
      printf 'CONFLICT missing pinned body: %s\n' "$ft_slug"; exit 1;
    }
  done
  mkdir -p .agents/skills || exit 1
  ft_failed=0
  for ft_slug in $ft_slugs; do
    ft_link=".agents/skills/$ft_slug"
    ft_target="../../$ft_dir/codex/skills/$ft_slug"
    if [ -L "$ft_link" ] && [ "$(readlink "$ft_link")" = "$ft_target" ]; then
      printf 'KEPT %s\n' "$ft_link"
    elif [ -e "$ft_link" ] || [ -L "$ft_link" ]; then
      printf 'CONFLICT preserved %s\n' "$ft_link"; ft_failed=1
    else
      ln -s "$ft_target" "$ft_link" || exit 1
      printf 'CREATED %s\n' "$ft_link"
    fi
  done
  ft_retired=$(awk '
    /^#### Retired skills leave dangling symlinks/ {in_table=1; next}
    in_table && /^##+ / {exit}
    in_table && /^\| `ft-[a-z-]+` \|/ {split($0, cells, "`"); print cells[2]}
  ' "$ft_migration")
  for ft_slug in $ft_retired; do
    ft_link=".agents/skills/$ft_slug"
    # A pin that still ships an old name is not a retirement at this pin.
    if [ -e "$ft_dir/codex/skills/$ft_slug" ] || [ -L "$ft_dir/codex/skills/$ft_slug" ]; then continue; fi
    [ -e "$ft_link" ] || [ -L "$ft_link" ] || continue
    ft_target="../../$ft_dir/codex/skills/$ft_slug"
    if [ -L "$ft_link" ] && [ "$(readlink "$ft_link")" = "$ft_target" ] && [ ! -e "$ft_link" ]; then
      unlink "$ft_link" || exit 1
      printf 'REMOVED %s\n' "$ft_link"
    else
      printf 'CONFLICT preserved retired destination %s\n' "$ft_link"; ft_failed=1
    fi
  done
  exit "$ft_failed"
)
```

Report `CREATED`, `KEPT`, `REMOVED`, and `CONFLICT` paths. Exit 1 means repair
is incomplete: preserve the conflicting entries, ask the operator to resolve
them, and stop before claiming successful wiring or moving the pin. Safe
partial additions remain reviewable. Never use `ln -sf`, delete a directory,
or infer ownership from a dangling target alone. Unknown dangling links are
left for update Step 4.6's report; utility links in agent homes are outside
this procedure.

For staging, save all passes' reports in a temporary file and set
`FT_WIRING_REPORT` to it. Select **net** changes using this block: a path
must still exist (including a symlink), or be tracked in the index. An
untracked link removed by repair, including one created at the old pin and
removed at the new pin, has nothing to stage. This selector only prints paths;
stage each returned path with `git add -- "<path>"`, plus caller-owned
bootstrap/bump files. It never stages a whole skill root.

```sh
(
  : "${FT_WIRING_REPORT:?set FT_WIRING_REPORT to the saved reports}"
  awk '/^(CREATED|REMOVED) / {sub(/^[^ ]+ /, ""); print}' "$FT_WIRING_REPORT" |
    sort -u |
    while IFS= read -r ft_path; do
      if [ -e "$ft_path" ] || [ -L "$ft_path" ] ||
        git ls-files --error-unmatch -- "$ft_path" >/dev/null 2>&1; then
        printf '%s\n' "$ft_path"
      fi
    done
)
```

If `git check-ignore` reports a created path, surface it and ask
for an ignore edit or explicit force-add choice; do not force-add by default.
Before hand-off, check **every** roster destination's exact relative target
and its `SKILL.md`, rather than verifying only `ft-task`. Then restart Codex
and check `/skills` or `$ft-task`: filesystem checks prove wiring, while a
fresh runtime catalog proves discovery on that runtime.
