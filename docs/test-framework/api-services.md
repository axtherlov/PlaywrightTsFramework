## Description: API service class pattern, authentication, file locations, and registration rules

# API Services

## What Is an API Service?

An API service is a class that encapsulates **HTTP interactions with a specific resource**. Each service maps to one backend resource (e.g. products, users) and exposes typed methods that make requests and assert the response status.

Services never construct fixtures or read env vars directly for request params — they receive `ApiRequestFn`, `authToken`, and `authType` via constructor injection.

## File Locations

| Type         | Directory                                     | Naming                        |
| ------------ | --------------------------------------------- | ----------------------------- |
| Services     | `src/lib/api/[appName]/services/`             | `[name].service.ts`           |
| Endpoints    | `src/lib/api/[appName]/services/endpoints.ts` | fixed filename                |
| Payloads     | `src/lib/api/[appName]/payloads/`             | `[action]-[name].payload.ts`  |
| Contracts    | `src/lib/api/[appName]/contracts/`            | `[action]-[name].contract.ts` |

## Service Pattern

```typescript
import { expect } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";
import type { ApiRequestFn, AuthType } from "../../api-types";
import { ExampleContract } from "../schemas/get-example.contract";
import { ExampleEndpoints } from "./endpoints";

export class ExampleService {
    constructor(
        private readonly apiRequest: ApiRequestFn,
        private readonly authToken: string,
        private readonly authType: AuthType,
    ) {}

    async getAll(): Promise<ExampleContract[]> {
        const { status, body } = await this.apiRequest<ExampleContract[]>({
            method: "GET",
            url: ExampleEndpoints.getAll,
            baseUrl: envConfig.apiUrl,
            headers: this.authToken,
            authType: this.authType,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as ExampleContract[];
    }
}
```

## Endpoints

Define all URL paths for a resource in `endpoints.ts` as a plain object — no logic except parameterised path builders:

```typescript
export const ExampleEndpoints = {
    getAll: "/Example/GetAll",
    getById: (id: string) => `/Example/GetById/${id}`,
    create: "/Example/Create",
};
```

## Authentication

Authentication is handled by `AuthService` and injected into every service via the fixture layer. Services never acquire tokens themselves — they only forward `authToken` and `authType` on each request.

### How it works

| `AUTH_TYPE` in `.env` | `authType` header scheme | Token source                          |
| --------------------- | ------------------------ | ------------------------------------- |
| `basic`               | `Basic`                  | base64(`ADMIN_EMAIL:ADMIN_PASSWORD`)  |
| `oauth`               | `Bearer`                 | POST to `AUTH_TOKEN_URL` → `access_token` |

### AuthService

```typescript
// src/lib/api/[appName]/services/auth.service.ts
export class AuthService {
    constructor(private readonly apiRequest: ApiRequestFn) {}

    async getToken(): Promise<string> {
        if (envConfig.authType === "Basic") {
            return Buffer.from(
                `${envConfig.adminEmail}:${envConfig.adminPassword}`,
            ).toString("base64");
        }

        const { status, body } = await this.apiRequest<{ access_token: string }>({
            method: "POST",
            url: envConfig.authTokenUrl!,
            body: {
                username: envConfig.adminEmail,
                password: envConfig.adminPassword,
            },
        });

        if (status !== 200) {
            throw new Error(`OAuth token request failed with status ${status}`);
        }

        return (body as { access_token: string }).access_token;
    }
}
```

## Payloads

A payload is an **interface** that defines the request body shape for a mutating operation (POST, PUT, PATCH). It is never a class — no constructor, no methods.

```typescript
// src/lib/api/[appName]/payloads/create-product.payload.ts
import { ProductType } from "../../../ui/eaWebApp/enums/product-type.enum";

export interface CreateProductPayload {
    id: number;
    name: string;
    description: string;
    price: number;
    productType: ProductType;
}
```

### Rules

- **ALWAYS** use an `interface`, never a `class`.
- **NEVER** include optional fields unless the API genuinely accepts them as optional.
- Reuse enums from `src/lib/ui/[appName]/enums/` for typed fields (e.g. `ProductType`).
- Name the file after the HTTP action and resource: `create-product.payload.ts`, `update-order.payload.ts`.

## Contracts

A contract is an **interface** that defines the expected response body shape. It is the source of truth for what the API returns and drives response assertions in the service.

```typescript
// src/lib/api/[appName]/contracts/get-products.contract.ts
export interface GetProductsContract {
    id: number;
    name: string;
    description: string;
    price: number;
    productType: number;
}
```

### Rules

- **ALWAYS** use an `interface`, never a `class`.
- Model the shape exactly as the API returns it — do not add fields that aren't in the response.
- Use `number` for enum-backed fields that the API returns as integers (e.g. `productType: number`).
- Name the file after the HTTP action and resource: `get-products.contract.ts`, `get-order-by-id.contract.ts`.
- Use the contract as the generic type argument in the service method:

```typescript
const { body } = await this.apiRequest<GetProductsContract[]>({ ... });
return body as GetProductsContract[];
```

## Rules

### Constructor Pattern

Every service takes `apiRequest`, `authToken`, and `authType` — always in this order:

```typescript
constructor(
    private readonly apiRequest: ApiRequestFn,
    private readonly authToken: string,
    private readonly authType: AuthType,
) {}
```

### Assert Inside the Service

Status and body assertions belong inside the service method, not in the spec file:

```typescript
// CORRECT -- assertions inside the service
async getAll(): Promise<ExampleContract[]> {
    const { status, body } = await this.apiRequest<ExampleContract[]>({ ... });
    expect(status).toBe(200);
    expect(body).toBeTruthy();
    return body as ExampleContract[];
}

// FORBIDDEN -- raw request called from the spec
test("should get all", async ({ apiRequest }) => {
    const { status } = await apiRequest({ method: "GET", url: "/Example/GetAll" });
    expect(status).toBe(200);
});
```

### Always Forward Auth

Every `apiRequest` call inside a service must include `headers` and `authType`:

```typescript
// CORRECT
await this.apiRequest({
    method: "GET",
    url: ExampleEndpoints.getAll,
    baseUrl: envConfig.apiUrl,
    headers: this.authToken,
    authType: this.authType,
});

// FORBIDDEN -- unauthenticated request
await this.apiRequest({
    method: "GET",
    url: ExampleEndpoints.getAll,
    baseUrl: envConfig.apiUrl,
});
```

## Registering a New Service

After creating a service, register it in `src/lib/api/[appName]/fixtures/api-services.fixture.ts`:

1. Import the class.
2. Add the type to `ApiServices`.
3. Add the fixture definition, injecting `apiRequest`, `authToken`, and `authType`.

```typescript
import { mergeTests } from "@playwright/test";
import { test as authTest } from "./auth.fixture";
import { ProductService } from "../services/product.service";
import { ExampleService } from "../services/example.service"; // Add import

type ApiServices = {
    productService: ProductService;
    exampleService: ExampleService; // Add type
};

export const test = mergeTests(authTest).extend<ApiServices>({
    productService: async ({ apiRequest, authToken, authType }, use) => {
        await use(new ProductService(apiRequest, authToken, authType));
    },
    exampleService: async ({ apiRequest, authToken, authType }, use) => {
        await use(new ExampleService(apiRequest, authToken, authType)); // Add fixture
    },
});
```
