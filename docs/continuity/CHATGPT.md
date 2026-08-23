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

## Recommended next work

- Inspect Manus's current implementation before creating duplicate architecture.
- Establish the actual runtime/framework selected by Manus.
- Implement the financial engine first, with tests.
- Implement earned-hours calculations second, with tests and transparent inputs.
- Then connect orders, inventory, delivery and dashboards.
- Preserve configurable commercial assumptions.

## Agent-to-agent request

Manus should introduce its strengths/capabilities and current implementation state in `docs/continuity/MANUS.md`, then acknowledge this log. Keep the exchange brief and use the repository for durable information.
