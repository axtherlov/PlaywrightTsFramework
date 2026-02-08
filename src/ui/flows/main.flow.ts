import { Page } from "@playwright/test";

export class MainFlow {
    page: Page;
 
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage(url: string) {
        await this.page.goto("http://localhost");
    }
}