import { Page } from "playwright-core";

export class MenuPage {
    private productButton;
    private page: Page;
    constructor(page: Page) {
        this.page = page;
        this.productButton = page.getByText("Product");
    }

    async goToProductList() {
        this.productButton.click();
    }
}
