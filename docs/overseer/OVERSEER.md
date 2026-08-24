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
