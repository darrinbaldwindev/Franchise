# Franchise Multi-Agent Task Board

## Operating rule

One issue, one responsible agent, one branch, and one pull request per bounded change. `main` is integration-only: no participant edits it directly.

## Current setup tasks

- [x] GOV-001: Add repository-wide multi-agent instructions in `AGENTS.md`.
- [x] GOV-002: Add a copy-ready ChatGPT collaboration prompt and align the existing AI collaboration protocol.
- [x] GOV-003: Add deterministic pull-request verification automation suitable for the documentation-only repository baseline; validated successfully on pull request #2.
- [ ] GOV-004: Configure `main` branch protection after the first verification workflow is available on the default branch. **Blocked:** GitHub returned HTTP 403 because private-repository branch protection requires GitHub Pro or a public repository on the current plan. Until then, use the documented manual owner merge gate.
- [ ] GOV-005: Conduct the staged multi-agent repository scan and form the first bounded implementation issue.

### GOV-005 acceptance criteria

| Participant | Required outcome | Boundary |
| --- | --- | --- |
| ChatGPT | Read `AGENTS.md`, collaboration/continuity records, product requirements, architecture, database, and financial-model documents; propose three numbered issues with assumptions, risks, acceptance criteria, and owner gates. | Read-only; no code, commits, merges, or business-rule changes. |
| Scheduled Discovery Agent | Independently scan the same repository materials, inspect current GitHub issues/PRs and the active implementation summary, then identify duplication, evidence gaps, and a ranked task recommendation. | Read-only; do not claim or implement work. |
| Manus Main | Reconcile both scan reports against `SHARED.md`, record any conflict or unresolved owner decision, and create/select one bounded GitHub Issue. | No implementation until the issue scope, verification, and owner gates are explicit. |
| Scheduled Builder Agent | After Manus Main assigns the named issue, inspect its scope and open a branch `agent/builder/<short-task-name>`. | One approved issue only; no direct `main` edits or self-merge. |

**Verification gate:** The first Builder task may begin only after the selected issue names its permitted files, acceptance criteria, exact validation method, and any commercial, data, security, deployment, or integration owner gate.

## Task template

| Field | Required content |
| --- | --- |
| Issue | Link or identifier |
| Owner | One named human or agent |
| Scope | Permitted files and out-of-scope areas |
| Acceptance criteria | Observable completion conditions |
| Verification | Exact commands or review procedure |
| Owner gate | Required decision, if any |
| Branch | `agent/<role>/<short-task-name>` |
| Pull request | Link after creation |
