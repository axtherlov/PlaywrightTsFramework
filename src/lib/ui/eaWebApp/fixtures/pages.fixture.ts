import { ProductListPage } from "../page-objects/product-list.page";
import { HomePage } from "../page-objects/home.page";
import { ProductCreatePage } from "../page-objects/product-create.page";
import { test as customTest } from "@playwright/test";

type Pages = {
    productListPage: ProductListPage;
    productCreatePage: ProductCreatePage;
    homePage: HomePage;
};

export const pageFactory = customTest.extend<Pages>({
    productListPage: async ({ page }, use) => {
        const productListPage = new ProductListPage(page);
        await use(productListPage);
    },
    productCreatePage: async ({ page }, use) => {
        const productCreatePage = new ProductCreatePage(page);
        await use(productCreatePage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
});

export const test = pageFactory;
