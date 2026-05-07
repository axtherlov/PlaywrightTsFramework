import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/nopCommerce/fixtures/merge.fixture";
import { MenuItemsEnum } from "../../../lib/ui/nopCommerce/enums/menu-items";
import { softwareEnum } from "../../../lib/ui/nopCommerce/enums/software-enum";
import { ProcessorEnum } from "../../../lib/ui/nopCommerce/enums/processor-enum";
import { RamEnum } from "../../../lib/ui/nopCommerce/enums/ram-enum";
import { HddEnum } from "../../../lib/ui/nopCommerce/enums/hdd-enum";
import { OSEnum } from "../../../lib/ui/nopCommerce/enums/os-enum";
import { ShippingMethodEnum } from "../../../lib/ui/nopCommerce/enums/shipping-method-enum";
import { PaymentMethodEnum } from "../../../lib/ui/nopCommerce/enums/payment-method-enum";

test.describe("Purchase Computer Flow - Registered User", () => {
    test.beforeEach(async ({ mainFlow }) => {
        await mainFlow.navigateToHomePage();
    });

    test(
        "should complete a purchase as a registered user using a saved billing address",
        { tag: "@smoke" },
        async ({
            loginPage,
            productsMenu,
            productListPage,
            productDetailsPage,
            configureComputerPage,
            mainMenu,
            shoppingCartPage,
            checkout,
        }) => {
            await test.step("GIVEN the user is logged in as a registered customer", async () => {
                await loginPage.goto();
                await loginPage.login("admin@yourstore.com", "admin");
            });

            await test.step("WHEN the user configures and adds a computer to the cart", async () => {
                await productsMenu.navigate(MenuItemsEnum.DESKTOPS);
                await productListPage.goToBuildCustomComputer();

                await configureComputerPage.configureComputerOptions({
                    processor: ProcessorEnum.PENTIUM_OP1,
                    ram: RamEnum.EIGHT,
                    hdd: HddEnum.ADVANCED,
                    os: OSEnum.VISTA_PREMIUM,
                    software: softwareEnum.OFFICE,
                });

                await productDetailsPage.setProductQuantity(1);
                await productDetailsPage.addToCart();
                await mainMenu.openShoppingCart();
            });

            await test.step("THEN the product should be present in the shopping cart", async () => {
                expect(
                    await shoppingCartPage.isProductInTheList("COMP_CUST"),
                    "Expect: Product should be present in the shopping cart",
                ).toBe(true);
            });

            await test.step("WHEN the user proceeds to checkout using a saved billing address", async () => {
                await shoppingCartPage.checkout();
                await checkout.useSavedBillingAddress();
                await checkout.selectShippingMethod(ShippingMethodEnum.GROUND);
                await checkout.selectPaymentMethod(PaymentMethodEnum.MONEY_ORDER);
                await checkout.confirmOrder();
            });

            await test.step("THEN the order confirmation message is displayed", async () => {
                await expect(
                    checkout.orderConfirmationMessage,
                    "Expect: Confirmation message should be visible after order is processed",
                ).toBeVisible();
            });
        },
    );
});
