# Franchise Multi-Agent Task Board

## Operating rule

One issue, one responsible agent, one branch, and one pull request per bounded change. `main` is integration-only: no participant edits it directly.

## Current setup tasks

- [x] GOV-001: Add repository-wide multi-agent instructions in `AGENTS.md`.
- [x] GOV-002: Add a copy-ready ChatGPT collaboration prompt and align the existing AI collaboration protocol.
- [ ] GOV-003: Add deterministic pull-request verification automation suitable for the documentation-only repository baseline; validate it on this pull request.
- [ ] GOV-004: Configure `main` branch protection after the first verification workflow is available on the default branch.

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
