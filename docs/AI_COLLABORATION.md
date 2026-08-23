# AI Collaboration Protocol — ChatGPT + Manus

**Repository:** `darrinbaldwindev/Franchise`

**Owner:** Darrin — final product, commercial and technical decision authority.

**Status:** Active collaboration protocol, 23 August 2026.

## 1. Purpose

This repository is being developed collaboratively by Darrin, ChatGPT and Manus, with optional Manus sub-agents. The goal is to allow the AI team to operate with broad autonomy while preserving one shared source of truth, clear accountability and protected human decisions.

The repository is the source of truth for implementation. The continuity files are the source of truth for project decisions, handoffs and unresolved questions.

## 2. Autonomous operating mandate

When Darrin says **"continue autonomously"** or **"cont"**, that is standing permission for the AI team to continue the project without seeking routine confirmation.

This mandate applies equally to **ChatGPT, Manus and authorised Manus sub-agents**, subject to the capabilities and permissions actually available to each agent/runtime.

In practical terms, each authorised agent may, within its available tools and repository permissions:

- inspect the repository, issues, pull requests, commits and relevant implementation;
- determine the next sensible project task;
- research information needed to make progress;
- create or update documentation and technical specifications;
- create issues/tasks for another agent;
- implement appropriate code or configuration where its environment permits;
- inspect and test existing implementation where its environment permits;
- identify bugs, gaps, contradictions and risks;
- improve tests and validation;
- coordinate work through GitHub rather than through the user as a messenger;
- update its own continuity log;
- update `SHARED.md` when the overall project state changes;
- make reasonable, reversible, low-risk technical/productivity decisions without waiting for approval;
- continue to the next logical task when the current task exposes an obvious dependent task;
- stop only when a protected human decision or unavailable capability genuinely blocks progress.

**Important:** This is an operating mandate, not a grant of technical permissions that the platform does not actually provide. An agent cannot give itself GitHub, deployment, filesystem, account, API, billing or other permissions that its runtime does not possess.

### Equal-agent principle

Manus and its authorised sub-agents should be treated as having the **same autonomy standard as ChatGPT**, not as passive assistants waiting for instructions. Each agent should independently inspect the current state, make reasonable decisions within scope, execute what it can, document its work and hand off through the repository.

The difference between agents is **capability/tooling and area of responsibility**, not a requirement that one agent behave as a subordinate chatbot.

## 3. Decision boundaries

Autonomous agents should use the following rule:

### Decide and proceed

For decisions that are low-risk, reversible, implementation-specific or organisational, choose the sensible option and document it where material.

Examples:

- folder/file structure;
- naming;
- test organisation;
- non-material UI choices;
- documentation format;
- implementation sequencing;
- routine refactoring;
- choosing between equivalent technical approaches.

### Document assumption and proceed

For decisions that are material but reversible, record the assumption in the relevant continuity log and continue wherever practical.

### Stop and request Darrin's decision

Do not silently decide on matters that materially change:

- franchise pricing or fees;
- royalty percentages or thresholds;
- franchisee economics;
- customer promises or guarantees;
- legal obligations or franchise disclosure commitments;
- tax/accounting treatment;
- regulatory compliance positions;
- ownership/IP rights;
- privacy/data-sharing policy;
- significant irreversible architecture or vendor commitments;
- deletion of important production data/code;
- external financial commitments;
- destructive deployment actions.

If an existing explicit Darrin decision already covers the matter, follow that decision and continue.

## 4. Introductions

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

Manus is an autonomous AI agent/productivity system. Based on current public descriptions and project evidence, its strengths include autonomous multi-step task execution, web/browser interaction, research, coding, file creation/editing, software-building workflows, testing and longer autonomous development tasks.

For this project, Manus should be particularly useful for:

- repository-scale implementation;
- creating and modifying application files;
- running/building/testing software in its available environment;
- browser-based research and verification;
- executing multi-step development tasks autonomously;
- turning the agreed architecture into working application components;
- inspecting existing implementation and identifying gaps;
- packaging/deploying where its environment permits.

Manus must add its own first-hand capabilities, limitations and current project state to `docs/continuity/MANUS.md`. Public capability descriptions are not a substitute for first-hand verification.

## 5. Minimal agent-to-agent exchange

The preferred introduction exchange is short:

1. ChatGPT states its strengths and asks Manus to state its strengths/capabilities and current project state.
2. Manus replies with its strengths/capabilities and state.
3. ChatGPT acknowledges and proceeds.

Do not create a long conversational loop. Durable information belongs in the repository.

## 6. Three continuity logs

Use exactly three primary continuity documents:

### `docs/continuity/CHATGPT.md`

ChatGPT's working log.

### `docs/continuity/MANUS.md`

Manus's working/implementation log.

### `docs/continuity/SHARED.md`

The authoritative merged continuity state.

Both agents must read `SHARED.md` before substantial work. Each agent updates its own log after substantial work and updates `SHARED.md` when the overall project state materially changes.

## 7. Continuity Steward

If Manus can run a sub-agent, create a **Continuity Steward**.

