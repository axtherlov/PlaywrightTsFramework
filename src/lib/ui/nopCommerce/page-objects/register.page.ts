import test, { Locator, Page } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";
import { RegistrationInfo } from "../model/registration-info";

export class RegisterPage {
    constructor(private readonly page: Page) {}

    async goto(): Promise<void> {
        await test.step(`Step: ${this.goto.name}`, () =>
            this.page.goto(`${envConfig.baseUrl}/register?returnUrl=%2F`),
        );
    }

    // ==================== Locators ====================

    /** Page heading. */
    get heading(): Locator {
        return this.page.getByRole("heading", { name: "Register" });
    }

    /** Male gender radio button. */
    get maleRadio(): Locator {
        return this.page.getByRole("radio", { name: "Male", exact: true });
    }

    /** Female gender radio button. */
    get femaleRadio(): Locator {
        return this.page.getByRole("radio", { name: "Female", exact: true });
    }

    /** First name input. */
    get firstNameInput(): Locator {
        return this.page.getByLabel("First name:");
    }

    /** Last name input. */
    get lastNameInput(): Locator {
        return this.page.getByLabel("Last name:");
    }

    /** Email input. */
    get emailInput(): Locator {
        return this.page.getByLabel("Email:");
    }

    /** Company name input. */
    get companyNameInput(): Locator {
        return this.page.getByLabel("Company name:");
    }

    /** Newsletter subscription checkbox. */
    get newsletterCheckbox(): Locator {
        return this.page.getByLabel("Newsletter:");
    }

    /** Password input. */
    get passwordInput(): Locator {
        return this.page.getByRole("textbox", {
            name: "Password:",
            exact: true,
        });
    }

    /** Confirm password input. */
    get confirmPasswordInput(): Locator {
        return this.page.getByRole("textbox", { name: "Confirm password:" });
    }

    /** Success message after registration. */
    get registrationSuccessMessage(): Locator {
        return this.page.getByText("Your registration completed");
    }

    /** First name required validation error. */
    get firstNameError(): Locator {
        return this.page.getByText("First name is required.");
    }

    /** Last name required validation error. */
    get lastNameError(): Locator {
        return this.page.getByText("Last name is required.");
    }

    /** Email required validation error. */
    get emailRequiredError(): Locator {
        return this.page.getByText("Email is required.");
    }

    /** Invalid email format validation error. */
    get emailInvalidError(): Locator {
        return this.page.getByText("Please enter a valid email address.");
    }

    /** Password required validation error. */
    get passwordRequiredError(): Locator {
        return this.page.getByText("Password is required.");
    }

    /** Register submit button. */
    get registerButton(): Locator {
        return this.page.getByRole("button", { name: "Register" });
    }

    // ==================== Actions ====================

    /**
     * Fills in and submits the registration form.
     * @param {RegistrationInfo} details - Registration form data.
     * @returns {Promise<void>}
     */
    async register(details: RegistrationInfo): Promise<void> {
        await test.step(`Step: ${this.register.name}`, async () => {
            if (details.gender === "Male") {
                await this.maleRadio.click();
            } else {
                await this.femaleRadio.click();
            }

            await this.firstNameInput.fill(details.firstName);
            await this.lastNameInput.fill(details.lastName);
            await this.emailInput.fill(details.email);

            if (details.companyName) {
                await this.companyNameInput.fill(details.companyName);
            }

            if (details.newsletter === false) {
                await this.newsletterCheckbox.uncheck();
            }

            await this.passwordInput.fill(details.password);
            await this.confirmPasswordInput.fill(details.password);
            await this.registerButton.click();
        });
    }
}
