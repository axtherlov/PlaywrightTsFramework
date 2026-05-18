## Description: Fixture dependency injection pattern and fixture creation rules

# Fixtures and Dependency Injection

## Core Rule

**ALWAYS** use fixtures for dependency injection. **NEVER** instantiate page objects manually in test files.

```typescript
// CORRECT -- use the fixture
test('example', async ({ appPage }) => {
    await appPage.openHomePage();
});

// FORBIDDEN -- manual instantiation
test('example', async ({ page }) => {
    const appPage = new AppPage(page); // NEVER do this
});
```

## Existing fixtures
- flow.fixture  
- pages.fixture (pom.fixture for nopCommerce)

## Fixture Architecture

```
src/lib/ui/[appName]/fixtures/main.fixture.ts     ← Single import point (merges all fixtures)
    ├── src/lib/ui/[appName]/fixtures/pages.fixture.ts   ← Page object fixtures (pom.fixture.ts for nopCommerce)
    └── src/lib/ui/[appName]/fixtures/flow.fixture.ts   ← Business flow fixture where multiple pageobjects can be involved
```

`main.fixture.ts` uses `mergeTests()` to combine fixture layers:

When fixtures are added for "Pages" or "flows", add them in the main.fixture.ts as its the main reference place

```typescript
import { mergeTests } from "@playwright/test";
import { test as pomTest } from "./pages.fixture";
import { test as flowTest } from "./flow.fixture";

export const test = mergeTests(pomTest, flowTest);
```
## Single Import Point

All test files MUST import `test` and `expect` from the merged fixture file:

```typescript
import { expect, test } from '../../../lib/ui/[appName]/fixtures/main.fixture';
```
**NEVER** import from `@playwright/test` in spec files:

```typescript
// FORBIDDEN in spec files
import { test, expect } from '@playwright/test';
```

## Adding a New Fixture

### Step 1: Create the fixture file

```typescript
// src/lib/ui/[appName]/fixtures/[name].fixture.ts
import { test as base } from '@playwright/test';
import { MyNewPage } from '../page-objects/my-new.page';

export type MyFixtures = {
    myNewPage: MyNewPage;
};

export const test = base.extend<MyFixtures>({
    myNewPage: async ({ page }, use) => {
        await use(new MyNewPage(page));
    },
});
```

### Step 2: Register in `pages.fixture.ts`

For page objects, add directly to the existing fixture:

```typescript
// src/lib/ui/[appName]/fixtures/pages.fixture.ts
export type PagesFixtures = {
    appPage: AppPage;
    myNewPage: MyNewPage; // Add the type
    resetStorageState: () => Promise<void>;
};

export const test = base.extend<PagesFixtures>({
    appPage: async ({ page }, use) => {
        await use(new AppPage(page));
    },
    myNewPage: async ({ page }, use) => {
        await use(new MyNewPage(page)); // Add the fixture
    },
    resetStorageState: async ({ context }, use) => {
        await use(async () => {
            await context.clearCookies();
            await context.clearPermissions();
        });
    },
});
```
### Step 3: Merge into `main.fixture.ts` (only for new fixture categories)

If adding a completely new fixture category (not a page object), merge it:

```typescript
const test = mergeTests(pageObjectFixture, apiRequestFixture, newCategoryFixture);
```

## Rules

**NEVER** have locatores in any fixture file. they have to be located in the `[Name].page.ts` or `[name].component`