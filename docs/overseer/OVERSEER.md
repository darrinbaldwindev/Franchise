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
