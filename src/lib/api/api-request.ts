import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { AuthType } from "./api-types";

type RequestOptions = {
    data?: Record<string, unknown> | null;
    headers?: Record<string, string>;
};

type ApiRequestParams = {
    request: APIRequestContext;
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    url: string;
    baseUrl?: string;
    body?: Record<string, unknown> | null;
    headers?: string;
    authType?: AuthType;
};

function buildAuthHeader(token?: string, authType: AuthType = "Bearer"): Record<string, string> {
    if (!token) return {};
    return { Authorization: `${authType} ${token}` };
}

function buildOptions(body?: Record<string, unknown> | null, token?: string, authType?: AuthType): RequestOptions {
    const options: RequestOptions = {
        headers: {
            "Content-Type": "application/json",
            ...buildAuthHeader(token, authType),
        },
    };
    if (body) options.data = body;
    return options;
}

export async function apiRequest({
    request,
    method,
    url,
    baseUrl,
    body = null,
    headers,
    authType,
}: ApiRequestParams): Promise<{ status: number; body: unknown }> {
    const fullUrl = baseUrl ? `${baseUrl}${url}` : url;
    const options = buildOptions(body ?? undefined, headers, authType);

    const dispatch: Record<string, (url: string, opts: RequestOptions) => Promise<APIResponse>> = {
        GET:    (u, o) => request.get(u, o),
        POST:   (u, o) => request.post(u, o),
        PUT:    (u, o) => request.put(u, o),
        DELETE: (u, o) => request.delete(u, o),
        PATCH:  (u, o) => request.patch(u, o),
    };

    const fn = dispatch[method.toUpperCase()];
    if (!fn) throw new Error(`Unsupported HTTP method: ${method}`);

    const response = await fn(fullUrl, options);
    const status = response.status();
    const contentType = response.headers()["content-type"] ?? "";

    let bodyData: unknown = null;
    try {
        if (contentType.includes("application/json")) {
            bodyData = await response.json();
        } else if (contentType.includes("text/")) {
            bodyData = await response.text();
        }
    } catch (err) {
        console.warn(`Failed to parse response body for status ${status}: ${err}`);
    }

    return { status, body: bodyData };
}
