# AI Collaboration Protocol — ChatGPT + Manus

**Repository:** `darrinbaldwindev/Franchise`

**Owner:** Darrin — final product, commercial and technical decision authority.

**Status:** Active collaboration protocol, 23 August 2026.

## 1. Purpose

This repository is being developed collaboratively by the user, ChatGPT and Manus. Both AI agents may work directly in the same GitHub repository. The objective is to preserve continuity without creating competing versions of the product.

The repository itself is the source of truth for implementation. The continuity files are the source of truth for project decisions, handoffs and unresolved questions.

## 2. Introductions

### ChatGPT

I am ChatGPT. My strongest contribution to this project is cross-domain reasoning and synthesis. I can:

- turn conversations into structured product requirements;
- reason through franchise economics and unit economics;
- model royalty, contribution, reserve and owner-allocation logic;
- design information architecture, workflows and system boundaries;
- research current regulations, competitors, suppliers, technology and market conditions when web research is appropriate;
- write and review technical documentation, schemas, APIs and application code;
- review another agent's implementation against the agreed business model;
- identify inconsistencies, hidden assumptions and edge cases;
- maintain continuity from business discussion into product requirements;
- use GitHub directly to inspect and modify repository files when connected;
- create a coherent plan across web, mobile, Windows, backend, data and operations.

My particular role in this project should be strongest where **business logic, product architecture, financial reasoning, research, requirements and cross-system consistency** matter.

### Manus

Manus is an autonomous AI agent/productivity system. Based on current public descriptions and capabilities, its strengths include autonomous multi-step task execution, web/browser interaction, research, coding, file creation/editing, software-building workflows, and completing longer tasks with less step-by-step supervision.

For this project, Manus should be particularly useful for:

- repository-scale implementation;
- creating and modifying application files;
- running/building/testing software in its available environment;
- browser-based research and verification;
- executing multi-step development tasks autonomously;
- turning the agreed architecture into working application components;
- inspecting existing implementation and identifying gaps;
- packaging/deploying where its environment permits.

**Important:** Manus should add its own first-hand capabilities, limitations and current project state to `docs/continuity/MANUS.md`. Public capability descriptions are not a substitute for Manus reporting what it can actually do in this project environment.

## 3. Minimal agent-to-agent exchange

The preferred introduction exchange is only two messages:

1. ChatGPT states its strengths and asks Manus to state its strengths/capabilities and current project state.
2. Manus replies with its strengths/capabilities and state.
3. ChatGPT acknowledges and proceeds with the agreed workflow.

Do not create a long conversational loop. The durable information belongs in the repository.

## 4. Three continuity logs

Use exactly three primary continuity documents:

### `docs/continuity/CHATGPT.md`

ChatGPT's own working log. Record:

- work completed by ChatGPT;
- important reasoning/decisions;
- files created or changed;
- research that materially changed the project;
- unresolved questions;
- recommended next actions.

### `docs/continuity/MANUS.md`

Manus's own working log. Record the same categories from Manus's perspective, plus implementation/test/deployment state that only Manus has directly verified.

### `docs/continuity/SHARED.md`

The authoritative merged continuity log. This is the file both agents must read before substantial work and update after substantial work.

It should contain:

- current product definition;
- confirmed business rules;
- confirmed technical architecture;
- current implementation state;
- decisions and dates;
- active risks;
- open questions;
- next recommended work;
- latest commits from each agent.

The shared log is more important than either agent's private continuity log.

## 5. Optional Manus sub-agent / continuity steward

If Manus can run a sub-agent, it may be used as a **continuity/merge steward**. Its role should be limited to:

- comparing `CHATGPT.md` and `MANUS.md`;
- identifying contradictions;
- preparing a proposed update to `SHARED.md`;
- checking that implementation and documentation agree;
- identifying stale assumptions.

It should **not** silently resolve material business disagreements. The user remains the final authority.

The recommended structure is therefore:

`Darrin (owner)`

→ `ChatGPT` — strategy/reasoning/research/architecture/review

→ `Manus` — autonomous implementation/testing/execution

→ `Manus continuity steward` — optional reconciliation

→ `GitHub repository` — shared implementation + shared state

The steward is optional. Three continuity files remain sufficient even without it.

## 6. Same-repository rules

### Before editing

1. Read `docs/continuity/SHARED.md`.
2. Read the relevant agent log if context is needed.
3. Inspect the current files being changed.
4. Check recent commits.
5. Do not assume an earlier ZIP, generated artifact or chat transcript is newer than GitHub.

### While editing

- Prefer small coherent commits.
- Do not overwrite another agent's work merely because a local copy is older/newer.
- Keep business rules in documented/configurable locations.
- Avoid hard-coding assumptions that have not been approved.
- Add tests for financial calculations and critical order/routing logic.

### After editing

1. Update the agent's continuity log.
2. Update `SHARED.md` with material changes.
3. Record commit hash/message where practical.
4. State what remains unverified.

## 7. Branch/commit policy

For small, isolated changes, either agent may commit to `main` if repository permissions and the user's workflow permit it.

For larger changes, use a feature branch and pull request so the other agent can review the work before merge.

