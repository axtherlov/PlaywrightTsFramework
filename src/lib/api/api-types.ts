export type AuthType = "Bearer" | "Token" | "Basic";

export type ApiRequestParams<TBody = unknown> = {
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    url: string;
    baseUrl?: string;
    body?: TBody | null;
    headers?: string;
    authType?: AuthType;
};

export type ApiRequestResponse<TResponse = unknown> = {
    status: number;
    body: TResponse;
};

export type ApiRequestFn = <TResponse = unknown, TBody = unknown>(
    params: ApiRequestParams<TBody>,
) => Promise<ApiRequestResponse<TResponse>>;

export type ApiRequestMethods = {
    apiRequest: ApiRequestFn;
};
