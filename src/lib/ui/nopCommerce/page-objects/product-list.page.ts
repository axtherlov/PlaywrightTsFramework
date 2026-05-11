import test, { Locator, Page } from "@playwright/test";
import { MainMenu } from "../components/main-menu.page";
import { ProductsMenu } from "../components/products-menu.page";

export class ProductListPage {
    readonly mainMenu: MainMenu;
    readonly productsMenu: ProductsMenu;

    constructor(private readonly page: Page) {
        this.mainMenu = new MainMenu(page);
        this.productsMenu = new ProductsMenu(page);
    }

    // ==================== Locators ====================

    /** All product cards in the product listing grid. */
    get productList(): Locator {
        return this.page.locator(".item-grid .item-box");
    }

    // ==================== Locator methods ====================

    /**
     * Returns the product card that matches the given product name.
     * @param {string} productName - The exact product name shown in the listing.
     * @returns {Locator}
     */
    private productCard(productName: string): Locator {
        return this.page.locator(".item-grid .item-box").filter({
            has: this.page.getByRole("heading", { name: productName, exact: true }),
        });
    }

    /**
     * Returns the product title link for the given product name.
     * @param {string} productName - The exact product name shown in the listing.
     * @returns {Locator}
     */
    private productLink(productName: string): Locator {
        return this.productCard(productName).getByRole("heading", { name: productName, exact: true }).getByRole("link");
    }

    // ==================== Actions ====================

    /**
     * Adds a random product from the current listing to the cart.
     * @returns {Promise<void>}
     */
    async addRandomProductToCart(): Promise<void> {
        const count = await this.productList.count();
        if (count === 0) {
            throw new Error("No products found in product list");
        }
        const randomIndex = Math.floor(Math.random() * count);
        const randomProduct = this.productList.nth(randomIndex);
        await randomProduct
            .getByRole("button", { name: "Add to cart" })
            .click();
    }

    /**
     * Navigates to the "Build your own computer" product details page.
     * @returns {Promise<void>}
     */
    async goToBuildCustomComputer(): Promise<void> {
        await test.step(`Step: ${this.goToBuildCustomComputer.name}`, async () => {
            await this.page
                .getByRole("link", { name: "Build your own computer" })
                .first()
                .click();
        });
    }

    /**
     * Clicks the product title link to navigate to the product details page.
     * @param {string} productName - The exact product name to navigate to.
     * @returns {Promise<void>}
     */
    async goToProduct(productName: string): Promise<void> {
        await test.step(`Step: ${this.goToProduct.name} - ${productName}`, async () => {
            await this.productLink(productName).click();
        });
    }
}
