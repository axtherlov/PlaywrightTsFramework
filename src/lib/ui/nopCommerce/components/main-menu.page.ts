import test, { Locator, Page } from "@playwright/test";

export class MainMenu {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Shopping cart icon/link in the top navigation bar. */
    get shoppingCartButton(): Locator {
        return this.page.getByRole("link", { name: "Shopping cart" }).first();
    }

    // ==================== Actions ====================

    /**
     * Clicks the shopping cart link in the top navigation bar.
     * @returns {Promise<void>}
     */
    async openShoppingCart(): Promise<void> {
        await test.step(`Step: ${this.openShoppingCart.name}`, async () => {
            await this.shoppingCartButton.click();
        });
    }
}
