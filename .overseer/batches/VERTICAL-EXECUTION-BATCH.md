# Franchise — Vertical Execution Batch

**Repository:** `darrinbaldwindev/Franchise`  
**Workstream:** Franchise App / Franchise Overseer  
**Purpose:** Move Franchise #1 toward opening by reviewing and validating the smallest secure application and commercial path, without creating a competing implementation stream.  
**Primary control:** Opening #1 Gate 4 security; Issues #15/#18; PR #6.  
**Standing trigger:** `cont`, `continue`, `continue autonomously`, and `continue autonomously vertically` run the complete fresh-scan → reconcile → execute → verify → fresh-scan → replenish → durable-log cycle.  
**Last execution cycle:** 2026-09-14 (Australia/Brisbane).  
**Main head after concurrent cycle scan:** `a640af75a57f3b5e17956e446c8099cb9d86603e`.  
**PR #6 head reviewed:** `768d624a149e383939791406dcf8ced1ac271662`.  
**Current status:** ACTIVE — P0 tenancy remains RED/incomplete. Independent exact-head static review is recorded; one helper ambiguity defect, the persistence gap, exact-head validation, Gate 3 supplier evidence and royalty governance remain open.

## Governance boundaries

- Opening #1 remains the objective: **Build → Open → Operate → Maintain → Improve → Replicate**.
- Required security relationship remains **User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**.
- Manus App remains primary application implementation counterpart; Franchise App/Overseer reviews/tests/identifies blockers and may make bounded repository/governance changes where they do not create a competing application implementation.
- No merge, deploy, production migration, production tenancy/routing change, provider activation, credential change, spend, customer/supplier contact, or production write is authorized by this batch.
- Territory fixtures currently on `main` are synthetic evidence only and must not be represented as production routing or tenancy completion.
- Public supplier/catalogue pricing is research evidence unless verified as business-account pricing with landed freight/cost evidence.

## Verified/reconciled findings

1. `main` advanced materially on 2026-09-14 with synthetic territory routing/audit hardening and tests, then vertical-batch adoption.
2. PR #6 is open at exact head `768d624...` and contains a bounded pure authorization helper plus deterministic tests.
3. Independent static review found the helper direction broadly sound but identified a concrete fail-closed defect: when `requestedFranchiseId` is supplied, duplicate active memberships for the same user + franchise are resolved by first-match semantics. Conflicting duplicate authority evidence must be rejected deterministically.
4. The helper otherwise treats requested franchise scope as non-authoritative, rejects wrong-user/cross-tenant membership, fails closed on zero/ambiguous active memberships, enforces effective windows/status, freezes context and applies role checks after tenant resolution.
5. Existing `franchiseTenantIsolation.test.ts` verifies authenticated `userId` propagation into DB mocks; it is **not** Franchise A/B persistence-isolation proof.
6. P0 tenancy remains RED because the repository still lacks the complete persisted franchise/membership boundary, DB-backed membership loading, tenant-scoped repository paths, genuine A/B persistence evidence and successor exact-head validation.
7. PR #6 changed-file inventory currently includes `client/devtools/debug-collector.js`; earlier evidence that the collector was absent applies to an older head. Its production execution/serving boundary must be re-checked on the eventual merge candidate.
8. `docs/continuity/SHARED.md` remains stale relative to current application evidence and should be reconciled by the continuity owner or after the next implementation head; stale continuity must not override current exact-head evidence.
9. PR #22 remains a draft synthetic territory-fixture hardening lane and stays secondary to tenancy P0.
10. Issue #16 remains the parallel commercial Gate 3 blocker for verified supplier/account pricing for the first approximately 40–60 SKUs.
11. Issue #21 remains owner/legal dependent; the proposed 3%/6% royalty rule must remain configurable until the breakeven threshold and turnover basis are authoritative.

## Consumed this cycle

### VB-FR-APP-01 — Exact-head tenancy helper review
**State:** VERIFIED FOR HEAD `768d624...`

