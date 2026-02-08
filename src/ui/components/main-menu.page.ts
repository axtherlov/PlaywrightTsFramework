import { expect, type Page } from "@playwright/test";
import BasePage from "../page-objects/base.page.js";
import { log } from "../../core/helpers/logger.js";
import { MenuItems } from "../enums/menu-items.js";
import { envConfig } from "../../../src/global/config-fixtures.js"

export default class MainMenu extends BasePage {
    // Constructor
    constructor(page: Page) {
        super(page);
    }

    /** Elements */
    getProductButton(item: MenuItems) {
        return this.page.getByRole('button', { name: item });
    }

    get searchInput() {
        return this.page.getByRole('textbox', { name: "Search Store" });
    }

    get searchButton() {
        return this.page.getByRole('button', { name: 'Search' });
    }

    get shoppingCartLink() {
        return this.page.locator("a:has-text('Shopping cart'), [aria-label*='Shopping cart']").first();
    }

    async navigate(item: MenuItems) {
        this.page.goto(`${envConfig.baseurl}/${item}`)
        await expect(this.page).toHaveURL(new RegExp(`.*${item}`));
    }

    /** Page Actions */
    async selectProduct(item: MenuItems) {
        await log("info", `Selecting ${item} from menu`);
        const button = this.getProductButton(item);
        await button.click();
        await log("info", `${item} menu selected`);
    }

    async searchStore(searchTerm: string) {
        await log("info", `Searching for: ${searchTerm}`);
        await this.searchInput.click();
        await this.searchInput.fill(searchTerm);
        
        // Handle any dialog that might appear
        this.page.once('dialog', dialog => {
            log("info", `Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        
        await this.searchButton.click();
        await log("info", `Search for "${searchTerm}" completed`);
    }

    async openShoppingCart() {
        await log("info", "Opening shopping cart from main menu");
        try {
            const cartLink = this.shoppingCartLink;
            const isVisible = await cartLink.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
                await cartLink.click();
                await expect(this.page).toHaveURL(/.*cart/);
                await log("info", "Shopping cart opened successfully");
            } else {
                await log("warn", "Shopping cart link not visible");
            }
        } catch (e) {
            await log("error", `Error opening shopping cart: ${(e as Error).message}`);
        }
    }
}