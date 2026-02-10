import { Page } from "@playwright/test";

export class ProductListPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get productList() {
        return this.page.locator(".item-grid .item-box");
    }

    async AddRandomProductToCart() {
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

    async GoToBuildCustomComputer() {
        await this.page
            .getByRole("article")
            .filter({ hasText: "Build your own computer Build" })
            .click();
    }
}
