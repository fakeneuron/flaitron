# Fixture — `[unattended]` and `[handoff]` markers

Canonical placement after `[model]`, either order, glyph interplay on both
sides of the trailing-token run, and the two mis-authoring footguns
`SPEC/plan-parser.md` documents for both markers.

## High

- [ ] **FX-200** [light] [unattended] | unattended — Operator marked this row safe to drain unattended.
- [ ] **FX-201** [medium] [handoff] | handoff — Stops for a human act; never dispatched headless.
- [ ] **FX-202** [light] [unattended] [handoff] | both markers — Mis-authored pair; a reader honours handoff.
- [ ] **FX-203** [light] [handoff] [unattended] | both reversed
- [ ] **FX-204** [xheavy]🔭 [unattended] | glyph then marker — Glyph between the model and the marker.
- [ ] **FX-205** [xheavy] [unattended]🔭 | marker then glyph — Glyph after the trailing run.
- [ ] **FX-206** [light] 🔧 [unattended] | spaced glyph then marker
- [ ] **FX-207** [fable] [light] [unattended] 💎 | stacked, marker, glyph — Marker anywhere in the run counts.
- [ ] **FX-208** [light] [unattended] [!critical] | marker then critical
- [ ] **FX-209** [!critical] [light] [handoff] | critical then marker
- [ ] **FX-210** [light] | no marker — Neither boolean set.
- [ ] **FX-220** [light] [!unattended] | bang footgun — Matches no slot; the whole line fails.
- [ ] **FX-221** [light] [!handoff] | bang footgun — Same for handoff.
- [ ] **FX-222** [unattended] [light] | marker before model — Captured as the model; marker not set.
- [ ] **FX-223** [unattended] | bare marker — Captured as the model; marker not set.
- [ ] **FX-224** [handoff] [light] | handoff before model
- [ ] **FX-225** [handoff] | bare handoff
- [ ] **FX-226** [frontier]💎 [unattended] | frontier glyph then marker — Glyph between the model and the marker.
- [ ] **FX-227** [frontier] [unattended]💎 | frontier marker then glyph — Glyph after the trailing run.

## Completed

- [x] **FX-230** [light] [unattended] | closed unattended — Completed 2026-09-07.
