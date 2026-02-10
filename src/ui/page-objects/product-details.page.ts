import { Page, expect } from "@playwright/test";
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

    async SetProductQuantity(quantity: number) {
        await this.quantityInput.click();
        await this.quantityInput.fill(quantity.toString());
    }

    async AddToCart() {
        await this.cartButton.click();
        await expect(this.productAddedToCartMessage.first()).toBeVisible();
        await this.CloseSuccessMessage();
    }

    async CloseSuccessMessage() {
        await this.closeMessageButton.click();
    }
}
