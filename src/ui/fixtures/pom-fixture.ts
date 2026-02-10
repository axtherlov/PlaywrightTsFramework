import { test as customTest } from "@playwright/test";
import ProductsMenu from "../components/products-menu.page";
import { ProductListPage } from "../page-objects/product-list.page";
import { ConfigureComputerPage } from "../page-objects/computer/configure-computer.page";
import { ProductDetailsPage } from "../page-objects/product-details.page";
import { MainMenu } from "../components/main-menu.page";
import { ShoppingCartPage } from "../page-objects/shopping-cart.page";
import { SignIn } from "../page-objects/sign-in.page";
import { Checkout } from "../page-objects/checkout.page";

type Pages = {
    signIn: SignIn;
    mainMenu: MainMenu;
    productsMenu: ProductsMenu;
    productListPage: ProductListPage;
    configureComputerPage: ConfigureComputerPage;
    productDetailsPage: ProductDetailsPage;
    shoppingCartPage: ShoppingCartPage;
    checkout: Checkout;
};

const pageFactory = customTest.extend<Pages>({
    signIn: async ({ page }, use) => {
        await use(new SignIn(page));
    },
    mainMenu: async ({ page }, use) => {
        await use(new MainMenu(page));
    },
    productsMenu: async ({ page }, use) => {
        await use(new ProductsMenu(page));
    },
    productListPage: async ({ page }, use) => {
        await use(new ProductListPage(page));
    },
    configureComputerPage: async ({ page }, use) => {
        await use(new ConfigureComputerPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },
    checkout: async ({ page }, use) => {
        await use(new Checkout(page));
    },
});

export const test = pageFactory;
