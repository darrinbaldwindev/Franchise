# Manus Continuity Log

## Agent

Manus

## Last updated

2026-08-25

## Strategic priority — current

The immediate project objective is **Franchise #1 opening**, followed by operating and maintaining that first franchise before broad replication.

Project sequence:

**Build → Open → Operate → Maintain → Improve → Replicate**

The platform should be treated as a micro home-delivery business first and a technology platform second.

Before significant implementation, determine whether the work materially helps Franchise #1 reach opening stage or operate successfully. Defer non-essential scale/platform work unless it is a genuine security, reliability, legal/compliance, architectural prerequisite, or continuity/governance requirement.

## First-hand capabilities in this project environment

Manus can inspect and modify the authenticated GitHub repository, develop the managed full-stack web workspace, run TypeScript/Vitest/build validation, query the provisioned database, and verify browser-facing behaviour where an authenticated session is available. It can also perform structured web research, create project documentation, manage managed-environment deployment checkpoints, create bounded branches and pull requests, and coordinate scheduled sub-agent roles within the documented owner boundaries.

These capabilities are runtime-specific. They do not imply permissions unavailable in a particular environment.

## Opening-stage definition

Franchise #1 is ready to open when:

- products are loaded;
- pricing is configured;
- initial stock is available;
- customer ordering works;
- payment works;
- orders reach the franchisee;
- the franchisee can fulfil orders;
- delivery can occur;
- inventory updates correctly;
- financial calculations work;
- work/earned-hours calculations work;
- an end-to-end workflow passes;
- the franchisee can operate without developer intervention.

## Minimum V1 implementation priority

1. Secure franchisee authentication and required franchise tenancy.
2. Catalogue and pricing.
3. Customer ordering and checkout/payment.
4. Order receipt and fulfilment.
5. Inventory adjustment.
6. Delivery workflow/integration.
7. Basic sales/contribution reporting.
8. Work-session recording and earned-hours calculation.
9. End-to-end operational testing.
10. Opening readiness.

## Explicitly deferred until after Franchise #1 operates

Unless a genuine prerequisite emerges:

- advanced AI systems;
- native mobile applications;
- Windows packaging;
- sophisticated multi-franchise analytics;
- complex territory algorithms;
- advanced accounting automation;
- elaborate network dashboards;
- advanced franchise automation;
- hypothetical enterprise infrastructure.

Existing architecture documentation remains valid as future direction; deferred does not mean discarded.

## Current implementation and verified state

The active implementation currently lives in the managed **Franchise Hub** workspace and this repository now contains the canonical collaboration and architecture documentation. The managed application is an authenticated React/TypeScript, Express/tRPC, Drizzle/MySQL dashboard foundation for franchisee monthly performance reporting and franchisor review.

The following has been directly implemented and verified in that workspace:

- Tenant-scoped monthly business records saved under the authenticated account, with server-side KPI calculations for sales, operating contribution, Earned Hours, productivity, workload progress and selected projections.
- Server-side deterministic coaching and an LLM coaching path that only receives a saved, server-derived metric snapshot. The numerical calculation engine remains deterministic and authoritative.
- Required franchisee attestation, immutable input-revision snapshots, administrator-only review procedures, reviewer attribution/notes and separate review events that do not alter calculation inputs.
- Tenant-scoped Trends reporting with server-calculated month-over-month metrics, first-month guidance, and hash-based routes that avoid the managed host's direct deep-link limitation.
- A simplified franchisee workflow that protects the save action until the user completes a short accuracy check.

Historical validation reported 25 passing Vitest tests, a passing TypeScript check and a successful production build in the managed workspace. Where validation has not been independently reproduced against the canonical repository, label it reported or managed-workspace validation rather than canonical production verification.

## Current architecture boundary

The managed application remains a dashboard/reporting foundation, not the complete central ecommerce/delivery platform.

It currently uses an account-scoped tenancy model and `user`/`admin` roles rather than the complete `franchise_id` and multi-role model described by the canonical architecture.

Before expanding commerce beyond the minimum required for Franchise #1, establish:

**User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**

Real isolation tests must prove at minimum:

- Franchise A cannot read Franchise B;
- Franchise A cannot mutate Franchise B;
- inactive membership is denied;
- unauthorized franchise switching is denied;
- franchise-owned records require authorized franchise scope.

## Known PR/integration gates

Previously identified PR #6 concerns remain unless current implementation demonstrates otherwise:

- `franchiseTenantIsolation.test.ts` was identified as validating user-ID propagation rather than genuine A/B franchise isolation;
- `apps/franchise-hub/client/public/__manus__/debug-collector.js` was identified as an executable public asset and should be removed from canonical production source or provably development-gated;
- migration history must remain distinct from executing/applying production migrations.

Before declaring these resolved, inspect the current commit and record exact evidence.

## Eventual platform gaps

The eventual platform may still require territory/service-area resolution, central catalogue, customer checkout, payments, order orchestration, inventory movements, delivery integration, work-session capture, accounting exports, training, AI coaching, network reporting and mobile/Windows experiences.

These are not all prerequisites for opening Franchise #1.

