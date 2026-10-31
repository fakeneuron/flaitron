# Scope and question (`/ft-seed-unattended`)

> Lazy-loaded SKILL fragment. Loaded by `claude/skills/ft-seed-unattended/SKILL.md`
> Step 2 when a walk holds a row declined only for want of a readiness basis,
> only by one undecided design choice, or by those two together. It overlays Steps 2–5: where a
> section below is silent, the body's step applies unchanged; where it
> speaks, it wins.

What a `scope` and a `question` are, when each applies, and the per-walk
caps (mirror of `SPEC/unattended-candidacy.md` §"Preparing declined rows")
live in that module, which the body Read at Step 1. Apply them from that text; this fragment
carries only the procedure. Like the body, it never emits the
`unattended-candidates:` line: the skill is attended only.

## Step 2 — Classify and draft

**Slot and draft first.** Before the body's clause-6 ordering runs, and
after its collision stays are settled, walk the rows that still qualify in
PLAN order, and draft each one (Scope steps 1–4,
Question steps 1–3)
while the caps it needs have room (module §"Preparing declined rows",
**Per-walk caps**). A row already carrying a
`Filed with starter at` pointer with no note behind it does not qualify:
it stays, the reason naming the dangling pointer, for a hand fix. A rider needs one of
each: when either cap is full it takes neither, and the next row may take
the slot it left. A draft that fails stays with its own reason and frees
its slot for the next qualifying row, within the attempt cap, so rows that
fail every walk never starve the ones after them. A row left without a slot stays,
`scope deferred — cap` or `question deferred — cap`; a rider names every
cap that was full. This phase ends before any item is decided, so the
order dependents resolve in never changes which rows are drafted. Items
(Scope step 5, Question step 4) follow the body's clause-6 order.

**Scope.** For each slotted scope row:

1. **Read, bounded.** The paths the row names, backticked or bare;
   `git grep -ilF -e '<shortname>'` over tracked files (fixed string, in
   single quotes with any `'` written `'\''`, so nothing in it expands),
   ignored when it matches more than twenty files; and the files that
   name the repo's commands and spec runner (`package.json` scripts,
   `justfile`, `Makefile`, `pyproject.toml`, a `playwright.config.*` or
   equivalent) at the root and in each directory between a named path
   or a grep hit and the root, read once per walk and reused. Nothing outside the
   repo, and no recursive walk beyond that grep.
2. **Draft the starter** at `.flaitron/tasknote/<ID>.md` from
   `<root>templates/tasknote-starter-template.md`, the way the body's split
   starter is drafted: `status: starter`, `created:` today, title from the
   row's shortname, nav header `🌱 Starter (filed <today>)`. Fill:
   - `touches:` uncommented, listing the paths the run is confined to (a).
   - `### Acceptance that decides it` (b): one or more criteria, each a
     criterion followed by ` — ` and its command in backticks. Every
     command is a test, lint, or type-check script the repo defines, or a
     `grep -q` for a string the row must add, and decides the work, not a
     fact already true: a suite that passes today decides only behavior
     the row must keep. No
     `judgment`, no `👁️`, no placeholder.
   - On a rendered-surface row (d): one of those criteria runs the repo's
     spec runner (Playwright or its equivalent, found by its config file or
     a script that invokes it) and states the assertion in words — what
     the spec asserts, and where. The spec file need not exist; the run
     writes it. The stated assertion is what makes the run decide: the
     runner named alone does not (module §"Readiness basis" (d)). No
     runner in the repo means (d) cannot hold.
   - `### Decisions locked in this conversation`: the facts the read
     settled, one row each. On a rider, each option's draft also carries
     its answer row (Question step 3); the gate shows it and Step 4 writes
     it as drafted.
   - `### Open at promotion` (c): delete it. Anything else the read
     leaves open fails (c) at step 3, naming it; the row's one bounded
     choice is its riding question, not an open item. Drop any other
     sub-heading with nothing genuine to say, as `/ft-file-task --starter`
     does.
3. **Check (a)–(d)** on the draft (module §"Readiness basis"). Any
   applicable field missing → drop the draft; the row stays,
   `scope — basis incomplete: (d) no spec runner` (name each missing field
   and why). Never keep a partial starter.
4. **Draft the row**: the source row verbatim, with
   `` Filed with starter at `.flaitron/tasknote/<ID>.md`. `` appended after
   the description's last byte, one space before it, and a `.` first when
   the description does not end in one. Nothing else changes; the suffix
   sits outside the word count.
5. **Token item.** Run the full predicate over the drafted row, clauses 1
   and 3 reading the drafted starter as its basis. Admitted → the item is
   that row with the token in place; declined → no item, naming the clause
   (clause 6, which withholds an item without blocking the scope, as for a
   pin).

**Question.** For each slotted question row:

1. **Bound it.** Read as Scope step 1 does, no further. One question, at
   most twenty words. Two or three options, each a fact the module's Pin
   bullet allows and the row or that read names — a file, a command, or
   one of the patterns already in the repo. Never invent a design the row
   and the repo do not offer.
2. **Draft each option** as the pinned row its answer would write, under
   the body's **pin** rules (exact-string rewrite, every other byte
   verbatim). An option whose row keeps another clause-3 trip is dropped;
   on a rider, the rendered-surface reading is not such a trip, since the
   scope's basis decides it (module **Question** bullet). Fewer than two
   options left → the row stays, `question — unbounded`.
3. **Riding a scope.** When the row is also a scope, each option row also
   carries the starter pointer (Scope step 4), and the starter is drafted
   **per option**, with that option's answer row in `### Decisions locked`
   (the Step 4 shape) and the `touches:` and criteria that option implies. Each draft is
   checked on its own; an option whose draft fails (a)–(d) is dropped, and
   fewer than two left → the row stays.
