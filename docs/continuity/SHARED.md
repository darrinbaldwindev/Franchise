# Shared Continuity — Franchise

**Owner:** Darrin

**Agents:** Franchise Main + Franchise App + Manus App + Overseer

**Last reconciled:** 27 August 2026

## Authoritative rule

This file is the merged cross-agent project state. Agents should read it before substantial work and update it after substantial work.

The user is the final decision authority.

## Strategic priority — CURRENT

The immediate objective is **not** to complete the entire eventual Franchise platform.

The immediate objective is:

> **Get Franchise #1 to opening stage, then operate and maintain it before expanding the platform for additional franchises.**

The project sequence is now:

**Build → Open → Operate → Maintain → Improve → Replicate**

The Franchise project is a micro home-delivery business first and a technology platform second. Technology exists to operate the business.

When Darrin says `cont` or `continue autonomously`, agents have standing permission to continue the highest-value work toward the current objective without routine confirmation, within their actual tool permissions and decision boundaries.

## Scope-control rule

Before significant new work, ask:

> **Does this materially help Franchise #1 reach opening stage or operate successfully?**

If yes, prioritise it.

If no, defer it unless it is a genuine security, reliability, legal/compliance, architectural prerequisite, or required continuity/governance task.

## Definition of opening stage

Franchise #1 is ready to open when:

1. products are loaded;
2. pricing is configured;
3. initial stock is available;
4. customer ordering works;
5. payment works;
6. the order reaches the franchisee;
7. the franchisee can fulfil the order;
8. delivery can occur;
9. inventory updates correctly;
10. financial results calculate correctly;
11. work/earned-hours results calculate correctly;
12. the complete workflow passes an end-to-end test;
13. the franchisee can operate the process without developer intervention.

## Minimum V1 operating system

### Customer
- product catalogue;
- product pricing;
- ordering;
- checkout/payment;
- delivery address;
- order confirmation.

### Franchisee
- secure login;
- receive orders;
- pick/pack workflow;
- stock adjustment;
- basic sales reporting;
- basic contribution/profit reporting;
- work-session recording;
- earned-hours calculation.

### Business
- product cost;
- selling price;
- delivery economics;
- $50 free-delivery threshold;
- basic franchise-fee calculation;
- daily/weekly reporting.

### Operations
- opening stock;
- packaging;
- equipment;
- supplier process;
- delivery process;
- opening hours;
- customer support procedure.

## Required V1 security gate

Scope reduction does **not** permit insecure tenancy shortcuts.

The minimum correct security relationship remains:

**User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**

Real tenant-isolation tests must prove, at minimum:

- Franchise A cannot read Franchise B;
- Franchise A cannot mutate Franchise B;
- inactive membership is denied;
- unauthorized franchise switching is denied;
- new franchise-owned records require authorized franchise scope.

## Commercial state

- Entry franchise package: AUD $4,995.
- Opening stock: approximately $2,000 cost basis.
- Target retail value of included stock: $3,300+, requiring SKU-level verification before being marketed as a hard value claim.
- Customer-facing free delivery remains part of the proposition; actual delivery cost must be tracked internally.
- Royalty concept: 3% through the defined breakeven amount, then 6% on turnover above it; contractual threshold/legal treatment remains to be finalised.
- 20% reserve / 80% owner allocation remains a proposed configurable layer and must not be treated as final legal/accounting advice.

## Gate 3 — current state

The project has a dedicated `docs/GATE3_PRODUCT_RESEARCH.md` research base and `docs/GATE3_SKU_MASTER.md` commercial schema.

The target opening range remains approximately **40–60 packaged, shelf-stable SKUs**. Candidate categories include drinks, energy drinks, water/hydration, savoury snacks, confectionery, biscuits/cookies, nuts/healthy snacks and selected functional products.

Public supplier/catalogue research is sufficient to identify candidates and benchmark pricing, but **does not constitute verified business-account wholesale pricing**.

Gate 3 therefore remains **AMBER / IN PROGRESS**. The next commercial milestone is verified supplier/account pricing, landed-cost modelling, proposed retail pricing, delivery/platform economics and contribution for the candidate opening range.

## Application state — current verified repository position

The latest repository state inspected by Overseer remains the tenancy implementation handoff/specification commit:

`043301c05b5b6e2eea429b4fe85feabb1b2fe868`

That commit defines the intended tenancy implementation boundary but is not evidence that the runtime tenancy implementation has been completed.

