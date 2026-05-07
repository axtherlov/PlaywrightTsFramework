import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/nopCommerce/fixtures/merge.fixture";
import { RegisterMessages } from "../../../lib/ui/nopCommerce/enums/register-enum";

test.describe("Register", () => {
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.goto();
    });

    test(
        "should register a new user successfully",
        { tag: "@smoke" },
        async ({ registerPage }) => {
            const uniqueEmail = `testuser_${Date.now()}@example.com`;

            await test.step("GIVEN the user is on the register page", async () => {
                await expect(registerPage.heading).toBeVisible();
            });

            await test.step("WHEN the user fills in valid registration details and submits", async () => {
                await registerPage.register({
                    gender: "Male",
                    firstName: "John",
                    lastName: "Doe",
                    email: uniqueEmail,
                    password: "Password123",
                });
            });

            await test.step("THEN a success confirmation message is displayed", async () => {
                await expect(
                    registerPage.registrationSuccessMessage,
                ).toHaveText(RegisterMessages.REGISTRATION_COMPLETED);
            });
        },
    );

    test(
        "should show validation errors when submitting empty form",
        { tag: "@functional" },
        async ({ registerPage }) => {
            await test.step("GIVEN the user is on the register page", async () => {
                await expect(registerPage.heading).toBeVisible();
            });

            await test.step("WHEN the user submits the form without filling any fields", async () => {
                await registerPage.registerButton.click();
            });

            await test.step("THEN required field errors are displayed", async () => {
                await expect(registerPage.firstNameError).toHaveText(
                    RegisterMessages.FIRST_NAME_REQUIRED,
                );
                await expect(registerPage.lastNameError).toHaveText(
                    RegisterMessages.LAST_NAME_REQUIRED,
                );
                await expect(registerPage.emailRequiredError).toHaveText(
                    RegisterMessages.EMAIL_REQUIRED,
                );
                await expect(registerPage.passwordRequiredError).toHaveText(
                    RegisterMessages.PASSWORD_REQUIRED,
                );
            });
        },
    );

    test(
        "should show validation error for invalid email format",
        { tag: "@functional" },
        async ({ registerPage }) => {
            await test.step("GIVEN the user is on the register page", async () => {
                await expect(registerPage.heading).toBeVisible();
            });

            await test.step("WHEN the user submits with an invalid email format", async () => {
                await registerPage.register({
                    gender: "Female",
                    firstName: "Jane",
                    lastName: "Smith",
                    email: "not-a-valid-email",
                    password: "Password123",
                });
            });

            await test.step("THEN an invalid email error is displayed", async () => {
                await expect(registerPage.emailInvalidError).toHaveText(
                    RegisterMessages.EMAIL_INVALID,
                );
            });
        },
    );
});
