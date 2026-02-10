import test, { Page } from "@playwright/test";
import { envConfig } from "../../config/environment-config";

export class MainFlow {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await test.step(`Step: ${this.navigateToHomePage.name}`, async () => {
            await this.page.goto(envConfig.baseUrl);
        });
    }
}
