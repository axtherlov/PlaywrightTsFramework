import { Browser } from "@playwright/test";
export const globalState: { browser: Browser | undefined } = {
    browser: undefined,
};
