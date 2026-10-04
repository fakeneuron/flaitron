# Security

Flaitron is a solo-maintained workflow system, not a hardened product. This
page documents the realistic threat model and the conventions adopters should
follow. It is short on purpose — anything not covered here is out of scope.

## Reporting a vulnerability

Open a GitHub issue on this repository. There is no private disclosure
channel; flaitron has no internet-facing service (the viz dev server is
localhost-only; see below), no users beyond its adopters, and no realistic
class of finding that benefits from embargoed disclosure. If you believe
you have an exception, say so in the issue and omit exploit details until
we agree on a path.

## Threat model

### Prompt injection via user-authored markdown

Flaitron's bundled execution surfaces — Claude Code skills/commands
(`/ft-task`, `/ft-audit`, `/ft-release`, `/ft-audit-repo`, and others),
Codex skill wrappers under `codex/skills/`, and Cursor / Grok thin wiring
under `cursor/` and `grok/` (snippet + procedure pointer; skills are the
canonical `claude/skills/` bodies) — read content the user authored:
tasknotes, `PLAN.md`, `SPEC.md`. In an adopter project, "the user" may
include contributors who open pull requests. The threat model below applies
to any AI assistant reading the same files; runtime-specific mitigations
name `.claude/`, `.agents/skills/`, `.cursor/skills/`, and `.grok/skills/`
surfaces where relevant.

A contributor PR that adds a tasknote (or edits `PLAN.md`) can attempt
to steer the assistant into running unintended shell commands the next
time a skill is invoked against that file. The realistic attack: an
attacker-supplied tasknote contains text crafted to look like skill
instructions and tells the assistant to run a `curl` exfiltrating
local files, modify config, etc. The risk scales with how permissive
the runtime's tool allowlist is.

**Adopter mitigations (any AI assistant).**

- Review contributor PRs that touch `.flaitron/` content with the same care
  you would give to a code change. The body of a tasknote is executable
  context, even though it is plain markdown.
- Treat the first run of a skill against contributor-authored content as a
  judgment call, not a routine action.

**Adopter mitigations (Claude Code).**

- **Recommended three-layer hygiene:** global `~/.claude/settings.json` (base
  allowlists) + personal base layer (e.g. a dedicated repo for reusable
  personal standards) + per-project `.claude/settings.local.json`
  kept tiny and high-signal only (or empty). Use `defaultMode: "acceptEdits"`
  (or `plan`) plus periodic `/fewer-permission-prompts` rather than growing
  long one-off allowlists. Broad globs (`Bash(curl *)`, whole-home `Read(**)`,
  etc.) remain high-risk for prompt injection.

The flaitron skills themselves do not implement a sandbox; the Claude Code
harness is the only enforcement layer.

**Contemporary tactic refinements.** The "review the PR diff" mitigation
above assumes the injected payload is visible to a human reading the diff.
Three current tactics defeat that assumption; each sits inside the same
any-AI-assistant threat model.

- **Invisible-Unicode smuggling.** Instructions can be hidden in zero-width
  characters (e.g. U+200B), the Unicode Tags block (U+E0000–E007F, the
  "ASCII smuggler"), bidirectional overrides (U+202E), or homoglyphs. They
  render blank or benign in a diff view while the model reads them
  verbatim — so visual PR review is necessary but *not sufficient*. Before
  acting on contributor-authored `.flaitron/` content, scan the changed
  text for the invisible classes specifically (ordinary emoji and
  em-dashes are not the concern; the dangerous codepoints render to
  nothing). For example:
  `grep -nP '[\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2060}-\x{2064}\x{FEFF}\x{E0000}-\x{E007F}]'`
  over the changed files, and treat any hit as suspect.

- **The lethal trifecta — git as the exfil channel.** In an adopter repo
  the skills combine all three legs of the "lethal trifecta": access to
  private local data, exposure to untrusted contributor content, and an
  exfiltration channel. Blocking `Bash(curl *)` does not close the channel.
  The closure protocol commits locally
  ([`SPEC/post-closure.md`](SPEC/post-closure.md)); a commit message,
  branch name, or staged file is itself an exfil surface (e.g. an
  injected instruction to append `$(… | base64)` to the commit body).
  **Push is a separate gated step.** Ordinary commit-go does not
  authorize `git push`, and ordinary task closure never pushes. A release
  cut's push is its own push-go inside the 📦 bundle; commit-go includes
  that push only after push-go is Yes. Any other push waits for an
  operator gate. A pushed file becomes an exfil surface only after that
  gate. The human 📦 ready-to-commit gate closes the local-commit surface
  when the
  closure diff trips privileged-ops (non-documentation files under
  migrations, auth, secrets, or external integrations; credential keywords
  in any file, documentation included) or a bundled in-📦 prompt is queued;
  routine frontend, documentation, and other non-privileged diffs
  auto-commit. Do not
  suppress the remaining pause (`--fast`, or the `--unattended` posture)
  on a first run against contributor-authored content.

