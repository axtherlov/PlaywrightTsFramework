import test, { Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Terms of service agreement checkbox. */
    get agreeTermsButton(): Locator {
        return this.page.getByRole("checkbox", {
            name: "I agree with the terms of",
        });
    }

    /** Checkout button that proceeds from the cart to the checkout flow. */
    get checkoutButton(): Locator {
        return this.page.getByRole("button", { name: "Checkout" });
    }

    // ==================== Locator methods ====================

    /**
     * Returns the cart row for the given product SKU.
     * @param {string} productName - The product SKU displayed in the cart table.
     * @returns {Locator}
     */
    private productRow(productName: string): Locator {
        return this.page.locator(`//span[.='${productName}']/ancestor::tr`);
    }

    // ==================== Actions ====================

    /**
     * Returns true when the product SKU is present as a line item in the cart.
     * @param {string} productName - The product SKU to look for.
     * @returns {Promise<boolean>}
     */
    async isProductInTheList(productName: string): Promise<boolean> {
        const cells = this.productRow(productName).locator("td");
        const count = await cells.count();
        return count > 0;
    }

    /**
     * Accepts the terms of service and clicks the Checkout button.
     * @returns {Promise<void>}
     */
    async checkout(): Promise<void> {
        await test.step(`Step: ${this.checkout.name}`, async () => {
            await this.agreeTermsButton.click();
            await this.checkoutButton.click();
        });
    }
}
