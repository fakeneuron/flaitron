# `/ft-release` §7.2 — Auto-draft annotated tag message

> Lazy fragment. Loaded by `ft-release` SKILL.md §7.2 (`claude/skills/ft-release/SKILL.md`)
> after §7.1's fragments walk clean. Drafts the tag message and the
> VERSION-HISTORY entry together and locks both at user approval.

Use CORE-048's structure as the template:

```text
flaitron vA.B.C — <one-clause headline>

<one-paragraph summary derived from commit log + adopter-impact findings>

Changes since vX.Y.Z:

<area heading 1>:
- <feat: line, paraphrased — one feature per bullet, with adopter-facing impact>

<area heading 2>:
- <feat: line, paraphrased>

Migration:
<auto-detected from adopter-impact findings; if none, start with the exact sentinel: `No required project-side edits`>
```

Group commits by area where natural (e.g., `viz/`, `SPEC contract`, `Doc currency`). Skip chore/internal commits in the Changes block — the block is adopter-facing, not exhaustive history. Surface the draft to the user for review/edit. Common adjustments: regrouping the Changes block, rewording the Migration block, adding/removing entries.

**Sentinel check (before surfacing for user review):** if the adopter-impact classification concluded no required edits, confirm the first non-empty body line under `Migration:` in the drafted message starts with `No required project-side edits` (exact casing; `update-adopters.mjs:migrationBearingTags` uses `startsWith` on this sentinel). If it doesn't, fix it before presenting the draft — a mismatch silently flags the entire adopter fleet as migration-bearing.

Lock the tag message when the user approves. Save it for use in step 7.5.

**VERSION-HISTORY entry (same lock).** Immediately after the tag message is locked, draft a curated entry for `docs/VERSION-HISTORY.md` distilled from that message — do **not** dump the full Changes block. Shape:

- **Minor / major** (`Z = 0`):

  ```markdown
  ## vA.B.C — <one-clause headline from tag subject>

  - <2–4 main theme bullets>
  - …

  Also: <optional short secondary wins, one clause or short list>.
  ```

  Drop the “Also:” line when there is nothing secondary worth naming.

- **Patch** (`Z ≠ 0`):

  ```markdown
  ### vA.B.C — <tag subject after the em-dash, or the full short subject>
  ```

  One line only — no main/secondary bullets.

Prepend the entry **immediately below** the horizontal rule that follows the intro in `docs/VERSION-HISTORY.md` (newest first). Do not rewrite historical entries. Surface the drafted entry with the locked tag message so the user can tweak density before commit-go; lock both together.
