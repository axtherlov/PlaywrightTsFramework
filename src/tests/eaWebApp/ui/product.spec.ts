import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/eaWebApp/fixtures/ui.fixture";

test.beforeEach(async ({ homePage }) => {
    await homePage.goToHome();
});

test.describe("Product tests", () => {
    test("product can be created", async ({
        simpleProductDto,
        homePage,
        productCreatePage,
        productListPage,
    }) => {
        await homePage.menu.goToProductList();
        await productListPage.openCreateProduct();

        await productCreatePage.createProduct(simpleProductDto);

        await expect(
            productListPage.productCell(simpleProductDto.name),
        ).toHaveText(simpleProductDto.name);
    });

    test("Product can be deleted", async ({
        homePage,
        simpleProductDto,
        productListPage,
        productCreatePage,
    }) => {
        await homePage.menu.goToProductList();
        await productListPage.openCreateProduct();

        await productCreatePage.createProduct(simpleProductDto);
    });
});
