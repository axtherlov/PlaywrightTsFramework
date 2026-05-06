import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/nopCommerce/fixtures/ui.fixture";

test.describe("Register", () => {
    test(
        "should register a new user successfully",
        { tag: "@smoke" },
        async ({ registerPage }) => {
            await test.step("GIVEN user is on the register page", async () => {
                await registerPage.goto();
            });

            await test.step("WHEN user fills in the registration form and submits", async () => {
                await registerPage.register({
                    gender: "Male",
                    firstName: "John",
                    lastName: "Doe",
                    email: `testuser_${Date.now()}@example.com`,
                    password: "Test@1234",
                });
            });

            await test.step("THEN registration confirmation is displayed", async () => {
                await expect(
                    registerPage.registrationConfirmation,
                    "Expect: Registration confirmation message should be visible",
                ).toBeVisible();
            });
        },
    );
});
