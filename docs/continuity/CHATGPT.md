# ChatGPT Continuity Log

## Agent
ChatGPT

## Last updated
2026-08-23

## Role
Business/product reasoning, architecture, financial-model logic, research, requirements, documentation, code review and cross-system consistency.

## Work completed in this project conversation

- Developed the home-delivery franchise concept and its operating model.
- Reframed the franchise away from a traditional full-time employment proposition toward a flexible home-business model.
- Established AUD $4,995 as the base franchise package.
- Established the concept of approximately $2,000 opening-stock cost basis and $3,300+ target retail value, subject to verification.
- Established optional add-ons for tech, shelving, furniture and extra stock.
- Established central franchisor-controlled website/app so franchisees do not need separate websites.
- Established service-area/territory routing based on actual delivery coverage.
- Established central order routing to the correct franchise.
- Established free customer delivery as a possible proposition while tracking actual delivery costs internally.
- Established order lifecycle and delivery-provider abstraction.
- Established actual work-hour tracking separately from storefront availability.
- Developed the franchisee dashboard concept.
- Developed stock/reorder alerts.
- Developed AI coaching concept.
- Reframed the workload model so the business starts from economic return and actual work rather than assuming a fixed workload or full-time income.
- Established the latest `actual work → sales → contribution → earned hours` model.
- Connected GitHub as the source of truth.
- Added `README.md` and the AI collaboration protocol.
- Created GitHub Issue #1 for Manus collaboration and continuity.
- Scanned the repository after Manus implementation work and reviewed the available continuity state.

## Repository scan / collaboration update — 2026-08-23

The repository is now treated as the durable collaboration record. The scan indicates that Manus has developed a substantial Franchise Hub application/workspace outside the original documentation-only foundation, including the dashboard/KPI/reporting foundation and verified tests/build work. The repository documentation records this state and the known gap between the dashboard foundation and the complete franchise platform.

The important architectural issue identified is **source-of-truth alignment**: we should not create a second competing application. The next collaboration step is to deliberately establish whether the Manus-managed Franchise Hub application is the production application represented by this repository, then bring the implementation/runtime into the canonical repository in a controlled way.

Manus-reported implemented areas include tenant-scoped business records, server-side KPI calculations, Sales, Operating Contribution, Earned Hours, productivity/workload metrics, projections, deterministic coaching, LLM coaching based on server-derived snapshots, attestations, immutable input revisions, admin review/audit events and Trends reporting. Manus reported passing Vitest tests, TypeScript validation and a production build in its managed workspace. These should be independently verified against the canonical repository before being called production-ready.

Known broader platform gaps include franchise/membership tenancy, full role model, territory resolution, central catalogue, customer checkout, payments, order orchestration, inventory movements, delivery integration, work-session capture, accounting exports, training system and mobile/Windows packaging.

## Important current decisions

1. $4,995 is the entry package.
2. Stock, technology, furniture and working capital are distinct economic concepts.
3. Franchisees can use central branded software/site.
4. Territory is controlled by real service coverage.
5. Actual work hours, not opening hours, are labour.
6. Do not assume every owner wants full-time income.
7. Earned hours are a business-performance metric derived from contribution and a configured wage benchmark.
8. Do not represent earned hours as government-benefit eligibility.
9. 3% royalty applies through the defined breakeven threshold; 6% applies above it, subject to final contractual/legal definition.
10. 20% reserve / 80% owner allocation is a proposed configurable economic layer, not a final legal/accounting rule.
11. Gross sales must not be treated as owner income; contribution must be calculated from verified inputs.
12. Customer-facing free delivery must retain an internal delivery-cost calculation.

## Collaboration rules

- Maintain three continuity logs: `CHATGPT.md`, `MANUS.md`, and `SHARED.md`.
- Do not overwrite Manus's log.
- Update `CHATGPT.md` after substantive ChatGPT work.
- Update `SHARED.md` when a material project-state or architectural decision changes.
- Read the shared state before making major recommendations.
- The user remains the final decision authority.
- Do not create a parallel application when an existing Manus implementation already covers the same responsibility.
- Prefer controlled migration/integration into the canonical repository.

## Recommended next work

1. Have Manus scan/confirm the current implementation and identify the exact managed workspace/runtime.
2. Confirm whether that implementation is to become the canonical production application for this repository.
3. If yes, establish the canonical source tree and migrate/integrate the application rather than rebuilding it.
4. Verify the existing financial and earned-hours calculations with tests in the canonical repository.
5. Implement database migrations, authentication/roles and franchise tenancy where missing.
6. Then connect orders, inventory, delivery and dashboards.
7. Add customer storefront, payments, accounting, training, AI coaching and network reporting.
8. Package mobile/Windows experiences.
9. Harden security, privacy, compliance and production deployment.

## Agent-to-agent request

Manus should read this update, inspect the actual canonical repository and its managed application workspace, then update `MANUS.md` and `SHARED.md` with the exact implementation/source-of-truth status. Keep the exchange brief; use GitHub for durable state.
