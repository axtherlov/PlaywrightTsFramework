## Description: Test data factory pattern, file locations, and usage rules

# Test Data

## What Is a Test Data Factory?

A test data factory is a class with a static `build()` method that returns a fully populated model object with realistic randomized values. It keeps spec files free of hardcoded strings and makes edge-case variants easy to produce via overrides.

## File Locations

| Type      | Directory                         | Naming           |
| --------- | --------------------------------- | ---------------- |
| Factories | `src/lib/ui/[appName]/test-data/` | `[name].data.ts` |
| Models    | `src/lib/ui/[appName]/model/`     | `[name].ts`      |

## Factory Pattern

Define the model interface in `model/`, then create the factory in `test-data/`:

```typescript
// src/lib/ui/[appName]/model/registration-info.ts
export interface RegistrationInfo {
    gender: "Male" | "Female";
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName?: string;
    newsletter?: boolean;
}
```

Depending on the case Faker might or might not be needed

```typescript
// src/lib/ui/[appName]/test-data/registration.data.ts
import { faker } from "@faker-js/faker";
import { RegistrationInfo } from "../model/registration-info";

export class RegistrationData {
    /**
     * Builds a valid RegistrationInfo object with randomized values.
     * Pass overrides to replace specific fields for negative or edge-case tests.
     * @param {Partial<RegistrationInfo>} overrides - Fields to override.
     * @returns {RegistrationInfo}
     */
    static build(overrides?: Partial<RegistrationInfo>): RegistrationInfo {
        return {
            gender: faker.helpers.arrayElement(["Male", "Female"]),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12, memorable: false }),
            ...overrides,
        };
    }
}
```

## Usage in Spec Files

Call `build()` with no arguments for the happy path. Pass overrides for negative or edge-case variants — only the fields that differ need to be specified:

```typescript
import { RegistrationData } from "../../../lib/ui/[appName]/test-data/registration.data";

// Happy path — all fields randomized
await registerPage.register(RegistrationData.build());

// Edge case — override only the field under test
await registerPage.register(
    RegistrationData.build({ email: "not-a-valid-email" }),
);
await registerPage.register(RegistrationData.build({ gender: "Female" }));
```

## Rules

### Use faker for All Random Values

**NEVER** hardcode names, emails, or passwords. Use `@faker-js/faker` so each test run generates fresh data:

```typescript
// FORBIDDEN -- hardcoded values
firstName: "John",
email: `testuser_${Date.now()}@example.com`,

// CORRECT -- faker generated
firstName: faker.person.firstName(),
email: faker.internet.email(),
```

### Model Interface Lives Separately

The model interface goes in `model/`, not inside the factory file. Page objects and flows import the model directly — they must not depend on the factory class.

### Factory Classes Are Test-Only

Factory classes are used exclusively in spec files and test setup. **Never** import a factory inside a page object or flow.

### One Factory per Model

Each model has its own factory class. Do not create a single factory that returns multiple unrelated models.
