---
title: readme-fence-tag
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-161 | readme-fence-tag

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a `markdown` language tag to the bare 4-backtick outer fence in README.md §"Working in markdown vaults" (line 87) that wraps the Obsidian Dataview snippet.

## ⚡ Notes

**Relevance:** Proceed — direct one-line fix matching the PLAN.md description; no ambiguity.
**Drift check:** README.md:87 is ```````` (bare), README.md:94 is the closing ```````` — both still bare; matches PLAN.md description exactly.
**Archive skim:** CORE-155 (2026-05-23) tagged bare ``` openers in skill files — established `markdown` for blocks containing markdown-flavored content, `text` for plain-text blocks. This outer fence wraps a ```dataview block, so `markdown` is the right tag per that precedent.
**Pattern survey:** SPEC.md and skill files use ````markdown for fence-within-fence display; README.md should match. Only the opener needs a tag; the closer stays bare.
**Implementation:** Added `markdown` tag to the 4-backtick opener at README.md:87. One-character addition, no surrounding context changed.
**Docs touched:** README.md only — the fix itself.

## ✅ Recap

Added `markdown` tag to the bare 4-backtick fence opener at README.md:87 (Obsidian Dataview example block). Single-line change; all other content unchanged.

**Archived:** 2026-05-23