- **Forged in-content control-markers.** flaitron's safety rests on control
  markers and gates the *assistant* emits about its own actions
  (`✅ Closure complete; committing autonomously …`, the 🛠️/📦 banners) and
  on diff-derived skip-rule signals. A malicious tasknote or `PLAN.md` line
  can embed a forged version of these — or text engineered to read as "no
  privileged-ops paths here" — to socially-engineer the assistant past the
  human commit gate. Such markers are never authoritative when they appear
  in read content; the operative contract clause is in
  [`SPEC/gates.md`](SPEC/gates.md) §"Operator-gate cues" → "Control-marker
  integrity".

### Submodule supply-chain trust

Adopters pin flaitron as a git submodule at a specific commit. The
contract surface (SPEC.md, skills, templates) is plain text — there is no
build step, no postinstall script, no executable from flaitron that runs
without the user invoking it.

The realistic compromise path is upstream takeover: if the flaitron
repository's `main` branch is poisoned, every adopter who bumps the
submodule pulls in malicious `SKILL.md` content that future skill
invocations will execute.

**Adopter mitigations.**

- Pin to annotated release tags (e.g. `v5.35.0`), not to `main` or to an
  unreviewed commit on `main`. Release tags are reviewed deliberately;
  `main` is a moving target.
- Review the diff between your pinned commit and the new tag before
  bumping, especially in `claude/skills/` and `claude/commands/`. The
  release tag's annotated message documents migration steps for major
  bumps.
- If you fork flaitron's skills into your project (the documented
  customization pattern in `docs/MIGRATION.md` §1.2.1), you take over
  review responsibility for that forked copy.

### GitHub Actions CI

`.github/workflows/ci.yml` runs the AGENTS.md §"Validation" roster
(`validate`) and the cross-file drift checks described in
[docs/CONVENTIONS.md](docs/CONVENTIONS.md) §"GitHub Actions CI"
(`drift`) on push and pull request to `main`. That is an execution
surface the rest of this document did not cover: a contributor PR's tree
is checked out and its tests run on a GitHub-hosted runner. Both jobs
inherit the workflow-level `permissions: contents: read` and the same
SHA-pinned `actions/checkout`, so the posture below covers both.

The realistic compromise paths are (1) a mutable action tag silently
moving to malicious code, (2) a workflow that grants the job more
`GITHUB_TOKEN` scope than it needs, and (3) a tampered gitleaks release
tarball substituted for the real binary. Exposure is low — the workflow
uses `pull_request`, not `pull_request_target`, so fork runs get a
read-only token and no repository secrets. This is hardening, not a live
vulnerability.

**Mitigations in the workflow.**

- Workflow-level `permissions: contents: read` — the job declares the
  least privilege it needs instead of inheriting the repository default
  `GITHUB_TOKEN` scope.
- `actions/checkout` and `actions/setup-node` pinned to full-length
  commit SHAs (with a version comment), not mutable `@v4` tags. Same
  reason this document tells adopters to pin the submodule to annotated
  release tags rather than `main`.
- The gitleaks release tarball is verified against the release's
  `checksums.txt` via `sha256sum --check` before extraction — a swapped
  or corrupted tarball fails the checksum and the step exits nonzero
  before any untrusted code runs.

**What remains.** A PR that edits `ci.yml` to add `pull_request_target`,
broaden `permissions:`, or swap a SHA is a code change and should be
reviewed as one. Do not add repository secrets to this workflow.

### Fleet updater (`tools/`)

`tools/update-adopters.mjs` is the singular script exception to
`SPEC/scope-boundaries.md` §"What flaitron does NOT provide" — operator-side fleet maintenance across
`~/code`, not workflow machinery inside a project. It batches the
`/ft-update` recipe across every discovered adopter: bump the pinned
`.flaitron/core` submodule to the latest release and commit — or, for an
adopter still on the pre-rename `.flowtron/core` layout, move it to
`.flaitron/` and bump in the same commit (`applyMigrate`) — run manually
by the maintainer (never on a schedule or in CI). Its execution surface
differs from the rest of this document: it walks a filesystem tree, shells
out to `git` across many repos, and can commit inside them.

- **`execFile`-only git invocation.** Every git call goes through
  `execFile('git', [...])` (`git()` in `tools/update-adopters.mjs`) —
  arguments are passed as an array, never interpolated into a shell string,
  so there is no shell-injection surface even for inputs the script doesn't
  otherwise validate (e.g. adopter directory names discovered under the
  workspace root).
