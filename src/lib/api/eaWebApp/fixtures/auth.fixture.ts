import { test as base } from "../../api-request.fixture";
import { AuthService } from "../services/auth.service";
import { envConfig } from "../../../config/environment-config";
import type { AuthType } from "../../api-types";

type AuthFixtures = {
    authToken: string;
    authType: AuthType;
};

export const test = base.extend<AuthFixtures>({
    authToken: async ({ apiRequest }, use) => {
        const token = await new AuthService(apiRequest).getToken();
        await use(token);
    },
    authType: async ({}, use) => {
        await use(envConfig.authType as AuthType);
    },
});
