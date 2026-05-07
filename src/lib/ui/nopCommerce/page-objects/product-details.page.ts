import test, { Locator, Page, expect } from "@playwright/test";
import { log } from "../../../helpers/logger";

export class ProductDetailsPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Quantity input on the product details page. */
    get quantityInput(): Locator {
        return this.page.getByRole("textbox", { name: "Enter a quantity" });
    }

    /** Add to cart button for the main product. CSS class distinguishes it from related-product buttons on the same page. */
    get cartButton(): Locator {
        return this.page.locator("button.add-to-cart-button");
    }

    /** Success notification shown after a product is added to the cart. */
    get productAddedToCartMessage(): Locator {
        return this.page.getByText("The product has been added to");
    }

    /** Close button on the add-to-cart success notification bar. No button role — identified by its title attribute. */
    get closeMessageButton(): Locator {
        return this.page.getByTitle("Close");
    }

    // ==================== Locator methods ====================

    /**
     * Returns the attribute select dropdown whose label matches the given text.
     * nopCommerce renders all attributes in a single <dl> with <dt>/<dd> pairs
     * that are not linked via for/id, so getByLabel() cannot associate them.
     * XPath following-sibling targets the <dd> immediately after the matching <dt>.
     * @param {string} labelText - The visible label text (e.g. "Size", "Color").
     * @returns {Locator}
     */
    private attributeSelect(labelText: string): Locator {
        return this.page
            .locator(`dt:has(label:text-is("${labelText}")) + dd select`);
    }

    // ==================== Actions ====================

    /**
     * Selects the given size from the Size attribute dropdown.
     * @param {string} size - The display text of the size option (e.g. "9").
     * @returns {Promise<void>}
     */
    async selectShoeSize(size: string): Promise<void> {
        await test.step(`Step: ${this.selectShoeSize.name}`, async () => {
            await this.attributeSelect("Size").selectOption({ label: size });
        });
    }

    /**
     * Selects the given color from the Color attribute dropdown.
     * @param {string} color - The display text of the color option (e.g. "White/Blue").
     * @returns {Promise<void>}
     */
    async selectShoeColor(color: string): Promise<void> {
        await test.step(`Step: ${this.selectShoeColor.name}`, async () => {
            await this.attributeSelect("Color").selectOption({ label: color });
        });
    }

    /**
     * Selects the given print from the Print image-radio attribute.
     * Print options are rendered as image squares with a tooltip-header label — not a <select>.
     * @param {string} print - The display name of the print (e.g. "Natural", "Fresh").
     * @returns {Promise<void>}
     */
    async selectShoePrint(print: string): Promise<void> {
        await test.step(`Step: ${this.selectShoePrint.name}`, async () => {
            await this.page
                .locator(`dt:has(label:text-is("Print")) + dd li`)
                .filter({ hasText: print })
                .locator("label")
                .click();
        });
    }

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
