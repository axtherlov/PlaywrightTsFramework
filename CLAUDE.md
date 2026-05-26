# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm ci

# Run tests
npm run test:nopCommerce          # all nopCommerce UI + backend tests
npm run test:eaWebApp             # all eaWebApp UI tests
npm run test:nopCommerce-be       # nopCommerce backend/API tests only

# Run a single test file
npx playwright test src/tests/nopCommerce/ui/purchase.computer.spec.ts

# Run tests by tag
npx playwright test --grep @smoke
npx playwright test --grep @functional

# Run with a specific browser (default: chromium)
BROWSERS=firefox npm run test:nopCommerce

# Lint
npm run lint
npm run lint:fix

# Reports
npm run report:pw        # open Playwright HTML report
npm run report:allure    # serve Allure report (requires allure CLI)
```

## Environment Setup

Copy `environments/example.env` to `environments/local.env` and fill in the values:

```
BASE_URL=        # app under test URL
API_URL=         # API base URL
ADMIN_EMAIL=
ADMIN_PASSWORD=
AUTH_TYPE=       # "basic" or "oauth" (default: basic)
AUTH_TOKEN_URL=  # required only when AUTH_TYPE=oauth
BROWSERS=chromium,firefox  # comma-separated list
```

Environment is selected via the `ENVIRONMENT` variable (defaults to `local`). The config file loaded is `environments/${ENVIRONMENT}.env`. On CI, `ENVIRONMENT` is set to a non-local value which enables retries (2), single worker, and `forbidOnly`.

## Architecture

### Project structure

Two applications under test, each with their own layer stack:

- **nopCommerce** — e-commerce UI app (`src/tests/nopCommerce/`, `src/lib/ui/nopCommerce/`)
- **eaWebApp** — internal web app with both UI and API tests (`src/tests/eaWebApp/`, `src/lib/ui/eaWebApp/`, `src/lib/api/eaWebApp/`)

### Fixture system (key concept)

Tests never import page objects directly. Instead, they import from a merged fixture:

```
src/lib/ui/nopCommerce/fixtures/merge.fixture.ts
  ├── pom.fixture.ts   → exposes all page object instances (signIn, checkout, mainMenu, etc.)
  └── flow.fixture.ts  → exposes higher-level flows (mainFlow, cartFlow)
```

Tests use `import { test } from "../../../lib/ui/nopCommerce/fixtures/merge.fixture"` and destructure the fixture in test params.

For API tests, the chain is: `api-request.fixture` → `auth.fixture` → `api-services.fixture` (which exposes `productService`).

### Layer responsibilities

| Layer | Location | Purpose |
|---|---|---|
| Page Objects | `src/lib/ui/*/page-objects/` | Raw page interactions, locators |
| Components | `src/lib/ui/*/components/` | Reusable UI fragments (menus, etc.) |
| Flows | `src/lib/ui/nopCommerce/flows/` | Multi-step orchestration across pages |
| Models | `src/lib/ui/*/model/` | TypeScript types for test data |
| Test Data | `src/lib/ui/*/test-data/` | Static data builders (use `.build()` pattern) |
| Enums | `src/lib/ui/*/enums/` | Typed constants for selectors and options |
| API Services | `src/lib/api/eaWebApp/services/` | API call wrappers |
| Contracts | `src/lib/api/eaWebApp/contracts/` | Zod schemas for API response validation |
| Payloads | `src/lib/api/eaWebApp/payloads/` | Zod schemas for request body validation |

### Test structure convention

Tests follow Given/When/Then using `test.step()`:

```ts
await test.step("GIVEN ...", async () => { ... });
await test.step("WHEN ...", async () => { ... });
await test.step("THEN ...", async () => { ... });
```

Tags are applied via `{ tag: "@smoke" }` in the test definition.

### API request layer

`src/lib/api/api-request.ts` is a generic HTTP wrapper used by all API services. It handles auth headers, JSON parsing, and method dispatch. API services call this function directly rather than using `request.get/post` from Playwright.

### Config

`src/lib/config/environment-config.ts` uses Zod to validate all required env vars at startup. Validated values are exported as `envConfig` (camelCase). Always import `envConfig`, never read `process.env` directly in tests or page objects.

### Reporters

Three reporters run simultaneously: Playwright HTML (`reports/playwright-report`), JUnit XML (`reports/junit/results.xml`), and Allure (`reports/allure-results`). The `reports/` folder is deleted at the start of every run by `global-setup.ts`. On local runs, `global-teardown.ts` auto-launches the Allure report.

### Browser projects

UI tests match `*.spec.ts` (excluding `*.api.spec.ts`). API tests match `*.api.spec.ts` and run under the `api` project (no browser). Active browsers are filtered from the `BROWSERS` env var at config load time.
