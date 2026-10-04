---
title: copied-dir-wiring-gap
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-410.N]
---

# CORE-413 | copied-dir-wiring-gap

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a `! -type l` assertion to `/ft-release` §7.1's local wiring check so a skill directory copied into `.claude/` instead of symlinked no longer passes silently.

## ⚡ Notes

**Relevance:** Proceed — single-file doc/skill patch, no design tradeoffs; matches the micro-task threshold.
**Best Practices Review:** Extended the existing check block's own shape (a `find`/`diff` pipeline followed by a "must produce no output" prose contract) rather than introducing a new pattern. No refactor needed — the addition is additive and doesn't touch the three existing commands.
**Drift check:** PLAN.md's cited location (`/ft-release` §7.1, local half's `ls`-diff + `-type l`-filtered dangling scan) matched current code exactly at `claude/skills/ft-release/SKILL.md:330-339`. No divergence from the PLAN.md line or any SPEC contract.
**Archive skim:** `CORE-410.N.md` (the audit that surfaced this finding) already recommends the exact fix — "A one-line `! -type l -print` addition would close it" — and confirms the gap is latent (all 36 local `ft-*` entries verified as symlinks), not a live defect. `CORE-410.3.md` also references the same wiring check but adds no new context beyond `.N`'s finding.
**Pattern survey:** Sibling shape extended — added a fourth `find` command to the existing three-command block (`claude/skills/ft-release/SKILL.md:330-339`), following the same style (bare command, prose contract below stating what "no output" means and what a hit indicates).
**Implementation:** Added `find .claude/skills .claude/commands -maxdepth 1 -name 'ft-*' ! -type l -print | sort` to the local repo-scoped wiring block. Updated "All three must produce no output" → "All four…" and added a sentence explaining the new check catches what the `diff`-by-name comparisons and `-type l`-filtered dangling scan both miss: a copied (non-symlinked) directory. Verified the new command produces no output against the current repo state (all entries are symlinks, consistent with `.N`'s sweep).
**Docs touched:** `claude/skills/ft-release/SKILL.md` — the file changed. No other AI-referenced doc references this specific check block.

## ✅ Recap

Added a fourth check to `/ft-release` §7.1's "Local repo-scoped wiring" block (`claude/skills/ft-release/SKILL.md:330-339`): `find .claude/skills .claude/commands -maxdepth 1 -name 'ft-*' ! -type l -print | sort`. The existing two `diff`s compare `ls` names only and the dangling scan filters `-type l`, so a skill directory copied into `.claude/` instead of symlinked previously passed all three checks silently while diverging from shipped source — the same never-noticed-until-a-human-tries-it failure mode CORE-EPIC-410 exists to close, one layer in (surfaced by CORE-410.N's audit, which also confirmed the gap was latent, not live: all 36 local entries verified as symlinks). Updated the "All three must produce no output" prose to "All four…" with a sentence on what the new check catches. Verified the new command against the current repo state — no output, consistent with `.N`'s independent sweep. 1 file changed, 4 lines added (1 command + prose). No refactor; no other doc touched.

**Archived:** 2026-08-08
