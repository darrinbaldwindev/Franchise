# Franchise Repository Agent Instructions

## Authority and operating model

The GitHub repository is the authoritative source for implementation, reviewed history, and durable project records. The repository owner is the final authority for commercial, legal, product, security, budget, production, and release decisions.

Read `docs/AI_COLLABORATION.md` and `docs/continuity/SHARED.md` before substantial work. Treat confirmed owner decisions in those records as binding. Preserve the distinction between confirmed business rules, configurable assumptions, open questions, and research hypotheses.

## Roles

| Participant | Scope | May do | Must not do |
| --- | --- | --- | --- |
| **Owner** | Final authority | Approve commercial/legal rules, access, merges, releases, production changes, and exceptions | Delegate irreversible decisions implicitly |
| **Manus Main** | Coordinator and integrator | Maintain task boundaries, review evidence, prepare or merge approved PRs, manage repository safeguards, and report project state | Bypass owner gates or merge unreviewed/high-risk work |
| **Scheduled Discovery Agent** | Planning and verification | Inspect repository state, issues, PRs, tests, continuity, and risks; open or update evidence-backed issues when authorized | Implement application changes, claim build tasks, merge PRs, or make commercial decisions |
| **Scheduled Builder Agent** | Bounded implementation | Complete one approved issue on one branch, run stated checks, update continuity, and open one PR | Work directly on `main`, force-push, take unassigned work, or self-merge |
| **ChatGPT** | Product/architecture/review partner | Propose requirements, schemas, calculations, designs, tests, research notes, and PR review comments | Directly modify `main`, silently change confirmed business rules, or substitute a chat transcript for repository evidence |

## Branch, issue, and pull-request contract

1. **No direct edits to `main`.** Use `agent/<role>/<short-task-name>` for agent branches.
2. One issue, one responsible agent, one bounded scope, and one pull request per change.
3. Before editing, inspect the issue, `SHARED.md`, relevant source/docs, open PRs, and recent commits.
4. A PR must state the linked issue or approved task, scope, files changed, validation performed, limitations, and any owner decision still required.
5. Do not force-push shared branches, overwrite another participant’s work, merge unrelated histories, or use a local copy as a replacement for GitHub.
6. Manus Main or the owner reviews and merges only after the required checks pass and the change is within approved authority.

## Verification contract

- Run the exact format, lint, test, type-check, build, migration, and security checks documented by the task or repository runtime.
- The initial repository baseline is documentation-only. Until application tooling is added, the required checks are `git diff --check`, required-governance-file checks, and pull-request issue linkage for non-governance changes.
- Add domain-specific automated tests before changing financial calculations, earned-hours logic, tenancy/isolation, territory routing, order state, access control, payments, or privacy-sensitive data handling.
- Report the exact command or review completed and its result. Do not claim unrun validation.

## Owner gates and safety boundaries

The following require explicit owner approval before execution: commercial or legal rules; royalty/threshold values; payment, refund, accounting, tax, employment, pension, or regulatory claims; production releases; credentials; third-party integrations; database migrations that risk loss; destructive operations; user-data exports; background schedules; and branch-protection changes that would affect collaborators.

Keep secrets only in approved repository or deployment secret stores. Never put credentials, personal data, customer/franchisee data, private prompts, or raw production data in source, markdown, issues, pull requests, logs, or agent messages.

## Continuity updates

After a material change, update the responsible agent log and `docs/continuity/SHARED.md` with the decision, changed files, commit or PR reference, verification result, unresolved questions, and next action. Do not silently resolve commercially material uncertainty.
