import test, { Locator, Page } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";

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

    /** All remove buttons in the cart. No accessible name — identified by CSS class. */
    get removeButtons(): Locator {
        return this.page.locator("button.remove-btn");
    }

    /** Update cart submit button (triggered programmatically by remove-btn clicks). */
    get updateCartButton(): Locator {
        return this.page.locator("#updatecart");
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
     * Removes all items from the cart. No-op when the cart is already empty.
     * @returns {Promise<void>}
     */
    async clearCart(): Promise<void> {
        await test.step(`Step: ${this.clearCart.name}`, async () => {
            await this.page.goto(`${envConfig.baseUrl}/cart`);
            const count = await this.removeButtons.count();
            for (let i = 0; i < count; i++) {
                await this.removeButtons.first().click();
                await this.page.waitForLoadState("networkidle");
            }
        });
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
