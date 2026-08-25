# Managed Franchise Hub source integration

## Status

This document records the controlled source snapshot staged for the owner-approved canonical integration task in GitHub issue #5. The application source is located at [`apps/franchise-hub/`](../apps/franchise-hub/) on branch `agent/manus/source-integration` and is pending code review through a pull request.

## Source origin

The initial snapshot originated from the managed **Franchise Hub** full-stack workspace at checkpoint `69aeb7ef`. The open integration branch was subsequently synchronised through managed checkpoint `12be6e21` with the OAuth recovery/preflight hardening and franchisee-only review-queue boundary fix. It represents the existing dashboard/reporting and franchisor-review foundation, not the complete customer commerce and delivery platform described by the repository architecture.

## Included

The snapshot includes application source, package manifests and lockfile, database schema and migration files, server and client code, shared business-logic modules, automated tests, runtime configuration source, and the application production-readiness documentation. Development diagnostics remain available only through the Vite development server; the browser collector source is not a production public asset.

## Deliberately excluded

The integration excludes credentials, environment-variable files, OAuth/session state, database contents, user or franchisee business data, local logs, `node_modules`, production build output, managed deployment artifacts, and any action that changes the live managed deployment. Production builds also exclude the browser debug collector and its telemetry endpoint; the production static server explicitly returns `404` for those collector routes.

## Verification boundary

The canonical source snapshot has passed the following commands from `apps/franchise-hub/` on the integration branch:

```bash
git diff --check
rm -rf node_modules && pnpm install --frozen-lockfile --ignore-scripts
pnpm test
pnpm check
pnpm build
```

The latest completed results were: `git diff --check` passed; a clean, scripts-disabled frozen install completed successfully; `pnpm test` passed with 15 test files and 30 tests; `pnpm check` completed without TypeScript errors; and `pnpm build` completed successfully. The production bundle was checked to confirm that it contains neither a collector script reference nor a collector public asset. The production build retains the previously known non-blocking Rollup warning that the Recharts client bundle exceeds 500 kB after minification. No validation command accessed production data or changed the live deployment.

The frozen-install repair moves the Tailwind transitive override and Wouter patched-dependency declaration from the ignored `package.json` `pnpm` field into `pnpm-workspace.yaml`. It also corrects the Wouter patch hunk's source line to 337 and regenerates the lockfile's patched-dependency hash. This repair was first reproduced and verified in an isolated disposable copy, then independently verified from an empty `node_modules` directory on this integration branch. The application behaviour and pinned Wouter version remain unchanged.

On 25 August 2026, the owner approved a bounded privacy remediation after verification showed that the former production build loaded the browser debug collector. The collector source now lives outside `client/public`, the diagnostic Vite plugin runs only in development, and production static routing denies the collector script and telemetry endpoint. Focused tests cover the protected route boundary. This remediation changes neither business data nor application calculations, authentication, OAuth, database schema, tenancy model, merge state, or deployment configuration.

The existing managed deployment remains the live environment during this source-integration pull request. No database migration, secret transfer, OAuth configuration change, or production release is part of issue #5.

## Remaining platform scope

The staged application implements a tenant-scoped monthly performance, coaching, audit, review, and Trends foundation. It does not yet implement the canonical platform’s franchise/membership model, full role model, territory resolution, central catalogue, customer checkout, payment processing, order lifecycle, inventory movements, delivery integration, work-session capture, accounting export, training, or mobile/Windows packaging.
