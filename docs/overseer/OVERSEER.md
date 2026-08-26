# Overseer Review Log

## Repository

`darrinbaldwindev/Franchise`

## Purpose

The documented source of truth for a central, home-based local-delivery franchise platform, with a central customer experience, territory-based routing, tenant-aware franchise operations, contribution tracking, and an internal earned-hours metric.

## Last scan

2026-08-23T12:51:18Z

## Scan scope

Initial read-only review of `main` at `b85dce7`, the open `agent/manus/source-integration` pull request (#6, reviewed at `75406d2`), the open coordinated-scan branch, root project contract documents, continuity records, architecture, open GitHub issues and pull requests, branch state, and a non-invasive credential-pattern path check. This was not a runtime, penetration, legal, accounting, or production-readiness audit.

## Status

**AMBER — ATTENTION REQUIRED**

## Executive summary

The repository has a clear business and architecture contract, explicit owner authority, and a well-maintained continuity record. The critical current dependency is controlled source-of-truth alignment: the managed Franchise Hub dashboard/reporting foundation is staged in open pull request #6 but is not yet part of `main`. The staged source is appropriately described as a foundation rather than the complete commerce and delivery platform.

No high-confidence credential-pattern file paths were returned by the scoped initial check. This is a limited observation only and does not constitute a complete security audit.

## Open findings

### OVERSEER-20260823-001

- **Severity:** MEDIUM
- **Area:** architecture
- **Finding:** The current canonical `main` branch does not yet contain the managed Franchise Hub source that the continuity record identifies as the existing dashboard/reporting foundation.
- **Evidence:** `docs/continuity/SHARED.md` records source-of-truth alignment as the major architectural issue and identifies controlled source integration as the next sequence. Open pull request [#6](https://github.com/darrinbaldwindev/Franchise/pull/6), branch `agent/manus/source-integration` at reviewed revision `75406d2`, adds `apps/franchise-hub/` and `docs/SOURCE_INTEGRATION.md`.
- **Why it matters:** Until the integration is reviewed and merged, the repository’s documented production direction and the demonstrated dashboard foundation remain separated, reducing reproducibility and increasing the risk of parallel or inconsistent future work.
- **Recommendation:** Maintain the owner-controlled pull-request review gate for #6. Before merge, independently re-run the stated repository-local validation commands and confirm that the imported source remains a dashboard/reporting foundation, not an assertion that the full commerce platform is production-ready.
- **Suggested owner:** Darrin / Manus Main
- **Status:** OPEN
- **Confidence:** HIGH

### OVERSEER-20260823-002

- **Severity:** MEDIUM
- **Area:** financial
- **Finding:** The staged dashboard stores a single `royaltyPct` per monthly record and derives royalty as `customerSales × royaltyPct`. It does not, in its reviewed form, implement the documented configurable threshold-based 3%/6% royalty model.
- **Evidence:** `README.md` states that the 3%/6% threshold is configurable and must be formally defined before production use. In pull request #6, `apps/franchise-hub/drizzle/schema.ts` defines only `royaltyPct`, while `apps/franchise-hub/server/franchiseMetrics.ts` uses that field directly in the royalty calculation. `docs/SOURCE_INTEGRATION.md` expressly limits the imported application to a dashboard/reporting foundation.
- **Why it matters:** If the dashboard is later represented as a production commercial calculation engine without an explicit policy/configuration layer, royalty and contribution results could diverge from the approved franchise rule.
- **Recommendation:** Before any production-commercial reliance on dashboard financial outputs, obtain an owner-approved definition of the threshold, effective-date treatment, and configuration authority; then assign bounded implementation and automated verification work. Do not hard-code the rule as final legal or accounting treatment.
- **Suggested owner:** Darrin / project agent
- **Status:** NEEDS DECISION
- **Confidence:** HIGH

### OVERSEER-20260823-003

- **Severity:** LOW
- **Area:** operations
- **Finding:** The current private-repository plan does not provide enforceable branch protection, so the documented review/check gate is manually enforced.
- **Evidence:** `docs/continuity/SHARED.md` records the GitHub HTTP 403 response and states that owner and Manus Main must manually enforce pull-request review and successful-check requirements until the owner changes the relevant plan or repository visibility.
- **Why it matters:** A manually enforced gate can be bypassed inadvertently, particularly while the canonical source is being integrated.
- **Recommendation:** Keep the manual two-person review/check evidence requirement for material pull requests and have the owner decide whether enforced protection justifies a plan or visibility change. Do not change repository plan or visibility without explicit owner approval.
- **Suggested owner:** Darrin
- **Status:** OPEN
- **Confidence:** HIGH

## Cross-repository observations

The authorized portfolio contains distinct projects: Franchise is a franchise-platform initiative; AgentOS is an AI-agent operating-system initiative; and `manus` is the GemVerse narrative/game-design project. No evidence from this first scan establishes that they should share production code, credentials, databases, deployment infrastructure, or business rules.

Their common opportunity is governance practice rather than shared runtime architecture: each benefits from explicit source-of-truth designation, append-only evidence records, owner-gated external actions, and a clear separation between verified implementation, plans, and assumptions.

## Decisions required

1. **Darrin:** Approve or reject pull request #6 after the defined review and validation gate; this is the decision that establishes whether the staged Franchise Hub source becomes canonical in this repository.
2. **Darrin:** Before production-commercial use of the dashboard, approve the contractual/configurable ownership and effective treatment of the royalty threshold model.
3. **Darrin:** Decide whether manual pull-request enforcement remains acceptable or whether a plan/visibility change for enforceable branch protection is warranted.

## Resolved since last scan

None. This is the initial Overseer record.

## Areas reviewed

Repository identity and branches; README and agent authority rules; collaboration and continuity state; documented architecture; open issues and pull requests; source-integration provenance/readiness documentation; staged metric and data-schema evidence; and a limited credential-pattern path check.

## Repository/commit state reviewed

`main` at `b85dce737fe8130186ef551d28a0bd4533ddfc72`; source-integration pull request #6 reviewed at `75406d2`; coordinated-first-scan branch reviewed at `1986de5`.

## Handoff acknowledgement

The Overseer handoff specification was read. The read-only boundary is understood: this agent may modify only `docs/overseer/OVERSEER.md` in each authorized repository and may not alter application code, configuration, CI/CD, migrations, continuity records, business rules, production data, or other agent logs.

Accessible repositories for this scan were `darrinbaldwindev/Franchise`, `darrinbaldwindev/repo`, `darrinbaldwindev/manus`, and `darrinbaldwindev/AgentOS`. No repository in that authorized set was inaccessible. Darrin remains the final authority.

## Next review

A lightweight read-only change scan should occur daily, with a deeper cross-repository review weekly and an additional scan after major merges, architecture changes, or explicit owner requests. No background schedule is configured by this record.

> This review log is evidence-based governance documentation. It is not proof of runtime, security, production, legal, financial, or release readiness.

## Follow-up review — 2026-08-23T13:07:55Z

### Scope and limits

A detailed **static** review was completed for open pull request [#6](https://github.com/darrinbaldwindev/Franchise/pull/6), head `75406d2869b582eb200597b9d2fe31e940a3b3fe`. The review covered its change inventory, application manifest, authentication and tRPC access controls, data schema and migrations, KPI calculations, review/audit logic, source-integration and readiness records, and focused tests. No application code, migration, build, test, deployment, database, production record, or external model call was executed by Overseer.

The PR is open and non-draft, with 160 changed files, 27,328 additions, and 6 deletions. At review time, it had no review decision, reviews, or comments. Its GitHub merge state was `UNKNOWN`; independent check-run retrieval was unavailable to this reviewer because the attached GitHub integration returned an access error. The PR body reports successful `git diff --check`, 25 passing Vitest tests, TypeScript validation, and a production build. Those reported command results were not independently re-executed in this review.

### Review strengths observed

The source integration is candid about its boundary: it imports an authenticated tenant-scoped dashboard/reporting and review foundation rather than claiming delivery-commerce completeness. The server derives KPI calculations from stored records, uses authenticated user IDs for franchisee data paths, requires an attestation before monthly saves, restricts the franchisor queue and decision procedures to administrators, and retains separate revision and reviewer-event records. The OAuth callback contains a state-nonce comparison before exchanging a code, and session cookies are configured as HTTP-only. The coaching path reads the authenticated user’s saved snapshot server-side and supplies an explicit non-financial-advice boundary plus a deterministic fallback.

### OVERSEER-20260823-004

- **Severity:** MEDIUM
- **Area:** data / product
- **Finding:** The implementation uses “verified” for franchisee-attested saved inputs and calculated metrics before a franchisor review decision has been recorded.
- **Evidence:** `apps/franchise-hub/docs/PRODUCTION_READINESS.md` says that the current dashboard accepts franchisee-entered inputs and that “verified” in the UI should be reserved until a future source integration, reconciliation, or authorised review confirms the figures. Conversely, `apps/franchise-hub/server/db.ts` names every saved record’s inputs `verifiedInputs`; `apps/franchise-hub/server/routers.ts` tells users to save “verified monthly figures” and supplies a `verifiedContext` to the coaching path; `apps/franchise-hub/server/franchiseMetrics.ts` describes current results as verified. The record’s persisted review status remains `awaiting-review` after an attested save.
- **Why it matters:** Attestation, deterministic calculation, and administrator approval are different provenance states. Conflating them can overstate the reliability of manually entered financial-operating inputs and conflicts with the repository’s documented review model.
- **Recommendation:** Use separate terms consistently: for example, **franchisee-attested** for saved inputs, **server-calculated** for derived metrics, and **review-approved** only after the administrator decision. Add tests that assert no unapproved record is labelled verified in the API payload, deterministic coaching, or user-facing copy.
- **Suggested owner:** project agent
- **Status:** OPEN
- **Confidence:** HIGH

### OVERSEER-20260823-005

- **Severity:** MEDIUM
- **Area:** operations / audit
- **Finding:** The protected review-decision path can update the current review state and append the reviewer audit event in two separate database operations without an explicit review-state guard or transaction.
- **Evidence:** `apps/franchise-hub/server/db.ts` loads a record by ID, checks only its attestation, then updates `monthlyBusinessRecords` followed by a separate insert into `monthlyBusinessRecordReviewEvents`. It does not constrain the update to `reviewStatus = awaiting-review`, and it does not wrap the update and audit insert in a transaction. The queue itself filters only awaiting-review records, but the administrator decision procedure accepts a record ID directly.
- **Why it matters:** An authorised repeat or concurrent decision could overwrite the current record summary and append additional events. A persistence failure after the state update could leave the summary and immutable-event trail inconsistent.
- **Recommendation:** Before commercial reliance on review status, make the state transition conditional on the expected current state and perform the state update plus audit-event insert transactionally. Return an explicit conflict when the record was already decided or revised, and add tests for repeated decisions, concurrent attempts, and audit-insert failure semantics.
- **Suggested owner:** project agent
- **Status:** OPEN
- **Confidence:** HIGH

### OVERSEER-20260823-006

- **Severity:** MEDIUM
- **Area:** operations
- **Finding:** The staged migration sequence includes additive `NOT NULL` monthly-record fields without a migration-specific default or backfill, but no target-database compatibility evidence accompanies the source import.
- **Evidence:** `apps/franchise-hub/drizzle/0003_fuzzy_killraven.sql` adds `operatingTarget` and `wageBenchmark` as `NOT NULL`; later migrations add audit and review metadata. PR #6 deliberately excludes database-migration execution and target-database change. `apps/franchise-hub/docs/PRODUCTION_READINESS.md` says migrations must be applied before publishing.
- **Why it matters:** The operational outcome depends on the target schema, existing row population, SQL-mode behavior, and migration history. Applying imported migrations without a target-specific plan could fail or create values that do not represent approved business data.
- **Recommendation:** Treat migration execution as a separate owner-approved deployment gate. Establish the target database revision, take an approved backup/checkpoint, rehearse the migration against a representative non-production copy, define any required backfill, and verify rollback/recovery semantics before applying changes.
- **Suggested owner:** Darrin / Manus Main
- **Status:** NEEDS DECISION
- **Confidence:** MEDIUM

### Review conclusion

PR #6 is a substantial, well-bounded **source-integration** proposal with meaningful safeguards and focused test coverage. It should not be characterised as a complete franchise-commerce platform or as independently revalidated production readiness. The three findings above should be recorded as merge/release follow-ups; the migration item is a separate deployment gate, not a request to apply migrations during source integration.

> This follow-up is a static code and documentation review. It is not a security test, runtime validation, financial audit, legal review, or production approval.

## Remediation planning record — 2026-08-23T13:15:31Z

A detailed, planning-only remediation plan was prepared for `OVERSEER-20260823-004`, `OVERSEER-20260823-005`, and `OVERSEER-20260823-006`. The plan preserves the required sequence: first establish the canonical source decision for PR #6; then complete bounded terminology/provenance and review/audit-transaction work; and finally conduct an owner-approved, target-specific database-migration preflight and non-production rehearsal.

The plan does not authorize code changes, a merge, migration generation or execution, database access, production action, deployment, commercial-policy changes, credentials, OAuth changes, or a change to the configurable royalty model. These remain owner-gated. The detailed plan is retained with this review task and should be used as the implementation brief only after the stated gates are satisfied.

## Scheduling record — 2026-08-23T13:20:42Z

Darrin approved a combined recurring Overseer review that runs at **09:00 daily** and expands into the deeper weekly ecosystem review when the Australia/Sydney local date is Monday. Results remain inside Manus. The schedule is active, uses the standard task mode, and expires at `2026-09-22T13:15:31Z` pending owner renewal or revision.

The scheduler reports its fixed timezone as `Australia/Brisbane` and does not expose a timezone override in the available schedule configuration. This is operationally equivalent to the selected Australia/Sydney 09:00 schedule throughout the approved review window: both locations are AEST (`UTC+10`) on 24 August 2026 and 22 September 2026. The schedule expires before any daylight-saving difference would arise. Renewal beyond the expiry must re-confirm the intended timezone.

Each run is constrained to read-only oversight: it may append evidence-backed updates only to `docs/overseer/OVERSEER.md`, may not execute untrusted project code or apply migrations, and may not modify application code, configuration, CI/CD, continuity records, business rules, production data, branches, pull requests, credentials, connectors, schedules, deployments, or other agent logs. No external connectors were added specifically for this schedule.

## Immediate active pull-request scan — 2026-08-24T05:37:47Z

A read-only organization-wide scan found **five open, non-draft pull requests** under `darrinbaldwindev`: AgentOS #1; manus/GemVerse #1; and Franchise #3, #6, and #8. No additional active pull request was identified beyond this existing queue.

[Franchise PR #6](https://github.com/darrinbaldwindev/Franchise/pull/6) remains open at `75406d2869b582eb200597b9d2fe31e940a3b3fe`, now reported `CLEAN` for merge. Clean mergeability is not approval. The staged source has no newer commit, while its current owner-associated review records keep the integration gated pending: (1) explicit wording that migration-history files are source-controlled records only and no migration executes through the merge; (2) removal or provable production exclusion of the Manus debug collector; and (3) the separate reconciliation with the current domain-tenancy architecture. Static inspection confirms that the staged debug collector captures console logs, fetch/XHR network request and response data, semantic UI events, and periodically sends buffered data to `/__manus__/logs`. Its sensitive-field masking reduces but does not remove the need for an explicit production boundary.

The current `docs/DOMAIN_MODEL.md` and open [Issue #12](https://github.com/darrinbaldwindev/Franchise/issues/12) establish a binding downstream gate: user identity must not substitute for franchise tenancy; server-side membership/authorization must establish franchise scope; and current monthly reporting records must not become the sole source of truth for inventory, orders, or financial contribution. Issue #12 is labelled `blocked` and `architecture`, has no assignee or comments, and states that debug telemetry must not be enabled in production. This supplements, rather than supersedes, the existing source-integration, provenance, review-transaction, and migration-preflight findings.

[Franchise PR #8](https://github.com/darrinbaldwindev/Franchise/pull/8) remains a one-file Overseer-log proposal and is `CLEAN`; a newer owner-associated commented review requires reconciliation with `docs/DOMAIN_MODEL.md`, `docs/STOCK_ECONOMICS.md`, `docs/ORDER_ECONOMICS.md`, and the current tenancy/domain-model gate before the log is accepted as a portfolio baseline. [Franchise PR #3](https://github.com/darrinbaldwindev/Franchise/pull/3) remains open and `CLEAN`, but its sole owner comment describes its coordinated first-scan instructions as superseded and calls for an owner decision to close or formally supersede it. AgentOS #1 remains a one-file documentation proposal with the existing formal comment review; manus/GemVerse #1 is likewise a one-file documentation proposal with the existing formal comment review. Neither changes application runtime surfaces.

### Expanded recurring-review scope

At Darrin’s request, the active recurring schedule was updated to enumerate **all open pull requests accessible under `darrinbaldwindev`** at each daily run, with special continuing attention to Franchise PR #6 while it remains open. It now requires comparison against the prior queue, review of scope/revision/comment/review/merge metadata, and an Australia/Sydney-Monday weekly portfolio summary of new, stale, superseded, blocked, clean, and merge-gated work. The schedule is active at 09:00 daily in the scheduler’s `Australia/Brisbane` timezone, expires at `2026-09-22T13:15:31Z`, uses the GitHub connector only, and continues to prohibit code execution, migrations, deployments, and pull-request or issue modification without a live explicit user authorization.

No application code, architecture, issue, pull request, branch, migration, deployment, credential, connector, or production data was changed by this scan or its log record.

## Governance notification-template rule — 2026-08-24T06:35:13Z

Darrin directed that the Overseer prepare a development-team governance notification template whenever a review identifies a **new or materially changed finding**. The active daily review now defines material change as, at minimum, a new pull request or issue, a code-revision change, a severity change, new unresolved review evidence, a merge/block-state change, or a new canonical record that changes the prior assessment.

For each distinct material finding or state change, the prepared in-Manus template must identify the exact evidence and revision, risk classification, required owner decision, permitted and prohibited team actions, reassessment verification, relevant links, and a structured owner-response field. The workflow must deduplicate unchanged findings; it must not recreate a template where no material evidence changed.

This rule authorizes **draft preparation only**. It does not authorize external sending, GitHub posting, email, chat delivery, pull-request review, issue modification, merge, deployment, migration, or any other external action. Darrin must separately approve every external communication. The schedule remains active at 09:00 daily in `Australia/Brisbane`, performs the expanded weekly summary on Australia/Sydney Mondays, expires at `2026-09-22T13:15:31Z`, runs in full-auto mode, and is restricted to the GitHub connector.

## Follow-up validation finding — 2026-08-24T06:43:44Z

A new owner-associated review record on [Franchise PR #6](https://github.com/darrinbaldwindev/Franchise/pull/6) reports an **independent validation blocker** for head `75406d2869b582eb200597b9d2fe31e940a3b3fe`. In an isolated checkout, `pnpm install --frozen-lockfile --ignore-scripts` failed with `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`: the committed `package.json` places `patchedDependencies` and `overrides` under the deprecated `pnpm` field while the lockfile records them as active settings. A disposable install using a matching workspace configuration reported the same mismatch; a non-frozen, scripts-disabled install then failed with `ERR_PNPM_INVALID_PATCH` because `patches/wouter@3.7.1.patch` did not pass hunk-header integrity validation.

Because dependency installation could not complete, the independent reviewer did **not** run `pnpm test`, `pnpm check`, or `pnpm build`. This is a material validation/release-integrity gate, not proof that the staged runtime fails and not a replacement for the existing tenancy, domain-model, migration-boundary, provenance, review/audit, or production-debug-telemetry gates. The source-integration PR remains `CLEAN` for merge but is not approved.

Required follow-up is owner-gated and bounded: correct or re-export the committed patch and package-manager configuration, reproduce installation from the canonical snapshot with scripts disabled, then run and record the exact approved validation commands and outcomes. Do not merge, deploy, apply migrations, alter production data, use credentials, or claim unrun validation passed. A draft governance notification template was prepared inside Manus only; no external communication was sent or authorized.

## Automatic PR-notification dispatch — 2026-08-24T07:06:50Z

Darrin explicitly authorized unattended dispatch of deduplicated governance notifications for every new or materially changed governance-drift or unverified-review finding through `2026-09-22T13:15:31Z`. The configured destination is the **affected GitHub pull request only**; notices must not be posted to linked issues or sent through email, Slack, or other channels.

The active recurring Overseer schedule remains daily at 09:00 local scheduler time, with the Monday portfolio summary behavior retained. The schedule is GitHub-only, active, full-auto, and reports `Australia/Brisbane` as its scheduler timezone; this is equivalent to Australia/Sydney during the bounded review window. A notification must identify the exact finding evidence and revision, risk classification, owner decision required, permitted and prohibited actions, reassessment verification, relevant links, and a structured owner-response field. Unchanged findings are deduplicated. The dispatch authorization does not authorize code execution, tests, builds, migrations, deployments, merges, closes, rebases, approvals, or production changes; Darrin remains final authority for those actions.

## Autonomous material-change notices — 2026-08-24T08:11:47Z

The active queue changed materially. Franchise PR #6 advanced to `992caf85afcc5f321247b16c36e038c55295066e`; the previously blocked dependency-install validation was reported as repaired, with frozen install, tests, type-check, and build passing. Residual gates remain: canonical tenancy/domain reconciliation, authorized nonzero user-role franchisee records, migration-boundary clarification, and production debug-telemetry exclusion. The authorized notice was posted to [PR #6](https://github.com/darrinbaldwindev/Franchise/pull/6#issuecomment-5392429159). This is not merge or release approval.

New [Franchise PR #13](https://github.com/darrinbaldwindev/Franchise/pull/13) is open at `55f359090ba24251920ebf126b5b150bf1655379`, changes only `docs/continuity/SHARED.md`, and has no reported checks or formal reviews. It requires owner review for reconciliation against the current canonical source-of-truth and domain gates. The authorized notice was posted to [PR #13](https://github.com/darrinbaldwindev/Franchise/pull/13#issuecomment-5392429923).

## Continuity-status discrepancy — 2026-08-24T09:06:04Z

A continuity/source-of-truth discrepancy was confirmed on [Franchise PR #13](https://github.com/darrinbaldwindev/Franchise/pull/13). Its current head `55f359090ba24251920ebf126b5b150bf1655379` records PR #6 at `75406d2` and describes dependency-install validation as blocked. Later PR #6 evidence records head `992caf85afcc5f321247b16c36e038c55295066e` and reports that frozen installation, tests, type-check, and build completed after the dependency-control repair. This Overseer review verified the chronology and evidence record but did not execute the application or independently reproduce validation.

The discrepancy is **MEDIUM** risk because it can misstate current validation status. It does not resolve the remaining PR #6 gates: canonical tenancy/domain reconciliation under Issue #12, authorised nonzero user-role franchisee records, source-controlled versus applied migration boundary, and production debug-telemetry exclusion. The authorised affected-PR-only notification was posted to [PR #13](https://github.com/darrinbaldwindev/Franchise/pull/13#issuecomment-5393010487). The required owner decision is whether to update PR #13, supersede or close it, or preserve the historical entry with an explicit current-state addendum. No continuity source file, application code, configuration, issue, deployment, migration, or production data was changed by this record.

## Daily open-pull-request review — duplicate-notice disposition (2026-08-25)

**Scope and evidence:** A refreshed review of [Franchise PR #6](https://github.com/darrinbaldwindev/Franchise/pull/6) found it still open, non-draft, and `CLEAN` at unchanged base `b85dce737fe8130186ef551d28a0bd4533ddfc72` and unchanged head `992caf85afcc5f321247b16c36e038c55295066e`. The changed-file scope and linked Issue #12 gate were unchanged. At `2026-08-25T00:22:03Z`, a new `COMMENTED` review record was added on the same head. Its content restates the already-recorded findings that the user-ID-centric `franchiseTenantIsolation.test.ts` is not evidence of canonical franchise membership isolation and that `client/public/__manus__/debug-collector.js` remains a tracked public executable telemetry asset.

**Finding:** The new review record does not provide a changed source revision, severity, merge state, remediation, validation result, canonical record, or owner decision. It is therefore **duplicate governance communication**, not a new PR #6 finding. The actual residual gates remain: source-integration-only scope; Issue #12 franchise/membership tenancy and server-side authorization; provenance terminology; guarded atomic review/audit transition; source-history-versus-applied-migration distinction and target-specific rehearsal; production debug-telemetry exclusion; and authorized nonzero franchisee-record evidence.

**Risk classification:** Low to medium — notification-deduplication/process risk. Repeated unchanged notices can obscure the actionable owner decision and conflict with the standing PR-only notification instruction, although this observation does not change PR #6’s architecture or production-risk classification.

**Disposition:** No additional PR comment, issue post, email, Slack message, merge, close, rebase, approval, request for changes, source modification, schedule modification, test, build, migration, deployment, credential use, or production action was taken. Future runs must treat the `2026-08-25T00:22:03Z` review record as already covered unless a substantive evidence change occurs.

**Owner decision:** No immediate product or merge decision changes. If Darrin elects to revise the recurring-run behavior later, the deduplication baseline must include the current PR head plus the normalized unresolved-gate set and latest notice link; any schedule, connector, or delivery change remains separately owner-authorized. Until then, retain the existing schedule and PR #6 hold.

**Audit boundary:** Static GitHub metadata and review-comment comparison only. No project code, tests, builds, migrations, deployments, provider calls, credentials, production data, or repository settings were accessed or changed.

## Owner decision — Franchise PR #6 bounded remediation proposal (2026-08-25)

**Decision:** Maintain the current hold on [Franchise PR #6](https://github.com/darrinbaldwindev/Franchise/pull/6) and authorize **preparation only** of a bounded remediation proposal for its residual gates.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** PR #6 is open, non-draft, and `CLEAN` at `992caf85afcc5f321247b16c36e038c55295066e`; [Issue #12](https://github.com/darrinbaldwindev/Franchise/issues/12) remains open. The review record identifies residual franchise/membership tenancy and server-side authorization, provenance terminology, guarded atomic review/audit transition, target-specific migration planning, and production debug-telemetry exclusion gates. Reported validation results remain prior review evidence and were not rerun for this decision.

**Approved scope:** Prepare an owner-reviewable remediation brief that sequences the residual gates, names constrained changed surfaces, and defines acceptance evidence. The brief may distinguish source-controlled migration history from applied migrations and may propose test criteria; it does not itself authorize tests or source changes.

**Excluded scope:** No application, schema, migration, configuration, CI/CD, continuity-record, business-rule, production-data, credential, connector, schedule, branch, pull-request, merge, close, rebase, approval, deployment, release, provider, or production action is authorized. No migration may be generated or applied, and no validation command may be executed, under this decision.

**Verification before reassessment:** The proposed brief must preserve the source-integration boundary, require the explicit membership/tenant authorization model before downstream commerce/financial work, state that reviewer-state and audit-event persistence must be a guarded atomic transition, keep target-environment migration work separately owner-gated, and make debug telemetry absent or provably development-only. Darrin must separately approve any implementation scope or validation execution.

**Expiry or review date:** Pending the next explicit owner decision; the standing PR-comment authorization remains time-bounded to `2026-09-22T13:15:31Z` and does not broaden this decision.

**Status:** AUTHORIZED — planning/remediation-brief preparation only; PR #6 hold remains in force.

## Owner decision — full-gate staged remediation brief (2026-08-25)

**Decision:** Prepare one **staged, full-gate remediation brief** for PR #6, covering franchise membership/server authorization, production debug-telemetry exclusion, provenance vocabulary, guarded review/audit transition, and a separately owner-gated target-specific migration preflight.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** The brief is based on PR #6 head `992caf85afcc5f321247b16c36e038c55295066e`, open Issue #12, and the standing static-review findings. It is retained in this task as `franchise_pr6_staged_remediation_brief_2026-08-25.md`.

**Approved scope:** Planning artifact only. It may sequence work, identify candidate surfaces for later inspection, state acceptance evidence, and identify stop conditions and owner decisions. It does not identify any application file as approved for modification.

**Excluded scope:** No code, test, build, migration, schema, configuration, CI/CD, continuity, data, credential, connector, schedule, branch, pull-request, merge, close, rebase, approval, deployment, release, provider, or production action is authorized. The PR #6 hold remains in force.

**Verification before reassessment:** Before any implementation decision, Darrin must select a specific staged tranche with its exact permitted scope, excluded scope, acceptance evidence, and review condition. Target-database access or migration remains a separate later decision.

**Status:** AUTHORIZED — full-gate planning brief complete; awaiting a separate bounded implementation-authorization decision.

## Owner decision — Stage 0 design-lock traceability (2026-08-25)

**Decision:** Authorize Stage 0 read-only design-lock work for PR #6 only.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** PR #6 remains at `992caf85afcc5f321247b16c36e038c55295066e`. Static mapping found the user-ID-centric tenant test and associated router/persistence/schema surfaces; a public debug collector plus Vite injection/middleware path; provenance wording across persistence, coaching, metrics, and UI surfaces; separate current-review update and review-event insert operations; and source-controlled Drizzle migration metadata/commands including `0003_fuzzy_killraven.sql` with `NOT NULL` additions.

**Outcome:** A Stage 0 traceability record was prepared inside Manus as `franchise_pr6_stage0_traceability_record_2026-08-25.md`. It maps each residual gate to candidate surfaces, dependencies, stop conditions, later acceptance evidence, and the distinction between source history and target-environment migration work.

**Approved scope:** Static inspection and planning record only.

**Excluded scope:** No application, schema, configuration, test/build, migration, target environment, data, credential, connector, schedule, branch, pull-request, merge, close, rebase, approval, deployment, release, provider, or production action is authorized. No source file is approved for modification by this entry.

**Next owner decision:** Select a single later implementation authorization. The Stage 0 recommendation is a narrow telemetry-exclusion implementation proposal (not implementation) because its source/build path is bounded; tenancy remains the larger Issue #12 architectural prerequisite.

**Status:** COMPLETED — Stage 0 planning only; PR #6 hold remains in force.

## Owner decision — telemetry-remediation specification preparation (2026-08-25)

**Decision:** Authorize preparation only of a change specification for the PR #6 debug-telemetry gate.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** PR #6 remains at `992caf85afcc5f321247b16c36e038c55295066e`. Static inspection confirms that `client/public/__manus__/debug-collector.js` captures console, network, error, and UI-event data and posts to `/__manus__/logs`. `vite.config.ts` unconditionally registers the collector plugin; its transform omits injection for `NODE_ENV=production`, but the configured public directory/build output relationship means transform behavior alone is not proof that the asset is absent from production artifacts.

**Outcome:** A planning-only specification was prepared inside Manus as `franchise_pr6_telemetry_remediation_change_spec_2026-08-25.md`. It defines complete-removal and provably-development-only alternatives, their candidate source/build surfaces, and evidence required before reassessment.

**Approved scope:** Planning specification only.

**Excluded scope:** No application/configuration change, command execution, build/test, telemetry use, target-environment access, data/credential use, connector/schedule change, branch/pull-request change, merge, deployment, release, provider, or production action is authorized.

**Next owner decision:** Select a telemetry disposition: A — complete removal (recommended), B — provably development-only redesign, or C — defer. Any selection still requires a separate bounded implementation authorization.

**Status:** COMPLETED — specification prepared; approach selection pending; PR #6 hold remains in force.

## Owner decision — debug-collector complete removal (2026-08-25)

**Decision:** Select **complete removal** of the PR #6 debug collector and its collector-specific Vite injection/ingest plumbing as the telemetry disposition.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** PR #6 remains at `992caf85afcc5f321247b16c36e038c55295066e`. The collector asset, Vite plugin registration, HTML injection, and `/__manus__/logs` dev-server middleware were statically identified. The current production HTML transform condition is not treated as proof of production asset exclusion.

**Approved scope:** The telemetry approach is selected. A precise source-only implementation authorization was prepared inside Manus as `franchise_pr6_telemetry_removal_implementation_authorization_2026-08-25.md`.

**Excluded scope:** Selection does not authorize code/configuration modification, command execution, build/test, target-environment access, data/credential use, telemetry replacement, connector/schedule change, branch/pull-request modification, merge, deployment, release, provider, or production action.

**Verification before reassessment:** If implementation is later authorized, it must remain limited to collector deletion and collector-specific Vite plumbing removal, provide the specified static diff/reference evidence, and return for a separate build-artifact/runtimes decision. This does not resolve the tenancy, provenance, review/audit, or migration gates.

**Next owner decision:** Authorize or defer one narrow source-only implementation package. The PR #6 hold remains in force either way.

**Status:** AUTHORIZED — telemetry disposition selected; implementation pending separate Darrin authorization.

## Owner decision — bounded telemetry-removal implementation authorization (2026-08-25)

**Decision:** Authorize one separate implementation-capable project agent to create a dedicated remediation pull request that removes the PR #6 debug collector and only collector-specific Vite injection/ingest plumbing.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** Parent baseline is PR #6 branch `agent/manus/source-integration` at `992caf85afcc5f321247b16c36e038c55295066e`, with base `main` at `b85dce737fe8130186ef551d28a0bd4533ddfc72`. The exact source-only contract and static acceptance checklist are retained in this task as `franchise_pr6_telemetry_removal_implementation_authorization_2026-08-25.md` and `franchise_pr6_telemetry_removal_implementation_handoff_2026-08-25.md`.

**Approved scope:** A separate remediation branch/PR based on the parent source-integration head, limited to: deletion of `apps/franchise-hub/client/public/__manus__/debug-collector.js`; removal in `apps/franchise-hub/vite.config.ts` of the collector plugin definition/registration, collector script injection, `/__manus__/logs` ingest middleware, and demonstrably collector-only helpers/imports; and removal of collector-specific dead direct references. The remediation PR must state its parent baseline, exact changed paths, and limitations.

**Excluded scope:** The implementation agent may not run application, test, build, type-check, formatter, migration, server, database, deployment, or provider commands; may not access environments, data, credentials, or secrets; may not add replacement telemetry; and may not change tenancy, provenance, review/audit, migration, financial, inventory, order, delivery, coaching, package, CI/CD, deployment, continuity, scheduling, connector, or Overseer-log surfaces. No merge, close, rebase, approval, issue modification, deployment, release, or production action is authorized.

**Verification before reassessment:** The separate PR must provide its parent-base/head revisions, changed-file inventory, static reference evidence for removal of `vitePluginManusDebugCollector`, `__manus__/debug-collector.js`, and `/__manus__/logs`, proof of no replacement telemetry, and proof of isolation from all excluded surfaces. Build-artifact inspection and runtime verification remain separately owner-gated.

**Overseer boundary:** This read-only Overseer will not implement the change. It will perform a fresh independent static review only after the remediation PR URL and head revision are available.

**Status:** AUTHORIZED — bounded separate remediation PR creation by an implementation-capable agent only; PR #6 hold remains in force.

## Owner decision — canonical franchise tenancy and authorization model (2026-08-25)

**Decision:** Select the canonical access model: explicit `franchise_memberships` plus an immutable server-derived `AuthorizedFranchiseContext`. Multi-franchise access is allowed only when explicitly authorized and validated by the server.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** PR #6 remains at `992caf85afcc5f321247b16c36e038c55295066e`; Issue #12 remains open. `docs/DOMAIN_MODEL.md` requires every franchise-owned transactional path to establish franchise scope and prohibits treating `user_id` as the franchise tenant key. `docs/TENANCY_AUTHORIZATION.md` requires authenticated user → active membership resolution → authorized request context → tenant-scoped query/write, rejects client-supplied franchise IDs as proof, and requires cross-tenant coverage.

**Approved scope:** Design direction only. The logical request context includes authenticated user, franchise, membership, role, membership validity, and context-selection source. Single-membership users may resolve deterministically; a multi-membership user must select an allowed context that the server validates rather than receiving an arbitrary or first-returned membership.

**Excluded scope:** No schema, application, configuration, test/build, migration, environment/data/credential, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. No legacy backfill, membership record, transaction, or historical data may be fabricated. The telemetry-removal authorization remains separate.

**Verification before reassessment:** Any later implementation must prove unaffiliated denial, A/B read and mutation isolation, inactive/expired membership denial, server-side role enforcement, validation of multi-franchise context selection, repository/helper non-bypass, and auditable `franchise_id` ownership. Target migration and live data handling remain separately owner-gated.

**Next owner decision:** Select the initial membership-role policy and privilege boundary before authorizing a tenancy implementation package.

**Status:** AUTHORIZED — canonical tenancy design selected; implementation pending separate Darrin authorization.

## Owner decision — initial tenant-scoped membership-role policy (2026-08-25)

**Decision:** Select the initial tenant-scoped roles: `franchise_owner`, `franchise_operator`, and `franchise_reviewer`. Keep `platform_admin` separate and do not allow a platform-level role alone to access franchise-owned data without an explicit valid franchise membership and authorized context.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** The imported dashboard currently uses global `user`/`admin` role checks, including administrator review procedures. The selected tenancy model and `docs/TENANCY_AUTHORIZATION.md` require membership role, status, and effective dates to be resolved server-side and prohibit global role assumptions from substituting for tenant scope.

**Approved scope:** Policy direction only. `franchise_owner` is the tenant governance role; `franchise_operator` is for routine permitted dashboard/operational use; `franchise_reviewer` is for the later controlled review workflow. Every role applies only inside an authorized franchise context. No role grants a future commerce, financial, migration, deployment, or release authority by default.

**Excluded scope:** No schema, application, configuration, test/build, migration, environment/data/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. Existing global `admin` behavior is not reclassified or extended by this policy selection.

**Verification before reassessment:** Any later implementation must prove missing/inactive/expired membership denial, role denial for disallowed actions, cross-franchise isolation, repository/helper non-bypass, and no global-admin-to-tenant escalation. Future owner/reviewer privilege overlap and membership lifecycle are separate policy decisions.

**Next owner decision:** Select the active franchise-context selection mechanism for users with multiple active memberships.

**Status:** AUTHORIZED — membership-role policy selected; implementation pending separate Darrin authorization.

## Owner decision — active franchise-context selection (2026-08-25)

**Decision:** Select a server-held, session-bound active franchise context. A user with multiple active memberships must explicitly invoke a context-selection action; the server validates membership, role, status, and effective dates before binding the selected franchise/membership to the authorized request/session context.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** `docs/TENANCY_AUTHORIZATION.md` requires explicit context for multi-franchise users, prohibits silently choosing the first membership, and states that a client-supplied franchise ID is only a requested scope, never authorization proof. The selected tenancy and membership-role policy requires business procedures to consume a server-derived context rather than raw client tenant input.

**Approved scope:** Policy direction only. A single valid membership may establish context deterministically after server validation. Multiple valid memberships require explicit selection; a context switch must be server-validated and business queries/writes must read the bound context rather than accept arbitrary `franchise_id` fields.

**Excluded scope:** No session-store, cookie, API, schema, application, configuration, test/build, migration, environment/data/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. This entry does not select a session technology or duration.

**Verification before reassessment:** Any later implementation must show no implicit multi-membership default, denial of unauthorized/inactive/expired context selection, prevention of context-switch parameter tampering, no platform-admin bypass, server-derived context propagation to repository paths, and A/B tenant isolation.

**Next owner decision:** Select the membership lifecycle and revocation rule, including the effect of membership status/effective-date changes on an existing active context.

**Status:** AUTHORIZED — active-context policy selected; implementation pending separate Darrin authorization.

## Owner decision — membership lifecycle and active-context invalidation (2026-08-25)

**Decision:** Membership suspension, revocation, expiry, or a relevant role reduction invalidates an active franchise context on the next tenant-owned server request. Membership validity may be checked directly or through an equivalent server-managed membership version/revocation mechanism; client-cached role or session state cannot override current membership state.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** `docs/TENANCY_AUTHORIZATION.md` requires membership status, role, and effective dates to be verified server-side and requires inactive/expired membership denial. The selected server-held active-context policy makes membership validity the continuing authorization boundary rather than a one-time sign-in fact.

**Approved scope:** Policy direction only. `pending` membership cannot establish context; `active` membership within its effective dates may do so; `suspended`, `revoked`, or `expired` membership is denied on the next tenant-owned request; and a role reduction re-evaluates/denies actions outside the new role. Historical business and audit records remain intact.

**Excluded scope:** No schema, session, application, configuration, test/build, migration, environment/data/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. This decision does not select session technology, storage, or timing implementation.

**Verification before reassessment:** Any later implementation must prove immediate next-request denial for suspension/revocation/expiry/role reduction, no context-switch resurrection, no client-side bypass, no platform-admin bypass, repository/helper stale-context prevention, and historical record integrity.

**Next owner decision:** Select the effective-date convention for membership validity, including time basis and end-boundary semantics.

**Status:** AUTHORIZED — membership invalidation policy selected; implementation pending separate Darrin authorization.

## Owner decision — membership effective-date convention (2026-08-25)

**Decision:** Enforce membership validity with authoritative server UTC timestamps. `effective_from` is inclusive (`now_utc >= effective_from`); `effective_to` is exclusive (`now_utc < effective_to`); and `NULL effective_to` means open-ended. Display locale may not alter authorization.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** The canonical membership model contains effective dates and requires server-side membership validation. The selected immediate invalidation policy requires an unambiguous security boundary for expiry, while a timezone- or end-of-day-undefined convention could leave authorization inconsistent at date boundaries.

**Approved scope:** Policy direction only. Server-controlled UTC time determines membership validity. A revoked/suspended status denies access regardless of otherwise valid timestamps. Historical membership/business/audit evidence remains intact and no membership dates may be created or altered under this decision.

**Excluded scope:** No schema, session, application, configuration, test/build, migration, environment/data/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. This does not select display-timezone or invitation workflow behavior.

**Verification before reassessment:** Any later implementation must prove denial before `effective_from` and at/after `effective_to`, open-ended null end behavior, identical authorization across client timezones, server-time rather than client-time enforcement, and suspension/revocation override.

**Next owner decision:** Select membership invitation and approval lifecycle, including who may initiate or approve an active membership.

**Status:** AUTHORIZED — UTC effective-date policy selected; implementation pending separate Darrin authorization.

## Owner decision — membership invitation and approval lifecycle (2026-08-25)

**Decision:** A validated `franchise_owner` may initiate `franchise_operator` or `franchise_reviewer` invitations for the owner’s own authorized franchise. Each invitation remains `pending` with no franchise context/data access until authenticated acceptance and server validation. Darrin or a separately designated platform-governance path controls `franchise_owner` creation or role elevation.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** The selected role policy separates tenant-scoped owner/operator/reviewer roles from platform administration; the selected lifecycle policy requires pending membership to be non-authorizing and current membership validity to be enforced server-side. The canonical tenancy boundary requires explicit membership and prohibits client/global-role substitution for tenant authorization.

**Approved scope:** Policy direction only. Same-franchise owner delegation is limited to operator/reviewer initiation; owner-role creation/elevation requires platform governance. A pending invite cannot establish context. Any later acceptance must bind to an authenticated identity and revalidate role, franchise, status, and UTC effective dates before a server-side active transition.

**Excluded scope:** No invite service, email/SMS/notification, token, API, schema, session, application, configuration, test/build, data creation, migration, environment/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. Suspension/revocation actor and owner succession remain separate decisions.

**Verification before reassessment:** Any later implementation must prove pending no-access, same-franchise-only delegation, no owner self-elevation, wrong-identity acceptance denial, withdrawn/expired/revoked invitation denial, server-attributed lifecycle transitions, and no cross-tenant membership disclosure.

**Next owner decision:** Select the authority for suspension and revocation of operator, reviewer, and owner memberships.

**Status:** AUTHORIZED — membership invitation/approval policy selected; implementation pending separate Darrin authorization.

## Owner decision — membership suspension and revocation authority (2026-08-25)

**Decision:** A validated `franchise_owner` may suspend or revoke only `franchise_operator` or `franchise_reviewer` memberships for the owner’s own authorized franchise. Darrin or a separately designated platform-governance authority controls suspension or revocation of every `franchise_owner` membership.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** The selected invitation policy protects owner-role creation/elevation with platform governance; the selected invalidation policy denies suspended/revoked membership on the next tenant-owned server request. The canonical tenancy boundary requires membership-based server authorization and data isolation.

**Approved scope:** Policy direction only. Same-franchise owner action is limited to operator/reviewer membership status changes. Owner membership actions are platform governed. A completed status change invokes the selected immediate next-request context invalidation. Historical business/review/audit records remain intact and retain prior attribution.

**Excluded scope:** No lifecycle API, schema, application, configuration, test/build, data mutation, migration, environment/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. No owner succession, restoration, appeal, notice, or reason-taxonomy mechanism is selected by this entry.

**Verification before reassessment:** Any later implementation must prove same-franchise-only operator/reviewer control, owner/co-owner/self action denial, cross-tenant denial, next-request target denial, no context-switch resurrection, server-attributed audit evidence, historical record integrity, and no platform-admin tenant-data bypass.

**Next owner decision:** Select owner succession and the minimum-owner continuity rule for a franchise.

**Status:** AUTHORIZED — suspension/revocation authority selected; implementation pending separate Darrin authorization.

## Owner decision — owner succession and minimum-owner continuity (2026-08-25)

**Decision:** Every active franchise must retain at least one active, effective `franchise_owner`. A platform-governance authority activates an approved successor owner before the final existing owner may be demoted, suspended, or revoked. No `franchise_operator` or `franchise_reviewer` is promoted automatically. A zero-owner result requires a separately governed franchise closure/inactivation exception.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** The selected owner-role policy reserves owner creation/elevation and owner status changes to platform governance. The selected UTC effective-date and immediate invalidation policies establish when an owner is active and how status changes take effect. No current canonical record defines an automatic successor or zero-owner exception.

**Approved scope:** Policy direction only. For an active franchise, routine lifecycle action must preserve at least one active/effective owner. A successor-first transition requires platform approval, valid active membership, and UTC effective-date validation before the predecessor’s final-owner status can change. A separately governed closure/inactivation exception is not ordinary access management.

**Excluded scope:** No membership/API/schema/session/application/configuration/test/build/migration/data/environment/credential/telemetry/connector/schedule/branch/pull-request/merge/deployment/release/provider/production action is authorized. This entry does not define legal ownership transfer, notification, platform staffing, or recovery workflow.

**Verification before reassessment:** Any later implementation must prove final-owner change denial, successor-first success only after platform authorization and active/effective validation, no automatic operator/reviewer promotion, no cross-tenant/global-role bypass, separately gated closure exception, complete lifecycle audit attribution, and selected next-request invalidation behavior.

**Next owner decision:** Select which tenant-scoped membership role may perform review/audit state transitions and how the transition must be recorded.

**Status:** AUTHORIZED — minimum-owner continuity policy selected; implementation pending separate Darrin authorization.

## Owner decision — tenant-scoped review authority and atomic audit transition (2026-08-25)

**Decision:** Only an active/effective `franchise_reviewer` in the record’s authorized franchise may decide a review. Self-review is prohibited. The initial transition set is `awaiting-review → approved` and `awaiting-review → needs-correction`; the latter requires a reason/note. Every transition must constrain expected prior state and authorized franchise scope in one atomic operation that writes the immutable review event.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** At PR #6 head `992caf85afcc5f321247b16c36e038c55295066e`, the review queue/decision currently uses global `adminProcedure` and global `users.role`; `reviewMonthlyRecord` reads a record, updates by ID, then separately inserts an audit event. The selected tenancy/role policy requires membership-derived server authorization and prohibits global role substitution.

**Approved scope:** Policy direction only. A later review operation must validate reviewer membership/context, record franchise scope, prohibit self-review, constrain the record to `awaiting-review`, and write state/event together. If expected state/scope no longer matches, it must return no transition and create no review event. Review action decides review state only and does not alter attested business inputs.

**Excluded scope:** No review API, schema, application, configuration, test/build, migration, data mutation, environment/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized. Resubmission, assignment, owner audit-read, appeal, notification, and retention remain separate decisions.

**Verification before reassessment:** Any later implementation must prove same-franchise reviewer authority; global-admin-only, operator, owner, self-review, and cross-tenant denial; expected-state stale-transition conflict without event; atomic update/event behavior; correction-reason requirement; unchanged submitted inputs; and reviewer lifecycle invalidation.

**Next owner decision:** Select the resubmission behavior after a `needs-correction` review decision.

**Status:** AUTHORIZED — reviewer-only atomic review/audit policy selected; implementation pending separate Darrin authorization.

## Owner decision — correction resubmission and fresh review cycle (2026-08-25)

**Decision:** A corrected re-attestation from `needs-correction` creates a new immutable input revision, retains every preceding review/correction event, and atomically resets the current record to `awaiting-review` while appending a distinct immutable `resubmitted` event. Only current reviewer-derived fields may be cleared on reset. Changed inputs do not auto-approve. An approved record cannot be reopened by this path; reopening/revocation remains a separate owner decision.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** At PR #6 head `992caf85afcc5f321247b16c36e038c55295066e`, the static save path upserts a user/month record, sets current review state to `awaiting-review`, and writes a `created` or `updated` monthly-record revision. Current review events represent only `approved` or `needs-correction`; the existing review update and event insertion are separate operations. Static source inspection is not run-time verification.

**Approved scope:** Policy direction only. A later resubmission operation must use the selected membership-derived active franchise context and record franchise scope; allow only `needs-correction → awaiting-review` after a corrected re-attestation; preserve prior review/correction evidence; append the corrected input revision and `resubmitted` event; reset current reviewer-derived fields only; and perform reset/event atomically. A stale, cross-tenant, unauthorized, or non-correction-path request must create neither transition nor event.

**Excluded scope:** No approved-record reopening/revocation, reviewer assignment, appeal, notification, retention, API, schema, application, configuration, test/build, migration, data mutation, environment/credential, telemetry, connector/schedule, branch/pull-request, merge, deployment, release, provider, or production action is authorized.

**Verification before reassessment:** Any later implementation must prove same-franchise membership/context enforcement; correction-path-only transition; no submitter self-approval or automatic approval; immutable preceding review/correction preservation; atomic reset/event behavior; stale and cross-tenant denial without event; current-review-field semantics; and denial of approved-record reopening through resubmission.

**Next owner decision:** Select the canonical provenance terminology and state vocabulary for attested, corrected, reviewed, approved, and related records.

**Status:** AUTHORIZED — correction resubmission policy selected; implementation pending separate Darrin authorization.

## Material PR #6 update — telemetry remediation scope divergence (2026-08-25T02:43Z)

**Scope:** Read-only static comparison of open, non-draft [PR #6](https://github.com/darrinbaldwindev/Franchise/pull/6) head `67ee3ce8205d2a9c6aa2e25123802dd384dec908` (`fix: deny telemetry routes before static assets`) against prior reviewed head `992caf85afcc5f321247b16c36e038c55295066e`. GitHub metadata at review reported base `b85dce737fe8130186ef551d28a0bd4533ddfc72`, updated `2026-08-25T02:39:15Z`, and merge state `DIRTY`. No project code, test/build, migration, deployment, managed workspace, credential, production endpoint, or data action was performed by Overseer.

**Verified static facts:** Commits `9f5e417f762dfbbc7a88d55619dd6ac0ef9be4ff` and `67ee3ce8205d2a9c6aa2e25123802dd384dec908` rename the former public collector into `apps/franchise-hub/client/devtools/debug-collector.js`; add `apps/franchise-hub/shared/debugCollectorBoundary.ts` and `apps/franchise-hub/server/debugCollectorBoundary.test.ts`; retain/extend the collector Vite plugin, development HTML injection, script-serving middleware, and `/__manus__/logs` ingest handler; add production route-denial logic in `server/_core/vite.ts`; and modify `docs/SOURCE_INTEGRATION.md` plus `docs/continuity/MANUS.md`. The collector was not deleted, and collector-specific Vite injection/ingest plumbing remains. PR comments assert production exclusion, validation, and managed/deployed behavior; these are contributor claims, not independently reproduced evidence in this read-only review.

**Governance comparison:** Darrin’s active decision is complete removal, not a development-only redesign. The separately delegated implementation authorization is limited to a **dedicated source-only remediation PR** that deletes the collector and its collector-specific Vite injection/ingest plumbing. It does not authorize changing PR #6 itself, retaining a development collector, adding route helpers/tests, modifying continuity records, running validation, or treating reported managed validation as independent evidence.

**Risk classification:** **MEDIUM — material authorization/scope divergence and residual telemetry governance risk.** The source change may represent a development-only redesign, but that alternative was explicitly not selected. The report that production assets/routes are excluded does not independently close the selected complete-removal acceptance gate.

**Required owner decision:** Confirm whether to maintain complete removal via a dedicated deletion-only remediation PR, or explicitly supersede it with a bounded development-only redesign authorization. PR #6 remains held. Tenant-membership, provenance, review/audit, target-specific migration-preflight, and authorized nonzero-franchisee-evidence gates remain unresolved.

**Permitted actions:** Preserve the evidence; prepare a separately authorized deletion-only remediation PR if the complete-removal policy remains active; or obtain an explicit superseding owner decision. Reconcile documentation claims with the final authorized scope.

**Prohibited actions:** Do not merge, approve, close, rebase, deploy, release, apply migrations, alter production data, use credentials, or represent the contributor claims as independently verified. Do not treat telemetry as closed solely because a production-exclusion design is reported.

**Verification before reassessment:** For complete removal, provide a dedicated remediation PR URL/head and static proof that collector source, Vite injection, script serving, telemetry ingest route, route helper/test plumbing, and collector-specific documentation are absent; prove the changed-file scope is limited to removal. A development-only alternative requires a distinct owner authorization and separately defined evidence.

**External notification:** New-material, PR-only notice posted under the active authorized dispatch window: [issuecomment-5404391802](https://github.com/darrinbaldwindev/Franchise/pull/6#issuecomment-5404391802). The notice does not approve a merge, deployment, release, or production action.

**Status:** OPEN — awaiting Darrin’s explicit scope decision; no implementation action authorized by this record.

## Owner reaffirmation — complete removal remains required for telemetry (2026-08-25)

**Decision:** Darrin selected option A after the PR #6 telemetry-scope divergence notice. The active telemetry policy remains **complete removal**, not a development-only redesign. The current PR #6 development-only collector changes do not satisfy the telemetry gate and do not supersede the prior authorization. Any telemetry remediation remains limited to the already authorized **separate, dedicated source-only deletion PR**.

**Authority:** Darrin, explicit selection of option A in this task.

**Evidence:** PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908` retains the collector source as `client/devtools/debug-collector.js` and retains collector-specific Vite injection, script-serving, telemetry ingest, route helper/test, and documentation changes. The verified static scope divergence and affected-PR notice are recorded above at [issuecomment-5404391802](https://github.com/darrinbaldwindev/Franchise/pull/6#issuecomment-5404391802).

**Approved scope:** Policy direction and the existing narrow delegated handoff only: a separate remediation pull request may delete the collector and all collector-specific Vite injection/ingest plumbing, subject to its existing source-only authorization and static Overseer reassessment. This record does not direct an immediate rollback or change to PR #6.

**Excluded scope:** No acceptance of the current development-only redesign; no modification, rollback, code change, test/build, migration, data mutation, managed-workspace validation, credential use, PR approval, merge, close, rebase, deployment, release, provider, or production action is authorized by this reaffirmation.

**Verification before reassessment:** Provide the separate remediation PR URL/head and static proof that the collector source, Vite injection, script serving, telemetry ingest route, route helper/test plumbing, and collector-specific documentation are deleted. The change must remain source-only and within the original deletion-only scope. PR #6 remains held while tenant-membership, provenance, review/audit, migration-preflight, and authorized nonzero-franchisee-evidence gates remain open.

**Next owner decision:** Select canonical provenance terminology for attested inputs, server-calculated metrics, review states, and any future verified/imported state.

**Status:** AUTHORIZED — complete-removal telemetry policy reaffirmed; implementation pending only the previously bounded separate remediation process.

## Owner decision — canonical provenance terminology and evidence states (2026-08-25)

**Decision:** Use distinct evidence terms. `franchisee-attested` means an authorized franchise member affirmed a specified input revision; `server-calculated` means deterministic output from a specified input revision and known configuration; `awaiting-review`, `needs-correction`, and `review-approved` are review-process states/outcomes; `independently-verified` is reserved for a future separately governed reconciliation or authoritative-evidence process. `imported from <named source>` is a source descriptor only and never implies verification.

**Authority:** Darrin, explicit selection of option A in this task. Darrin also instructed Overseer to proceed autonomously with the recommended option A for subsequent Franchise PR #6 policy decisions, subject to existing read-only and owner-gated operational boundaries.

**Evidence:** At current PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`, static inspection shows persisted `franchisee-attested` origin, attestation timestamp, and `awaiting-review` state, while multiple saved-input, coaching, metrics, and UI paths still use “verified.” The same PR’s `PRODUCTION_READINESS.md` says the dashboard does not independently verify franchisee-entered inputs and reserves “Verified” for a future source integration, reconciliation, or authorised review workflow. Current canonical `main` at `25d4f754560f611f2104670040ddaf3656e72f48` requires membership-derived franchise scope and describes reporting records as non-canonical snapshots. Static source inspection is not run-time verification.

**Approved scope:** Policy direction only. Future terminology must attach each label to a specific input revision; avoid emitting `verified` for merely attested, merely calculated, or merely review-approved records; preserve imported-source identity without asserting source trust/reconciliation; and respect the selected tenant-context and reviewer-only policies.

**Excluded scope:** No copy/API/schema/application/configuration/test/build/migration/data/source-import/reconciliation/external-provider/credential/merge/deployment/release/production action is authorized. A future independently-verified state needs its own owner-approved evidence, authority, retention, and reconciliation design.

**Verification before reassessment:** Any later implementation must prove revision-specific labels; no `verified` designation for attestation/calculation/review alone; named imported origin without verification implication; tenant-scoped review vocabulary; and no legal, accounting, forecasting, or production-readiness claim created by the labels.

**Next policy process:** Apply the delegated recommended A option to the next eligible Franchise PR #6 policy decision, provided it remains policy-only and inside the stated delegated boundary.

**Status:** AUTHORIZED — provenance vocabulary policy selected; implementation pending separate Darrin authorization.

## Delegated policy decision — review approval finality and exceptional reopening (2026-08-25)

**Decision:** Applying Darrin’s delegated recommended option A, `review-approved` is final for the exact attested input revision in the ordinary workflow. A routine reviewer cannot reopen, revoke, overwrite, or issue a second final decision for that approved revision. The ordinary correction/resubmission path remains limited to `needs-correction → awaiting-review` after a corrected re-attestation. Any approved-record reopening, revocation, or appeal requires a separate Darrin authorization naming the reason, authority, affected revision, target state, event/audit semantics, and reassessment evidence; it is not an automatic reviewer capability.

**Authority:** Darrin’s explicit delegation in this task to continue autonomously using the recommended option A for subsequent Franchise PR #6 policy decisions, bounded to policy/planning and existing owner-gated operational limits.

**Evidence:** At PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`, static schema has only `awaiting-review`, `approved`, and `needs-correction`; review events record only `approved`/`needs-correction`; the ordinary save path resets current review fields to `awaiting-review` through a user/month upsert; and current review persistence has no expected-state guard/transaction. Previous selected policy already limits correction resubmission to `needs-correction` and excludes approved-record reopening. Static source inspection is not run-time verification.

**Approved scope:** Policy direction only. Any later implementation must bind a review approval to an immutable input revision; reject ordinary review changes from approved state; retain prior state and audit events; ensure that a correction resubmission cannot reopen an approved revision; and route every exceptional reopening/revocation through a new owner authorization and immutable reasoned event.

**Excluded scope:** No appeal mechanism, reopening/revocation implementation, API/schema/application/configuration/test/build/migration/data mutation/credential/environment/merge/deployment/release/production action is authorized. This policy does not make an approved record independently verified, financially final, legally certified, or production-ready.

**Verification before reassessment:** Any later implementation must prove exactly-one final decision per immutable revision; denial of routine reviewer, submitter, cross-tenant, stale, and duplicate reopening attempts; immutable history preservation; no approved-to-awaiting transition through ordinary resubmission; and separately authorized exception behavior only when its owner authorization exists.

**Next delegated policy decision:** Determine the minimum immutable audit-event fields and retention semantics necessary to support the selected provenance, review, correction, and finality policies.

**Status:** AUTHORIZED — approval-finality policy selected through Darrin’s delegated recommended-A instruction; implementation pending separate Darrin authorization.

## Delegated policy decision — immutable audit-event evidence and retention (2026-08-25)

**Decision:** Applying Darrin’s delegated recommended option A, every lifecycle event for an attested monthly-record revision must be append-only and immutable. At minimum, an event must identify: a unique event ID; franchise ID and authorized franchise-context identity; monthly record ID and immutable input-revision identity; event type; prior and next lifecycle state where applicable; server-recorded UTC time; acting membership/person identity and effective role; the reason/note where required; source/origin reference; and a correlation/request identifier. An exceptional reopening/revocation must additionally reference the separate Darrin authorization. Audit events are retained without routine deletion or in-place alteration until a separately approved, evidence-preserving retention/deletion policy exists.

**Authority:** Darrin’s explicit delegation in this task to continue autonomously using the recommended option A for subsequent Franchise PR #6 policy decisions, bounded to policy/planning and existing owner-gated operational limits.

**Evidence:** PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908` currently records review-event actor/record/action/note/time fields and saved-input revisions, but event schema lacks franchise/membership context, prior/next state, immutable revision linkage, correlation, source reference, exception authorization reference, and a retention policy. Current events are associated with user IDs rather than the selected franchise-membership model. The selected provenance, correction-resubmission, reviewer-only, and approval-finality policies require revision-specific, tenant-scoped evidence. Static source inspection is not run-time verification.

**Approved scope:** Policy direction only. A later implementation must write event/state changes atomically when a transition occurs; preserve prior events and input revisions; use server-derived membership/franchise context; avoid a client-supplied tenant identity; and make deletion/alteration a separately governed process with evidence-preservation requirements.

**Excluded scope:** No schema/API/application/configuration/test/build/migration/data mutation/audit export/retention deletion/credential/environment/merge/deployment/release/production action is authorized. This decision sets no legal, tax, accounting, privacy, or statutory retention duration.

**Verification before reassessment:** Any later implementation must prove append-only behavior; required fields per event type; revision and tenant linkage; server UTC timestamps; actor membership/role evidence; atomic event/state behavior; immutable preservation of correction/review/finality history; denial of unauthorized event insertion/alteration; and explicit handling of any governed retention/deletion exception.

**Next delegated policy decision:** Set the source-level migration-preflight boundary so migration history is not mistaken for authorized environment execution.

**Status:** AUTHORIZED — immutable audit-event/retention policy selected through Darrin’s delegated recommended-A instruction; implementation pending separate Darrin authorization.

## Delegated policy decision — source-controlled migration history and target-specific preflight (2026-08-25)

**Decision:** Applying Darrin’s delegated recommended option A, every migration file, snapshot, or journal committed with Franchise source is **source-controlled migration history only**. It is not proof of target applicability and does not authorize target inspection, migration generation, migration execution, `db:push`, backup, data copy, rehearsal, deployment, or release. Before any target-environment step, a separate Darrin authorization must identify the exact environment and data classification; access authority; current migration journal/schema baseline; migration graph; each backfill/default/`NOT NULL` consequence; backup/checkpoint and recovery owners; permitted non-production rehearsal; evidence preservation; and an explicit post-rehearsal go/no-go decision. No destructive migration or fabricated historical transactional data is permitted under this policy.

**Authority:** Darrin’s explicit delegation in this task to continue autonomously using the recommended option A for subsequent Franchise PR #6 policy decisions, bounded to policy/planning and existing owner-gated operational limits.

**Evidence:** Current canonical `main` migration map at `25d4f754560f611f2104670040ddaf3656e72f48` describes itself as a mapping/sequencing plan that does not execute migrations; requires explicit membership/franchise linkage for legacy reporting records; permits backfill only for unambiguous mappings; requires row/uniqueness validation; preserves original attested values/provenance; and explicitly prohibits production migration execution, destructive/drop migrations, production-data copying, and fabricated historical transactions. PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908` contains source-controlled Drizzle migration history but no target-specific journal, data classification, backup/recovery record, approved rehearsal, or environment authorization.

**Approved scope:** Policy direction and source-level planning only. A later preflight proposal must distinguish source files from applied environment state, map legacy records only where unambiguous, preserve historical attested values/provenance, and define a non-production rehearsal before any production go/no-go decision.

**Excluded scope:** No database/target-environment access, schema inspection, migration generation/execution, `db:push`, backfill, data copy, backup, restore, rehearsal, deployment, release, credential use, or production action is authorized. No statutory/commercial data-retention or financial-accounting treatment is established by this policy.

**Verification before reassessment:** Provide the separately authorized environment-preflight record; exact target baseline/journal; migration graph and row-impact analysis; explicit backfill/default decisions; named backup/checkpoint and recovery owners; approved non-production rehearsal outcome; reconciliation of original values/provenance; cross-tenant validation; and Darrin’s subsequent go/no-go decision. Absent those artifacts, migration state remains unverified and unapplied.

**Next review:** Reconcile all selected policies against the current held PR #6 gates and identify which next steps are still blocked by separate operational authorization.

**Status:** AUTHORIZED — migration-preflight boundary selected through Darrin’s delegated recommended-A instruction; all environment actions remain separately owner-gated.

## Material PR #6 update — static conflict with current canonical continuity records (2026-08-25T08:22Z)

**Scope:** Read-only three-way merge analysis of open, non-draft PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908` against current canonical `main` `25d4f754560f611f2104670040ddaf3656e72f48`, using merge base `b85dce737fe8130186ef551d28a0bd4533ddfc72`. GitHub metadata observed at review: base reference `b85dce737fe8130186ef551d28a0bd4533ddfc72`, current merge-state field `UNKNOWN`, no review decision, and no reported status checks. No branch, source, conflict, command-validation, migration, deployment, credential, target-environment, or production action was performed by Overseer.

**Verified static facts:** The three-way result identifies `changed in both` conflicts in `docs/continuity/MANUS.md` and `docs/continuity/SHARED.md`. PR #6’s version contains older continuity material plus new development-only telemetry/managed-workspace assertions; current main’s versions contain later strategic-priority and governance direction. Current `docs/DOMAIN_MODEL.md`, `docs/TENANCY_AUTHORIZATION.md`, and `docs/MIGRATION_MAP.md` are canonical main additions after the PR’s base and were not themselves reported as merge-conflict paths by the static analysis.

**Risk classification:** **MEDIUM — canonical continuity/governance reconciliation required.** PR #6 cannot be considered merge-ready with unresolved path-level conflicts against current main. A resolution that replaces current-main continuity direction without explicit owner scope could create governance drift. This is independent of, and does not close, telemetry removal, membership tenancy, provenance, review/audit, migration-preflight, or authorized nonzero-franchisee-evidence gates.

**Required owner action:** A separate, bounded source-conflict resolution authorization is required before any agent may refresh/rebase/resolve PR #6. It must preserve the current canonical domain/tenancy/migration records and current continuity/governance direction. Darrin’s delegated recommended-A policy authority does not authorize source changes, rebases, merge conflict resolution, or merge.

**Permitted actions:** Read-only static review, conflict-resolution proposal preparation, retention of current-main canonical records, and reassessment of a later explicit new PR head.

**Prohibited actions:** Do not merge, approve, close, rebase, resolve conflicts, deploy, release, run migrations, alter data, use credentials, or treat the static result as passing validation.

**Verification before reassessment:** Supply a separately authorized new PR head; prove conflict-free reconciliation with current main; show retention of canonical domain/tenancy/migration documentation and current continuity/governance direction; identify every continuity-record difference; and re-evaluate the remaining PR #6 gates independently.

**External notification:** New-material, PR-only notice posted under the active authorized dispatch window: [issuecomment-5408108972](https://github.com/darrinbaldwindev/Franchise/pull/6#issuecomment-5408108972). The notice does not approve a merge, deployment, release, or production action.

**Status:** OPEN — PR #6 remains held pending separate owner authorization for any conflict-resolution change and resolution of all other gates.

## Consolidated PR #6 policy and gate reconciliation (2026-08-25T08:26Z)

**Scope:** Read-only reconciliation of policy decisions recorded in this log, current PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`, current canonical main `25d4f754560f611f2104670040ddaf3656e72f48`, open Issue #12, static current-main conflict evidence, and prior notices. No source, test/build, migration, target-environment, data, credential, merge, deployment, release, or production action was performed.

**Policy completion:** The delegated recommended-A policy process has now set tenancy/membership direction; reviewer authority; correction resubmission; approval finality; provenance terminology; immutable audit-event evidence/retention; complete telemetry removal; and source-history-versus-target-migration boundaries. These are policy/planning directions only and do not alter current source or gate status.

**Held gates:** PR #6 remains held for: (1) separately authorized reconciliation of its conflicts with current main continuity records; (2) a dedicated deletion-only telemetry-remediation PR that meets the complete-removal acceptance contract; (3) separately authorized implementation of membership-derived tenant context and cross-tenant denial evidence; (4) separately authorized provenance/review/audit lifecycle implementation and tests; (5) separately authorized, target-specific migration preflight and non-production rehearsal before any environment action; (6) explicitly authorized nonzero franchisee evidence; and (7) Darrin’s explicit future merge decision after all applicable gates are independently reassessed.

**New material notices:** Telemetry-scope divergence [issuecomment-5404391802](https://github.com/darrinbaldwindev/Franchise/pull/6#issuecomment-5404391802); current-main continuity conflict [issuecomment-5408108972](https://github.com/darrinbaldwindev/Franchise/pull/6#issuecomment-5408108972). Neither notice authorizes merge, deployment, release, or production action.

**Delegation boundary:** Darrin’s recommended-A delegation was applied only to policy/planning decisions. It does not authorize source modification, conflict resolution/rebase, command validation, target access, migration, data action, credential use, merge, deployment, release, or provider activity. Any such action requires a separate explicit authorization.

**Status:** OPEN / HELD — no operational next step is authorized; continue read-only monitoring and reassess a separately authorized remediation/conflict-resolution PR head when supplied.

## Material documentation update — PR #14 telemetry qualification and Issue #15 dependency (2026-08-25T09:16Z)

**Scope:** Read-only review of open PR #14 `1ac3f12a999e104c3af1d944a6903cbac61213ff` (`docs: reconcile PR #6 opening-readiness state`), its two documentation paths, open Issue #15, and the exact referenced PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`. Current main reference observed through GitHub was `c1add1e4f28b2f095b66752e29eb421f9808ee2a`. No source, command-validation, migration, target-environment, data, credential, merge, deployment, release, or production action was performed by Overseer.

**Verified static facts:** PR #14 correctly records absence of the *former public* path `apps/franchise-hub/client/public/__manus__/debug-collector.js` from PR #6 head. The same exact PR #6 head retains `apps/franchise-hub/client/devtools/debug-collector.js`, `/__manus__/logs` references, collector route constants, and `vitePluginManusDebugCollector` wiring in `apps/franchise-hub/vite.config.ts`. PR #14's broader “debug-telemetry safeguard” wording therefore requires qualification: it must not be read as complete collector removal or closure of the recorded telemetry gate.

**Evidence classification:** PR #14's reported isolated install/test/check/build outcomes are contributor evidence only for this read-only Overseer review. They were not rerun, and no managed workspace, deployment, or live endpoint was inspected. The existing complete-removal policy remains unchanged: the current development-only collector design does not satisfy it, and the required dedicated deletion-only remediation PR has not been supplied.

**Risk classification:** **MEDIUM — incomplete telemetry provenance/governance qualification in an opening-readiness record.** The affected documentation could otherwise overstate the evidence for the selected complete-removal requirement. It does not create a new approval, implementation authorization, or change to the held PR #6 gate.

**External notification:** A new-material, PR-only notice was posted under the active authorized dispatch window: [issuecomment-5408396071](https://github.com/darrinbaldwindev/Franchise/pull/14#issuecomment-5408396071). It requests qualification only; it does not approve or instruct a merge, telemetry implementation, deployment, release, or production action.

**Issue #15 observation:** Open Issue #15 (`App: implement real franchise membership tenancy before commerce V1`) restates the selected membership-derived authorization direction and P0 acceptance criteria. It is an issue/author claim and does not itself authorize implementation. It adds no new policy decision; its stated acceptance direction remains consistent with the previously recorded tenancy, role, active-context, lifecycle, review, and migration decisions.

**Required next action:** Reassess a revised PR #14 head if supplied; continue to hold PR #6 for current-main conflict resolution, complete telemetry removal, selected tenancy/review/audit implementation, target-specific migration preflight, authorized nonzero-franchisee evidence, and Darrin's separate merge decision.

**Status:** OPEN / HELD — PR #14 wording qualification pending; PR #6 gates unchanged.

## Material PR #13 update — stale continuity branch now conflicts with current main (2026-08-25T09:39Z)

**Scope:** Read-only refresh of all active Franchise PRs and static three-way comparison for PR #13. PR #13 remains open/non-draft at unchanged head `55f359090ba24251920ebf126b5b150bf1655379`; observed current main was `c1add1e4f28b2f095b66752e29eb421f9808ee2a`, with merge base `ef9e70db3b3e4c938fc18c545f14febdc2823c7a`. No source, command-validation, migration, target-environment, data, credential, merge, rebase, deployment, release, or production action was performed.

**Verified static facts:** GitHub now reports PR #13 merge state `DIRTY`. Its only changed path is `docs/continuity/SHARED.md`. The read-only three-way comparison identifies that same path as `changed in both` between current main and PR #13 head. There is no new PR #13 source revision, review decision, reported check result, or new contributor validation evidence.

**Risk classification:** **MEDIUM — stale continuity reconciliation conflicts with current canonical direction.** The pull request cannot be regarded as merge-ready while the only proposed continuity edit conflicts with current main. This status change is separate from all PR #6 integration and source gates.

**Required owner action:** A separate bounded documentation-reconciliation authorization is required before any agent may rebase/resolve/modify PR #13. Darrin’s existing policy delegation does not authorize source changes, conflict resolution, rebase, or merge.

**Permitted actions:** Read-only static review, preparation of a source-only documentation reconciliation proposal, preservation of current-main continuity direction, and reassessment of a new explicit head.

**Prohibited actions:** Do not merge, approve, close, rebase, resolve conflicts, deploy, release, run migrations, alter data, use credentials, or treat static analysis as integration validation.

**Verification before reassessment:** Supply a separately authorized revised PR #13 head; show conflict-free reconciliation with then-current main; identify every continuity-record change; preserve current-main governance direction; and obtain Darrin’s explicit merge decision if integration remains desired.

**External notification:** New-material, PR-only notice posted under the active authorized dispatch window: [issuecomment-5408558741](https://github.com/darrinbaldwindev/Franchise/pull/13#issuecomment-5408558741). It does not approve a merge, deployment, release, or production action.

**Status:** OPEN / HELD — pending separate owner authorization for any documentation reconciliation.

## Owner decision — PR #6 read-only conflict-resolution preparation (2026-08-25)

**Decision:** Darrin selected **A — prepare a bounded, read-only conflict-resolution proposal** for PR #6. This authorizes only static comparison, preservation mapping, handoff drafting, and a static acceptance checklist. It does **not** authorize branch creation, source changes, rebase, conflict resolution, test/build execution, migration, target-environment access, data action, credential use, merge, deployment, release, or any change to PR #6.

**Evidence:** Current PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`; current main `043301c05b5b6e2eea429b4fe85feabb1b2fe868`; merge base `5e963de433e050c54f7063287f96d971cfde13f2`. A static three-way comparison identifies `changed in both` conflicts in `docs/continuity/MANUS.md` and `docs/continuity/SHARED.md`. Current main now also contains `docs/application/APP_TENANCY_IMPLEMENTATION_SPEC.md`, which reinforces the canonical tenancy contract and must be preserved without modification in any later source-change package.

**Approved scope:** Prepare and retain the read-only handoff at `/home/ubuntu/overseer_scan/franchise_pr6_conflict_resolution_handoff_2026-08-25.md`. The handoff requires current-main opening-first governance to prevail, limits any future resolution to the two conflicting continuity files, preserves canonical domain/tenancy/migration/application-tenancy records, and prohibits conflating contributor/managed-workspace claims with independently reproduced canonical evidence.

**Excluded scope:** All source, branch, PR, application, dependency, telemetry, schema/migration, configuration, data, CI/CD, deployment, release, and target-environment actions remain outside this authorization. The existing complete-removal telemetry policy and every other held PR #6 gate remain unchanged.

**Verification:** Before a future read-only reassessment, a separately authorized implementation-capable agent must supply an exact revised head and static evidence of scope containment, no conflict markers, conflict-free reconciliation against then-current main, canonical-preservation proof, correct evidence terminology, and retention of all unresolved gates.

**Status:** COMPLETED — read-only preparation only. A separate operational authorization is required before any agent may create or alter a conflict-resolved revision.

## Owner authorization — named PR #6 continuity conflict-resolution implementer (2026-08-25)

**Decision:** Darrin authorizes the separate **Franchise PR #6 Continuity Reconciliation Implementer** to create one dedicated, source-only conflict-resolution candidate branch and pull request for existing PR #6. Overseer remains read-only and may only statically reassess the resulting exact candidate head.

**Evidence:** Existing PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`; current main `043301c05b5b6e2eea429b4fe85feabb1b2fe868`; merge base `5e963de433e050c54f7063287f96d971cfde13f2`; static conflicts in `docs/continuity/MANUS.md` and `docs/continuity/SHARED.md`. Current main’s canonical `docs/application/APP_TENANCY_IMPLEMENTATION_SPEC.md` is additionally required preservation evidence.

**Approved scope:** The named implementation agent may create a new dedicated branch from then-current main, bring in the existing PR #6 source-integration content only to form a reviewable candidate, resolve the two named continuity conflicts, use Git-only static inspection, and open one candidate PR against main with exact revision/scope/conflict evidence. The current-main strategic/governance direction must prevail. `docs/DOMAIN_MODEL.md`, `docs/TENANCY_AUTHORIZATION.md`, `docs/MIGRATION_MAP.md`, and `docs/application/APP_TENANCY_IMPLEMENTATION_SPEC.md` must remain present and unchanged. The full authorization and acceptance checklist are retained at `/home/ubuntu/overseer_scan/franchise_pr6_conflict_resolution_implementation_authorization_2026-08-25.md`.

**Excluded scope:** Do not modify or rebase the existing PR #6 branch. Do not alter application or telemetry source, Vite wiring, dependencies, CI/CD, authentication, schema/migrations, data, credentials, providers, deployments, canonical design/handoff files, or any target environment. Do not run project commands, tests, checks, builds, migrations, browser validation, database commands, or target-environment actions. Do not merge, approve, close, deploy, or release.

**Verification:** Before Overseer reassessment, provide the candidate PR URL, full head/base/source SHAs, changed-file list, static no-conflict-marker evidence, fresh static merge evidence against then-current main, canonical-preservation proof, evidence-terminology/gate-retention proof, and a statement that no project or target-environment command was run.

**Status:** AUTHORIZED — bounded candidate-PR creation only. All independent PR #6 gates and all merge/deployment/release decisions remain held and separately owner-gated.

## Implementation dispatch blocker — named PR #6 continuity implementer (2026-08-25)

**Scope:** Follow-up to the owner authorization at the preceding entry. A separate implementation task was dispatched for the named **Franchise PR #6 Continuity Reconciliation Implementer**. No application, continuity, branch, PR, test/build, migration, environment, data, credential, merge, deployment, release, or production action was performed by Overseer.

**Verified evidence:**

| Item | Evidence | Classification |
|---|---|---|
| Authorized baseline | Direct read-only check: live `main` `043301c05b5b6e2eea429b4fe85feabb1b2fe868`; PR #6 source head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`; merge base `5e963de433e050c54f7063287f96d971cfde13f2`. | Verified fact |
| First task | `https://manus.im/app/FAFThhLty7lloiKHjcPUoR` stopped without a repository mutation after treating PR metadata’s historical `baseRefOid` as live `main`; the interpretation was corrected. | Verified task record |
| Corrected task | `https://manus.im/app/r2oqZacQT0ix3o7iN4zWm9` verified no baseline change but is waiting because its task-local shell/public endpoints cannot authenticate to the private repository. | Verified task record |
| Candidate artifact | No dedicated candidate branch, commit, or candidate PR exists. | Verified fact |

**Risk classification:** **MEDIUM — authenticated execution-access blocker.** The blocker neither closes nor changes the existing source, tenancy, telemetry, provenance, audit, migration, validation, nonzero-evidence, or merge gates. It does not permit read-only Overseer to substitute for the separately authorized implementer.

**Bounded access remedy:** The named task needs an authenticated GitHub capability that can read private refs and create branches, commits, and pull requests through its own bounded task identity. It must not receive credentials through a message. The task was instructed to use its enabled GitHub connector’s native repository operations, if available, instead of unauthenticated terminal Git. If connector-native ref-read/branch-create/commit/PR-create operations are unavailable, the task must report that capability gap and stop without mutation.

**Next review condition:** Once such task-local authenticated GitHub access is available, the named implementer must re-check the direct live refs, proceed only if still matching, and supply one candidate PR URL with full head/base/source SHAs and the static acceptance evidence defined in the authorization record. Overseer will then conduct a read-only reassessment.

**Status:** BLOCKED — no candidate created; no gate closed; no external PR notice required.

## Project timeline and current milestone — 2026-08-26T11:02:51+10:00

**Scope and evidence:** Deep static review of default `main` at `043301c05b5b6e2eea429b4fe85feabb1b2fe868`, recent default-branch documentation/research history, 26 tracked files (25 documentation-path and one test-path), ten open issues, and open PRs [#6](https://github.com/darrinbaldwindev/Franchise/pull/6), [#8](https://github.com/darrinbaldwindev/Franchise/pull/8), [#13](https://github.com/darrinbaldwindev/Franchise/pull/13), and [#14](https://github.com/darrinbaldwindev/Franchise/pull/14). No source, migration, target database, test, build, provider, credential, deployment, or production action was run.

| Timeline point | Verified observation | Status |
|---|---|---|
| 23–25 Aug | The repository established Opening #1, Gate 3 SKU/pricing research, canonical domain/tenancy records, and a tenancy implementation handoff. | Planning and evidence preparation. |
| Current | `main` ends at `043301c0` (*docs(app): define tenancy implementation handoff*). Managed-source PR #6 is open and `DIRTY` at `67ee3ce8`; PR #13 is also `DIRTY`. No separately authorized continuity-conflict candidate branch or PR has appeared because the named implementation environment lacks private-repository authentication. | Integration held. |

**Current milestone:** Establish the smallest real Opening #1 tenant boundary: `User → Franchise Membership → Authorized Franchise Context → tenant-scoped operation`, then use verified account pricing to support the initial 40–60-SKU commercial seed without inventing costs in application code.

**Held blockers:** Issue [#15](https://github.com/darrinbaldwindev/Franchise/issues/15) remains the P0 tenancy/security gate; current imported schema/db/router evidence is `userId`-centred rather than membership/context-scoped. Issue [#16](https://github.com/darrinbaldwindev/Franchise/issues/16) requires verified supplier-account pricing and landed-cost evidence. PR #6 additionally remains held on complete collector/plumbing removal through its deletion-only remediation path, provenance terminology, tenant/revision-scoped review/audit implementation, target-specific migration preflight, authorized nonzero franchisee evidence, current-main conflict resolution, and Darrin’s merge decision.

**Owner decision:** Existing tenancy and governance policy decisions remain settled; Darrin must authorize any implementation, migration, merge, deployment, or commercial activation separately. This entry does not authorize those actions.

**Next Overseer instruction:** Maintain this timeline append-only. On a material branch, PR, issue, pricing-evidence, or design-record change, record exact revision/evidence, verified fact versus claim, Opening #1 milestone status, unresolved gates, owner decision, and reassessment condition. Do not execute application code, migrations, provider actions, financial transactions, or modify any path other than this log without separate authority.

**Confidence:** High for GitHub metadata and recorded policy/gate evidence; limited for runtime behavior, pricing verification, and check status.

## Active task assignment — Wave 1 (F-01) — 2026-08-26T13:50:47+10:00

**Authority and scope:** Darrin’s continuous-task-chain instruction. This is a read-only evidence task; it does not authorize source changes, migration, target-database action, tests, merge, deployment, financial action, credentials, or changes outside this log.

**Task F-01:** Reconcile Opening #1 source-integration and tenancy gates into one evidence matrix. Distinguish PR [#6](https://github.com/darrinbaldwindev/Franchise/pull/6) source integrity/conflict state from Issue [#15](https://github.com/darrinbaldwindev/Franchise/issues/15) membership/context tenancy; include Issues [#12](https://github.com/darrinbaldwindev/Franchise/issues/12)/#15/[#16](https://github.com/darrinbaldwindev/Franchise/issues/16) and PRs #6/#13/#14.

**Closure evidence:** Exact refs; verified facts versus claims; acceptance evidence required; gate status (blocked, independently verifiable, or owner-gated).

**Immediate successor:** On closure, issue **F-02**: prepare a Darrin decision package on retaining managed source as baseline while membership/context tenancy becomes the mandatory next implementation gate.

## Wave 1 task closure — F-01 — 2026-08-26T13:58:32+10:00

**Author/platform:** Manus Overseer. **Scope:** Read-only reconciliation of `main` at `043301c05b5b6e2eea429b4fe85feabb1b2fe868`; Issues [#12](https://github.com/darrinbaldwindev/Franchise/issues/12), [#15](https://github.com/darrinbaldwindev/Franchise/issues/15), and [#16](https://github.com/darrinbaldwindev/Franchise/issues/16); and PRs [#6](https://github.com/darrinbaldwindev/Franchise/pull/6), [#13](https://github.com/darrinbaldwindev/Franchise/pull/13), and [#14](https://github.com/darrinbaldwindev/Franchise/pull/14). No source, test, migration, target database, or commercial action was run.

**Result:** **F-01 CLOSED — Opening #1 evidence matrix reconciled.**

| Gate | Verified current state | Status |
|---|---|---|
| Managed source / continuity | PR #6 is open, `DIRTY`, and at `67ee3ce8`; PR #13 is also `DIRTY` in the continuity record. | Blocked on source-only conflict resolution; no candidate branch exists. |
| Canonical tenancy | Issue #15 records `userId`-centred schema/db/router paths rather than `User → Membership → Authorized Franchise Context → tenant-scoped operation`. | P0 blocked; A/B isolation, inactive-membership, and switch-denial evidence absent. |
| Domain and financial model | Issue #12 requires server-scoped transactional paths, auditable tenant ownership, and documented migration strategy before downstream commerce issues proceed. | Blocked. |
| Commercial seed | Issue #16 requires verified supplier-account pricing and landed costs for 40–60 SKUs. | Blocked; no account-pricing evidence. |
| Review/audit, provenance, telemetry, migration | Existing PR #6 gates remain: collector/plumbing deletion path, terminology, tenant/revision-scoped review/audit, target-specific migration preflight, nonzero franchisee evidence. | Blocked / owner-gated. |
| PR #14 validation wording | PR #14 reports isolated PR-head commands and retained tenancy blocker. That report is contributor evidence, not independently reproduced here. | Claim only for execution results. |

### Active successor — F-02

**Task F-02:** Maintain a Darrin decision package with this precise question: *Should the managed PR #6 source be retained as the approved source-integration baseline, while Issue #15 membership/context tenancy becomes the mandatory next implementation gate before any commerce expansion?* The package must preserve all independent source-integrity, telemetry, provenance, review/audit, migration-preflight, commercial-evidence, conflict-resolution, and merge gates.

**Permitted / prohibited:** This task prepares an owner decision only. It does not authorize merge, rebase, source replacement, implementation, migration, deployment, supplier/contact action, financial action, or release.

**Status:** F-01 closed; F-02 active and pending Darrin decision.
# Franchise F-02 — Source-Baseline and Tenancy Decision Package

**Prepared:** 2026-08-26T14:07:06+10:00 (`Australia/Sydney`)
**Prepared by:** Manus Overseer, read-only governance role
**Decision authority:** Darrin
**Decision status:** Pending

## Decision requested

> **Should the managed Franchise Hub source in PR #6 be retained as the bounded source-integration baseline, while real franchise membership/context tenancy becomes the mandatory next implementation gate before any commerce expansion?**

This is a decision about **source-baseline handling and task sequencing**. It does **not** authorize merge, rebase, conflict resolution, implementation, migration, testing, deployment, supplier contact, financial action, credential use, or release.

## Current verified evidence

| Item | Exact current evidence | Interpretation |
|---|---|---|
| PR #6 source candidate | [PR #6](https://github.com/darrinbaldwindev/Franchise/pull/6) is open, non-draft, `DIRTY`, at head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`; it imports managed Franchise Hub source under `apps/franchise-hub/`. | Candidate source is present but cannot be treated as merged/canonical or production-ready. |
| Current-main continuity conflict | [PR #13](https://github.com/darrinbaldwindev/Franchise/pull/13) is open and `DIRTY` at `55f359090ba24251920ebf126b5b150bf1655379`. | The two continuity records still need their separately authorized source-only resolution; no candidate branch exists because the named implementation environment lacks private-repository access. |
| Tenancy gate | [Issue #15](https://github.com/darrinbaldwindev/Franchise/issues/15) records `userId`-centred schema/db/router paths rather than `User → Franchise Membership → Authorized Franchise Context → tenant-scoped operation`. | P0 architecture/security gate; required A/B isolation, inactive-membership denial, and unauthorized-switching denial evidence is absent. |
| Domain/financial gate | [Issue #12](https://github.com/darrinbaldwindev/Franchise/issues/12) requires server-side tenant scope, auditable ownership keys, and documented migration strategy before downstream commerce work. | Tenancy work must align with the canonical domain/financial model. |
| Commercial gate | [Issue #16](https://github.com/darrinbaldwindev/Franchise/issues/16) requires verified supplier-account pricing and landed cost for an initial 40–60 SKU range. | Commerce economics must not be implemented with invented prices or costs. |
| Documentation evidence | [PR #14](https://github.com/darrinbaldwindev/Franchise/pull/14) is open and `CLEAN` at `1ac3f12a999e104c3af1d944a6903cbac61213ff`; it reports isolated PR-head command results while retaining the unresolved tenancy prerequisite. | Reported command results remain contributor evidence; `CLEAN` is not approval or proof that independent gates are closed. |

## Alternatives

| Option | Decision | Benefits | Risks and constraints |
|---|---|---|---|
| **A — Recommended** | **Retain PR #6 as the bounded managed-source baseline candidate; do not merge it. Require Issue #15 membership/context tenancy as the mandatory next implementation gate before commerce expansion.** | Preserves useful managed-source work without confusing it with platform completion; creates a clear foundation-first sequence; aligns with existing settled tenancy policy. | PR #6 remains `DIRTY`; conflict repair, telemetry-removal path, provenance, review/audit, migration-preflight, franchisee evidence, commercial pricing, and final merge decision remain independent gates. |
| B | Defer retention judgment until tenancy work has been completed independently. | Avoids any perception that imported source is endorsed before tenancy evidence exists. | Risks duplicating/reconstructing source context and postpones a clear integration baseline. Does not itself resolve conflict, tenancy, or commercial gates. |
| C | Reject or archive the current managed-source candidate and require a fresh source path after a complete tenancy model exists. | Simplifies the branch narrative by removing the current candidate. | Discards/reworks a substantial source-integration record without evidence that replacement is safer or cheaper; still requires all foundational gates. |

## Recommended decision record

```markdown
Decision: Select Option A — retain PR #6 only as a bounded managed-source baseline candidate; do not merge it; require Issue #15 membership/context tenancy as the mandatory next implementation gate before commerce expansion.
Authority: Darrin.
Evidence: PR #6 `67ee3ce…` (`DIRTY`); PR #13 `55f3590…` (`DIRTY`); PR #14 `1ac3f12…` (`CLEAN`, contributor-reported validation); Issues #12, #15, and #16.
Approved scope: Source-baseline sequencing and preparation of a separate bounded tenancy implementation brief after the conflict-resolution candidate is available.
Excluded scope: No merge, rebase, implementation, migration, test execution, deployment, supplier/commercial action, credential use, release, or production change.
Verification: A separate tenancy candidate supplies server-derived membership/context scope, A/B isolation and denial tests, and the independent PR #6 gates remain tracked as open until evidenced.
Review trigger: Conflict-resolution candidate appears; tenancy evidence package appears; or an owner decision changes the baseline choice.
Status: Pending Darrin selection.
```

## Required response

Darrin may respond in the shared coordination log or this project log with **A**, **B**, or **C**, plus any explicit modification. Without an explicit owner response, this package remains a recommendation only.

## Owner decision — F-03 closed; F-04 assigned — 2026-08-26T14:13:50+10:00

**Decision:** **Option A selected.** Retain PR [#6](https://github.com/darrinbaldwindev/Franchise/pull/6) only as the bounded managed-source baseline candidate. Do **not** merge it. Require real Issue [#15](https://github.com/darrinbaldwindev/Franchise/issues/15) membership/context tenancy as the mandatory next implementation gate before any commerce expansion.

**Authority:** Darrin, explicit A selection in the owner-decision interaction on 26 August 2026.

**Evidence:** PR #6 remains open and `DIRTY` at `67ee3ce8205d2a9c6aa2e25123802dd384dec908`; PR #13 remains open and `DIRTY` at `55f359090ba24251920ebf126b5b150bf1655379`; Issue #15 records the outstanding `userId`-substitute tenancy model. The F-02 decision package records all linked gates.

**Approved scope:** Treat source-baseline retention and tenancy sequencing as settled. Monitor and perform read-only verification of the separately authorized, source-only continuity-conflict candidate when it exists; after that candidate is available and statically acceptable, prepare the bounded tenancy implementation brief.

**Excluded scope:** No merge, rebase, source change, implementation, test execution, migration, database action, deployment, release, supplier/commercial action, credential use, provider activation, or production change. This decision does not close any independent PR #6 gate.

**Independent gates still open:** Current-main conflict candidate; complete collector/plumbing deletion path; provenance terminology; tenant/revision-scoped review/audit behavior; target-specific migration preflight; authorized nonzero franchisee evidence; verified supplier-account pricing; and Darrin’s later merge decision.

### Active successor — F-04

**Task F-04:** Verify the separately authorized source-only continuity-conflict candidate when a candidate branch/PR URL exists. Confirm the candidate resolves only `docs/continuity/MANUS.md` and `docs/continuity/SHARED.md`, preserves the canonical source-baseline/tenancy decision, and supplies full head/base/current-main SHAs plus static acceptance evidence. If no candidate exists, maintain **BLOCKED — authenticated implementation capability required** and do not substitute a new implementation agent or edit source.

**Successor after F-04:** Only after an acceptable conflict candidate exists, issue **F-05**: prepare the bounded membership/context tenancy implementation brief and acceptance-evidence plan under the settled Option A sequencing.

**Verification / review trigger:** Candidate PR appears, candidate metadata/ref changes, or its static acceptance evidence is supplied. **Status:** F-03 closed; F-04 active and blocked on the pre-existing authenticated candidate-creation dependency.

## Comprehensive portfolio scan — Issue #17 validation request — 2026-08-26T17:31:45+10:00

**Verified scan evidence:** Current `main` is `043301c05b5b6e2eea429b4fe85feabb1b2fe868`. PRs #6 and #13 remain `DIRTY`; PR #14 and the Overseer-log PR #8 are `CLEAN`. Tenancy Issue #15 remains open; new owner-authored Issue #17 requests a tenancy/current-implementation validation pass.

**Boundary:** Issue #17 is a material task request, but it does not itself override the standing read-only boundary or authorize execution of code/tests, use of environments/credentials, database actions, supplier/commercial access, merge, deployment, or release. Existing F-04 remains blocked on a permitted two-file continuity-conflict candidate, and tenancy remains mandatory before commerce expansion.

**Task-chain impact:** **F-06 proposed — static tenancy/current-implementation evidence map:** inspect exact-source tenancy routes/models/policies and relevant Hub-integration paths without execution; map them to Issue #15 and the already recorded F-04/F-05 prerequisites; classify implementation claims versus static facts; and identify the exact authorization needed for any later runtime validation. F-06 is a documentation/evidence task only and must not substitute for F-04’s authorized conflict candidate.

## F-06 static tenancy/current-implementation evidence map — closed; F-07 sequencing decision required — 2026-08-26

**F-06 result:** Static review compared documentation-only `main` `043301c05b5b6e2eea429b4fe85feabb1b2fe868` with unmerged source-integration PR #6 `67ee3ce8205d2a9c6aa2e25123802dd384dec908`. The target model requires authenticated franchise membership/authorization and rejects `user_id` as a tenancy substitute. The candidate source/router/persistence flow and its tenant test are user-ID-scoped; the test verifies forwarding the authenticated numeric user ID to mocked functions, not membership/role/franchise/territory enforcement. The review/audit path remains statically non-transactional and user-associated. No code, test, database, migration, credential, supplier/provider, deployment, or external action occurred.

**Status:** **F-06 CLOSED — static evidence confirms a target-versus-candidate tenancy gap.** This is not a runtime security conclusion. F-04 remains blocked because PR #6 is `DIRTY` and no authorized conflict-resolved candidate exists; F-05 cannot start from the current candidate.

### F-07 — owner-gated source/tenancy sequencing decision

**Recommended Option A:** Retain PR #6 strictly as an unmerged managed-source baseline reference. When an authorized conflict-resolved candidate exists, authorize a named implementation owner to prepare only a fresh membership-context tenancy proposal from that candidate, with no execution, migration, credential, supplier/provider access, deployment, release, or merge.

**Option B:** Authorize a named owner to prepare a documentation-only tenancy design against `main` now, without touching PR #6 or any application source; defer source reconciliation and implementation path until later.

**Option C:** Freeze all tenancy planning until the source-integration conflict is resolved and Darrin selects a canonical source candidate.

**No option is selected by this record.** F-07 is blocked pending Darrin’s explicit selection. Issue #17 does not independently authorize runtime validation.

## Manus dispatcher assignment — F-08 opening-readiness evidence-delta check — 2026-08-26

**Current task:** **F-08 — Statistically reconcile documentation-only PR #14 against the existing F-04/F-06 evidence and current PR #6/#13 states.** This bounded task determines whether PR #14 changes any source-baseline, conflict, tenancy, validation, or opening-readiness conclusion; it does not perform validation execution.

**Required output:** A short exact-revision delta table covering PR #14’s claimed opening-readiness statements, the supporting or absent PR #6/#13/static evidence, unchanged F-04 conflict-candidate requirement, unchanged Issue #15 membership-tenancy requirement, and the explicit authorization that would be required for any runtime validation requested by Issue #17.

**Permitted scope:** Read-only GitHub PR metadata, changed-file/document comparison, existing project-log evidence, and append-only task-log record. A bounded subreview may be delegated only for static documentation/source-path comparison and must return exact paths, revisions, evidence labels, and confidence to Manus.

**Prohibited scope:** No source change, code/test/run, migration/database action, supplier/provider/credential use, merge, deployment, release, or external notice.

**Return condition:** F-08 returns a material-delta classification and successor recommendation to Manus. F-04 remains active unless an authorised two-file conflict-resolution candidate appears; F-07 remains owner-gated.

**Next review trigger:** PR #14/#6/#13 revision, review, check, or merge-state change; new authorised conflict candidate; Issue #15/#17 update; F-08 closure; or F-07 selection.

## F-08 return — opening-readiness evidence-delta check — 2026-08-26

**Scope and exact evidence:** Read-only reconciliation of PR #14 head `1ac3f12a999e104c3af1d944a6903cbac61213ff`, PR #6 head `67ee3ce8205d2a9c6aa2e25123802dd384dec908`, PR #13 head `55f359090ba24251920ebf126b5b150bf1655379`, Issue #15, and Issue #17. No source, command, test, build, migration, credential, provider, merge, or deployment action was performed.

| Item | Static reconciliation | Result |
|---|---|---|
| PR #14 | Documentation-only continuity change; records staged source, reported/reconciled PR-head validation, and unresolved tenancy. | Does not change a source or opening-readiness gate. |
| PR #6 | Open and `DIRTY`; retained development collector path/Vite wiring is documented in PR #14’s own review notice although the former public collector path is absent. | Telemetry conclusion remains qualified; no production inference. |
| Issue #15 tenancy criteria | Membership/context, franchise A/B isolation, inactive denial, switching denial, record scope, and migration-plan evidence are absent from the relevant PR #14/#6 evidence. | F-06 target-vs-candidate gap remains confirmed. |
| PR #13 | Documentation-only, `DIRTY`, and records superseded validation chronology. | Not a current readiness baseline. |
| Issue #17 | Requests execution-heavy validation but does not independently authorize it. | No code/test execution was performed. |

**Finding:** **F-08 complete — no material opening-readiness advance.** F-04 conflict-candidate requirement, F-06 static tenancy gap, and F-07 owner decision remain independently active. PR #14’s reported/reproduced validation statements were not rerun by this task and do not close those gates.

**Successor task / precise hold:** **F-09 — authorised conflict-candidate and tenancy-evidence intake.** On a PR #6/#13/#14 revision, new authorised two-file candidate, Issue #15/#17 material evidence, or F-07 decision, inspect only the changed paths and return a gate delta. Do not create a branch, resolve conflicts, change source, run commands, use credentials/providers, merge, migrate, deploy, or release.

**Next review trigger:** New authorised candidate; PR #6/#13/#14 revision/review/check/merge-state change; Issue #15/#17 update; F-09 return; or F-07 selection.