**Security/tenancy remains RED until actual implementation and A/B isolation tests are present and verified.**

The current application remains a dashboard/reporting foundation rather than the complete ecommerce/delivery platform.

Do not expand commerce around the existing account/user-only tenancy model.

## Open implementation gates

### P0 — tenancy

Issue #15 remains the critical technical gate. Required boundary:

**User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**

Required tests must prove cross-franchise read/write isolation, inactive membership denial, unauthorized switching denial and authorization for new franchise-owned records.

Manus App is the implementation owner; Franchise App is the technical review counterpart; Overseer verifies the repository evidence.

### Gate 3 — commercial data

Issue #16 remains the commercial gate for verified supplier/account pricing and the opening SKU economics.

Franchise Main owns the commercial work.

## Coordination structure

**Franchise Main:** project/business lead; commercial strategy, requirements, scope, Opening #1 direction and cross-agent coordination.

**Franchise App:** application-focused ChatGPT counterpart; technical review, testing/review, application blockers and Manus implementation review.

**Manus App:** application implementation counterpart; code, database/API, integrations, testing, deployment and runtime verification within actual permissions.

**Overseer:** independent oversight; scans repository/logs, detects drift/duplication/contradictions, checks progress against Opening #1, and determines the highest-value next action without becoming a competing implementation team.

Darrin remains final authority.

## Continuity rules

Agents coordinate through GitHub rather than using Darrin as a messenger.

Before substantial work:

1. read this file;
2. inspect recent commits and relevant implementation;
3. check the relevant agent log;
4. determine whether the work advances Opening #1.

After substantial work:

1. update the responsible agent log;
2. update this file when overall state materially changes;
3. record commit SHA/message where practical;
4. distinguish reported, automated and independently verified validation.

Historical records remain history and must not be silently rewritten to make old work appear current.

## Current reconciliation finding — 27 August 2026

Overseer scanned recent repository activity, open issues and pull requests. No newer application implementation commit was found after the tenancy handoff/specification commit above.

Therefore:

- tenancy implementation is **not marked complete**;
- Gate 3 verified supplier pricing is **not marked complete**;
- commerce remains downstream of the tenancy gate;
- documentation should not expand ahead of implementation without a concrete blocking purpose.

The project is considered **implementation constrained**, not planning constrained.

## Immediate autonomous priorities

1. **Manus App:** implement the approved tenancy boundary and real isolation tests; record exact validation evidence.
2. **Franchise App:** review/reproduce the tenancy implementation once committed.
3. **Franchise Main:** continue the verified supplier-cost/SKU economics work.
4. **Overseer:** reconcile repository state and prevent scope drift/duplicate work.

No new major platform capability should outrank these tasks unless a genuine security, reliability, legal/compliance or opening prerequisite emerges.

## Opening-first development sequence

1. secure franchise tenancy required for Franchise #1;
2. products/catalogue/pricing;
3. customer ordering and checkout/payment;
4. order fulfilment;
5. inventory;
6. delivery workflow/integration;
7. contribution/profit reporting;
8. work sessions and earned hours;
9. end-to-end operational testing;
10. opening readiness.

Only after Franchise #1 is operating should broader replication/network automation become a primary development target.

## Delivery-area territory rule — 27 August 2026

**Decision:** A franchise territory is defined by the delivery area it can serve, rather than an arbitrary suburb, postcode, or static allocation.

**Authority:** Darrin — confirmed in the current project task.

**Evidence and bounded documentation handoff:** On branch `agent/manus/delivery-area-territory-spec`, Manus added `docs/DELIVERY_AREA_TERRITORIES.md` and aligned `docs/DOMAIN_MODEL.md`, `docs/ARCHITECTURE.md`, `docs/MIGRATION_MAP.md`, and `docs/DATABASE.md`. The new specification defines address-level server-side serviceability, versioned boundaries, overlap/fallback controls, routing-decision audit records, delivery-area performance metrics, and implementation acceptance tests.

**Approved scope of this entry:** Documentation and implementation handoff only. It does not activate a delivery area, change a franchise agreement, set a radius/fee/free-delivery policy, select a delivery provider, execute a migration, deploy application code, or offer/sell a franchise.

**Verification:** `git diff --check` passed and the updated canonical documents link to the detailed specification. No application code, migration, production data, secrets, or deployment configuration was changed.

**Next action:** The existing P0 franchise membership/authorised-context tenancy implementation remains first. Once it exists, the delivery-area model can be implemented as the next domain layer under an approved migration plan.
