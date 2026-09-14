# Franchise — Vertical Execution Batch

**Repository:** `darrinbaldwindev/Franchise`  
**Workstream:** Franchise App  
**Purpose:** Move Franchise #1 toward opening by reviewing and validating the smallest secure application path, without creating a competing implementation stream.  
**Primary control:** Opening #1 Gate 4 security; Issues #15/#18; PR #6.  
**Last fresh scan:** 2026-09-14 after first vertical execution cycle.  
**Main head after cycle scan:** `a640af75a57f3b5e17956e446c8099cb9d86603e` (`docs: create Franchise App vertical execution batch`).  
**PR #6 head reviewed:** `768d624a149e383939791406dcf8ced1ac271662`.  
**Current status:** ACTIVE — P0 tenancy remains RED/incomplete. Exact-head static review is recorded; one fail-closed helper defect and the persistence gap remain.

## Governance boundaries

- Opening #1 remains the objective: **Build → Open → Operate → Maintain → Improve → Replicate**.
- Required security relationship remains **User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**.
- Manus App remains primary application implementation counterpart; Franchise App reviews/tests/identifies blockers and may make bounded repository changes where they do not create a competing implementation.
- No merge, deploy, production migration, production tenancy/routing change, provider activation, credential change, spend, customer/supplier contact, or production write is authorized by this batch.
- Territory fixtures currently on `main` are synthetic evidence only and must not be represented as production routing or tenancy completion.

## Verified/reconciled findings

1. `main` advanced materially on 2026-09-14 with synthetic territory routing/audit hardening and tests, then vertical-batch adoption.
2. PR #6 is open at exact head `768d624...` and contains a bounded pure authorization helper plus tests.
3. Independent static review found the core helper direction sound, but found a concrete fail-closed defect: with `requestedFranchiseId` supplied, duplicate active memberships for the same user + franchise are resolved using first-match semantics. Conflicting duplicate evidence must be rejected instead.
4. Existing `franchiseTenantIsolation.test.ts` verifies authenticated `userId` propagation to DB mocks; it is **not** proof of Franchise A/B persistence isolation.
5. P0 tenancy remains RED because the repository still lacks the complete persisted membership/context boundary and persistence-backed isolation evidence.
6. `docs/continuity/SHARED.md` remains stale at the 27-August application snapshot and should be reconciled after the next implementation head or by the continuity owner; this batch must not borrow its stale implementation statement as current evidence.
7. PR #22 remains a draft synthetic territory-fixture hardening lane and stays secondary to tenancy P0.

## Consumed this cycle

### VB-FR-APP-01 — Exact-head tenancy helper review
**State:** VERIFIED

- Reviewed PR #6 head `768d624a149e383939791406dcf8ced1ac271662`.
- Durable PR review recorded as GitHub review `5195364976`.
- Durable P0 checkpoint recorded on Issue #15 as comment `5661004829`.
- Validation class: independent static repository review only; tests were not executed in this connector session.

### VB-FR-APP-03 — Define the smallest next Manus implementation slice
**State:** VERIFIED

Handoff recorded on PR #6 and Issue #15. Required next implementation remains:
1. `franchises` tenant entity;
2. `franchise_memberships` with role/status/effective dates;
3. server-side membership loading into request authorization context;
4. tenant-scoped repository/service signatures using authorized `franchiseId`;
5. no ordinary router path accepting a client ID as authority;
6. genuine A/B read and write isolation tests against the persistence layer;
7. inactive/expired and unauthorized-scope denial at the real request/repository boundary;
8. safe migration plan only — no production migration execution.

## Replenished batch

### VB-FR-APP-06 — Fix duplicate requested-scope membership ambiguity
**State:** PENDING — Manus implementation lane

At PR #6 or its successor, replace first-match semantics for requested scope with exactly-one-active-match semantics. Add regression coverage for duplicate active memberships for the same user/franchise, including conflicting roles. Expected result: fail closed with a deterministic authorization error.

**Franchise App verification:** inspect exact successor head and confirm the test exercises the real ambiguity rather than only a type-level case.

### VB-FR-APP-07 — Persist franchise + membership tenancy
**State:** PENDING — P0

Implement the smallest schema/migration and server loading path needed to make `AuthorizedFranchiseContext` derive from persisted membership evidence. Preserve migration safety; do not apply production migration.

**Required evidence:** schema/migration committed; request context loads server-owned membership evidence; no client parameter creates authority.

### VB-FR-APP-08 — Convert one complete repository vertical slice to franchise scope
**State:** PENDING behind VB-FR-APP-07

Choose the smallest existing monthly snapshot/read-write slice and convert it end to end from `userId` tenancy to authorized `franchiseId` tenancy: router/context → service/repository → query/write predicates → tests.

**Acceptance:** Franchise A cannot read or mutate Franchise B through that slice; tenant-owned creation binds to authorized Franchise A without trusting client tenant IDs.

### VB-FR-APP-09 — Replace misleading isolation evidence
**State:** PENDING behind VB-FR-APP-08

Supersede or rename `franchiseTenantIsolation.test.ts` so user-ID propagation tests cannot be mistaken for tenant-isolation proof. Add genuine A/B persistence isolation tests and denial cases for inactive/expired/unauthorized scope.

### VB-FR-APP-10 — Exact-head application validation
**State:** BLOCKED behind implementation

On the exact successor tenancy head, require:
- frozen dependency install;
- focused tenancy tests;
- full test suite;
- typecheck/check;
- production build;
- independent reproduction where practical.

Historical predecessor-head results do not count.

### VB-FR-APP-11 — Reconcile shared continuity
**State:** PENDING

Once the successor implementation head is available, update current application continuity to record exact implementation/test state while preserving RED/AMBER/GREEN truth. Do not mark tenancy complete before persistence-backed A/B isolation and exact-head validation.

### VB-FR-APP-12 — Territory fixture secondary lane
**State:** HOLD

PR #22 / Issue #23 may proceed only as synthetic fail-closed fixture hardening. Do not let territory work displace tenancy P0. Require exact-head CI before GREEN and retain explicit synthetic/non-production labelling.

## Next trigger rule

On `cont` / `continue autonomously`: fresh-scan `main`, PR #6/successor, Issues #15/#18, PR #22, exact-head CI, and this batch; execute the highest eligible P0 item; verify; scan again; replenish this same file; log the checkpoint durably.
