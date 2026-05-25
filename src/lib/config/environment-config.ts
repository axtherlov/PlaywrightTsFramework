import { z } from "zod";

const envSchema = z.object({
    BASE_URL: z.string().min(1, "Cannot run tests without BASE_URL"),
    API_URL: z.string().min(1, "Cannot run tests without API_URL"),
    ADMIN_EMAIL: z.string().min(1, "Cannot run tests without ADMIN_EMAIL"),
    ADMIN_PASSWORD: z.string().min(1, "Cannot run tests without ADMIN_PASSWORD"),
    AUTH_TYPE: z.enum(["basic", "oauth"]).default("basic"),
    AUTH_TOKEN_URL: z.string().optional(),
});

const env = envSchema.parse(process.env);

export const envConfig = {
    baseUrl: env.BASE_URL,
    apiUrl: env.API_URL,
    adminEmail: env.ADMIN_EMAIL,
    adminPassword: env.ADMIN_PASSWORD,
    authType: env.AUTH_TYPE === "oauth" ? "Bearer" : "Basic",
    authTokenUrl: env.AUTH_TOKEN_URL,
};
