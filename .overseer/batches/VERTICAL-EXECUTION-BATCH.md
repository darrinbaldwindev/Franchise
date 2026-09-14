# Franchise — Vertical Execution Batch

**Repository:** `darrinbaldwindev/Franchise`  
**Workstream:** Franchise App  
**Purpose:** Move Franchise #1 toward opening by reviewing and validating the smallest secure application path, without creating a competing implementation stream.  
**Primary control:** Opening #1 Gate 4 security; Issues #15/#18; PR #6.  
**Last fresh scan:** 2026-09-14 (owner `cont`/vertical-batch trigger context).  
**Main head at scan:** `5eff54a8d4780d8ccdd411e650348c8593d3a224` (`docs: adopt portfolio vertical batch execution doctrine`).  
**PR #6 head at scan:** `768d624a149e383939791406dcf8ced1ac271662`.  
**Current status:** ACTIVE — P0 tenancy remains RED/incomplete; bounded authorization helper exists for review; territory fixture work is synthetic/non-production and secondary.

## Governance boundaries

- Opening #1 remains the objective: **Build → Open → Operate → Maintain → Improve → Replicate**.
- Required security relationship remains **User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**.
- Manus App remains primary application implementation counterpart; Franchise App reviews/tests/identifies blockers and may make bounded repository changes where they do not create a competing implementation.
- No merge, deploy, production migration, production tenancy/routing change, provider activation, credential change, spend, customer/supplier contact, or production write is authorized by this batch.
- Territory fixtures currently on `main` are synthetic evidence only and must not be represented as production routing or tenancy completion.

## Fresh-scan findings

1. `main` advanced materially on 2026-09-14 with synthetic territory routing/audit hardening and tests, ending at `5eff54a...`.
2. `docs/continuity/SHARED.md` is stale: it still records the 27-August application position and does not reflect current PR #6 tenancy-helper evidence or current synthetic territory work.
3. PR #6 is open at `768d624...` and now contains `server/franchiseTenancy.ts` plus deterministic authorization tests. The PR itself correctly states this does **not** complete the tenancy gate.
4. PR #6 still lacks the required `franchises`/`franchise_memberships` persistence model, DB-backed request-context loading, conversion of existing `userId`-scoped repository methods, genuine cross-tenant persistence tests, and exact-head install/test/typecheck/build evidence.
5. Existing `franchiseTenantIsolation.test.ts` still verifies propagation of authenticated `userId` into database calls; it is not evidence of franchise A/B persistence isolation.
6. PR #22 is a draft synthetic territory-fixture hardening batch. It must remain secondary to P0 tenancy and cannot be used to claim production routing readiness.

## Current batch

### VB-FR-APP-01 — Exact-head tenancy helper review
**State:** ACTIVE

Review PR #6 head `768d624...` against Issues #15/#18 and `docs/application/APP_TENANCY_IMPLEMENTATION_SPEC.md`.

**Evidence required:**
- helper cannot derive authority from client-supplied franchise ID;
- inactive/expired/future memberships fail closed;
- ambiguous multi-membership context fails closed;
- wrong-user membership fails closed;
- role checks occur only after tenant context resolution;
- review explicitly distinguishes pure authorization helper from real persisted tenant isolation.

**Exit:** durable technical review recorded on PR #6 with exact head and remaining blockers.

### VB-FR-APP-02 — Reconcile stale application continuity
**State:** PENDING

Update shared/application continuity only with evidence verified from current repo/PR state. Preserve RED tenancy status until persistence-backed A/B isolation exists.

**Exit:** continuity no longer claims the latest application evidence is only the August handoff; exact heads and evidence classes are recorded.

### VB-FR-APP-03 — Define the smallest next Manus implementation slice
**State:** PENDING

Keep implementation ownership with Manus App. The next slice must connect the reviewed helper to real persistence rather than expanding dashboard/commerce features.

**Required scope:**
1. `franchises` tenant entity;
2. `franchise_memberships` with role/status/effective dates;
3. server-side membership loading into request authorization context;
4. tenant-scoped repository/service signatures using authorized `franchiseId`;
5. no ordinary router path accepting a client ID as authority;
6. genuine A/B read and write isolation tests against the persistence layer;
7. inactive/expired and unauthorized-scope denial at the real request/repository boundary;
8. safe migration plan only — no production migration execution.

### VB-FR-APP-04 — Exact-head validation gate for PR #6
**State:** BLOCKED

Blocked until the next persistence-integrated tenancy head exists. Required verification then includes frozen install, test suite, typecheck/check, production build, and focused tenancy tests against the exact head. Historical validation from predecessor heads must not be borrowed.

### VB-FR-APP-05 — Territory fixture secondary review
**State:** HOLD

PR #22 / Issue #23 may continue only as synthetic fail-closed fixture hardening. Do not let territory work displace tenancy P0. Confirm exact-head CI before any GREEN claim and preserve synthetic/non-production labelling.

## Batch completion rule

This cycle is successful if it leaves the repo with: (a) an exact-head PR #6 technical review, (b) corrected continuity if current permissions permit, (c) a precise Manus handoff for the persistence-backed tenancy slice, and (d) a replenished next batch that keeps commerce blocked until real tenant isolation is demonstrated.