4. **Token item per option.** Run the full predicate over each option row;
   on a rider, with that option's draft as its basis. Each option is shown
   with its item or the clause that withholds it.

**Clause 6.** A scope's item, and a question's, counts as a candidate for
a dependent the way a pin's does. A dependent leaning on a question's item
names it `← after <ID> (needs an answer)`. It stands only when the answer
keeps an item. An unanswered question, an answer whose option has no
item, and a `no item` answer each count as a dropped item, so the body's
cascade drops every dependent leaning on it.

## Step 3 — What the gate adds

**Counts** gain `scopes · questions · deferred by cap`; the deferred rows
are also counted in `stays`.

**Preparations** list each scope that carries no question beside the pins
and splits, with every basis field on its own line:

```text
7. scope - [ ] **CORE-610** [heavy] | settings empty state — Show an empty state in the settings Panel. Filed with starter at `.flaitron/tasknote/CORE-610.md`.
         starter: .flaitron/tasknote/CORE-610.md
         (a) touches: src/ui/Panel.tsx, e2e/panel.spec.ts
         (b) Panel renders the empty state — `npm run test:e2e -- e2e/panel.spec.ts`
             No type errors — `npm run typecheck`
         (c) open: none
         (d) e2e/panel.spec.ts asserts the empty-state text inside the Panel at /settings
         locked: Panel component → `src/ui/Panel.tsx` (the only Panel in the repo)
         item: - [ ] **CORE-610** [heavy] [unattended] | settings empty state — Show an empty state in the settings Panel. Filed with starter at `.flaitron/tasknote/CORE-610.md`.
```

**Questions** — a block of its own, after the preparations and before the
stays. Each option row is shown with the token in place when its item
fires, else followed by `(no item — clause N)`. A rider shows the basis
lines its drafts share once, under the question, and under each option
the lines that option changes:

```text
Questions — answer with `<ID> <letter>`; an unanswered question stays
Q1 CORE-620 — Persist drafts through the existing `src/db.ts` or `src/cache.ts` module?
   a) - [ ] **CORE-620** [moderate] [unattended] | drafts store — Persist drafts through `src/db.ts`.
   b) - [ ] **CORE-620** [moderate] [unattended] | drafts store — Persist drafts through `src/cache.ts`.
```

**The ask** gains one sentence after the body's: *Answer a question with
`<ID> <letter>` (`CORE-620 b`), or `<ID> <letter> no item` to write the
pin without the token. An answer is an ID in your list, so add `all` to
keep the rest too (`all, CORE-620 b`); `all` alone answers no question.*

Reading the reply, on top of the body's rules:

- An `<ID> <letter>` entry is always an answer, read before the body's
  list forms and never part of an `all but` exclusion. Without `all`, it
  counts as that ID in a keep list. So `CORE-620 b` alone keeps only
  CORE-620, while `all, CORE-620 b` and `all but CORE-611, CORE-620 b` keep
  the rest as the body reads them, plus the answer.
- A question is answered only by `<ID> <letter>`. `all`, `all but …`, a
  bare `<ID>`, and the body's letterless `<ID> item` / `<ID> no item`
  leave it unanswered, so the row stays and every kept mark
  or item leaning on it drops (the body's cascade). A letter not offered
  is unanswered too, and Step 5 names it. An `<ID> <letter>` on a row
  that is not a question is ignored and named at Step 5; the row keeps
  what the rest of the reply gives it. To leave a question unanswered, do
  not answer it.
- An answer keeps that option's pin with its item, when the option has
  one; `no item` keeps the pin alone. On a rider it keeps the scope as well. An unanswered rider writes
  nothing: no row, no starter.
- `none` writes nothing, answers included.

## Step 4 — What the write adds

**Re-scan** (body item 1), for each kept scope and answered question:
re-run the collision check on its ID (for a scope, the starter path),
check that the source row still reads as Step 1 read it, and for a scope
check that every script its criteria name is still defined. A failure skips that preparation and its
item, leaves the row untouched, applies the reply's drop rules, and is
named at Step 5.

**Writes** (body item 2), by exact-string replacement of the whole row:

- **Scope** — the drafted row, with the token when its item was kept.
- **Answered question** — the chosen option's row, with the token only
  when that option carries an item and the reply did not say `no item`. On a rider, that row already carries the
  pointer, and it is the only row written: the Scope bullet does not
  apply.
- **Starters** — written last with the body's split starters, each as
  drafted. On a rider, that is the chosen option's draft, whose answer
  row (added at Step 2) reads
  `| <the question> | <the chosen option> | operator answer at the seed gate, <today> |`,
  any `|` in the question or option written `\|`. In every starter, each
  date (`created:`, the nav header, the captured line, the answer row) is
  the day of the write; every other byte is as drafted.

The body's mid-motion failure rule covers these rows too: write a starter
only for a scope whose pointer row already landed.

**Post-stage verification** (body item 3) recognizes these as well: a
rewrite of a kept scope's row (the pointer suffix, plus the token when its
item was kept), a rewrite of an answered question's row (the chosen pin,
with the pointer suffix on a rider,
plus the token only when that option's item was kept), and the starter
file of each kept scope. A kept scope's row staged without its starter is
not recognized: a token never commits ahead of its basis, so post-stage
unstages and skips the commit, as for any unrecognized change.
A scope or an answered question counts as one source row in `<N>`, a rider
once.

## Step 5 — What the report adds

- `seeded` lists each scoped or answered row whose item was kept;
  `prepared` lists every kept scope and answered question.
- `questions unanswered: <IDs>` — or `none` — with any letter that named
  no option.
- Each scope and question skipped at the Step 4 re-scan, with the check it
  failed.
