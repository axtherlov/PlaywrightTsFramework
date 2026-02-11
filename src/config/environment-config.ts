import invariant from "tiny-invariant";

export const envConfig = {
    baseUrl: getBaseUrl(),
    apiUrlSut2: getApiUrlSut2(),
};

function getBaseUrl() {
    const baseUrl = process.env["BASE_URL"];
    invariant(baseUrl, "Cannot run tests without BASE_URL");
    return baseUrl;
}

function getApiUrlSut2() {
    const apiURL = process.env["API_URL_SUT2"];
    invariant(apiURL, "Cannot run tests without API_URL_SUT2");
    return apiURL;
}
