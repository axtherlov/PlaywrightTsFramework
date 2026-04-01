import test, { Page } from "@playwright/test";

export class ShoppingCartPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get agreeTermsButton() {
        return this.page.getByRole("checkbox", {
            name: "I agree with the terms of",
        });
    }

    get checkoutButton() {
        return this.page.getByRole("button", { name: "Checkout" });
    }

    private productRow(productName: string) {
        return this.page.locator(`//span[.='${productName}']/ancestor::tr`);
    }

    async isProductInTheList(productName: string) {
        const cells = this.productRow(productName).locator("td");
        const count = await cells.count();
        return count > 0;
    }

    async checkout() {
        await test.step(`Step: ${this.checkout.name}`, async () => {
            await this.agreeTermsButton.click();
            await this.checkoutButton.click();
        });
    }
}
