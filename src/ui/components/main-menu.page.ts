import test, { Page } from "@playwright/test";

export class MainMenu {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get shoppingCartButton() {
        return this.page.locator("#topcartlink");
    }

    async openShoppingCart() {
        await test.step(`Step: ${this.openShoppingCart.name}`, async () => {
            await this.shoppingCartButton.click();
        });
    }
}
