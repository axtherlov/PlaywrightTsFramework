import test, { Page } from "@playwright/test";
import { MenuItemsEnum } from "../enums/menu-items";
import { ProductsMenu } from "../components/products-menu.page";
import { ProductListPage } from "../page-objects/product-list.page";
import { ProductDetailsPage } from "../page-objects/product-details.page";
import { MainMenu } from "../components/main-menu.page";

export class CartFlow {
    private readonly productsMenu: ProductsMenu;
    private readonly productListPage: ProductListPage;
    private readonly productDetailsPage: ProductDetailsPage;
    private readonly mainMenu: MainMenu;

    constructor(private readonly page: Page) {
        this.productsMenu = new ProductsMenu(page);
        this.productListPage = new ProductListPage(page);
        this.productDetailsPage = new ProductDetailsPage(page);
        this.mainMenu = new MainMenu(page);
    }

    /**
     * Navigates to the given category, opens each product by name, adds it to the cart,
     * and repeats for every product in the list.
     *
     * @param {MenuItemsEnum} category - The category page to browse (e.g. MenuItemsEnum.DESKTOPS).
     * @param {string[]} productNames - Ordered list of exact product names to add to the cart.
     * @returns {Promise<void>}
     */
    async addProductsToCart(
        category: MenuItemsEnum,
        productNames: string[],
    ): Promise<void> {
        await test.step(`Flow: addProductsToCart [${productNames.join(", ")}]`, async () => {
            for (const productName of productNames) {
                await this.productsMenu.navigate(category);
                await this.productListPage.goToProduct(productName);
                await this.productDetailsPage.addToCart();
            }
        });
    }
}
