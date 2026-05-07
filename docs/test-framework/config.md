## description: Configuration file conventions and environment variable usage

# Configuration

## File Locations

| Type | Directory | Purpose |
|------|-----------|---------|
| Environments | `environments/` | .env files per each environment |
| config | `src/lib/config/` | Centralized, validated accessor for environment variables |

## Rules

### No Hardcoded URLs or Secrets

**NEVER** hardcode URLs, credentials, or environment-specific values. Always read from `process.env`:

```typescript
// CORRECT
appUrl: process.env["BASE_URL"],

// FORBIDDEN
appUrl: 'https://staging.example.com',
```

### Organization

- **`src/lib/config/environment-config.ts`** -- URLs and settings for the main application under test.

### Adding New Configuration

When adding a new config value:

1. Add the environment variable to `environments/example.env` as a template.
2. Add it to the appropriate config file with a JSDoc comment.
3. Document the variable's purpose in the JSDoc.
4. Update the `envConfig` from `src/lib/config/environment-config.ts` including the new variable as a get method (e.g. `getBaseUrl()`)

```typescript
export const envConfig = {
    /** Frontend application URL loaded from APP_URL env variable */
    appUrl: getBaseUrl(),
};
```
5. Add the get method with the invariant validation

```typescript
function getBaseUrl() {
    const baseUrl = process.env["BASE_URL"];
    invariant(baseUrl, "Cannot run tests without BASE_URL");
    return baseUrl;
}
```