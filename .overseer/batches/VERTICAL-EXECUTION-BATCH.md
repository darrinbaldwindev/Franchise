# Franchise — Vertical Execution Batch

**Repository:** `darrinbaldwindev/Franchise`  
**Workstream:** Franchise App / Franchise Overseer  
**Purpose:** Move Franchise #1 toward opening through the smallest secure application path without creating a competing implementation stream.  
**Standing trigger:** `cont`, `continue`, `continue autonomously`, and `continue autonomously vertically` run fresh-scan → reconcile → execute → verify → fresh-scan → replenish → durable-log.  
**Cycle:** 2026-09-14 19:06 AEST.  
**Main head scanned:** `aa3ffa30a35ca4322ed7762992d7cae69f190a28`.  
**PR #6 head scanned:** `768d624a149e383939791406dcf8ced1ac271662`.  
**Franchise App review PR:** #24 at `ac208a07c40e99ee1c1f70f67a1a857d8207fa6e`.  
**Status:** ACTIVE — P0 tenancy RED/incomplete; bounded duplicate-membership repair is statically reviewed but lacks runnable exact-head test/CI evidence; no persistence-backed Manus successor exists.

## Governance boundary

- Opening #1 remains the objective: Build → Open → Operate → Maintain → Improve → Replicate.
- Security contract: **User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**.
- Manus App remains primary implementation counterpart.
- No merge, ready transition, deployment, production migration, provider activation, credential change, spend, supplier/customer contact or production write is authorized.
- Territory fixture work remains synthetic/downstream of tenancy.

## Fresh-scan result

1. `main` is at `aa3ffa30...`; no application implementation commit followed the prior Franchise App batch replenishment.
2. PR #6 remains open at `768d624...`; there is still no persistence-backed tenancy successor.
3. Draft PR #24 remains at `ac208a0...` and is mergeable into the Manus source-integration branch, but it remains draft.
4. GitHub Actions returned no pull-request workflow runs for PR #6 head or PR #24 head.
5. Persisted `franchises`/`franchise_memberships`, DB-backed membership loading, franchise-scoped repository operations and genuine A/B persistence tests remain unproven/absent in the available successor implementation.
6. PR #22 remains synthetic territory-fixture work and does not displace P0 tenancy.

## Executed this cycle

### VB-FR-APP-20 — Review PR #24 verification
**State:** STATICALLY VERIFIED / RUNTIME VERIFICATION BLOCKED

Inspected the exact PR #24 diff against PR #6 head. The change is bounded to two files:
- `apps/franchise-hub/server/franchiseTenancy.ts`
- `apps/franchise-hub/server/franchiseTenancy.test.ts`

Static review confirms:
- requested scope now uses all active matching memberships rather than first-match `find()` semantics;
- zero matches retains `FRANCHISE_SCOPE_NOT_AUTHORIZED`;
- duplicate active matches fail closed with `AMBIGUOUS_FRANCHISE_MEMBERSHIP`;
- the regression test uses duplicate same-franchise memberships with conflicting roles.

This addresses the identified row-order ambiguity at the pure authorization-helper layer.

### VB-FR-APP-23 — Independent exact-head runtime reproduction
**State:** BLOCKED BY EXECUTION ENVIRONMENT

Attempted to clone/fetch the exact PR #24 head in the local execution container for focused test/full test/typecheck/build validation. The container could not resolve `github.com`, so the repository could not be obtained there. This is an environment/network limitation, **not a code failure**.

No runtime GREEN is claimed. Exact-head workflow lookup also returned no CI run for `ac208a0...`.

## Replenished P0 application lane

### VB-FR-APP-24 — Consume Manus persistence successor
**State:** WAITING ON IMPLEMENTATION

On next trigger, scan PR #6 and all relevant new branches/PRs first. If a successor head exists, inspect immediately for:
- `franchises` and `franchise_memberships` schema/migration;
- uniqueness/constraint handling for duplicate active membership authority;
- effective dates/status/role constraints;
- server-side membership loading from authenticated identity;
- immutable authorized franchise context;
- exactly-one requested-scope matching semantics;
- router/service/repository signatures using authorized `franchiseId`;
- read/write/create predicates bound to franchise scope;
- real Franchise A/B persistence isolation tests;
- inactive/expired/future membership denial;
- unauthorized scope switching;
- safe legacy migration/backfill behaviour.

### VB-FR-APP-25 — Obtain exact-head runtime evidence for PR #24
**State:** WAITING ON RUNNABLE ENVIRONMENT OR CI

Acceptable evidence is one of:
- GitHub Actions on exact head `ac208a0...`; or
- independently reproducible frozen install + focused tenancy tests + full tests + typecheck/check + production build from the exact head.

Do not merge or mark ready solely from static review.

### VB-FR-APP-26 — Exact-head persistence assurance
**State:** BLOCKED behind VB-FR-APP-24

For the persistence successor require frozen install, focused tenancy tests, full tests, typecheck/check, production build, production debug/telemetry boundary inspection, and independent reproduction where practical. Predecessor results do not count.

### VB-FR-APP-27 — Commerce release gate
**State:** BLOCKED

Catalogue/order/checkout transactional implementation remains blocked until persistence-backed A/B isolation and exact-head assurance pass. PR #24 improves helper semantics only; it does not complete tenancy.

## Parallel Gate 3 lane

### VB-FR-COM-03 — Build verified opening SKU evidence
**State:** ACTIVE

Continue collecting evidence for approximately 40–60 sealed, shelf-stable, compact/easy-to-fulfil opening SKUs. Require exact product/pack, supplier/SKU, business-account cost ex GST, freight/landed cost, proposed retail inc GST, delivery/platform economics, contribution/margin, opening quantity, reorder point, evidence/date and status. Unknown freight or uncertain supply remains quarantined.

## Secondary lanes

### VB-FR-TERR-02 — Territory
**State:** HOLD

PR #22 remains synthetic fixture hardening only; no production-routing readiness claim.

### VB-FR-GOV-03 — Royalty
**State:** OWNER/LEGAL DEPENDENT

Keep royalty rules configurable/non-production until authoritative breakeven, turnover, tax/refund/exclusion and legal treatment is approved.

## Verified cycle disposition

- **Tenancy:** RED.
- **PR #24 pure helper fix:** statically sound for the identified ambiguity; runtime/CI verification still absent.
- **Persistence-backed A/B isolation:** absent / blocking.
- **Commerce:** BLOCKED by tenancy.
- **Territory:** synthetic/downstream.
- **Merge/deploy/migration:** not authorized and not performed.

## Next trigger

Fresh-scan before acting. If Manus tenancy moves, consume the whole cycle on exact-head persistence review. If PR #24 gains runnable evidence, verify it without merging. If neither moves, advance the strongest independent Opening #1 blocker-reduction task while preserving Manus implementation ownership, then scan again and replenish this same file.

A batch succeeds only when it reduces a real blocker or creates independently usable evidence; activity volume alone is not progress.
