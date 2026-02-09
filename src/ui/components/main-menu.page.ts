import { Page } from '@playwright/test';

export class MainMenu {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get shoppingCartButton() {
        return this.page.locator("#topcartlink");
    }

    async openShoppingCart() {        
        await this.shoppingCartButton.click();        
    }
}