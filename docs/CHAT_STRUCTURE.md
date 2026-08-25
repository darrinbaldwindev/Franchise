# Chat Structure — Franchise

## Purpose

The project now uses separate AI chat contexts for different responsibilities while GitHub remains the shared implementation and continuity source of truth.

## Franchise Main

**Owner:** ChatGPT — project/business lead

Responsibilities:

- overall project direction;
- Franchise #1 opening milestone;
- business model and economics;
- product/pricing research;
- requirements;
- scope control;
- architecture review;
- cross-agent coordination;
- challenge recommendations from Manus/App agents;
- deciding the highest-value next project task within Darrin's existing decisions.

Franchise Main should not duplicate application implementation that belongs in Franchise App/Manus App unless review or a direct repository change is appropriate.

## Franchise App

**Owner:** ChatGPT — application-focused counterpart

Responsibilities:

- application requirements derived from Franchise Main;
- repository/application inspection;
- technical design review;
- code review;
- tests and validation review;
- identifying application blockers;
- reviewing Manus App implementation;
- ensuring application work remains aligned with the Opening #1 checklist;
- reporting material application state back through GitHub continuity.

Franchise App does not become a second product authority. `SHARED.md` and Darrin's explicit decisions remain authoritative.

## Manus App

**Owner:** Manus — application implementation counterpart

Responsibilities:

- application implementation;
- database and API work;
- integrations;
- tests/builds;
- deployment where permitted;
- technical investigation;
- technical recommendations;
- implementation documentation;
- verification of runtime behaviour;
- reporting implementation state through GitHub.

Manus App should independently execute appropriate work rather than waiting for chat-by-chat instructions when the repository state and existing decisions make the next action clear.

## Overseer

The Overseer remains the cross-repository/project oversight role.

It should:

- detect scope creep;
- inspect project health;
- identify contradictions;
- check implementation against documentation;
- flag risks and blockers;
- ensure Opening #1 remains the priority;
- avoid becoming a competing implementation team.

## Continuity Steward

The Continuity Steward reconciles:

- `docs/continuity/CHATGPT.md`
- `docs/continuity/MANUS.md`
- `docs/continuity/SHARED.md`

It should identify stale state and factual contradictions and update shared state when unambiguous.

## Source of truth

**GitHub repository:** implementation truth.

**`docs/continuity/SHARED.md`:** merged project-state truth.

**Darrin:** final business, commercial, legal and irreversible decision authority.

The separate chats are working contexts, not additional sources of truth.

## Agent coordination

Agents should coordinate through GitHub rather than using Darrin as a messenger.

Before substantial work:

1. Read `SHARED.md`.
2. Inspect current implementation/recent commits.
3. Check the Opening #1 checklist.
4. Determine whether the work is actually required now.

After substantial work:

1. Update the relevant agent continuity log.
2. Update `SHARED.md` when overall state materially changes.
3. Record commit SHA where practical.
4. Distinguish reported, automated and independently verified validation.

## Autonomous command

When Darrin says `cont` or `continue autonomously`, each agent should continue the highest-value work within its assigned role and actual tool permissions.

The command does not authorise unnecessary scope expansion.

The current project objective is:

> **Get Franchise #1 to opening stage, then operate, maintain, improve and only then replicate.**

## Work handoff

Preferred flow:

**Franchise Main**
→ requirements/priorities
→ **Franchise App** technical review
→ **Manus App** implementation
→ GitHub validation
→ **Franchise App** review
→ **Franchise Main** project-level decision/reporting

Not every task requires every stage. Agents should avoid unnecessary ceremony for small changes.
