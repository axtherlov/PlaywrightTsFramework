import { Page } from '@playwright/test';

export class MainMenu {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get shoppingCartButton() {
        return this.page.locator("a:has-text('Shopping cart'), [aria-label*='Shopping cart']").first();
    }

    async openShoppingCart() {        
        await this.shoppingCartButton.click();        
    }
}