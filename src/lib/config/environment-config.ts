import invariant from "tiny-invariant";

export const envConfig = {
    baseUrl: getBaseUrl(),
    apiUrl: getApiUrl(),
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