Recommended commit prefixes:

- `docs:` documentation/requirements
- `feat:` new product functionality
- `fix:` bug fix
- `refactor:` structural code change
- `test:` tests
- `chore:` tooling/configuration
- `research:` research findings that materially affect the project

## 8. Conflict policy

If agents disagree:

1. Check `SHARED.md` for an existing decision.
2. If there is a confirmed user decision, follow it.
3. If no decision exists, do not silently choose a commercially material assumption.
4. Record the disagreement in `SHARED.md`.
5. Ask the user only when a decision is genuinely required.

Technical implementation choices can normally be resolved by whichever implementation is more consistent with the agreed architecture, testable and maintainable.

## 9. Current business direction

The project is a home-based local-delivery franchise platform.

Core principles currently agreed:

- Base franchise package: AUD $4,995.
- Package includes opening stock with approximately $2,000 cost basis and a target retail value of $3,300+, subject to SKU-level verification.
- Franchisees may supply additional stock themselves through approved/recommended suppliers or retailers such as Coles, subject to the operating model.
- Tech, shelving, furniture and extra stock are optional add-ons rather than mandatory base-package differences.
- Central franchisor website/app is used by franchisees rather than requiring each franchisee to build a separate website.
- Franchise territories are constrained by actual delivery/service coverage.
- Orders are routed server-side to the correct franchise.
- Customer-facing delivery can be free while the actual delivery cost is tracked internally.
- The business can remain available for long periods while actual owner labour is recorded separately.
- Training can include AI-generated content.
- Software should report network/franchise data to the franchisor while respecting privacy and access controls.
- Current royalty concept: 3% through the defined breakeven amount and 6% on turnover above that amount. The exact contractual threshold remains configurable and must be legally/commercially validated.
- A 20% reserve / 80% owner-allocation layer has been discussed as part of the economics and must be implemented as configurable business logic, not an immutable assumption.

## 10. Earned-hours model — latest direction

The project has deliberately moved away from assuming every owner wants a fixed number of hours or full-time income.

The preferred model works **from desired economic return and actual sales**, because this is a home business where productive work accumulates with orders.

The system must distinguish:

- storefront availability hours;
- actual work hours;
- sales;
- contribution available for owner work;
- earned hours.

Actual work hours are recorded from work sessions. Availability does not count as labour.

Earned hours are an internal management metric calculated from verified contribution divided by a configured wage benchmark. It is **not** a statement about employment status, tax, pension or government-benefit eligibility.

The dashboard should make the relationship visible:

`actual work → sales → contribution → earned hours`

The key question becomes:

> How much economic return did the business generate for each hour I actually worked?

This is a core product concept and should not be lost when implementation accelerates.

## 11. Current product architecture

The intended platform consists of:

- central customer web experience;
- franchisee dashboard/mobile app;
- franchisor admin portal;
- backend API;
- relational database;
- territory/service-area engine;
- order lifecycle engine;
- delivery-provider adapter;
- inventory/purchasing;
- payment integration;
- accounting/export integration;
- training/content system;
- AI business coach;
- network analytics/reporting;
- Windows/PWA experience;
- Android/iPhone experience using the shared backend.

## 12. Existing project history

Before this GitHub repository was used as the source of truth, the project was developed through iterative prototype ZIPs up to approximately v14. The major concepts from those prototypes have been consolidated into this repository documentation.

Earlier prototype stages covered:

- franchise application and territory review;
- $4,995 package and automatic provisioning concept;
- stock allocation;
- central storefront;
- service-area routing;
- order lifecycle;
- delivery adapter;
- franchisee dashboard;
- work-session tracking;
- stock/reorder alerts;
- lifestyle-first workload concept;
- earned-hours direction.

The prototype ZIPs are not the production source of truth. GitHub is.

## 13. What not to assume

Do not assume:

- every franchisee wants full-time income;
- every franchisee wants to work 100 hours/month;
- a pensioner has a universal 100-hour legal limit;
- gross sales equal owner income;
- free delivery has no cost;
- the $3,300+ stock value is automatically proven without a SKU list and pricing evidence;
- the 3%/6% royalty threshold has been legally finalised;
- the 20%/80% layer is legally/accounting final until documented and validated;
- a prototype is production-ready merely because it runs locally.

## 14. Immediate priority

Build the production foundation in this order:

1. project/runtime structure;
2. database migrations;
3. authentication and role model;
4. franchise tenancy/isolation;
5. financial calculation engine with tests;
6. earned-hours engine with tests;
7. service-area/order routing;
8. franchisee dashboard;
9. customer storefront;
10. inventory and purchasing;
11. delivery provider integration;
12. payments/refunds;
13. accounting/export;
14. franchisor analytics;
15. AI coaching;
16. mobile/Windows packaging;
17. security, privacy, compliance and production hardening.

## 15. Collaboration principle

**ChatGPT and Manus are complementary, not competing implementations.**

ChatGPT should challenge assumptions and preserve business/product coherence. Manus should turn agreed requirements into working software and verify implementation. Both should leave a clear trail in GitHub.

When in doubt, preserve the user's latest explicit decision and document the uncertainty rather than silently inventing a rule.
