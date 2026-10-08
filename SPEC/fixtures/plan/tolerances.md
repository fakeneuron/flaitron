# Fixture — decorative tolerances and adopter near-misses

Shapes `SPEC/plan-parser.md` tolerates without capturing (status glyph,
suggestion glyph, stacked `[model]`), the swapped `[!critical]` order, the
lettered / nested-decimal ID near-misses, and the legacy `## Critical` heading.

## Critical

- [ ] **FX-100** [heavy] | legacy critical section — Soft-migrated to High with critical set.
- [ ] **FX-101** — Legacy form under the legacy heading.

## High

- [ ] 🟢 **FX-110** [heavy] | status glyph — In-progress chip between the checkbox and the ID.
- [ ] ⏸ **FX-111** [medium] | blocked chip
- [ ] ⚪ **FX-112** [light] | not-started chip — Blocked by [[FX-110]].
- [ ] 🌱 **FX-113** [light] | starter chip
- [ ] **FX-120** [heavy]🧠 | glyph no space — Suggestion glyph directly after the model.
- [ ] **FX-121** [light] 🔧 | glyph with space — Suggestion glyph after a space.
- [ ] **FX-122** [medium]🧩 | medium glyph
- [ ] **FX-123** [xheavy]🔭 | xheavy glyph
- [ ] **FX-124** [light]🔧 — Glyph directly before the long description, no shortname.
- [ ] **FX-130** [fable] [light] | stacked models — First token is the model; the rest are dropped.
- [ ] **FX-131** [heavy] [opus] [sonnet] — Three stacked tokens.
- [ ] **FX-140** [heavy] [!critical] | critical after model — Swapped order still sets critical.
- [ ] **FX-141** [fable] [light] [!critical] | critical after stacked
- [ ] **FX-142** [heavy]🧠 [!critical] | critical after glyph
- [ ] **FX-EPIC-150** [heavy] | epic with near-miss children
  - [ ] **FX-150.3a** [light] | lettered suffix — Parses; nests under the epic.
  - [ ] **FX-150.2.1** [light] | nested decimals — Parses; nests under the epic.
  - [ ] **FX-150.2.1a** [light] | nested and lettered
- [ ] **FX-125** [frontier]💎 | frontier glyph
- [ ] **FX-126** [frontier] 💎 | frontier glyph spaced — Suggestion glyph after a space.

## Completed

- [x] ✅ **FX-160** [light] | closed with chip — Completed 2026-09-05.
- [x] **FX-161** [medium]🧩 | closed with glyph — Completed 2026-09-06.
