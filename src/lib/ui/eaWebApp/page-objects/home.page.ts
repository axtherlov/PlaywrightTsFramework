import { Page } from "@playwright/test";
import { MenuPage } from "./menu.page";
import { envConfig } from "../../../config/environment-config";

export class HomePage {
    private readonly page: Page;
    menu: MenuPage;
    constructor(page: Page) {
        this.page = page;
        this.menu = new MenuPage(page);
    }

    async goToHome() {
        await this.page.goto(envConfig.baseUrl);
    }
}
