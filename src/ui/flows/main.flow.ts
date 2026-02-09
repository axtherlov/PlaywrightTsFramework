import { Page } from "@playwright/test";
import { envConfig } from "../../global/environment-config";

export class MainFlow {
    page: Page;
 
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await this.page.goto(envConfig.baseUrl);
    }
}