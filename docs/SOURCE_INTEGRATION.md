# Managed Franchise Hub source integration

## Status

This document records the controlled source snapshot staged for the owner-approved canonical integration task in GitHub issue #5. The application source is located at [`apps/franchise-hub/`](../apps/franchise-hub/) on branch `agent/manus/source-integration` and is pending code review through a pull request.

## Source origin

The initial snapshot originated from the managed **Franchise Hub** full-stack workspace at checkpoint `69aeb7ef`. The open integration branch was subsequently synchronised through managed checkpoint `12be6e21` with the OAuth recovery/preflight hardening and franchisee-only review-queue boundary fix. It represents the existing dashboard/reporting and franchisor-review foundation, not the complete customer commerce and delivery platform described by the repository architecture.

## Included

The snapshot includes application source, package manifests and lockfile, database schema and migration files, server and client code, shared business-logic modules, automated tests, runtime configuration source, and the application production-readiness documentation.

## Deliberately excluded

The integration excludes credentials, environment-variable files, OAuth/session state, database contents, user or franchisee business data, local logs, `node_modules`, production build output, managed deployment artifacts, and any action that changes the live managed deployment.

## Verification boundary

The canonical source snapshot has passed the following commands from `apps/franchise-hub/` on the integration branch:

```bash
git diff --check
pnpm test
pnpm check
pnpm build
```

The latest completed results were: `git diff --check` passed; `pnpm test` passed with 14 test files and 28 tests; `pnpm check` completed without TypeScript errors; and `pnpm build` completed successfully. The production build retains the previously known non-blocking Rollup warning that the Recharts client bundle exceeds 500 kB after minification. No validation command accessed production data or changed the live deployment.

The existing managed deployment remains the live environment during this source-integration pull request. No database migration, secret transfer, OAuth configuration change, or production release is part of issue #5.

## Remaining platform scope

The staged application implements a tenant-scoped monthly performance, coaching, audit, review, and Trends foundation. It does not yet implement the canonical platform’s franchise/membership model, full role model, territory resolution, central catalogue, customer checkout, payment processing, order lifecycle, inventory movements, delivery integration, work-session capture, accounting export, training, or mobile/Windows packaging.
