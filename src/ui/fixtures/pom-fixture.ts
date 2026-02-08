import { test as customTest } from '@playwright/test';
import MainMenu from '../components/main-menu.page';
import { ProductListPage } from "../page-objects/product-list.page";

type pages = {
    mainMenu: MainMenu;
    productListPage: ProductListPage;
}

const pageFactory = customTest.extend<pages>({
    mainMenu: async ({ page }, use) => {
        await use(new MainMenu(page));
    },
    productListPage: async ({ page }, use) => {
        await use(new ProductListPage(page));
    }
});

export const test = pageFactory;