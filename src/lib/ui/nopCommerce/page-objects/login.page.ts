import test, { Locator, Page } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";

export class LoginPage {
    constructor(private readonly page: Page) {}

    async goto(): Promise<void> {
        await this.page.goto(`${envConfig.baseUrl}/login`);
    }

    // ==================== Locators ====================

    /** Page heading. */
    get heading(): Locator {
        return this.page.getByRole("heading", {
            name: "Welcome, Please Sign In!",
        });
    }

    /** Email input. */
    get emailInput(): Locator {
        return this.page.getByRole("textbox", { name: "Email:" });
    }

    /** Password input. */
    get passwordInput(): Locator {
        return this.page.getByRole("textbox", { name: "Password:" });
    }

    /** Log in button. */
    get loginButton(): Locator {
        return this.page.getByRole("button", { name: "Log in" });
    }

    // ==================== Actions ====================

    /**
     * Logs in with the provided credentials.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<void>}
     */
    async login(email: string, password: string): Promise<void> {
        await test.step(`Step: ${this.login.name}`, async () => {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
    }
}
