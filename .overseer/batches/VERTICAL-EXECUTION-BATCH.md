# Franchise — Vertical Execution Batch

**Repository:** `darrinbaldwindev/Franchise`  
**Workstream:** Franchise App / Franchise Overseer  
**Purpose:** Move Franchise #1 toward opening through the smallest secure application and commercial path without creating a competing implementation stream.  
**Standing trigger:** `cont`, `continue`, `continue autonomously`, and `continue autonomously vertically` run fresh-scan → reconcile → execute → verify → fresh-scan → replenish → durable-log.  
**Cycle:** 2026-09-14 AEST.  
**Main head scanned:** `aa3ffa30a35ca4322ed7762992d7cae69f190a28`.  
**PR #6 head scanned:** `768d624a149e383939791406dcf8ced1ac271662`.  
**PR #24 head reviewed:** `ac208a07c40e99ee1c1f70f67a1a857d8207fa6e`.  
**Status:** ACTIVE — tenancy remains RED; duplicate-membership helper repair is independently statically reviewed but has no runtime/CI evidence; no persistence-backed Manus successor exists; Gate 3 public pricing evidence advanced without overstating verification.

## Governance boundary

- Opening #1 remains the objective: Build → Open → Operate → Maintain → Improve → Replicate.
- Security contract: **User → Franchise Membership → Authorized Franchise Context → Tenant-scoped operation**.
- Manus App remains primary application implementation counterpart.
- No merge, ready transition, deployment, production migration, provider activation, credential change, spend, supplier/customer contact or production write is authorized.
- Territory fixture work remains synthetic/downstream of tenancy.
- Public catalogue prices are RESEARCH/PRICED evidence only unless business-account and freight/landed evidence is independently established.

## Fresh-scan result

1. `main` was `aa3ffa30...` at cycle start; no persistence-backed tenancy implementation followed it.
2. PR #6 remains at `768d624...`; no successor tenancy head exists.
3. Draft PR #24 remains at `ac208a0...` and changes only the pure authorization helper/test.
4. Exact-head GitHub Actions lookup for `ac208a0...` returned zero workflow runs and combined status has zero checks; no CI GREEN exists.
5. Amazon Q independently commented that PR #24 correctly fails closed on duplicate active memberships; this is additional static review, not runtime proof.
6. Persisted `franchises`/`franchise_memberships`, DB-backed membership loading, franchise-scoped repository operations and genuine A/B persistence tests remain absent/unproven.
7. PR #22 remains synthetic territory work and is secondary.

## Executed application lane

### VB-FR-APP-28 — Exact-head independent review of PR #24
**State:** STATICALLY VERIFIED / NOT RUNTIME VERIFIED

Review recorded as GitHub PR review `5195904550` against exact head `ac208a07c40e99ee1c1f70f67a1a857d8207fa6e`.

Verified statically:
- requested scope now filters all active same-franchise memberships rather than selecting first row;
- zero matches remains unauthorized;
- more than one active same-franchise match fails closed with `AMBIGUOUS_FRANCHISE_MEMBERSHIP`;
- regression test uses conflicting owner/manager duplicate rows;
- bounded change touches only tenancy helper + test.

Disposition: correct bounded repair for the identified ambiguity. No approval/merge-ready/GREEN claim because exact-head runtime evidence is absent.

### VB-FR-APP-29 — Exact-head automation evidence
**State:** BLOCKED / NONE

For PR #24 head `ac208a0...`:
- pull-request workflow runs: none;
- combined statuses/checks: zero;
- independent static reviewer evidence exists, but no runnable pass evidence.

Do not promote PR #24 beyond static PARTIAL until exact-head tests/check/build are reproduced.

## Replenished P0 application lane

### VB-FR-APP-30 — Consume persistence successor
**State:** WAITING ON MANUS IMPLEMENTATION

On the next trigger, scan PR #6 plus new branches/PRs first. If a successor exists, inspect immediately for:
- canonical `franchises` entity;
- `franchise_memberships` with role/status/effective windows;
- database uniqueness/constraint strategy for duplicate active authority evidence;
- server-side membership loading from authenticated identity;
- immutable authorized franchise context;
- no client franchise ID authority;
- router/service/repository operations scoped by authorized `franchiseId`;
- A cannot read/create/update/delete B persistence tests;
- inactive/expired/future membership denial through real request path;
- unauthorized scope switching denial;
- safe legacy migration/backfill without fabricated ownership or transactions.

### VB-FR-APP-31 — Exact-head successor assurance
**State:** BLOCKED behind VB-FR-APP-30

Require frozen install, focused tenancy tests, full test suite, typecheck/check, production build, debug/telemetry production-boundary inspection and independent reproduction where practical. Historical predecessor results do not count.

