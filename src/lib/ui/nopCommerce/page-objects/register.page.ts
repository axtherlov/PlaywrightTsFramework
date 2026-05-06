import { Locator, Page } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";

export class RegisterPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Male gender radio button. */
    get maleRadio(): Locator {
        return this.page.getByRole("radio", { name: "Male", exact: true });
    }

    /** Female gender radio button. */
    get femaleRadio(): Locator {
        return this.page.getByRole("radio", { name: "Female", exact: true });
    }

    /** First name input field. */
    get firstNameInput(): Locator {
        return this.page.getByLabel("First name:");
    }

    /** Last name input field. */
    get lastNameInput(): Locator {
        return this.page.getByLabel("Last name:");
    }

    /** Email input field. */
    get emailInput(): Locator {
        return this.page.getByLabel("Email:");
    }

    /** Company name input field. */
    get companyNameInput(): Locator {
        return this.page.getByLabel("Company name:");
    }

    /** Newsletter subscription checkbox. */
    get newsletterCheckbox(): Locator {
        return this.page.getByLabel("Newsletter:");
    }

    /** Password input field. */
    get passwordInput(): Locator {
        return this.page.getByRole("textbox", {
            name: "Password:",
            exact: true,
        });
    }

    /** Confirm password input field. */
    get confirmPasswordInput(): Locator {
        return this.page.getByLabel("Confirm password:");
    }

    /** Register submit button. */
    get registerButton(): Locator {
        return this.page.getByRole("button", { name: "Register" });
    }

    /** Success confirmation message shown after registration. */
    get registrationConfirmation(): Locator {
        return this.page.getByText("Your registration completed");
    }

    // ==================== Actions ====================

    /** Navigate to the register page. */
    async goto(): Promise<void> {
        await this.page.goto(`${envConfig.baseUrl}/register`);
    }

    /**
     * Fill in the registration form and submit.
     * @param {object} data - Registration form data.
     * @param {'Male' | 'Female'} data.gender - Gender selection.
     * @param {string} data.firstName - First name.
     * @param {string} data.lastName - Last name.
     * @param {string} data.email - Email address.
     * @param {string} data.password - Password.
     * @param {string} [data.company] - Optional company name.
     * @param {boolean} [data.newsletter] - Whether to subscribe to newsletter.
     * @returns {Promise<void>}
     */
    async register(data: {
        gender?: "Male" | "Female";
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        company?: string;
        newsletter?: boolean;
    }): Promise<void> {
        if (data.gender === "Male") await this.maleRadio.click();
        if (data.gender === "Female") await this.femaleRadio.click();

        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.emailInput.fill(data.email);

        if (data.company) await this.companyNameInput.fill(data.company);

        if (data.newsletter === false) await this.newsletterCheckbox.uncheck();

        await this.passwordInput.fill(data.password);
        await this.confirmPasswordInput.fill(data.password);

        await this.registerButton.click();
    }
}
