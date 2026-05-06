## Description: Page Object Model pattern, locator getters, component composition, and registration

## File Locations

| Type | Directory | Naming |
|------|-----------|--------|
| Page objects | `src/lib/ui/[appName]/page-objects/` | `[name].page.ts` |
| Components | `src/lib/ui/[appName]/page-objects/` | `[name].component.ts` |

## Page Object Pattern

```typescript
import { expect, Locator, Page } from '@playwright/test';

export class ExamplePage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Description of the element. */
    get submitButton(): Locator {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    /** Description of the element. */
    get emailInput(): Locator {
        return this.page.getByLabel('Email');
    }

    // ==================== Actions ====================

    /**
     * Description of what the action does.
     * @param {string} email - The user's email address.
     * @returns {Promise<void>}
     */
    async submitForm(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.submitButton.click();
        await this.page.waitForResponse((r) => r.url().includes('/api/submit'));
    }
}
```

## Rules

### Locators as Getters

ALWAYS define locators as `get` accessor properties returning `Locator`. This ensures fresh locator evaluation on every access:

```typescript
// CORRECT
get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
}

// WRONG -- storing as a property means stale references
readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
```

### Constructor Pattern

Use `private readonly page: Page` in the constructor:

```typescript
constructor(private readonly page: Page) {}
```

### Action Methods

- Methods should represent **complete user actions** (e.g., `login()`, `submitForm()`).
- Include success verification inside the method when appropriate (e.g., `loginAndVerify()`).
- Always specify the appropriate return type (e.g `Locator`, `Promise<void>`)
- Add JSDoc comments with `@param` and `@returns`.

### Imports in Page Objects

Page objects import from `@playwright/test` (not from `test-options.ts`):

```typescript
import { expect, Locator, Page } from '@playwright/test';
```

## Component Composition

Reusable UI fragments (headers, modals, sidebars) are defined as **components** and composed into page objects:

```typescript
import { Locator, Page } from '@playwright/test';

export class NavigationComponent {
    constructor(private readonly page: Page) {}

    get homeLink(): Locator {
        return this.page.getByRole('link', { name: 'Home' });
    }

    async clickHome(): Promise<void> {
        await this.homeLink.click();
    }

    async logout(): Promise<void> {
        await this.page.getByTestId('user-menu-button').click();
        await this.page.getByRole('button', { name: 'Logout' }).click();
    }
}
```
Compose components into page objects:

```typescript
// src/lib/ui/[appName]/page-objects/dashboard.page.ts
import { Page } from '@playwright/test';
import { NavigationComponent } from './navigation.component';

export class DashboardPage {
    readonly nav: NavigationComponent;

    constructor(private readonly page: Page) {
        this.nav = new NavigationComponent(page);
    }
}

// Usage in tests
await dashboardPage.nav.clickHome();
await dashboardPage.nav.logout();
```
## Registering New Page Objects

After creating a page object, register it in `src/lib/ui/[appName]/fixtures/pages.fixture.ts`:

1. Import the class.
2. Add the type to `PageFixtures`.
3. Add the fixture definition.

```typescript
import { test as base } from '@playwright/test';
import { AppPage } from '../page-objects/app.page';
import { DashboardPage } from '../page-objects/dashboard.page';

export type PagesFixtures = {
    appPage: AppPage;
    dashboardPage: DashboardPage; // Add type
    resetStorageState: () => Promise<void>;
};

export const test = base.extend<PagesFixtures>({
    appPage: async ({ page }, use) => {
        await use(new AppPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page)); // Add fixture
    },
    resetStorageState: async ({ context }, use) => {
        await use(async () => {
            await context.clearCookies();
            await context.clearPermissions();
        });
    },
});
```

## Exploration Before Generation

When creating page objects for a real application, **navigate to the page first** to discover:
- Element roles, labels, and accessible names
- Form field structure and validation behavior
- Button names and available user actions
- Dynamic content, loading states, or conditional UI

This ensures accurate selectors instead of guessing.