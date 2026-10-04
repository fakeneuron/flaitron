---
description: Bump an adopter project's pinned flaitron submodule to the latest released tag — show current→target + tag changelog, fetch + checkout the tag, record the new pin, re-wire symlinks for newly shipped skills, report dangling symlinks from retired skills, smoke check. Adopter-only. No args.
---

Invoke the `ft-update` skill. The skill resolves the flaitron submodule path from `.gitmodules` (`.flaitron/core/`; a pre-rename `.flowtron/` layout stops with a pointer to the v6 move), verifies cwd is a flaitron-adopting project (bails in flaitron's own checkout), reads the current pinned version, fetches the latest released tag, surfaces the annotated-tag changelog for confirmation, moves the submodule pin (`checkout` + `git add` the gitlink — not `git submodule update`), re-wires per-project symlinks for any newly shipped tasknote-family skills, reports (report-only) any dangling symlinks left by retired skills, runs a lightweight smoke check, and stages the bump with a proposed commit message (commits only on your go).

Takes no arguments — run `/ft-update` from the adopter project root.

This is the consumer-side counterpart to `/ft-release` (flaitron-self only, which cuts the tag). For starting a task, use `/ft-task <TASK-ID>`; for bootstrapping a fresh repo with flaitron, use `/ft-new-project`.
