---
title: security-csp-description
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: []
---

# CORE-239 | security-csp-description

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add `style-src 'unsafe-inline'` and `img-src 'self' data:` to the CSP paragraph in SECURITY.md §"Visualizer dev-server scope", with the same rationale that lives in the `vite.config.ts` comment.

## ⚡ Notes

**Relevance:** Proceed — one-paragraph doc patch, clear scope.
**Drift check:** SECURITY.md lines 98-103 still match `vite.config.ts` DEV_CSP array; no drift.
**Archive skim:** CORE-231 is load-bearing — introduced the full CSP (including `style-src 'unsafe-inline'` and `img-src 'self' data:`) but SECURITY.md description was only partially updated at that time; `style-src`/`img-src` directives were omitted from the prose.
**Pattern survey:** existing SECURITY.md CSP bullet uses inline backtick notation and prose rationale — extending in the same style.
**Implementation:** Updated the CSP bullet in SECURITY.md §"Visualizer dev-server scope" to add `style-src 'unsafe-inline'` (Vite/Tailwind inject `<style>` at dev runtime, can't carry a nonce) and `img-src 'self' data:` (permits data-URI images). Rationale sourced from `vite.config.ts` lines 32–34 comment.
**Docs touched:** `SECURITY.md` — updated CSP directive list; no other AI-referenced docs affected.

## ✅ Recap

Added `style-src 'unsafe-inline'` and `img-src 'self' data:` with rationale to the CSP bullet in SECURITY.md §"Visualizer dev-server scope". The paragraph now fully describes all DEV_CSP directives, matching the `vite.config.ts` comment.

**Archived:** 2026-05-31
