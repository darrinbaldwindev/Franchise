# Franchise — Vertical Execution Batch

**Repository:** `darrinbaldwindev/Franchise`  
**Workstream:** Franchise App / Franchise Overseer  
**Purpose:** Move Franchise #1 toward opening through the smallest secure application and commercial path without creating a competing implementation stream.  
**Standing trigger:** `cont`, `continue`, `continue autonomously`, and `continue autonomously vertically` run fresh-scan → reconcile → execute → verify → fresh-scan → replenish → durable-log.  
**Cycle:** 2026-09-14 18:39 AEST.  
**Main head scanned:** `7baa8027533bc71d82dea5661f50a5016dfaba0f`.  
**PR #6 head scanned:** `768d624a149e383939791406dcf8ced1ac271662`.  
**Status:** ACTIVE — P0 tenancy RED/incomplete; no successor tenancy head exists. Gate 3 supplier evidence remains the safe parallel lane.

## Governance boundary

- Opening #1 remains the objective: Build → Open → Operate → Maintain → Improve → Replicate.
- Security contract: **User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**.
- No merge, deploy, production migration, production tenancy/routing change, provider activation, credential change, spend, supplier/customer contact or production write is authorized by this batch.
- Territory fixtures are synthetic/non-production evidence and remain downstream of tenancy.
- Public supplier/catalogue pricing is research evidence, not verified account landed cost.

## Fresh-scan result

1. `main` has not received tenancy implementation since the preceding batch; latest head is the Overseer batch reconciliation commit `7baa8027...`.
2. PR #6 remains open and non-mergeable at `768d624...`; no successor head is available for persistence review.
3. Therefore the persisted franchise/membership boundary, DB-backed membership loading, franchise-scoped repository operations and genuine A/B persistence tests remain absent from the reviewable successor implementation.
4. The known helper ambiguity remains open: requested franchise scope must require exactly one active matching membership and fail closed on duplicate authority evidence.
5. PR #22 remains draft/synthetic territory work and is not P0.
6. Gate 3 Issue #16 remains the useful parallel lane while tenancy implementation is pending.

## Executed this cycle

### VB-FR-APP-13 — Reconfirm P0 implementation handoff
**State:** COMPLETE

Posted Issue #18 checkpoint comment `5661297641` with exact current heads, RED status, duplicate-membership fail-closed requirement, persistence requirements and no-merge/deploy/migration boundary.

### VB-FR-COM-02 — Tighten Gate 3 evidence acceptance
**State:** COMPLETE

Posted Issue #16 checkpoint comment `5661300094`. Required business-account price ex GST + freight/landed evidence before VERIFIED/APPROVED status; public catalogue data remains research/priced evidence; freight-unknown, promo-dependent and uncertain-supply candidates are quarantined.

## Replenished P0 application lane

### VB-FR-APP-14 — Detect successor tenancy head
**State:** WAITING ON IMPLEMENTATION

On next trigger, scan PR #6 and all open branches/PRs first. If a successor head exists, immediately inspect:
- `franchises` and `franchise_memberships` schema/migration;
- effective dates/status/role constraints;
- server-side membership loading from authenticated identity;
- immutable authorized franchise context;
- exactly-one requested-scope matching semantics;
- router/service/repository signatures;
- read/write/create predicates using authorized `franchiseId`;
- real A/B persistence isolation tests;
- inactive/expired/future membership denial;
- unauthorized scope switching;
- safe legacy migration/backfill behaviour.

### VB-FR-APP-15 — Exact-head assurance
**State:** BLOCKED behind VB-FR-APP-14

For the exact successor head require frozen install, focused tenancy tests, full tests, typecheck/check, production build, debug-collector production-boundary check, and independent reproduction where practical. Do not borrow predecessor-head GREEN.

### VB-FR-APP-16 — Commerce release gate
**State:** BLOCKED

Catalogue/order/checkout transactional implementation remains blocked until persistence-backed A/B isolation and exact-head assurance pass. Dashboard expansion is not a substitute for tenancy closure.

## Parallel Gate 3 lane

### VB-FR-COM-03 — Build verified opening SKU evidence
**State:** ACTIVE

Target approximately 40–60 sealed, shelf-stable, compact/easy-to-fulfil SKUs. Each row must carry exact product/pack, supplier/SKU, business-account cost ex GST, freight allocation/landed cost, proposed retail inc GST, delivery/platform economics, contribution/margin, opening quantity, reorder point, evidence/date and status.

Acceptance rules:
- public prices: RESEARCH/PRICED only unless proven account pricing;
- temporary promotion/clearance cannot support normal-case economics;
- unknown freight = quarantine/reject for launch economics;
- uncertain ongoing supply = quarantine;
- model the $50 free-delivery basket with product margin and delivery cost separately;
- prioritise credible SEQ/Sunshine Coast fulfilment.

### VB-FR-COM-04 — Supplier verification priority
**State:** ACTIVE

Prioritise account-level evidence from the strongest existing supplier candidates, especially Kelly's Distributors, The Distributors Brisbane, Campbells, IBA and other credible SEQ suppliers. Do not contact suppliers or spend without owner authorization; collect independently accessible evidence and clearly mark what still requires account/login/quote confirmation.

## Secondary lanes

### VB-FR-TERR-02 — Territory
**State:** HOLD

PR #22 may remain synthetic fixture hardening. No production routing readiness claim and no P0 displacement.

### VB-FR-GOV-03 — Royalty
**State:** OWNER/LEGAL DEPENDENT

Issue #21 remains blocked until authoritative breakeven threshold, turnover basis, exclusions/tax/refund treatment and legal/commercial validation exist. Keep 3%/6% configurable and non-production.

## Verified cycle disposition

- **Tenancy:** RED.
- **Commerce:** BLOCKED by tenancy.
- **Exact-head app assurance:** BLOCKED pending successor implementation.
- **Gate 3 SKU economics:** ACTIVE parallel blocker-reduction lane.
- **Territory:** synthetic/downstream.
- **Royalty production rule:** owner/legal blocked.
- **Merge/deploy/migration:** not authorized.

## Next trigger

Fresh-scan before acting. If tenancy moved, consume the whole cycle on exact-head tenancy review and assurance. If it has not moved, continue Gate 3 evidence work while preserving the application implementation boundary. Record exact evidence and replenish this same file.

A batch succeeds only when it reduces a real blocker or creates independently usable evidence; activity volume alone is not progress.