Durable evidence now includes:
- GitHub PR review `5195364976` from the concurrent Franchise App cycle;
- GitHub PR review `5195367121` from Franchise Overseer reconciliation;
- Issue #15 checkpoint comment `5661004829`;
- Issue #18 persistence-backed implementation handoff comment `5661007155`.

Validation class: independent static repository review only in these connector sessions; exact-head tests/build were not executed here.

Disposition: **PARTIAL evidence / RED gate remains**.

### VB-FR-APP-02 — Smallest next persistence-backed tenancy slice
**State:** PENDING — P0 / BLOCKING COMMERCE

Required coherent implementation:
1. [ ] add canonical `franchises` entity;
2. [ ] add `franchise_memberships` with role/status/effective dates;
3. [ ] load membership evidence server-side from authenticated identity;
4. [ ] resolve immutable authorized franchise context from persisted membership evidence;
5. [ ] replace requested-scope first-match semantics with exactly-one-active-match semantics and fail closed on duplicate active authority evidence;
6. [ ] convert one representative read path from direct `userId` scoping to authorized `franchiseId` scoping;
7. [ ] convert one representative create/write/update path similarly, then propagate the pattern to remaining franchise-owned methods;
8. [ ] no ordinary router/repository path may treat a client franchise ID as authority;
9. [ ] real persistence A/B tests: A cannot read B;
10. [ ] real persistence A/B tests: A cannot create under B;
11. [ ] real persistence A/B tests: A cannot update/delete B;
12. [ ] inactive/expired/future membership denial through actual request/repository path;
13. [ ] unauthorized scope-switch denial through actual request/repository path;
14. [ ] safe legacy migration/backfill plan without fabricated transactions or silent ownership invention;
15. [ ] no production migration execution in this batch.

Exit: request → authorization → repository/persistence boundary is demonstrably tenant-scoped.

### VB-FR-APP-03 — Replace misleading isolation evidence
**State:** PENDING behind persistence slice

- [ ] supersede or rename `franchiseTenantIsolation.test.ts` so user-ID propagation cannot be mistaken for tenant-isolation proof;
- [ ] add genuine persistence-backed A/B read/write/create isolation tests;
- [ ] add inactive/expired/unauthorized-scope denial at the real boundary.

### VB-FR-APP-04 — Exact-head application validation
**State:** BLOCKED behind implementation

On the exact successor tenancy head require:
- [ ] frozen dependency install;
- [ ] focused tenancy tests;
- [ ] full test suite;
- [ ] typecheck/check;
- [ ] production build;
- [ ] independent reproduction of the same exact head/results where practical;
- [ ] debug collector production execution/serving boundary re-check;
- [ ] no historical predecessor-head results reused as current evidence.

No GREEN/merge-ready claim until these are complete.

### VB-FR-APP-05 — Reconcile shared continuity
**State:** PENDING

Once the successor implementation head is available, update current application continuity with exact implementation/test state while preserving RED/AMBER/GREEN truth. Do not mark tenancy complete before persistence-backed A/B isolation and exact-head validation.

## Parallel commercial lane

### VB-FR-COM-01 — Gate 3 SKU master evidence
**State:** OPEN / COMMERCIAL BLOCKER

Maintain an initial approximately 40–60 SKU candidate range. For every candidate require:
- [ ] exact product and pack configuration;
- [ ] supplier and supplier SKU where available;
- [ ] supplier price ex GST;
- [ ] freight allocation / landed cost;
- [ ] proposed retail inc GST;
- [ ] delivery/platform economics;
- [ ] contribution and margin;
- [ ] opening quantity;
- [ ] reorder point;
- [ ] evidence date/source;
- [ ] status: RESEARCH / PRICED / VERIFIED / APPROVED / REJECTED.

