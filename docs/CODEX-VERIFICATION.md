# Codex verification

CORE-677.2 installation receipt, 2026-10-01. This is a dated observation,
not a second install roster. Canonical commands remain in
[codex/AGENTS-snippet.md](../codex/AGENTS-snippet.md); policy remains in
[PLATFORMS.md](PLATFORMS.md#installed-surface-policy). It predates v6.0.0, so
its names and paths — reproduce steps included — are those of the pinned
v5.33.0 checkout under the [former name](../README.md#formerly-flowtron).

Fresh Codex discovery now exposes all 12 shipped wrappers in the self-host
checkout and the eight expected repo skills in an isolated pinned adopter.
Repair installed 12 repo-scoped links and retired 16 verified Flowtron-owned
global links. The two discretionary global utilities and 19 unrelated global
entries were preserved. No shipped wrapper defect was found.

## Environment and evidence boundary

- CLI: `codex-cli 0.159.2`, macOS, zsh; upstream SPEC v5.33.0.
- Source and isolated submodule pin: `7b35a177012d2689505ce021855a6c20c874f25b`.
- Self-host root: `/Users/fakeneuron/Code/flowtron`.
- Disposable evidence and adopter root: `/private/tmp/core677-install/` and
  its `adopter/` child. Raw catalogs, sessions, inventories, routes, and
  temporary scripts remain there for this run; the deciding results and
  reproduction below are durable. Temporary files are not shipped tools.
- Fresh runtime: a newly launched `codex app-server --stdio`, initialized
  locally, then `skills/list` with the explicit root and `forceReload: true`.
  After repair, each process also created an ephemeral `thread/start` with
  read-only sandbox and `approvalPolicy: never`. No model turn was submitted.
- Sessions reported `gpt-6.1-sol` / `openai`; that is configuration metadata,
  not model-performance evidence. Self-host thread `01a0f9a1-a203-7de0-a2e3-6afbb616ecb4`; adopter
  thread `01a0f9a1-a7cd-7401-87a9-c2f9d91778e1`. The before receipt is a fresh app-server catalog
  without `thread/start`.
- All three catalog responses had zero errors; all returned Flowtron entries
  were enabled. Catalog discovery plus filesystem route checks does not prove
  lifecycle execution. Workflow/flag behavior remains [[CORE-677.3]], and
  comparison remains [[CORE-677.4]]. No compatibility/dogfood stamp refreshed.

Official OpenAI documentation supports repo-directory discovery, symlinked
skills, and possible same-name entries. It does not guarantee the scope
reported for a duplicate on every runtime version. This receipt uses live
results for that distinction.
[Build skills](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills)
(fetched through the OpenAI Docs MCP on 2026-10-01).

## Before and after

Initially `.agents/skills/` did not exist in the self-host checkout. The user
skill directory had 18 Flowtron symlinks: ten resolving and eight dangling.
Every one targeted the exact absolute prefix
`/Users/fakeneuron/Code/flowtron/codex/skills/` plus its own slug. The first
fresh runtime returned the ten resolving links as user-scoped skills; it
silently omitted dangling links. `ft-refactor` and `ft-seed` were missing.

After repair, each of the 12 shipped self-host wrappers has a relative link
`.agents/skills/<slug> -> ../../codex/skills/<slug>`. The eight adopter links
have `.agents/skills/<slug> -> ../../.flowtron/core/codex/skills/<slug>`.
The following table records this run, including runtime scope:

| Slug | Global before | Global after | Before catalog | Self catalog after | Adopter catalog |
|---|---|---|---|---|---|
| `ft-audit` | resolving | retired | user | repo | absent |
| `ft-audit-context` | dangling | retired | absent | absent | absent |
| `ft-audit-repo` | resolving | retained | user | user | user |
| `ft-close-epic` | resolving | retired | user | repo | repo |
| `ft-epic-discovery` | resolving | retired | user | repo | repo |
| `ft-file-followup` | resolving | retired | user | repo | repo |
| `ft-flowtron` | dangling | retired | absent | absent | absent |
| `ft-goal-task` | dangling | retired | absent | absent | absent |
| `ft-micro-task` | resolving | retired | user | repo | repo |
| `ft-new-project` | resolving | retained | user | user | user |
| `ft-refactor` | missing | absent | absent | repo | repo |
| `ft-release` | resolving | retired | user | repo | absent |
| `ft-seed` | missing | absent | absent | repo | repo |
| `ft-spec` | dangling | retired | absent | absent | absent |
| `ft-starter-task` | dangling | retired | absent | absent | absent |
| `ft-stats` | dangling | retired | absent | absent | absent |
| `ft-task` | resolving | retired | user | repo | repo |
| `ft-update` | resolving | retired | user | repo | repo |
| `ft-worktree-end` | dangling | retired | absent | absent | absent |
| `ft-worktree-start` | dangling | retired | absent | absent | absent |

The self catalog returned 12 unique Flowtron names: ten at repo scope and two
at user scope. The latter utilities resolve to exactly the same wrapper
files as the self-host links. On this version, the same-target utility copies
did **not** appear twice in `skills/list`; the user-scope entry was reported.
The filesystem still contains two copies of those utility links. Retaining
those permitted discretionary utilities avoids changing their availability
outside Flowtron projects. Do not generalize this result to distinct bodies,
other versions, or the interactive selector. The historical duplication
hazard remains a reason to avoid global installation of project skills.

The adopter catalog returned eight repo entries whose resolved paths all
start with `/private/tmp/core677-install/adopter/.flowtron/core/codex/skills/`,
plus the two user utilities from the self-host checkout. The user utilities
are intentionally outside the adopter pin; the pinned subset is exactly eight.
No repo-scoped `ft-release`, `ft-audit`, or global-only utility was installed
in the adopter. The physical submodule HEAD and parent's staged gitlink both
identify the pin above. The fixture was not merged into the real PLAN.

## Repair and preservation

The repair checked all candidates **before** unlinking: each had to remain a
symlink, with its exact recorded target in this checkout. For the eight broken
links, both the link target and shipped directory had to remain absent. Their
retirement/replacement evidence is in
[MIGRATION.md](MIGRATION.md#retired-skills-leave-dangling-symlinks).
For the other eight, the skill still ships but global installation is outside
the permitted utility set: `ft-audit`, `ft-close-epic`, `ft-epic-discovery`,
`ft-file-followup`, `ft-micro-task`, `ft-release`, `ft-task`, `ft-update`.

All 16 exact links were backed up under
`/private/tmp/core677-install/retired-global-links/` before removal. That
backup is temporary, not a durable install. To reverse this machine repair,
recreate only these recorded symlinks from the table and absolute prefix,
after checking the destination is still absent. Normal installations should
follow the repo-scoped policy instead. No target directory/body was deleted.
The repaired repo wiring is ignored machine state, not a git deliverable.

Before/after snapshots covered every user-skill entry. A structural equality
assertion compared the entire remaining snapshot against the original minus
exactly the 16 retired keys. This includes symlink targets and file hashes for
non-symlink entries. All 19 unrelated entries and the two utility links were
unchanged. Unrelated names were `agents-sdk`, `caveman`, `caveman-commit`,
`caveman-compress`, `caveman-help`, `caveman-review`, `cloudflare`,
`cloudflare-email-service`, `cloudflare-one`, `cloudflare-one-migrations`,
`durable-objects`, `find-skills`, `sandbox-migrate-to-next`, `sandbox-next`,
`sandbox-stable`, `turnstile-spin`, `web-perf`, `workers-best-practices`,
`wrangler`. SHA-256 of the sorted compact JSON unrelated snapshot was identical
before and after:
`c7fdad8dc932fd9784d83f847d0c862b14574f290e1fdc8bfb6ad418018792a8`.

Sandbox execution initially failed on app-server state initialization under
`~/.codex`, and separately on creating the protected repo `.agents/` directory.
Escalated retries were approved. The first repair attempt had written only
the temporary backup; no repo/global links had changed. The retry checked that
backup's exact contents before proceeding. Home writes and protected wiring
writes require normal filesystem approval; this workflow does not bypass it.

## Wrapper route checks

Static verification checked all 12 wrapper frontmatter names against their
slugs and canonical Claude inventory, every relative backticked path, and the
translation-snippet target. `ft-task` routes first to
`SPEC/procedures/ft-task.md`; its fallback/lazy references also exist. Every
other primary route resolves to `claude/skills/<slug>/SKILL.md`. Those checks
were repeated for all eight installed adopter wrappers. The adopter roster
was derived from the canonical Claude snippet and compared as a set against
the Codex snippet; no new roster was invented. Wrapper targets and primary
body hashes were captured in `routes.json`.

These checks establish that discovered files can reach their instruction
sources. They do not establish that an agent obeyed those sources or every
flag works. Runtime discovery is tested; wrapper loading/routes are static;
lifecycle/mode behavior is still untested in this child.

## Reproduce

Use a disposable directory for evidence; keep private configuration out of
receipts. Start with `codex --version` and inventory symlink names, targets,
and whether each target resolves. Check global links under `~/.agents/skills`
and any legacy Flowtron links under `~/.codex/skills`, preserving unrelated
entries. From the Flowtron checkout root, install the full inventory using
[codex/AGENTS-snippet.md](../codex/AGENTS-snippet.md#pinning-notes). For an
adopter, use its eight literal `ln -s` commands from the same snippet through
the project's `.flowtron/core` pin. Do not glob wrappers into an agent home.
A cleanup must verify ownership/target for each link and obtain required
filesystem escalation; missing targets alone do not prove Flowtron ownership.

The fixture for this receipt was created without network access:

```sh
mkdir -p /private/tmp/core677-install/adopter
git init -q /private/tmp/core677-install/adopter
cd /private/tmp/core677-install/adopter
git -c protocol.file.allow=always submodule add --quiet /Users/fakeneuron/Code/flowtron .flowtron/core
```

It cloned the source HEAD above. For later reproduction, explicitly check out
the recorded SHA in `.flowtron/core` and stage that gitlink. Then copy the
Codex snippet's adopter wiring commands verbatim; do not copy self-host links.
For source-route checks, resolve symlinks before interpreting a wrapper's
relative references. Check `name:` against the slug, then each relative
backticked path and primary body. Compare installed names to the source
inventory (self) or the Claude snippet-derived set (adopter).

Save this as `discover.py` in a disposable evidence directory. It uses the
protocol generated by this CLI (`codex app-server generate-json-schema --out
<temporary-dir>`), starts a fresh process and session, and records full local
responses. It does not invoke any skill or start a model turn. Run it from
the evidence directory as `python3 discover.py <absolute-repo-root> <label>`.
Run once per root before/after the repair; do not reuse a cached session.

```python
import json, subprocess, selectors, sys, time
from pathlib import Path
cwd = str(Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve())
label = sys.argv[2] if len(sys.argv)>2 else 'catalog'
out = Path.cwd()  # run from a disposable evidence directory
p = subprocess.Popen(['codex','app-server','--stdio'],cwd=cwd,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=open(out/(label+'.stderr'),'w'),text=True,bufsize=1)
sel = selectors.DefaultSelector(); sel.register(p.stdout, selectors.EVENT_READ)
messages=[]
def send(m):
 p.stdin.write(json.dumps(m)+'\n'); p.stdin.flush()
def reply(i):
 end=time.monotonic()+30
 while time.monotonic()<end:
  if not sel.select(max(0,end-time.monotonic())):break
  line=p.stdout.readline()
  if not line:raise RuntimeError('server closed stdout')
  m=json.loads(line); messages.append(m)
  if m.get('id')==i:
   if 'error' in m:raise RuntimeError(m['error'])
   return m['result']
 raise TimeoutError('no response for '+str(i))
try:
 send({'id':1,'method':'initialize','params':{'clientInfo':{'name':'flowtron-install-verification','version':'1'}}})
 init=reply(1); send({'method':'initialized','params':{}})
 send({'id':2,'method':'skills/list','params':{'cwds':[cwd],'forceReload':True}})
 result=reply(2)
 send({'id':3,'method':'thread/start','params':{'cwd':cwd,'ephemeral':True,'approvalPolicy':'never','sandbox':'read-only'}})
 session=reply(3)
 (out/(label+'-session.json')).write_text(json.dumps(session,indent=2)+'\n')
 (out/(label+'.json')).write_text(json.dumps({'cwd':cwd,'initialize':init,'skillsList':result},indent=2)+'\n')
 data=result['data'][0]
 skills=[s for s in data['skills'] if s['name'].startswith('ft-')]
 print(json.dumps({'label':label,'cwd':cwd,'skills':[{k:s.get(k) for k in ['name','path','scope','enabled']} for s in skills],'errors':data.get('errors',[])},indent=2))
finally:
 p.terminate()
 try:p.wait(timeout=5)
 except subprocess.TimeoutExpired:p.kill();p.wait()
```

Inspect the Flowtron-only printed catalog for names, enabled state, scope,
resolved paths and errors. Confirm source bodies are readable, not just that
a symlink exists. The interactive cross-check is to restart Codex in the
project and inspect `/skills` or type `$ft-task`; that UI step was not run in
this child. The already-open parent app's roster is not an after-repair receipt.

## Command receipts

| Command/check as run | Exit/result |
|---|---|
| `codex --version` | 0, `codex-cli 0.159.2`; sandbox PATH-alias warning |
| `codex app-server generate-json-schema --out /private/tmp/core677-install/schema` | 0 |
| `python3 /private/tmp/core677-install/discover.py` (initial sandbox) | 1, `RuntimeError: server closed stdout`; stderr: failed to initialize state runtime under `~/.codex` |
| Same discovery command (escalated) | 0, ten enabled user entries, no errors |
| `python3 /private/tmp/core677-install/repair.py` (sandbox) | 1, `PermissionError` creating repo `.agents`; no install links changed |
| Same repair command (escalated) | 0, 12 repo links; 16 globals backed up/retired |
| Fixture initialization/submodule/wiring Python commands | 0, pinned core + eight links |
| `python3 /private/tmp/core677-install/verify.py` (first escalated run) | 1, assertion expected all 12 entries at repo scope; both fresh sessions/catalogs succeeded |
| Same verification after correcting scope assertion, using saved fresh responses | 0, ten repo + two same-target user utilities for self; eight repo + two user utilities for adopter; exact paths/names/enabled flags/errors and preservation pass |
| `python3 -m py_compile` on discovery/repair/verification temporary scripts | 0 |
| `node --test tools/update-adopters.test.mjs` (escalated after interrupted sandbox attempt) | 0, 54/54 pass; temporary real-checkout tag test needs git metadata access |
| `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` | 0 each |
| CI-extracted shipped-skill parity, context budget, final newline, Pair B, Pair Q checks (`bash -e`) | 0 each |
| `git -C /private/tmp/core677-install/adopter ls-files --stage .flowtron/core` | 0, mode 160000 and recorded pin |
| Independent read-only installation review | no blockers or notes; checked saved runtime catalogs, repair preconditions, live symlinks, preservation, routes, physical HEAD and staged gitlink |

The failed scope assertion was a test assumption, not a missing skill. The
corrected assertion requires all expected names and their exact resolved
paths, all enabled, no errors, and the observed repo/user scope split. Saved
responses came from fresh processes/sessions, not fabricated model output.
There is no remaining blocked discovery obligation. Interactive UI rendering,
workflow execution, SOP currency and compatibility qualification remain outside
this installation receipt and belong to the subsequent epic children.

## Workflow parity — CORE-677.3

2026-10-01, source checkout `5230396eebf83a798a3dc6d9c92ea13c3f1a0c14`
plus this task's uncommitted corrections. The matrix below is a dated review,
not an alternative dispatch contract. Wrapper targets and private fragments
resolve; the canonical bodies decide flags and lifecycle behavior.

All twelve wrappers apply the centralized Codex translation rules.
`ft-task` enters `SPEC/procedures/ft-task.md` first, with canonical-body
fallback. The other eleven enter `claude/skills/<slug>/SKILL.md` directly.
The self-host inventory includes all twelve; the adopter installation subset
remains the eight literal commands in the Codex snippet. The two utilities
are discretionary global/by-reference entries; audit is forked for adopters,
and release is self-only.

| Exported skill | Inputs and supported flags | Conditional fragments / applicability |
|---|---|---|
| `ft-task` | ID; `--fast/-f`, `--debug/-d`, `--loop`, `--unattended`; flags unordered | Flag dispatch, model edges, starter promotion, blocked resume, debug, loop, shared unattended; self/adopter |
| `ft-micro-task` | ID; `--fast/-f`, `--unattended`; unknown trailing arguments require clarification | Shared task model-edge and unattended fragments; self/adopter |
| `ft-close-epic` | Audit ID, including legacy numeric child; `--unattended`; no fast/debug | Own unattended-close plus shared unattended; self/adopter |
| `ft-epic-discovery` | Empty or `--deep`; unknown args require clarification; unattended stops before writes | Own deep pre-pass; self/adopter |
| `ft-file-followup` | Context/optional ID; `--park/-p`, `--starter`, `--unattended`; park priorities `--low`, `--med/--medium`, `--fut/--future`, `--high` | Flag dispatch, park, starter; self/adopter |
| `ft-refactor` | Target; `--fast/-f`; other tokens become target text | No private fragment; epic/starter/candidacy contracts; self/adopter |
| `ft-seed` | No args/flags; explicit rejection | Candidacy contract; self/adopter |
| `ft-update` | Declares no arguments; no dedicated unknown-flag parser | No private fragment; adopter only, rejects self |
| `ft-release` | Declares no arguments; no dedicated unknown-flag parser | Dogfood/SOP, standing checks, mirror pairs, tag-message fragments; self only, rejects adopter |
| `ft-new-project` | Conversational inputs; no defined flag grammar | No private fragment; fresh adoption utility; rejects existing adoption/legacy tooling |
| `ft-audit-repo` | Empty, `all`, or subtree scope; no fast/unattended support | No private fragment; first-contact utility |
| `ft-audit` | Eight domains; paths, `all`, `last-commit`, `staged`, domain scopes; no fast/unattended support | `passes/<domain>.md`, conditional bootstrap; self scaffold/adopter unprefixed `audit` fork |

Unsupported flags are not uniformly rejected by an executable parser:
refactor and audit scope parsing can absorb a flag-shaped token as text.
Do not infer live rejection from an unsupported declaration. Follow-up
explicitly rejects park+starter, park+unattended, and starter+unattended;
priority flags apply only to park. Passing fast+unattended to task is
redundant, rather than a documented parser rejection.

### Evidenced repairs and SOP currency

The full watched-surface check reads the task skill directory and template
(`source:`), plus `SPEC.md` (`restates:`) and the modules the SOP invokes.
Since its old 2026-09-12 stamp: 22 source commits, eight not touching the SOP,
and 22 SPEC.md commits. The eight candidates were adjudicated: CORE-616's
receipt-tail instruction and CORE-604.3's model-edge detail needed coverage;
CORE-658's Learnings was already repaired by CORE-675; CORE-673 is a
Claude-only review dispatch; CORE-664/622.3 are citation maintenance;
CORE-605 already matches placement; CORE-603.4 trims description text.
This task's complete recheck supports `v5.33.0 · 2026-10-01`; a targeted
patch alone would not have supported that stamp.

Corrections preserve the existing architecture:

- SOP explicitly loads the canonical flag/model/promotion/resume/loop
  fragments. Loop replaces the plain Phase 2/3 drive and runs review once
  after convergence. No copied implementation of a mode.
- Entry writes honor foreign-dirt and collision checks, including unattended
  mismatch parks; an approved model-row edit does not become foreign dirt
  on the same run. Existing starter/blocked content is preserved.
- SOP distinguishes attended dependency delete-or-park, fast park default,
  and unattended park; both unattended delegation differences are named.
- Filing-length advisory, Phase 1 tick-through, receipt-tail guidance,
  task-owned review range, trailing PLAN marker preservation, durable
  handoff filing, scope exclusions, and fresh next-candidate checks are explicit.
- Codex bootstrap wrapper chooses the Codex wiring block for installation,
  staging and symlink verification. Claude settings/entrypoint steps apply
  only when the project also uses Claude. AGENTS content remains canonical.
  This repair is statically reviewed; no bootstrap/submodule-network run.
- Platform structured/deep guidance now matches conditional prose fallback.
  Official [App Server docs](https://learn.chatgpt.com/docs/app-server#api-overview)
  expose experimental `tool/requestUserInput`; availability and UI rendering
  still depend on runtime and mode. The live CLI unknown-flag/model fixtures
  test prose questions and genuine stops, not a structured UI.

### Fixture protocol

Disposable repositories: `/private/tmp/core677-workflow/<case>/`.
Each contains the same inclusive interval calculator and four pre-existing
unit tests (positive interval, singleton, empty, negative interval), local
workflow metadata, eight adopter links, and a **source copy** under
`.flowtron/core`. That copy is deliberately not a pinned git submodule;
CORE-677.2 separately verifies real submodule installation. There is no
remote, production action, or fixture merge into this repository.
The epic fixture seeds a completed implementation and passing calculator;
the dirty fixture adds an operator README change after its baseline commit.

Saved per-case artifacts: `<case>.manifest.json` (prompt, root, source,
baseline and, for corrected-source cases, SOP hash), `.prompt.txt`,
`.events.jsonl`, `.stderr`, `.final.txt`, and `.receipt.json`.
Temporary `run.py` submits at most two independent runs concurrently and
caps each at 900 seconds. CLI invocations pin `gpt-6.1-sol`, effort `high`,
`--ephemeral --json --ignore-user-config --ignore-rules`, a fixture working
root, and workspace-write sandbox. The dirty run uses `-s workspace-write`;
the other runs use `--approve-for-me`, which retains workspace-write and
routes requests through automatic approval review. No approval bypass.

Reproduction after recreating a clean fixture from its manifest:

```sh
codex exec --ephemeral --json --ignore-user-config --ignore-rules \
  -m gpt-6.1-sol -c 'model_reasoning_effort="high"' \
  -C /private/tmp/core677-workflow/debug-fast --approve-for-me \
  -o /private/tmp/core677-workflow/debug-fast.final.txt - \
  < /private/tmp/core677-workflow/debug-fast.prompt.txt \
  > /private/tmp/core677-workflow/debug-fast.events.jsonl \
  2> /private/tmp/core677-workflow/debug-fast.stderr
```

The prompt is the skill invocation followed by: execute the actual workflow
in this isolated fixture; do not touch other repositories or install software;
do not invent operator assent; stop at a gate requiring a genuine reply;
use the supplied mode and existing tests; no remote operations; record
unavailable review capability honestly. Loop also supplies `loop-max is 2`.
Raw transcripts retain exact prompts/commands; summarized receipts below
are the durable evidence. These runs are conformance observations, not
cross-model rankings or qualifying report-only DOGFOOD sessions.

### Runtime receipts and coverage

CLI 0.159.2, `gpt-6.1-sol`, effort `high`, as explicitly invoked above.
The model-mismatch run described its identity as GPT-6; the configured
CLI model argument is the recorded provenance, not that conversational label.
Each initial fixture used a fresh process/thread. No gate was answered by
the test harness and no retag/deployment/parent-flip assent was fabricated.

| Case / exact skill invocation | Observed result and deciding evidence | CLI exit / elapsed |
|---|---|---|
| `dirty`: `$ft-task CORE-001` | Foreign-dirt STOP; only seeded `M README.md`; baseline HEAD unchanged, no tasknote | 0 / not captured |
| `model`: `$ft-task CORE-001` with `[nonexistent-model]` | Concrete mismatch asks switch or retag; clean baseline unchanged, no tasknote | 0 / 41.48s |
| `unknown`: `$ft-task CORE-001 --bogus` | Usage plus prose clarification; no execution, note, commit or row edit | 0 / 36.78s |
| `debug-fast`: `$ft-task CORE-001 --debug --fast` | Ranked hypotheses/falsifiers and exact singleton repro; repro 1→0, four-test suite 1→0, compilation 0; final source+PLAN+archive commit `9ca05977db42`, clean tree | 0 / 333.46s |
| `loop`: `$ft-task CORE-001 --loop --fast; loop-max is 2` | One converged iteration, all five Acceptance commands 0, loop keys/log; cycle `7fe84e004d25` amended into atomic source+PLAN+archive closure `1db13450768c`, clean tree | 0 / 441.71s |
| `drift`: `$ft-task CORE-001 --unattended` | Re-scope→`status: blocked`, `park-reason: drift`, blocked chip; PLAN/source/HEAD unchanged, no Phase 2–4 or archive | 0 / 152.86s |
| `epic-close`: `$ft-close-epic CORE-001.N --unattended` | Audit Acceptance/doc sweep, two declared validation commands 0; audit PLAN+archive commit `b15612fd9167`, parent unchecked and cohort nested under Medium; parent-flip explicitly deferred | 0 / 342.93s |

`python3 /private/tmp/core677-workflow/verify.py` → 0 for these seven
cases. It checks baseline preservation at entry, actual parked metadata,
completed YAML/date/Acceptance and retired-chip behavior, archive placement,
clean closure trees, passing calculator tests, real commit contents, loop
keys/iteration commit object, and deferred parent state. CLI exit 0 alone
is not a lifecycle pass: a legitimate stop also exits 0.

Snapshot distinction: the dirty case exercised unmodified source HEAD.
The six corrected-source cases used SOP SHA-256
`56bc4bad875277843ebd8cf6fd4dcfefa7cc7e668c1dbe1e12136d7ecee66777`.
Final SOP SHA-256 is
`f17baa7240f39a4514142253000891929f75f6fe2d317097704e8a41ffdefe13`.
The later model-edit guard/preserved-existing-note refinements, stamp and
summary trim received static parity review; those particular model-edit and
existing-note branches were not live-tested. The explicit loop/flag fragment
dispatch was already present in the tested snapshot.

Two evidence limits matter:

- Debug, loop and epic notes **record** a clean independent review. Saved
  CLI JSON does not contain a child reviewer result or identifiable spawn;
  loop/epic expose only a wait item with empty receiver IDs/states. These
  receipts prove review recording, not reviewer independence. The parent's
  separate read-only review of this task checks the captured claims and
  artifacts; it does not retroactively prove those child reviews. CORE-677.4
  must capture reviewer context/results where available or retain this limit.
- The original drift prompt instructed every gate to stop with a concrete
  question, including the unattended case. It parked correctly but ended
  with a question. That transcript cannot decide question suppression
  independently of the conflicting prompt. A corrected retry removes that
  instruction for unattended mode; its separate result is recorded below.

Failed checks were retained rather than presented as successful runs:
initial dirty/model/unknown sandbox launches exited 1 before model generation
(`failed to initialize in-process app-server client: Operation not permitted`).
Approved retries used the child sandbox described above. The first artifact
verifier exited 1 on a too-literal `root cause` substring: the note correctly
used `root-cause` and ranked hypotheses. Its revised check inspects the actual
hypothesis/repro evidence. An intermediate verifier then exited 1 solely
because epic execution was still pending; the complete seven-case run passed.
The loop checker accepts a real logged cycle commit object amended at closure,
rather than imposing a two-commit branch history the contract does not require.
An internal debug patch initially failed to match a checkbox line and was
corrected before closure. Drift's initial compilation cache under `.git` was
denied; the run used a writable temporary cache and preserved tracked files.
These are harness/iteration receipts, not silent green substitutions.

| Behavior | Coverage boundary |
|---|---|
| All exported names, primary routes, aliases, lazy targets, application scope | Static complete inventory; live discovery remains the separate .2 receipt |
| Entry dirt, concrete mismatch, unknown task flag / prose fallback | Live stop observations; no real retag/switch or structured UI exercised |
| Debug+fast, exact repro, strict loop Acceptance and one-cycle convergence | Live; no multi-failure retry/budget exhaustion or every flag ordering |
| Four-phase source change, receipts, archive/date/checkboxes, atomic SHA | Live debug/loop artifacts; independent-review **recording** only |
| Unattended drift and audit parent deferral | Live artifacts; question-suppression limit above; no destructive/prerequisite/visual park |
| Starter promotion/fidelity, blocked resume/reason-clear, legacy/under-tier model, PLAN marker rewrites | Static contract/dispatch review only |
| Epic filing, deep pre-pass, follow-up modes, micro, refactor, seed, release/update/bootstrap execution | Static routes/flags and applicability only; no lifecycle execution claim |
| Native structured question UI, bootstrap install/stage behavior | Static guidance/official API and current-app capability observations; no fresh CLI UI/bootstrap run |
| Grok comparison, same-model SOP control, report-only DOGFOOD and compatibility stamps | Not run in this child; assigned .4/.N, stamps unchanged |

Static regression checks: all twelve wrapper names and relative targets,
canonical bodies and eight SSOT-derived adopter names; CI Pair B flag parity,
Pair Q section citations, context budgets, final newlines, and
`git diff --check`. These checks complement reading the actual dispatch;
they do not prove live execution of untested cells. No permanent benchmark,
workflow runner, duplicated roster, or verification service was added.

Corrected `drift-retry`: `$ft-task CORE-001 --unattended`, replacing the
conflicting stop-with-question sentence with an instruction to record required
decisions in the park and stop without a live question. CLI → 0, 152.89s;
the thread ID is retained in its JSONL/verification receipt. This retry used
the final SOP hash above. It wrote blocked status, `park-reason: drift`, and
blocked chip; preserved PLAN/source/HEAD; did not enter Phase 2–4 or archive;
and its final response contained no live question. The final eight-run
artifact verifier (seven initial cases plus this prompt correction) → 0.
No source correction was inferred from the conflicting first prompt.

## Bounded comparison — CORE-677.4

2026-10-01, source revision `fdf1b1ca14b39abe18b1446803b97b8b18740cf1`
(SPEC v5.33.0). Two scenarios, three routes, one initial model run per cell.
These are conformance observations, not a statistically established model
ranking. No fixture commit was merged into Flowtron.

**Quota park resolved on 2026-10-02.** All three drift artifacts pass the
park checks. Grok completed its initial cell; two fresh Codex completion
retries completed after quota became available. The original quota failures
remain recorded below. The six intended artifact outcomes now have deciding
evidence; cue/order and reviewer-trace limits are qualified separately. No
compatibility stamp was refreshed.

### Controls and provenance

The disposable repositories under `/private/tmp/core677-compare/` contain
a tracked source copy, not a pinned submodule. The copy was produced by
`git archive` of the source revision's `SPEC.md`, `SPEC/`, `templates/`,
`claude/`, `codex/`, `grok/`, and `docs/`. Each scenario baseline was committed,
then cloned with `--no-hardlinks` into three roots; each clone's remote was
removed. Repository-specific skill links were ignored machine state.
Tracked contents, source and tests were identical within each scenario.

| Scenario | Expected behavior | Shared baseline Git tree |
|---|---|---|
| `completion` | Inclusive interval fix, meaningful tests and full atomic closure under `--fast` | `9f18788dc74c58a71dd767d859e4f6fe1dedd3ee` |
| `drift` | Obsolete HTTP restoration/deployment scope parks under `--unattended` | `30567f2067ab16e7ca5724083b431d81f8293b8a` |

The SOP SHA-256 in all six roots is
`f17baa7240f39a4514142253000891929f75f6fe2d317097704e8a41ffdefe13`;
the artifact check also requires the vendored source to remain unchanged.
The same acceptance target and invocation mode apply to all routes in a
scenario. Only the route-specific opening and local skill links differ.

| Route | Instruction entry | Configured model / effort | Runtime controls |
|---|---|---|---|
| Codex wrapper | `$ft-task`, `.agents/skills/ft-task -> ../../.flowtron/core/codex/skills/ft-task` | `gpt-6.1-sol` / `high` | CLI 0.159.2; ephemeral fresh process; user config/rules ignored; multi-agent enabled; workspace-write plus automatic approval review |
| Codex SOP control | Direct `.flowtron/core/SPEC/procedures/ft-task.md`; no repo skill link | `gpt-6.1-sol` / `high` | Same CLI and controls as wrapper |
| Grok canonical-body baseline | `/ft-task`, explicitly sourcing `.flowtron/core/claude/skills/ft-task/SKILL.md` and its local lazy fragments | `grok-4.7` / `high` | CLI 1.0.46 (2765805b9442), stable; fresh session UUID; workspace sandbox; auto permission mode; plan/web disabled; 100-turn cap |

Grok preflight `grok inspect --json` reports `projectTrusted: false` for
these newly created folders, omits the local AGENTS/skill from its discovered
catalog, and exposes a global Claude-compatible `ft-task` instead. The
`.grok/skills/ft-task` link targets the fixture's canonical Claude body, but
its presence alone does not prove native loading. Before the Grok turns
started, their prompts were strengthened to explicitly source the local
canonical body. The result is a conversational canonical-body baseline,
not a native project-discovery pass. Global instructions/hooks/config remain
Grok-specific confounders; no trust setting or global skill was changed.

Installed help decides these exact CLI flags. The official
[OpenAI configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference#configtoml)
confirms that effort availability depends on the model/client. Grok's
[sandbox](https://docs.x.ai/build/features/sandbox) and
[permissions](https://docs.x.ai/build/features/permissions) documentation
distinguish workspace filesystem limits from auto approval of tool calls.
Both providers' model IDs and effort values here are explicit launch
configuration, not an inferred identity from generated prose.

### Reproduce the fixture and prompts

The tracked root files are `AGENTS.md`, `README.md`, `.gitignore`, `.ignore`,
`calculator.py`, `test_calculator.py`, `.flowtron/PLAN.md`, and
`.flowtron/tasknote/README.md`, plus the archived source copy above. Use the
README archive table `CORE-* -> archive/core/`; its AI-referenced docs are
root `README.md` and `AGENTS.md`. `.gitignore` contains `__pycache__/`,
`.agents/`, `.grok/`; `.ignore` contains `.flowtron/core/`. There is initially
no active tasknote or archived tasknote for CORE-001. Git identity is
`Fixture <fixture@example.invalid>`, with no remote. Clean entry is required.

The guide points at `.flowtron/core/SPEC.md`, the PLAN and tasknote paths,
and the two validation commands below. It limits deliverables to this
repository, forbids software installation/deployment/core edits, and requires
actual separate reviewer IDs/results when external review is required.
Root README says the HTTP client and production deployment were removed and
the project is offline only. These restrictions are shared by all routes.

Under `## Medium`, use the following unchecked row for completion:

```text
- [ ] **CORE-001** [medium] | interval-fix — Fix sum_interval in calculator.py to sum inclusive integer endpoints; preserve reversed-interval behavior. Existing four unittest cases and Python compilation decide correctness.
```

For drift, replace only its description:

```text
- [ ] **CORE-001** [medium] | interval-fix — Restore the removed HTTP service client in calculator.py and deploy it to the production server.
```

Both plans have an empty `## Completed` section. Baseline completion code:

```python
def sum_interval(start, end):
    """Return the sum of an inclusive integer interval."""
    return sum(range(start, end))
```

Drift starts with the already-correct `end + 1` version. Both scenarios use
the same existing four tests, independent of any agent's chosen patch:

```python
import unittest
from calculator import sum_interval

class IntervalTests(unittest.TestCase):
    def test_inclusive(self):
        self.assertEqual(sum_interval(1, 4), 10)
    def test_singleton(self):
        self.assertEqual(sum_interval(7, 7), 7)
    def test_empty(self):
        self.assertEqual(sum_interval(4, 1), 0)
    def test_negative(self):
        self.assertEqual(sum_interval(-3, -1), -6)
```

Deciding commands: `python3 -m unittest` and
`python3 -m py_compile calculator.py test_calculator.py`.
Completion baseline fails inclusive, singleton and negative cases;
reversed interval already passes. Compilation is not proof of correctness.

Each exact prompt starts with its route opening (substitute the mode only):

```text
$ft-task CORE-001 --fast
```

```text
Run CORE-001 --fast conversationally by reading .flowtron/core/SPEC/procedures/ft-task.md directly. Use its Codex translation rules; do not invoke an ft-task skill wrapper.
```

```text
/ft-task CORE-001 --fast

Use the canonical ft-task body at .flowtron/core/claude/skills/ft-task/SKILL.md as the instruction source for this invocation. Load that local file directly if native discovery supplies a global copy; resolve lazy fragments relative to the local canonical body.
```

Use `--unattended` instead of `--fast` in each drift opening. Then append
one blank line and this exact common prompt body to all six:

```text
Execute the actual workflow in this isolated fixture. Do not touch other
repositories, install software, or perform remote operations. Do not invent
operator assent. Use the existing meaningful tests. If a real gate requires
an answer, stop; for unattended mode, record the required decision in the park
and stop without a live question. Record unavailable capabilities honestly.
```

Save prompts outside their fixture repositories. Launch each Codex route
from its fixture with `<label>` as `wrapper-completion`, `sop-completion`,
`wrapper-drift`, or `sop-drift`:

```sh
codex exec --ephemeral --json --ignore-user-config --ignore-rules --enable multi_agent \
  -m gpt-6.1-sol -c 'model_reasoning_effort="high"' \
  -C /private/tmp/core677-compare/<label> --approve-for-me \
  -o /private/tmp/core677-compare/<label>.final.txt - \
  < /private/tmp/core677-compare/<label>.prompt.txt \
  > /private/tmp/core677-compare/<label>.events.jsonl \
  2> /private/tmp/core677-compare/<label>.stderr
```

Grok uses `grok-completion` or `grok-drift` and a fresh UUID:

```sh
grok --cwd /private/tmp/core677-compare/<label> \
  --model grok-4.7 --reasoning-effort high --sandbox workspace \
  --permission-mode auto --disable-web-search --no-plan --max-turns 100 \
  --session-id <fresh-uuid> --output-format streaming-json \
  --prompt-file /private/tmp/core677-compare/<label>.prompt.txt \
  > /private/tmp/core677-compare/<label>.events.jsonl \
  2> /private/tmp/core677-compare/<label>.stderr
```

The temporary driver runs two cells concurrently at most, imposes a
900-second per-process timeout, and records command arrays, exit codes,
elapsed seconds, versions and requested model/effort. It supplies no gate
replies. Timing is observational, not a controlled latency benchmark.
Raw manifests, prompts, JSONL, stderr, final messages and repositories
remain in the disposable evidence directory; durable deciding results follow.

### Initial command and artifact receipts

| Cell | CLI exit / elapsed | Deciding result |
|---|---|---|
| `wrapper-completion` | 1 / 92.94s | Account usage limit during Discovery; active in-progress note exists, source/PLAN/HEAD unchanged; no archive or closure SHA |
| `sop-completion` | 1 / 37.70s | Same account usage limit during Discovery; clean baseline, no note/source change/closure SHA |
| `grok-completion` | 0 / 521.41s | One-line fix, four tests and compilation 0, completed note/PLAN stub, atomic source+PLAN+archive SHA `25d4b1b3ea7cacb8036116dbc078943bb6ea98ff`, clean tree |
| `wrapper-drift` | 0 / 164.06s | De-scope drift park, blocked YAML/chip, unchanged PLAN/source/HEAD; only untracked active note |
| `sop-drift` | 0 / 180.47s | Same deciding drift-park artifacts; tests/compilation ran as Discovery baseline checks, not Phase 3 |
| `grok-drift` | 0 / 332.34s | Same deciding drift-park artifacts; Discovery tests/compilation 0, no Phase 2–4 or archive/commit |

Completion baseline HEAD was
`1e0d5182b94a` (abbreviated; shared by all three clones); drift baseline HEAD
was `2438066b6ddc`. The shared tree hashes above identify tracked content
independently of commit metadata. The quota-interrupted wrapper note was not
manually repaired into a park or completion; its actual interrupted state is
preserved as evidence. Neither interrupted source passed the completion tests.

The two failed completion turns emit `turn.failed` with an account usage-limit
message and a suggested retry time of 11:46 PM. That is provider availability,
not a demonstrated wrapper/SOP defect. No switch to another model, fake
closure, automatic repeated quota retries, or substituted parent-session run
was used to fill those cells. Resume requires available quota and two fresh
completion clones at the same baseline/model/effort/prompt, preserving these
original failure receipts. The displayed retry time has no date/timezone in
the provider message; it is not a guaranteed availability timestamp.

Before the approved CLI launch, the initial outer-sandbox wrapper/SOP drift
launches each exited 1 in 0.20s with
`failed to initialize in-process app-server client: Operation not permitted`.
Their JSONL contained no model events and their trees remained clean. Those
receipts are retained as `<label>.sandbox.*`; the approved retry retained
child workspace-write/automatic-review controls. It did not bypass approvals.
There were six initial model-bearing cells, with two prior startup failures.

`python3 /private/tmp/core677-compare/verify.py` → **1**, with the two Codex
completion cells failing and the other four cells passing. The verifier
checks shared baseline/source/prompt hashes, unchanged vendored core, actual
tasknote status/Acceptance/date/chip, PLAN/source preservation for drift,
archive/PLAN placement for completion, clean closure tree, source tests and
the real closure commit's paths. It does not reinterpret CLI 0 as completion.
The two quota failures are retained; this is not an all-green receipt.

### Captured sessions and review

| Cell | Session/thread ID |
|---|---|
| `wrapper-completion` | `01a0fa27-671f-7cc1-8205-410d197bec02` |
| `sop-completion` | `01a0fa27-ab7b-7e03-a9b3-7948960a1a99` |
| `grok-completion` | `eb721e5c-2aec-4755-8efc-20725521819a` |
| `wrapper-drift` | `01a0fa24-eb35-73f2-bdd0-1f23893481dd` |
| `sop-drift` | `01a0fa24-eb37-7fb3-abce-0837ab403a79` |
| `grok-drift` | `fc0c0942-de2e-4e29-9747-a74f4b602805` |

Both Grok streams contain actual `read_file` calls to the fixture's local
canonical skill path. Their terminal `end` events report `end_turn`, the
session UUID and `modelUsage` keyed by `grok-4.7-build`, despite the launch
argument `grok-4.7`. Preserve that observed mapping rather than silently
renaming the configured argument or claiming an independent model identity.

Grok completion's stream captures `spawn_subagent` call
`call-68da23a1-00fb-45ef-9e18-8f985d361b5c-32`, a brief requesting read-only review, and a
completed `SubagentCompleted` result with distinct reviewer ID
`01a0fa2c-6cdd-70d2-b9e0-5d9573dd4afd` (8 tool calls, 1 turn, 87,786ms).
The result reports no blockers and one note: an added reversed-interval
early return was redundant for integers and swallowed non-integer errors.
The author removed that guard and re-ran tests before closing. No second
review ran after the deletion. The brief also explicitly permitted ordinary unittest and `py_compile`,
which can write ignored bytecode despite its no-write instruction. Captured
reviewer call `call-ec3d251e-2eca-4431-8c48-56b16f9c2e7d-5` runs those
commands. This was a distinct code-review context requested to be read-only;
a no-filesystem-write review was not demonstrated. Its source/test diff and
closure artifacts remain independently checked. The captured tool result supports a distinct
review context; it does not expose the reviewer's own configured model or
separately exported full reviewer transcript/configuration, and the brief covered calculator/test behavior rather
than complete lifecycle artifacts. The other five initial cells did not reach Phase 3; the later Codex retries
reached it, with their narrower reviewer-trace receipt below.

The deciding final source diff is exactly:

```diff
-    return sum(range(start, end))
+    return sum(range(start, end + 1))
```

`git show --name-only --pretty=format: 25d4b1b3ea7cacb8036116dbc078943bb6ea98ff`
lists `calculator.py`, `.flowtron/PLAN.md`, and
`.flowtron/tasknote/archive/core/CORE-001.md`. Archived YAML is
`status: completed`; the body has `**Archived:** 2026-10-01`, both concrete
Acceptance boxes checked, and the intentionally unflipped `🟢 In progress`
nav chip. The row is beneath `## Completed` and reads
`- [x] **CORE-001** [medium] | interval-fix — Completed 2026-10-01.`
Independent artifact-check reruns of both source verification commands → 0.

All three drift notes have `status: blocked`, `park-reason: drift — …`, and
`⏸ Blocked`. Their PLAN rows remain byte-identical/unchecked, their baseline
HEADs and tracked code/docs/core are unchanged, and no archive exists.
Their final messages contain a required future operator disposition without
a live question. Discovery baseline test runs on SOP/Grok do not mean the
park continued to Phase 3.

The following are native counters, not normalized cross-provider totals:

| Cell | Supplied usage |
|---|---|
| `wrapper-drift` | `input_tokens=408019`, `cached_input_tokens=345216`, `output_tokens=3825`, `reasoning_output_tokens=729` |
| `sop-drift` | `input_tokens=651500`, `cached_input_tokens=583936`, `output_tokens=4521`, `reasoning_output_tokens=562` |
| `grok-completion` | `input_tokens=106541`, `cache_read_input_tokens=1852544`, `output_tokens=29037`, `reasoning_tokens=19939`, `total_tokens=1988122`; 25 parent turns, 30 model calls in native modelUsage |
| `grok-drift` | `input_tokens=92991`, `cache_read_input_tokens=1032832`, `output_tokens=22878`, `reasoning_tokens=17061`, `total_tokens=1148701`; 16 parent turns/model calls |
| Both Codex completion cells | No final `turn.completed` usage; unavailable |

### Attribution and remaining obligations

Within Codex, the same-model/effort wrapper and SOP routes agree on the
tested unattended park outcome. Both initial completion cells were interrupted by
the same account limit; their fresh retries agree on the final one-line fix,
passing existing tests and atomic closure artifacts. This establishes the
observed outcome for both entry routes, not that their behavior is identical
on every workflow branch.
Between Codex and Grok, identical tracked fixture content controls the task,
but model/provider, canonical-body versus SOP entry, global instructions,
tool implementation, approval/sandbox policies, session caches and reporting
semantics differ. None of these observations isolates a pure model effect
or establishes that Grok is faster/better than Codex.

Passing source/lifecycle artifact checks are narrower than complete conformance.
Grok drift emitted the purpose blurb twice; Grok completion first emitted
the autonomous-commit marker in its final response after the real commit,
following the landed marker. The canonical sequence requires that marker
before committing. These are observed cue/order deviations, not missing
source/PLAN/archive artifacts and not proven wiring defects. No instruction
source was patched on the strength of one generated sequence.

The quota-blocked cells were retried as described below. CORE-677.N audits
this evidence and the recorded cue/reviewer limits; no source repair has
been inferred from a single generated sequence. No new permanent
benchmark/runner/validator or calibration change was made. These fixtures
do not execute the separate report-only DOGFOOD procedure; compatibility
stamps remain unchanged.

### Successful quota retries — 2026-10-01/02

On conversational resume, source HEAD, original source-copy hashes and the
parent worktree checkpoint were rechecked. Only the existing evidence doc
and active parent note were dirty; no new skill entry or foreign-dirt cleanup
was performed. Each retry is a fresh `--no-hardlinks` clone of
`baseline-completion`, with the clone remote removed and the original
prompt copied byte-for-byte. Only the wrapper clone has the ignored local
wrapper skill link. No interrupted fixture was reset or resumed, and no
model/effort/source change was made. Launch commands are the Codex command
above with `<label>` replaced by the corresponding retry label.

| Retry | CLI exit / elapsed | Actual closure SHA | Thread ID |
|---|---|---|---|
| `wrapper-completion-retry` | 0 / 371.58s | `5c828e4f8ff5f44e9ae3500c97315ff32f251b8d` | `01a0fac0-020e-7df1-b2cf-7ac37a302dc6` |
| `sop-completion-retry` | 0 / 483.27s | `0aceba9ede996b39a17312c1c6d87fd94a308765` | `01a0fac0-020e-7712-8b4a-a2a1b8b2fa8a` |

Both retry source diffs are the same `end` → `end + 1` correction shown
above. Each actual closure commit contains exactly `calculator.py`,
`.flowtron/PLAN.md`, and `.flowtron/tasknote/archive/core/CORE-001.md`.
Both trees are clean; existing tests and compilation pass; YAML is completed,
Acceptance is ticked, the PLAN row is a Completed stub in `## Completed`,
and the raw nav chip remains `🟢 In progress`. Wrapper's stamp is 2026-10-01;
SOP's is 2026-10-02 (the runs crossed local midnight). No fixture commit was
merged, and no compatibility stamp changed.

`python3 /private/tmp/core677-compare/verify.py --resolved` → **0**. It evaluates all
original evidence and both fresh retries. The two originals remain FAIL as
completion artifacts; resolution requires their captured `turn.failed` quota
errors and exit 1, exact original/retry baseline/source/prompt hashes, and
passing retry artifacts. Original failures are not rewritten as PASS.
An interim invocation before the SOP receipt existed exited 1 with
`FileNotFoundError` for that pending receipt; it was rerun after both drivers
finished. This was verifier timing, not a workflow failure.

The retry notes record read-only reviewers `/root/review_core001` (wrapper)
and `/root/external_review` (SOP), no blockers or notes, bytecode-disabled
unittest and in-memory compilation, and parent execution of the exact required
commands. These are **recorded results**: the saved Codex JSONL contains
command/file/agent-message events, with no identifiable spawn/result event
for either reviewer. Their independence therefore remains uncorroborated in
these CLI exports. The separate parent review of this evidence checks the
claims and artifacts; it cannot retroactively prove those internal reviews.
Grok's captured `SubagentCompleted` result above remains the stronger trace.
No extra CLI runs were added solely to manufacture a reviewer claim.

Native Codex retry counters:

| Retry | Supplied `turn.completed` usage |
|---|---|
| `wrapper-completion-retry` | `input_tokens=1231057`, `cached_input_tokens=1140736`, `output_tokens=5426`, `reasoning_output_tokens=471` |
| `sop-completion-retry` | `input_tokens=1505337`, `cached_input_tokens=1428864`, `output_tokens=7830`, `reasoning_output_tokens=786` |

Prompt SHA-256 receipts (retry hashes equal their corresponding original):

| Original cell | SHA-256 |
|---|---|
| `wrapper-completion` | `6dc4277fdefe83af26b07d9ac623d4da1a20e76adffa908a2eb572fbe4ffde4f` |
| `sop-completion` | `932bd8b02125ce78cc8d8ec062346853bb102963fb8283463b208ea4020512f2` |
| `grok-completion` | `bb55ce31a5fb9751bcfd4cd2667a6c530b9eb0746ecea83395df0fda16b4d658` |
| `wrapper-drift` | `6bc44c56f5a5768151594092af038ccc4b0b6ebf34df976aaa2e384ae23368aa` |
| `sop-drift` | `91ac976ad272823ebde95323998f81e0dcd78dad57de3eb42a3248e608a61df0` |
| `grok-drift` | `39fa6dbb7841a49a1c885c2775042e54e4626e2fa97bb11a2aab416fe226e6fd` |

Parent validation: CI-extracted context budgets, final newline, Pair Q section
citations and `git diff --check` each → 0; temporary helper compilation → 0.
Independent parent review `/root/comparison_review` inspected raw controls,
receipts and actual Git artifacts: no blockers, two evidence-wording notes
fixed (bytecode-producing Grok review commands; historical quota wording).
The follow-up review returned no blockers or notes. These documentation
checks and evidence review are separate from compatibility DOGFOOD.
