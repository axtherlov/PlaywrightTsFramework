import invariant from "tiny-invariant";

export const envConfig = {
    baseUrl: getBaseUrl(),
    apiUrl: getApiUrl(),
    adminEmail: getAdminEmail(),
    adminPassword: getAdminPassword(),
    authType: getAuthType(),
    authTokenUrl: getAuthTokenUrl(),
};

function getBaseUrl() {
    const baseUrl = process.env["BASE_URL"];
    invariant(baseUrl, "Cannot run tests without BASE_URL");
    return baseUrl;
}

function getApiUrl() {
    const apiURL = process.env["API_URL"];
    invariant(apiURL, "Cannot run tests without API_URL");
    return apiURL;
}

/** Admin account email loaded from ADMIN_EMAIL env variable. */
function getAdminEmail() {
    const adminEmail = process.env["ADMIN_EMAIL"];
    invariant(adminEmail, "Cannot run tests without ADMIN_EMAIL");
    return adminEmail;
}

/** Admin account password loaded from ADMIN_PASSWORD env variable. */
function getAdminPassword() {
    const adminPassword = process.env["ADMIN_PASSWORD"];
    invariant(adminPassword, "Cannot run tests without ADMIN_PASSWORD");
    return adminPassword;
}

function getAuthType(): string {
    const authType = process.env["AUTH_TYPE"] ?? "basic";
    invariant(
        authType === "basic" || authType === "oauth",
        `AUTH_TYPE must be "basic" or "oauth", got "${authType}"`,
    );
    return authType === "oauth" ? "Bearer" : "Basic";
}

function getAuthTokenUrl(): string | undefined {
    return process.env["AUTH_TOKEN_URL"] || undefined;
}
