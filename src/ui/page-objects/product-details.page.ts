import test, { Page, expect } from "@playwright/test";
import { log } from "../../core/helpers/logger";

export class ProductDetailsPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get quantityInput() {
        return this.page.getByRole("textbox", { name: "Enter a quantity" });
    }

    get cartButton() {
        return this.page.getByRole("button", { name: "Add to cart" });
    }

    get productAddedToCartMessage() {
        return this.page.getByText("The product has been added to");
    }

    get closeMessageButton() {
        return this.page.getByTitle("Close");
    }

    async setProductQuantity(quantity: number) {
        await test.step(`Step: ${this.setProductQuantity.name}`, async () => {
            await this.quantityInput.click();
            await this.quantityInput.fill(quantity.toString());
        });
    }

    async addToCart() {
        await test.step(`Step: ${this.addToCart.name}`, async () => {
            await this.cartButton.click();
            await expect(this.productAddedToCartMessage.first()).toBeVisible();
            await this.closeSuccessMessage();
        });
    }

    async closeSuccessMessage() {
        await test.step(`Step: ${this.closeSuccessMessage.name}`, async () => {
            await this.closeMessageButton.click();
        });
    }
}
