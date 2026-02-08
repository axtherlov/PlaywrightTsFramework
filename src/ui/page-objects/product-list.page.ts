import { Page } from "@playwright/test";

export class ProductListPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}