## Description: Flow class pattern, file locations, and registration rules

# Flows

## What Is a Flow?

A flow is a class that encapsulates a **multi-step business journey** spanning more than one page object. Use flows when the same sequence of actions is needed across multiple tests — this avoids duplicating orchestration logic inside spec files.

A flow does **not** own locators. It composes page objects and calls their action methods in sequence.

## File Locations

| Type  | Directory                     | Naming           |
| ----- | ----------------------------- | ---------------- |
| Flows | `src/lib/ui/[appName]/flows/` | `[name].flow.ts` |

## Flow Pattern

```typescript
import test, { Page } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";

export class MainFlow {
    constructor(private readonly page: Page) {}

    /**
     * Navigates to the application home page.
     * @returns {Promise<void>}
     */
    async navigateToHomePage(): Promise<void> {
        await test.step(`Step: ${this.navigateToHomePage.name}`, async () => {
            await this.page.goto(envConfig.baseUrl);
        });
    }
}
```

## When to Create a Flow vs a Page Object Action

| Scenario                                                   | Where it belongs          |
| ---------------------------------------------------------- | ------------------------- |
| Single page interaction (fill a form, click a button)      | Page object action method |
| Journey that crosses more than one page object             | Flow method               |
| Setup shared by many tests (e.g. navigate to home, log in) | Flow method               |

## Rules

### Constructor Pattern

Use `private readonly page: Page` — the same as page objects:

```typescript
constructor(private readonly page: Page) {}
```

### No Locators in Flows

Flows **NEVER** define locators. All element interactions go through page object methods:

```typescript
// CORRECT -- flow calls page object methods
async addProductAndCheckout(): Promise<void> {
    await this.productDetailsPage.addToCart();
    await this.mainMenu.openShoppingCart();
    await this.shoppingCartPage.checkout();
}

// FORBIDDEN -- locator defined inside a flow
async addProductAndCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to cart' }).click(); // NEVER
}
```

### Wrap Steps with `test.step()`

Every flow method must wrap its body in a `test.step()` for readable HTML report output:

```typescript
async navigateToHomePage(): Promise<void> {
    await test.step(`Step: ${this.navigateToHomePage.name}`, async () => {
        await this.page.goto(envConfig.baseUrl);
    });
}
```

### JSDoc on Every Method

```typescript
/**
 * Logs in and navigates to the home page.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise<void>}
 */
async loginAndGoHome(email: string, password: string): Promise<void> { ... }
```

## Registering a New Flow

After creating a flow, register it in `src/lib/ui/[appName]/fixtures/flow.fixture.ts`:

1. Import the class.
2. Add the type to `Flows`.
3. Add the fixture definition.

```typescript
import { test as customTest } from "@playwright/test";
import { MainFlow } from "../flows/main.flow";
import { PurchaseFlow } from "../flows/purchase.flow"; // Add import

type Flows = {
    mainFlow: MainFlow;
    purchaseFlow: PurchaseFlow; // Add type
};

const flows = customTest.extend<Flows>({
    mainFlow: async ({ page }, use) => {
        await use(new MainFlow(page));
    },
    purchaseFlow: async ({ page }, use) => {
        await use(new PurchaseFlow(page)); // Add fixture
    },
});

export const test = flows;
```

`flow.fixture.ts` is already merged into `merge.fixture.ts` — no further changes needed when adding a flow to an existing app.