Its mission is to keep the logs and implementation aligned, not to become a competing product decision-maker.

It should:

- compare `CHATGPT.md` with `MANUS.md`;
- compare both against `SHARED.md`;
- inspect recent commits and relevant changed files;
- detect contradictions;
- detect material decisions missing from the shared log;
- check documentation against implementation where it can verify the facts;
- identify stale or unresolved handoffs;
- check that business/financial/KPI/Earned Hours rules remain configurable and are not silently hard-coded;
- produce a concise continuity status;
- update `SHARED.md` when the reconciliation is factual and unambiguous;
- create/update a GitHub Issue when human or agent review is required.

The Steward has the same autonomous operating mandate as the other agents **within its specific continuity scope**.

It must not:

- invent business decisions;
- override Darrin;
- rewrite either agent's personal continuity log;
- merge competing implementations;
- delete/revert work simply because logs disagree;
- declare software production-ready merely because a build passes;
- silently resolve material commercial, legal, financial, product or architectural disagreements.

## 8. Recommended continuity schedule

The initial recommended operating schedule is:

### Every 6 hours

Lightweight scan of the three logs, recent commits and obvious implementation/documentation divergence.

### On every push to `main`

Fast validation that continuity files exist and identify changes that may require reconciliation.

### Weekly

Deeper review of architecture, financial model, requirements, continuity logs, recent implementation, issues and pull requests.

**Manus has final say on the operational implementation of this schedule.** If its actual sub-agent/runtime supports a better event-driven or less frequent design, Manus should use that design and document the rationale in `MANUS.md` and `SHARED.md`.

If a persistent scheduled sub-agent is unavailable, use the closest reliable mechanism, such as a scheduled GitHub workflow, and document the limitation.

Suggested states:

- `GREEN — SYNCHRONIZED`
- `AMBER — RECONCILIATION REQUIRED`
- `RED — MATERIAL CONFLICT`

## 9. Same-repository rules

### Before editing

1. Read `docs/continuity/SHARED.md`.
2. Read the relevant agent log if context is needed.
3. Inspect current files being changed.
4. Check recent commits.
5. Do not assume an earlier ZIP, generated artifact or chat transcript is newer than GitHub.

### While editing

- Prefer small coherent commits.
- Do not overwrite another agent's work merely because a local copy is older/newer.
- Keep business rules in documented/configurable locations.
- Avoid hard-coding assumptions that have not been approved.
- Add tests for financial calculations and critical order/routing logic.
- If another agent owns the implementation, create a clear task rather than duplicating the implementation.

### After editing

1. Update the agent's continuity log.
2. Update `SHARED.md` with material changes.
3. Record commit hash/message where practical.
4. State what remains unverified.

## 10. Branch/commit policy

For small, isolated changes, an agent may commit to `main` if repository permissions and current governance allow it.

For larger changes, use a feature branch and pull request so another agent can review the work before merge.

Recommended commit prefixes:

- `docs:` documentation/requirements
- `feat:` new product functionality
- `fix:` bug fix
- `refactor:` structural code change
- `test:` tests
- `chore:` tooling/configuration
- `research:` research findings that materially affect the project

## 11. Conflict policy

If agents disagree:

1. Check `SHARED.md` for an existing decision.
2. If there is a confirmed Darrin decision, follow it.
3. If no decision exists, do not silently choose a commercially material assumption.
4. Record the disagreement in `SHARED.md`.
5. Continue unrelated work where possible.
6. Ask Darrin only when the decision is genuinely required.

Technical implementation choices can normally be resolved by the agent best positioned to verify the implementation, provided the choice remains consistent with the agreed architecture and is documented.

## 12. Current business direction

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

## 13. Earned-hours model — latest direction

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

## 14. Current product architecture

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

## 15. Existing project history

Before this GitHub repository was used as the source of truth, the project was developed through iterative prototype ZIPs up to approximately v14. The major concepts from those prototypes have been consolidated into this repository documentation.

The prototype ZIPs are historical reference only. GitHub is the production source of truth unless Darrin explicitly changes that decision.

## 16. What not to assume

Do not assume:

- every franchisee wants full-time income;
- every franchisee wants to work 100 hours/month;
- a pensioner has a universal 100-hour legal limit;
- gross sales equal owner income;
- free delivery has no cost;
- the $3,300+ stock value is automatically proven without SKU-level evidence;
- the 3%/6% royalty threshold has been legally finalised;
- the 20%/80% layer is legally/accounting final until documented and validated;
- a prototype is production-ready merely because it runs locally.

## 17. Immediate priority

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

## 18. Collaboration principle

**ChatGPT, Manus and authorised sub-agents are complementary autonomous agents, not competing implementations.**

All are expected to inspect state, make reasonable decisions within their scope, execute what they can, test/verify where possible, document their work and hand off through GitHub.

The distinction is capability/tooling and assigned scope—not that one agent must wait passively for another.

When in doubt, preserve Darrin's latest explicit decision and document uncertainty rather than silently inventing a rule.
