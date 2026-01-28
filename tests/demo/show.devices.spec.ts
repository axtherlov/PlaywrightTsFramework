import { test, devices } from "@playwright/test";

test("Should display devices in use", async ({ page }) => {
    console.log(`>> The list of devices: ${Object.keys(devices)}`);
});