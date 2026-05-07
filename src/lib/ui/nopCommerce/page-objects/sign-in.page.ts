import test, { Locator, Page } from "@playwright/test";

export class SignIn {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Button to proceed through checkout without creating an account. */
    get checkoutAsGuestButton(): Locator {
        return this.page.getByRole("button", { name: "Checkout as Guest" });
    }

    // ==================== Actions ====================

    /**
     * Clicks the "Checkout as Guest" button on the sign-in step.
     * @returns {Promise<void>}
     */
    async checkoutAsGuest(): Promise<void> {
        await test.step(`Step: ${this.checkoutAsGuest.name}`, async () => {
            await this.checkoutAsGuestButton.click();
        });
    }
}
