import { envConfig } from "../../../config/environment-config";
import { ApiRequestFn } from "../../api-types";

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
