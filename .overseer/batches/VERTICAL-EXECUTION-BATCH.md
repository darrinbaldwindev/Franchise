# Franchise — Vertical Execution Batch

**Repository:** `darrinbaldwindev/Franchise`  
**Workstream:** Franchise App / Franchise Overseer  
**Purpose:** Move Franchise #1 toward opening through the smallest secure application and commercial path without creating a competing implementation stream.  
**Standing trigger:** `cont`, `continue`, `continue autonomously`, and `continue autonomously vertically` run fresh-scan → reconcile → execute → verify → fresh-scan → replenish → durable-log.  
**Cycle:** 2026-09-14 18:41 AEST.  
**Main head scanned:** `00de71f85a4f41f4007be00cf957d22c1e3b79f8`.  
**PR #6 head scanned:** `768d624a149e383939791406dcf8ced1ac271662`.  
**Franchise App review PR:** #24 at `ac208a07c40e99ee1c1f70f67a1a857d8207fa6e`.  
**Status:** ACTIVE — P0 tenancy RED/incomplete; bounded duplicate-membership fail-closed repair exists in draft review PR #24; no persisted tenancy successor head exists.

## Governance boundary

- Opening #1 remains the objective: Build → Open → Operate → Maintain → Improve → Replicate.
- Security contract: **User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**.
- No merge, deploy, production migration, production tenancy/routing change, provider activation, credential change, spend, supplier/customer contact or production write is authorized by this batch.
- Territory fixtures are synthetic/non-production evidence and remain downstream of tenancy.
- Public supplier/catalogue pricing is research evidence, not verified account landed cost.

## Fresh-scan result

1. `main` moved concurrently to `00de71f...` with a vertical-batch reconciliation commit; newer verified state was preserved rather than overwritten.
2. PR #6 remains open at `768d624...`; no persistence-backed tenancy successor head is available.
3. PR #6 exact-head has no associated pull-request workflow runs, so no exact-head CI GREEN exists.
4. Persisted `franchises`/`franchise_memberships`, DB-backed membership loading, franchise-scoped repository operations and genuine A/B persistence tests remain absent from the reviewable successor implementation.
5. The helper ambiguity identified in prior review was reproducible by inspection: requested franchise scope used first-match semantics when duplicate active membership rows existed.
6. PR #22 remains draft/synthetic territory work and is not P0.

## Executed this Franchise App cycle

### VB-FR-APP-17 — Duplicate membership fail-closed repair
**State:** IMPLEMENTED / NOT YET CI-VERIFIED

Created review branch `review/franchise-app-tenancy-duplicate-failclosed` from exact PR #6 head `768d624...`.

Changed only:
- `apps/franchise-hub/server/franchiseTenancy.ts`
- `apps/franchise-hub/server/franchiseTenancy.test.ts`

Repair:
- explicit requested franchise scope now gathers all active matching memberships;
- zero matches remains `FRANCHISE_SCOPE_NOT_AUTHORIZED`;
- more than one match fails closed as `AMBIGUOUS_FRANCHISE_MEMBERSHIP`;
- regression test uses duplicate active rows with conflicting roles to prove row order cannot silently choose authority.

Implementation head: `ac208a07c40e99ee1c1f70f67a1a857d8207fa6e`.

Draft PR #24 targets Manus branch `agent/manus/source-integration`, not `main`, preserving Manus implementation ownership and avoiding a competing product branch.

### VB-FR-APP-18 — Exact-head automation check
**State:** BLOCKED / NO CI EVIDENCE

Checked workflow runs for PR #6 head `768d624...` and review fix head `ac208a0...`: no pull-request workflow runs were returned. Therefore neither head receives a CI PASS claim from this cycle.

## Replenished P0 application lane

### VB-FR-APP-19 — Consume Manus persistence successor
**State:** WAITING ON IMPLEMENTATION

On next trigger, scan PR #6 and related branches/PRs first. If a successor head exists, immediately inspect:
- `franchises` and `franchise_memberships` schema/migration;
- uniqueness/constraint handling for duplicate active membership authority;
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

### VB-FR-APP-20 — Review PR #24 verification
**State:** PENDING

If exact-head CI or Manus/local validation is posted for `ac208a0...`, inspect the evidence. Do not merge/ready. If tests fail, diagnose and repair only within this bounded helper slice.

### VB-FR-APP-21 — Exact-head persistence assurance
**State:** BLOCKED behind VB-FR-APP-19

For the exact persistence successor head require frozen install, focused tenancy tests, full tests, typecheck/check, production build, debug-collector production-boundary check, and independent reproduction where practical. Do not borrow predecessor-head GREEN.

### VB-FR-APP-22 — Commerce release gate
**State:** BLOCKED

Catalogue/order/checkout transactional implementation remains blocked until persistence-backed A/B isolation and exact-head assurance pass. PR #24 only hardens pure authorization semantics; it does not close tenancy.

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
- **Pure authorization helper:** improved on draft PR #24; not CI-verified.
- **Persistence-backed A/B isolation:** absent / blocking.
- **Commerce:** BLOCKED by tenancy.
- **Exact-head app assurance:** BLOCKED pending persistence successor and CI evidence.
- **Gate 3 SKU economics:** ACTIVE parallel blocker-reduction lane.
- **Territory:** synthetic/downstream.
- **Royalty production rule:** owner/legal blocked.
- **Merge/deploy/migration:** not authorized and not performed.

## Next trigger

Fresh-scan before acting. If Manus tenancy moved, consume the cycle on exact-head persistence review and assurance. If PR #24 gains validation evidence, review that evidence without merging. If neither moved, continue independent Gate 3 evidence work while preserving the application implementation boundary.

A batch succeeds only when it reduces a real blocker or creates independently usable evidence; activity volume alone is not progress.