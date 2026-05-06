import { test as base } from "@playwright/test";
import { apiRequest as apiRequestOriginal } from "../plain-function";
import {
    ApiRequestMethods,
    ApiRequestFn,
    ApiRequestParams,
    ApiRequestResponse,
} from "../api-types";

export const test = base.extend<ApiRequestMethods>({
    /**
     * Provides a function to make API requests.
     * Uses the Playwright request context for HTTP calls.
     *
     * @param {object} request - The request object.
     * @param {function} use - The use function to provide the API request function.
     */
    apiRequest: async ({ request }, use) => {
        const apiRequestFn: ApiRequestFn = async <
            TResponse = unknown,
            TBody = unknown,
        >({
            method,
            url,
            baseUrl,
            body = null,
            headers,
            authType,
        }: ApiRequestParams<TBody>): Promise<ApiRequestResponse<TResponse>> => {
            const response = await apiRequestOriginal({
                request,
                method,
                url,
                baseUrl,
                body: body as Record<string, unknown> | null,
                headers,
                authType,
            });

            return {
                status: response.status,
                body: response.body as TResponse,
            };
        };

        await use(apiRequestFn);
    },
});
