import test, { Locator, Page, expect } from "@playwright/test";
import { log } from "../../../helpers/logger";

export class ProductDetailsPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Quantity input on the product details page. */
    get quantityInput(): Locator {
        return this.page.getByRole("textbox", { name: "Enter a quantity" });
    }

    /** Add to cart button on the product details page. */
    get cartButton(): Locator {
        return this.page.getByRole("button", { name: "Add to cart" });
    }

    /** Success notification shown after a product is added to the cart. */
    get productAddedToCartMessage(): Locator {
        return this.page.getByText("The product has been added to");
    }

    /** Close button on the add-to-cart success notification bar. No button role — identified by its title attribute. */
    get closeMessageButton(): Locator {
        return this.page.getByTitle("Close");
    }

    // ==================== Actions ====================

    /**
     * Sets the product quantity field to the given value.
     * @param {number} quantity - The quantity to set.
     * @returns {Promise<void>}
     */
    async setProductQuantity(quantity: number): Promise<void> {
        await test.step(`Step: ${this.setProductQuantity.name}`, async () => {
            await this.quantityInput.click();
            await this.quantityInput.fill(quantity.toString());
        });
    }

    /**
     * Clicks Add to cart and waits for the success notification before closing it.
     * @returns {Promise<void>}
     */
    async addToCart(): Promise<void> {
        await test.step(`Step: ${this.addToCart.name}`, async () => {
            await this.cartButton.click();
            await expect(this.productAddedToCartMessage.first()).toBeVisible();
            await this.closeSuccessMessage();
        });
    }

    /**
     * Closes the add-to-cart success notification.
     * @returns {Promise<void>}
     */
    async closeSuccessMessage(): Promise<void> {
        await test.step(`Step: ${this.closeSuccessMessage.name}`, async () => {
            await this.closeMessageButton.click();
        });
    }
}
