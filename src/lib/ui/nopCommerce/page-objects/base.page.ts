import { Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the given URL.
     * @param {string} path - The full URL to navigate to.
     * @returns {Promise<void>}
     */
    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path);
    }
}
