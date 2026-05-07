import test, { Page } from "@playwright/test";

export class ProductListPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get productList() {
        return this.page.locator(".item-grid .item-box");
    }

    async addRandomProductToCart() {
        const count = await this.productList.count();
        if (count === 0) {
            throw new Error("No products found in product list");
        }
        const randomIndex = Math.floor(Math.random() * count);
        const randomProduct = this.productList.nth(randomIndex);
        await randomProduct
            .getByRole("button", { name: "Add to cart" })
            .click();
    }

    async goToBuildCustomComputer() {
        await test.step(`Step: ${this.goToBuildCustomComputer.name}`, async () => {
            await this.page
                .getByRole("link", { name: "Build your own computer" })
                .first()
                .click();
        });
    }
}
