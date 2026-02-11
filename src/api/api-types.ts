export type AuthType = "Bearer" | "Token" | "Basic";

export type ApiRequestParams = {
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    url: string;
    baseUrl?: string;
    body?: Record<string, unknown> | null;
    headers?: string;
    authType?: AuthType;
};

export type ApiRequestResponse<T = unknown> = {
    status: number;
    body: T;
};

// define the function signature as a type
export type ApiRequestFn = <T = unknown>(
    params: ApiRequestParams,
) => Promise<ApiRequestResponse<T>>;

// grouping them all together
export type ApiRequestMethods = {
    apiRequest: ApiRequestFn;
};