### VB-FR-APP-32 — Commerce implementation release gate
**State:** BLOCKED

No transactional catalogue/order/checkout expansion until persistence-backed A/B isolation plus exact-head assurance are demonstrated. Pure helper hardening is necessary but insufficient.

## Executed Gate 3 commercial lane

### VB-FR-COM-05 — Fresh Kelly's public catalogue evidence
**State:** COMPLETE AS PRICED / NOT VERIFIED

Issue #16 comment `5661639280` records current public evidence checked 2026-09-14. These values are catalogue evidence only; account pricing and Sunshine Coast freight remain unverified.

| Candidate | Supplier ref | Public carton price inc GST | Derived ex GST carton | Derived ex GST unit | Gate 3 state |
|---|---|---:|---:|---:|---|
| Red Bull Energy Drink 250ml x24 | Kelly's SKU 106 | $47.69 special | ~$43.35 | ~$1.81 | PRICED / PROMO-QUARANTINED |
| Red Bull Sugar Free 250ml x24 | Kelly's SKU 128 | $59.68 | ~$54.25 | ~$2.26 | PRICED / FREIGHT UNKNOWN |
| Red Bull Zero 250ml x24 | Kelly's SKU 299 | $59.68 | ~$54.25 | ~$2.26 | PRICED / FREIGHT UNKNOWN |
| Red Bull Energy Drink 473ml x12 | Kelly's public catalogue | $46.53 | ~$42.30 | ~$3.53 | PRICED / FREIGHT UNKNOWN |
| Red Bull Tropical 250ml x12 | Kelly's public catalogue | $23.81 | ~$21.65 | ~$1.80 | PRICED / FREIGHT UNKNOWN |
| Cobs LSSS Popcorn 30g x16 | Kelly's public catalogue | $17.60 | $16.00 | $1.00 | PRICED / FREIGHT UNKNOWN |
| Byron Bay Triple Choc Cookie 60g x12 | Kelly's public catalogue | $39.55 | ~$35.95 | ~$3.00 | PRICED / FREIGHT UNKNOWN |

Evidence notes:
- Kelly's product pages state Australia-wide shipping, but no order-specific Sunshine Coast freight allocation was evidenced in this cycle.
- Red Bull 250ml x24 is explicitly marked limited-time/special and cannot anchor normal launch economics.
- None of these candidates advances to VERIFIED/APPROVED without business-account price plus landed freight evidence.

### VB-FR-COM-06 — Gate 3 next evidence target
**State:** ACTIVE

Next safe commercial work, if tenancy does not move:
1. obtain independently accessible normal-price evidence for promo-sensitive candidates;
2. inspect Kelly's delivery/freight terms for a usable Sunshine Coast landed-cost rule if publicly available;
3. expand current-price evidence across sealed snacks, soft drinks, water and shelf-stable convenience lines;
4. keep every row PRICED until account/freight evidence crosses the VERIFIED threshold;
5. reject/quarantine rows dependent on clearance, unknown freight or unreliable availability.

No supplier contact or spend without owner authorization.

## Secondary lanes

### VB-FR-TERR-03 — Territory
**State:** HOLD / SYNTHETIC ONLY

PR #22 remains downstream fixture hardening. Do not represent it as production routing or consume P0 capacity.

### VB-FR-GOV-04 — Royalty
**State:** OWNER/LEGAL DEPENDENT

Issue #21 remains blocked until authoritative breakeven threshold, turnover basis, refund/discount/tax/exclusion treatment and legal/commercial validation exist. Keep the proposed 3%/6% logic configurable/non-production.

## Verified cycle disposition

- **Tenancy:** RED.
- **PR #24 helper repair:** independently statically verified on exact head; runtime/CI absent.
- **Persistence-backed A/B isolation:** absent / P0 blocking.
- **Commerce implementation:** BLOCKED by tenancy.
- **Gate 3:** advanced with seven current catalogue-priced candidates, none falsely promoted to VERIFIED.
- **Territory:** synthetic/downstream.
- **Royalty:** owner/legal blocked.
- **Merge/deploy/migration/provider activation:** not authorized and not performed.

## Next trigger

Fresh-scan all heads before acting. If a Manus persistence successor exists, consume the batch on exact-head tenancy review and assurance. If PR #24 gains runtime evidence, verify it but do not merge/ready autonomously. If neither moves, deepen Gate 3 landed-cost evidence and expand the candidate range while preserving strict RESEARCH/PRICED/VERIFIED distinctions.

A batch succeeds only when it reduces a real blocker or creates independently usable evidence; activity volume alone is not progress.