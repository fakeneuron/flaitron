# Codex installation verification

CORE-677.2 installation receipt, 2026-10-01. This is a dated observation,
not a second install roster. Canonical commands remain in
[codex/AGENTS-snippet.md](../codex/AGENTS-snippet.md); policy remains in
[PLATFORMS.md](PLATFORMS.md#installed-surface-policy).

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