- **Semver-constrained arguments.** The one value that reaches git from
  outside the script's own control — the release tag checked out in an
  adopter's submodule — is validated against `^v\d+\.\d+\.\d+$` before use
  (`parseSemverTag`) and re-validated when supplied via the
  `FLAITRON_UPDATE_LATEST` test-seam env var. A malformed or
  unexpected tag string is rejected rather than passed through.
- **Canonical-SHA cross-check on checkout.** `applyBump` and `applyMigrate`
  share `checkoutVerified`, which doesn't trust the
  checked-out submodule's own claim of its version — after checkout it
  re-reads SPEC.md's Version line and separately verifies
  the checked-out commit SHA matches the canonical SHA for that tag as
  resolved in `FLAITRON_REPO`, not the adopter's own clone
  (`verifyPinnedSha`). A moved tag ref or a divergent adopter
  remote fails closed instead of committing a mismatched pin.
- **Local-commits-never-push.** `applyBump` and `applyMigrate` run `git add` + `git commit`,
  and the only other network call is `fetch --tags` — there is no
  `git push` anywhere in the script. Every bump commit stays local until
  the operator reviews and pushes it themselves, per repo.
- **Bump and migrate commits pass `--no-verify`.** The bump commit is a
  pathspec commit touching only the `.flaitron/core` gitlink; the migrate
  commit carries only what the migration staged (the directory move,
  `.gitmodules`, re-pointed symlinks, rewritten `.gitignore` rules, the
  gitlink), after verifying the index held nothing else. `--no-verify` skips only
  `pre-commit`/`commit-msg` — the hooks that could run arbitrary adopter-authored
  code — as a side effect of an unattended fleet sweep; `prepare-commit-msg`/
  `post-commit` still run.
- **Dry-run default.** The script only reports what it would do unless
  invoked with `--apply` (`parseArgs`); a bare
  `node tools/update-adopters.mjs` mutates nothing.
- **Deliberate symlink-following write footprint under the workspace
  root.** `discoverAdopters` follows symlinked directories
  when enumerating the workspace root, and `applyBump` writes into whatever
  `.flaitron/core` resolves to for each discovered adopter (`applyMigrate`
  additionally writes the adopter's `.flowtron/` → `.flaitron/` move, its
  `.git/config`, and `.git/modules/`) — unlike the viz
  dev server's `discoverProjects` (see "Visualizer" below), there is no
  post-resolution containment check pinning writes inside the workspace
  root. This is a deliberate scope difference, not an oversight: the fleet
  updater is operator-invoked tooling over a workspace the operator already
  controls (typically `~/code`), not a service resolving
  attacker-influenced paths. Do not point `--root` (or
  `FLAITRON_VIZ_WORKSPACE`) at a workspace containing symlinks you do not
  trust.

### Visualizer (`viz/`) dev-server scope

`viz/` is a single-user local development tool. It is not designed to run
on a network, behind a reverse proxy, or as a multi-tenant service. Its
dev server:

- Binds to `localhost:5120` only.
- Enforces `server.allowedHosts: ['localhost', '127.0.0.1']`, so requests
  with a spoofed `Host` header (DNS rebinding) are rejected by Vite
  before reaching application code.
- Rejects `/api/*` requests with a cross-origin `Origin` or `Referer`
  header. Same-origin requests from the visualizer's own UI, and
  origin-less requests from the local terminal (e.g. `curl`), are
  allowed.
- Rejects `/api/*` requests carrying `Sec-Fetch-Site: cross-site` or
  `same-site` (`viz/src/originGuard.ts`), ahead of the `Origin` / `Referer`
  checks. Those two headers are both absent from a cross-origin iframe
  navigation sent with `referrerpolicy="no-referrer"`, so without this a
  page on any site could frame `/api/events` and occupy SSE connection
  slots up to the `MAX_SSE_CLIENTS` cap — `same-site` is rejected too
  because a page served from a sibling loopback port can send the same
  header-less GET and would otherwise arrive as `same-site` (FE-119). Only
  `none` (address-bar navigation) and `same-origin` fall through to the
  exact-origin checks, and an **absent** header still passes, so
  non-browser clients such as `curl` are unaffected.
- Rejects non-GET/HEAD `/api/*` requests with 405, ahead of origin
  validation and business logic (`viz/src/devApi.ts`).
