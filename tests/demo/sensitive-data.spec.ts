import { test, expect } from "@playwright/test";

test.describe("Sensitive Data Test", () => {
  test(`read sensitive data from dotenv file`, async ({ page }, testInfo) => {

    const envConfig = testInfo.project.use as any;

    await page.goto(envConfig.appURL);
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // 2. Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

    // Successful login
    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
  });
});