Rules:
- [ ] public catalogue/RRP does not equal verified business-account cost without evidence;
- [ ] normal-case economics must not depend only on promotion/clearance pricing;
- [ ] $50 free-delivery basket must separately expose product margin and delivery cost;
- [ ] prioritise sealed, shelf-stable, compact/easy-to-fulfil products;
- [ ] prioritise suppliers with credible SEQ/Sunshine Coast fulfilment;
- [ ] reject/quarantine candidates whose margin depends on unknown freight or uncertain supply.

Exit: sufficiently verified account-level landed-cost evidence to seed SKU/inventory/order implementation without invented costs.

## Secondary / owner-gated lanes

### VB-FR-TERR-01 — Territory fixture secondary lane
**State:** HOLD / DOWNSTREAM

- [ ] PR #22 / Issue #23 may proceed only as synthetic fail-closed fixture hardening;
- [ ] territory routing must consume an already authorized franchise context once implementation begins;
- [ ] no production provider activation, customer promise, delivery-boundary change or production routing write;
- [ ] do not consume P0 capacity required to close tenancy.

### VB-FR-GOV-01 — Royalty governance blocker
**State:** OWNER/LEGAL DEPENDENT

Issue #21 closure evidence required:
- [ ] authoritative breakeven threshold amount/unit/period;
- [ ] turnover basis;
- [ ] refund/discount/tax/exclusion treatment;
- [ ] legal/commercial validation;
- [ ] safe config schema/default behaviour;
- [ ] below/at/above threshold tests;
- [ ] no production/customer-facing claim before closure evidence.

Do not infer the threshold from illustrative financial numbers.

### VB-FR-GOV-02 — Repository assurance before substantial app merge
**State:** PENDING

- [ ] confirm branch protection/review policy is adequate;
- [ ] require automated install/test/check/build evidence where practical;
- [ ] attach exact SHA to every validation claim;
- [ ] distinguish worker/self-reported evidence from independent evidence;
- [ ] no credential/deployment/migration/provider activation bundled into ordinary source review.

## Execution record — 2026-09-14

Completed:
- [x] fresh-scanned recent commits;
- [x] fresh-scanned open issues;
- [x] fresh-scanned open PRs;
- [x] reconciled the existing canonical batch rather than creating a duplicate;
- [x] inspected PR #6 changed-file inventory;
- [x] inspected exact tenancy helper and helper-test patches;
- [x] recorded exact-head PR reviews;
- [x] recorded Issue #15 and Issue #18 P0 implementation checkpoints;
- [x] identified duplicate requested-scope membership ambiguity as a fail-closed defect;
- [x] re-ranked real tenancy above further territory expansion;
- [x] replenished application, commercial and governance lanes.

Verified status after execution:
- **Tenancy:** RED / incomplete.
- **Commerce implementation:** BLOCKED by tenancy.
- **Territory:** synthetic/non-production only; downstream.
- **Gate 3 SKU economics:** OPEN / parallel commercial blocker.
- **Royalty production rule:** BLOCKED on authoritative commercial/legal threshold definition.
- **Merge/deploy/migration:** not authorized by this cycle.

## Next `cont` cycle

1. Fresh-scan `main`, PR #6/successor, Issues #15/#18, open branches/PRs, exact-head CI/evidence and this batch.
2. If a successor tenancy head exists, inspect schema, membership loading, request context, routers, repository/service paths and persistence tests before doing anything else.
3. Verify the duplicate requested-scope ambiguity is fixed fail-closed.
4. Record concrete defects immediately against the exact head; do not wait for a broad summary.
5. If no tenancy successor exists, do not create competing implementation; use remaining safe capacity on Gate 3 SKU evidence and reject freight-unknown economics.
6. Fresh-scan again, update this same batch file and record exact heads/evidence/status.

## Batch completion rule

A vertical cycle is successful only if it reduces a real blocker or increases independently usable evidence. Activity volume alone is not progress. Commerce remains blocked until persisted franchise A/B isolation is demonstrated and independently validated.