# description: Enum conventions, naming, and usage rules

## File Locations

| Type               | Directory                     | Naming                          |
| ------------------ | ----------------------------- | ------------------------------- |
| App-specific enums | `src/lib/ui/[appName]/enums/` | `[name]-enum.ts` or `[name].ts` |

## Rules

### Use Enums for Repeated Strings

Define enums for any string value used in more than one place: UI messages, API endpoint paths, storage state paths, roles, etc.

```typescript
// CORRECT -- enum for repeated strings
import { Messages } from "../enums/[name]-enum"; // or '../enums/[name]' depending on file naming
await expect(page.getByText(Messages.LOGIN_ERROR)).toBeVisible();

// FORBIDDEN -- hardcoded string used in multiple places
await expect(page.getByText("Invalid email or password")).toBeVisible();
```

### Naming Convention

- **Enum names**: PascalCase (e.g., `Messages`, `ApiEndpoints`, `Roles`)
- **Enum values**: SCREAMING_SNAKE_CASE (e.g., `LOGIN_SUCCESS`, `CURRENT_USER`)

```typescript
export enum ApiEndpoints {
    LOGIN = "/api/users/login",
    CURRENT_USER = "/api/users/me",
}
```

### When to Create a New Enum File

Create a new enum file when a group of related string constants doesn't fit an existing enum (e.g., `enums/checkout.ts` for checkout-related constants). Keep related constants together -- prefer adding to an existing enum file over creating a new one when the constants belong to the same domain.

### JSDoc Comments

Add JSDoc comments to enum declarations:

```typescript
/** Common UI messages displayed to the user */
export enum Messages {
    LOGIN_SUCCESS = "Successfully logged in",
    LOGIN_ERROR = "Invalid email or password",
}
```
