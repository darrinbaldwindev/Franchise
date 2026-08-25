# ChatGPT Continuity Log

## Agent
ChatGPT

## Last updated
2026-08-25

## Role
Business/product reasoning, architecture, financial-model logic, research, requirements, documentation, code review and cross-system consistency.

## Current strategic priority

**Get Franchise #1 to opening stage, then operate and maintain it before expanding the platform for replication.**

Project sequence:

**Build → Open → Operate → Maintain → Improve → Replicate**

The Franchise project is a micro home-delivery business first and a technology platform second. Technology exists to operate the business.

Under Darrin's `cont` / `continue autonomously` mandate, continue the highest-value work toward this objective without routine confirmation, within actual tool permissions and the decision boundaries in `docs/AI_COLLABORATION.md`.

## Scope-control rule

Before significant new work ask:

> Does this materially help Franchise #1 reach opening stage or operate successfully?

If yes, prioritise it.

If no, defer it unless it is a genuine security, reliability, legal/compliance, architectural prerequisite, or required continuity/governance task.

## Opening definition

Franchise #1 is ready to open when products, pricing, opening stock, customer ordering, payment, franchisee order receipt, fulfilment, delivery, inventory updates, financial calculations and work/earned-hours calculations all work end-to-end, and the franchisee can operate without developer intervention.

## Minimum V1 focus

- secure franchisee login;
- required franchise tenancy/security;
- catalogue and pricing;
- customer ordering and checkout/payment;
- order receipt and fulfilment;
- inventory adjustment;
- delivery workflow;
- basic sales/contribution reporting;
- work-session recording;
- earned-hours calculation;
- end-to-end operational test.

## Defer until after Franchise #1 is operating

Unless a genuine prerequisite emerges, defer:

- advanced AI systems;
- native mobile applications;
- Windows packaging;
- sophisticated multi-franchise analytics;
- complex territory algorithms;
- advanced accounting automation;
- elaborate network dashboards;
- advanced franchise automation;
- hypothetical enterprise infrastructure.

Existing documentation for these capabilities remains useful and should not be deleted; implementation scope is simply frozen until the first franchise proves the operating model.

## Business model decisions

- Entry package: AUD $4,995.
- Opening stock: approximately $2,000 cost basis.
- Target retail value: $3,300+, subject to SKU-level verification before being marketed as a hard value claim.
- Optional add-ons: technology, shelving, furniture, extra stock and related equipment.
- Customer-facing free delivery remains part of the proposition; actual delivery cost must be tracked internally.
- Royalty concept: 3% through the defined breakeven amount, then 6% above it; contractual threshold/legal treatment remains to be finalised.
- 20% reserve / 80% owner allocation remains a proposed configurable layer, not final legal/accounting advice.
- Gross sales are not owner income; contribution must be calculated from verified inputs.
- Franchisee work should be driven by actual sales and economic return rather than assuming full-time work.

## Earned-hours model

Primary relationship:

`actual work → sales → contribution → earned hours`

Earned hours are an internal business-performance metric calculated from verified contribution available for owner work divided by a configurable wage benchmark.

They are not a Centrelink, pension, tax, employment or legal entitlement calculation.

Actual work sessions must remain distinct from storefront availability hours.

## Required V1 security boundary

Scope reduction does not permit insecure tenancy shortcuts.

Minimum correct relationship:

**User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**

Real tenant-isolation tests must demonstrate at least:

- Franchise A cannot read Franchise B;
- Franchise A cannot mutate Franchise B;
- inactive membership is denied;
- unauthorized franchise switching is denied;
- franchise-owned records require authorized franchise scope.

## Collaboration state

The repository is the durable collaboration source of truth.

Exactly three primary continuity documents are used:

- `docs/continuity/CHATGPT.md`
- `docs/continuity/MANUS.md`
- `docs/continuity/SHARED.md`

`docs/AI_COLLABORATION.md` is the operating protocol. ChatGPT, Manus and authorised Manus sub-agents have the same autonomy standard within their actual capabilities and permissions. Darrin remains final authority.

Agents should coordinate through GitHub rather than using Darrin as a messenger.

## Current repository state

The repository contains a substantial Manus-managed Franchise Hub dashboard/reporting foundation plus canonical domain, migration and tenancy documentation.

PR #6 has reported successful dependency installation, tests, TypeScript validation and production build, and GitHub verification is green at the reviewed head. These are reported/automated validation unless independently reproduced by the reviewing agent.

Previously identified PR #6 acceptance concerns remain unless a newer implementation demonstrably resolves them:

- `franchiseTenantIsolation.test.ts` was identified as testing user-ID propagation rather than true A/B franchise isolation;
- `apps/franchise-hub/client/public/__manus__/debug-collector.js` was identified as an executable public asset and should be removed from canonical production source or provably development-gated;
- migration history must remain distinct from executing/applying production migrations.

Do not claim these are resolved without inspecting the current commit.

## Continuity reconciliation rules

Historical records must be retained as history but superseded by newer reconciliation entries when state changes.

Always identify commit SHA when reporting repository state.

Distinguish:

- reported validation;
- automated CI validation;
- independently reproduced validation.

Do not treat an old continuity report as current merely because its file timestamp is recent.

## Immediate autonomous priority

The next useful work should be the highest-value blocker to opening Franchise #1.

If Manus has pushed a blocker fix, inspect the new commit rather than repeating historical findings.

If no implementation change is available, work on a concrete opening-readiness gap, test or operational requirement rather than expanding architecture.

## Prior work completed

- Developed the home-delivery franchise concept and operating model.
- Reframed the franchise away from assuming full-time income.
- Established AUD $4,995 as the base franchise package.
- Established approximately $2,000 opening-stock cost basis and $3,300+ target retail value subject to verification.
- Established central branded software/site.
- Established service-area routing based on actual delivery coverage.
- Established free customer delivery proposition with internal delivery-cost tracking.
- Developed franchisee dashboard, stock/reorder and AI coaching concepts.
- Established the actual-work → sales → contribution → earned-hours model.
- Established GitHub as source of truth.
- Established the three-log collaboration model and AI collaboration protocol.
- Reviewed Manus integration work and identified tenancy, debug telemetry and source-of-truth risks.

## Agent-to-agent request

Manus should read the updated `SHARED.md`, inspect current implementation, update `MANUS.md` with first-hand state, and update `SHARED.md` when material state changes. The strategic priority is now explicitly **Opening Franchise #1 first**.
