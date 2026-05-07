import test, { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../page-objects/base.page";
import { log } from "../../../helpers/logger";
import { MenuItemsEnum } from "../enums/menu-items";
import { envConfig } from "../../../config/environment-config";

export class ProductsMenu extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // ==================== Locators ====================

    /** Search store text input in the top navigation bar. */
    get searchInput(): Locator {
        return this.page.getByRole("textbox", { name: "Search store" });
    }

    /** Search submit button in the top navigation bar. */
    get searchButton(): Locator {
        return this.page.getByRole("button", { name: "Search" });
    }

    // ==================== Locator methods ====================

    /**
     * Returns the top-level navigation button for the given menu item.
     * @param {MenuItemsEnum} item - The menu item to locate.
     * @returns {Locator}
     */
    getProductButton(item: MenuItemsEnum): Locator {
        return this.page.getByRole("button", { name: item });
    }

    // ==================== Actions ====================

    /**
     * Navigates directly to the category page for the given menu item.
     * @param {MenuItemsEnum} item - The category to navigate to.
     * @returns {Promise<void>}
     */
    async navigate(item: MenuItemsEnum): Promise<void> {
        await test.step(`Step: navigate to ${item} page`, async () => {
            await this.page.goto(`${envConfig.baseUrl}/${item}`);
            await expect(this.page).toHaveURL(new RegExp(`.*${item}`));
        });
    }

    /**
     * Clicks the top-level navigation button for the given menu item.
     * @param {MenuItemsEnum} item - The menu item to click.
     * @returns {Promise<void>}
     */
    async selectProduct(item: MenuItemsEnum): Promise<void> {
        await log("info", `Selecting ${item} from menu`);
        const button = this.getProductButton(item);
        await button.click();
        await log("info", `${item} menu selected`);
    }

    /**
     * Fills the search box and submits the search.
     * @param {string} searchTerm - The term to search for.
     * @returns {Promise<void>}
     */
    async searchStore(searchTerm: string): Promise<void> {
        await log("info", `Searching for: ${searchTerm}`);
        await this.searchInput.click();
        await this.searchInput.fill(searchTerm);

        // Dismiss any browser dialog that the search interaction triggers.
        this.page.once("dialog", (dialog) => {
            log("info", `Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });

        await this.searchButton.click();
        await log("info", `Search for "${searchTerm}" completed`);
    }
}