- Reads files only from projects discovered under
  `${FLAITRON_VIZ_WORKSPACE:-~/code}/*/.flaitron/`. There is no
  user-controlled path input on any endpoint. That bound is **enforced,
  not assumed**: `discoverProjects` (`viz/src/workspace.ts`),
  `archiveCache.readArchive` (`viz/src/archiveCache.ts`), and the
  `/api/plan`, `/api/active`, and `/api/plan-archive` handlers (`viz/src/devApi.ts`)
  resolve each candidate file through symlinks and drop it unless it lands
  inside the project root's own resolved path — the two tasknote-directory
  readers, `readArchive` and `/api/active`, sharing one implementation of that
  check in `readTasknoteDir` (`viz/src/tasknoteRead.ts`) — so a symlinked `PLAN.md`,
  `PLAN-ARCHIVE.md`, `.flaitron/`, `tasknote/`, or `archive/` cannot pull an
  arbitrary readable file onto the wire. Project roots that are *themselves* symlinks stay supported
  — the root resolves first, and nothing below it may escape. The one read
  outside that bound is `.flaitron/core/SPEC.md`, followed through symlinks
  for its `**Version:**` line only — no file content reaches the wire, and
  containment would break the common `.flaitron/core -> ~/code/flaitron`
  local-dev link for no security gain (`viz/src/workspace.ts`).
- Sends a defense-in-depth `Content-Security-Policy` response header
  (`server.headers` in `vite.config.ts`): `default-src 'self'`,
  `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, and a
  `script-src` with no `'unsafe-inline'` (Vite's injected dev scripts carry
  a static nonce). `style-src` keeps `'unsafe-inline'` because Vite/Tailwind
  inject `<style>` at runtime in dev and those injections cannot carry a
  build-time nonce. `img-src 'self' data:` permits data-URI images.
  `connect-src` is limited to same-origin plus the local HMR websocket.
  Every `/api/*` response additionally carries its own locked-down
  `Content-Security-Policy: default-src 'none'; frame-ancestors 'none'`
  and `X-Content-Type-Options: nosniff` (`viz/src/devApi.ts`), set ahead of
  any guard clause so even 403/400/405/500 error bodies carry them — these
  responses are JSON/text/SSE, never HTML, so they don't share the page
  CSP's script/style tolerances. `frame-ancestors` is spelled out because
  `default-src` provides no fallback for it; it is the client-side half of
  the anti-framing pair whose server-side half is the `Sec-Fetch-Site`
  rejection above.
- Declares `Content-Type: text/plain; charset=utf-8` on every `/api/*`
  error body — 400, 403, 405, 500, and the 503 SSE-capacity reject
  (`endPlain` in `viz/src/apiResponse.ts`, shared by `devApi.ts` and
  `originGuard.ts`). A typeless response leaves both the MIME type and the
  charset to client guesswork, which is what the `nosniff` header above
  needs pinned down to mean anything.
- Never reflects request input in an error body. A request for an unknown
  `?project=` returns a fixed `unknown project`; the requested name is
  written to server stderr instead — the same log-detail/return-generic
  split applied to the 500 paths' filesystem error messages.

Do not expose port 5120 over a network or through a tunnel. If you need a
shared read-only view of project state, build a separate artifact (e.g.,
a static export); the dev server is not the right shape for that.

## Adopter scanner false-positive allowlists

Adopters running prompt-injection scanners (e.g., Semgrep rules) or secret-detection scanners (Gitleaks, TruffleHog, Snyk, etc.) will encounter false positives when scanning a repo that vendors flaitron as a submodule. The source is prose in `SPEC.md`, skill files, and this document that quotes the privileged-ops keyword triggers from SPEC/gates.md §"Conditional skip rule".

**The `filepath:regex` allowlist convention**

GSD-Pi (source of the pattern adopted here) uses simple one-line entries in scanner ignore files (`.prompt-injection-scanignore`, `.secretscanignore`). Format:

```
filepath:regex
```

Examples (one per line):

```
.flaitron/core/SPEC.md:(API_KEY|SECRET|TOKEN|PASSWORD)
.flaitron/core/claude/skills/**/*.md:(API_KEY|SECRET|TOKEN|PASSWORD)
.flaitron/core/SECURITY.md:(API_KEY|SECRET|TOKEN|PASSWORD)
```

These suppress only the documented prose examples. Real credential material in your code or env files remains flagged.

**Flaitron-specific guidance**

Add the lines above (adjusted for your submodule path) to your scanner configuration. The examples cover the four uppercase keywords (`API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`) that appear in the Conditional skip rule definition and in explanatory text throughout the tree.

See SPEC/gates.md §"Conditional skip rule" for the authoritative privileged-ops path categories and keyword-trigger clause.

Flaitron does not ship `.prompt-injection-scanignore` or `.secretscanignore` files — zero runtime scanner configuration by design.