## Governance foundation

- Repository default branch is `main`.
- `docs/AI_COLLABORATION.md` establishes the equal-autonomy collaboration protocol.
- Exactly three primary continuity logs are used: `CHATGPT.md`, `MANUS.md`, `SHARED.md`.
- Continuity Steward may reconcile them but must not silently decide material business disputes.
- Darrin remains final authority.
- Agents should coordinate through GitHub rather than using Darrin as a messenger.

## Continuity synchronization rules

Before substantial work:

1. Read `docs/continuity/SHARED.md`.
2. Inspect recent commits and relevant implementation.
3. Read the relevant agent log when needed.
4. Check whether the proposed work helps Opening #1.

After substantial work:

1. Update this log with first-hand implementation evidence.
2. Update `SHARED.md` when overall state materially changes.
3. Record commit SHA/message where practical.
4. Distinguish reported, automated and independently verified validation.

Historical continuity entries should be retained as history but superseded by newer reconciliations when state changes.

## Continuity Steward scheduling

The collaboration protocol recommends:

- lightweight continuity scan every 6 hours;
- fast synchronization check on every push to `main`;
- deeper weekly review.

Manus has final say on operational implementation of the schedule based on the actual sub-agent/runtime capability. If a persistent scheduled sub-agent is unavailable, use the closest reliable mechanism and document the limitation.

## Current collaboration state

ChatGPT has explicitly reset the project priority to Opening Franchise #1 first and updated `SHARED.md` and `CHATGPT.md` accordingly.

This log is now aligned with that decision. The next meaningful implementation should be the highest-value blocker to opening Franchise #1, not general platform expansion.

## Recommended next action

Inspect the current canonical PR/application state and select the smallest secure implementation step that materially advances Opening #1. Do not duplicate existing work. If a blocker has already been fixed, verify the new commit rather than repeating the historical recommendation.

## Reconciliation entry — 25 August 2026 (Issue #1)

This entry records a first-hand review of GitHub Issue #1, the three continuity logs, the canonical `main` branch at `de655a6`, and Pull Request #6 at `67ee3ce8205d2a9c6aa2e25123802dd384dec908`.

### Confirmed current source state

The canonical `main` branch contains **zero** files under `apps/franchise-hub/`. The Franchise Hub source described in earlier continuity records is therefore staged only on the open PR #6 branch (`agent/manus/source-integration`), not yet part of the canonical branch. PR #6 is currently `OPEN` and `CONFLICTING`; its content conflicts are limited to `docs/continuity/MANUS.md` and `docs/continuity/SHARED.md`.

No merge, rebase, approval, closure, deployment, migration, or production-data action was performed in this review. Those actions remain owner-gated.

### Independently reproduced validation of PR #6

In an isolated worktree at the exact PR head, dependency installation succeeded with `pnpm install --frozen-lockfile`. The following checks were then run successfully:

| Command | Result | Evidence classification |
| --- | --- | --- |
| `pnpm test` | 15 test files and 30 tests passed | Independently reproduced |
| `pnpm check` | TypeScript completed without errors | Independently reproduced |
| `pnpm build` | Client and server production bundles completed | Independently reproduced, with warnings |

The build emitted warnings for undefined `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` placeholders, a non-module analytics script reference, and a large JavaScript chunk. These warnings did not fail the build but should be resolved or explicitly configured before a production release.

### Security and production-gate evidence

The PR-head debug-telemetry safeguard is materially stronger than the earlier historical report: the public `client/public/__manus__/debug-collector.js` file is absent, and the production static-file middleware returns `404` for the collector-script and telemetry routes before serving static assets. This is source-inspection evidence at the PR head; it is not canonical-branch evidence until the PR is integrated.

The tenancy gate remains unresolved. `franchiseTenantIsolation.test.ts` verifies that the router propagates authenticated user IDs into mocked data-access calls, but it does not prove the required Franchise A/Franchise B read-and-write isolation, inactive-membership denial, unauthorized context-switch denial, or franchise-owned-record authorization. The staged application also remains account-scoped rather than implementing the required franchise membership/context model.

### Opening #1 implication and next bounded work

The immediate implementation blocker is now clear: first reconcile and integrate the staged source through an owner-gated PR #6 decision, then establish genuine franchise-context tenancy before expanding commerce. Gate 3 supplier-cost and delivery-economics research remains required for commercial opening readiness, but it should not be treated as a substitute for this security and canonical-source integration gate.

**Current first-hand capability statement:** In this environment, Manus can inspect and modify the authenticated repository, create bounded branches and pull requests, run isolated Node/TypeScript validation, inspect staged source, perform web research, and maintain evidence-based continuity records. It cannot infer authorization to merge, deploy, migrate production data, activate providers, or make material commercial, legal, financial, privacy, or security decisions on Darrin’s behalf.

**Recommended owner decision:** authorize a named integrator to reconcile the two documentation conflicts on PR #6 and decide whether the validated-but-incomplete source should be merged as a development baseline. Approval to merge must not be interpreted as production approval; genuine franchise tenancy and the remaining opening workflow still require implementation and evidence.
