## description: Test file structure, tagging, step patterns, and import rules

# Test Standards

## Imports

**ALWAYS** import `test` from the merged fixture file and `expect` from `@playwright/test`:

```typescript
import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/[appName]/fixtures/merge.fixture";
```

**NEVER** import `test` from `@playwright/test` in spec files — it must come from the fixture so custom fixtures are available.

## Test File Structure

```typescript
import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/[appName]/fixtures/merge.fixture";

test.describe("Feature Name", () => {
    test.beforeEach(async ({ appPage }) => {
        await appPage.openHomePage();
    });

    test(
        "should do expected behavior",
        { tag: "@smoke" },
        async ({ appPage }) => {
            await test.step("GIVEN initial state", async () => {
                // setup/preconditions
            });

            await test.step("WHEN user performs action", async () => {
                // action
            });

            await test.step("THEN expected result occurs", async () => {
                // assertions
            });
        },
    );
});
```

## Test File Location

| Test Type | Directory                      | Tag                                    |
| --------- | ------------------------------ | -------------------------------------- |
| UI E2E    | `src/tests/[appName]/ui/`      | `@smoke`, `@regression`, `@functional` |
| API       | `src/tests/[appName]/backend/` | `@api`                                 |

## Tagging Rules

### Tags on Individual Tests Only

Apply tags via the `{ tag: '@...' }` option on **individual tests**, **NEVER** on `test.describe()`:

```typescript
// CORRECT
test('should login', { tag: '@smoke' }, async ({ appPage }) => { ... });
test('should login', { tag: ['@smoke', '@functional'] }, async ({ appPage }) => { ... });

// FORBIDDEN -- tags on describe
test.describe('Feature @smoke', () => { ... });
```

### Available Tags

**Importance tags** (pick one):

- `@smoke` -- Critical path, run first and frequently
- `@regression` -- Full regression coverage
- `@functional` -- UI functional tests

## Test Steps (Given/When/Then)

Use `test.step()` for readable structure and better HTML report output:

```typescript
test(
    "should show error for invalid login",
    { tag: "@functional" },
    async ({ appPage }) => {
        await test.step("GIVEN user is on the login page", async () => {
            await expect(appPage.loginButton).toBeVisible();
        });

        await test.step("WHEN user enters invalid credentials", async () => {
            await appPage.login("bad@email.com", "wrongpass");
        });

        await test.step("THEN error message is displayed", async () => {
            await expect(appPage.errorMessage).toBeVisible();
        });
    },
);
```

## Assertions

Use **web-first assertions** only. These auto-wait and retry until the condition is met or timeout:

```typescript
// CORRECT -- web-first assertions
await expect(locator).toBeVisible();
await expect(locator).toHaveText("Expected text");
await expect(locator).toBeEnabled();
await expect(locator).toHaveCount(3);

// FORBIDDEN -- hard waits
await page.waitForTimeout(1000); // NEVER use this
```

## Test Data — Strings and Magic Values

**NEVER** inline product names, SKUs, URLs, or other domain identifiers as raw strings or arrays in spec files. Define them in enums under `src/lib/ui/[appName]/enums/` and import them into the spec.

```typescript
// FORBIDDEN -- raw strings declared inside the spec file
const PRODUCTS = ["Digital Storm VANQUISH Custom Performance PC", "Lenovo IdeaCentre"];
const SKUS = ["DS_VA3_PC", "LE_IC_600"];
```

Define the enum in its own file under the enums directory — **not** in the spec:

```typescript
// src/lib/ui/[appName]/enums/product-enum.ts
export enum ProductEnum {
    DIGITAL_STORM_VANQUISH = "Digital Storm VANQUISH Custom Performance PC",
    LENOVO_IDEACENTRE = "Lenovo IdeaCentre",
}

export enum ProductSkuEnum {
    DIGITAL_STORM_VANQUISH = "DS_VA3_PC",
    LENOVO_IDEACENTRE = "LE_IC_600",
}
```

```typescript
// CORRECT -- enum values used directly inside the test block
import { ProductEnum, ProductSkuEnum } from "../../../lib/ui/[appName]/enums/product-enum";

test(
    "should add multiple products and complete purchase",
    { tag: ["@smoke", "@regression"] },
    async ({ cartFlow, shoppingCartPage }) => {
        await test.step("WHEN the user adds products to the cart", async () => {
            await cartFlow.addProductsToCart([
                ProductEnum.DIGITAL_STORM_VANQUISH,
                ProductEnum.LENOVO_IDEACENTRE,
            ]);
        });

        await test.step("THEN all products are present in the cart", async () => {
            for (const sku of [ProductSkuEnum.DIGITAL_STORM_VANQUISH, ProductSkuEnum.LENOVO_IDEACENTRE]) {
                await expect(shoppingCartPage.productRow(sku)).toBeVisible();
            }
        });
    },
);
```

This applies to any value that represents a known domain constant: product names, SKUs, categories, roles, status labels, etc.

## Data-Driven Tests

Loop **outside** test blocks to generate individual test cases:

```typescript
import testData from "./test-data/invalidCredentials.json";

const { invalidCredentials } = testData;

for (const { description, email, password } of invalidCredentials) {
    test(
        `should show error for ${description}`,
        { tag: "@regression" },
        async ({ appPage }) => {
            await appPage.login(email, password);
            await expect(appPage.errorMessage).toBeVisible();
        },
    );
}
```

## Setup and Teardown

- Use `test.beforeEach()` for per-test setup.
- Use `test.afterEach()` for per-test cleanup when fixtures don't handle it.
- Use `resetStorageState` fixture when testing login flows in authenticated projects:

```typescript
test.beforeEach(async ({ resetStorageState, appPage }) => {
    await resetStorageState();
    await appPage.openHomePage();
});
```

## Destructive Tests

Tests tagged `@destructive` modify shared application state (e.g., deleting data, changing global settings, resetting configurations). They follow strict rules:

### MUST Include Cleanup Hooks

Every `@destructive` test **MUST** use `test.afterEach()` or `test.afterAll()` to revert any state changes, ensuring subsequent tests run against a clean environment:

```typescript
test.describe("admin data management", () => {
    test.afterEach(async ({ apiRequest }) => {
        // REQUIRED: Revert state changes made by the test
        await apiRequest({
            method: "POST",
            url: ApiEndpoints.RESET_DATA,
            baseUrl: process.env.API_URL,
        });
    });

    test(
        "should delete all inactive users",
        { tag: ["@destructive", "@regression"] },
        async ({ apiRequest }) => {
            // Test that modifies shared state
        },
    );
});
```

### Execution Rules

- **Excluded from `npm test`** -- The base command uses `--grep-invert @destructive` to prevent destructive tests from running in parallel with the full suite.
- **Tag-specific commands** (`test:smoke`, `test:api`, etc.) use `--grep` to select only matching tests. If a test is tagged both `@smoke` and `@destructive`, it runs because the author deliberately chose that combination.
- **Dedicated command** -- `npm run test:destructive` runs only destructive tests with `--workers=1` for sequential execution.

## Test Independence

Tests MUST be independent. No test should depend on the outcome or side-effects of another test. Use fixtures and `beforeEach` for shared setup.
