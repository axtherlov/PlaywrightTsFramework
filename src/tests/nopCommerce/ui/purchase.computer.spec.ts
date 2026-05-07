import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/nopCommerce/fixtures/merge.fixture";
import { MenuItemsEnum } from "../../../lib/ui/nopCommerce/enums/menu-items";
import { ShippingMethodEnum } from "../../../lib/ui/nopCommerce/enums/shipping-method-enum";
import { PaymentMethodEnum } from "../../../lib/ui/nopCommerce/enums/payment-method-enum";
import { ProductSkuEnum } from "../../../lib/ui/nopCommerce/enums/product-enum";
import { ShoeSizeEnum } from "../../../lib/ui/nopCommerce/enums/shoe-size-enum";
import { ShoePrintEnum } from "../../../lib/ui/nopCommerce/enums/shoe-print-enum";
import { ComputerData } from "../../../lib/ui/nopCommerce/test-data/computer.data";
import { ShoeData } from "../../../lib/ui/nopCommerce/test-data/shoe.data";
import { BillingData } from "../../../lib/ui/nopCommerce/test-data/billing.data";

test.beforeEach(async ({ mainFlow }) => {
    await mainFlow.navigateToHomePage();
});

test.describe("Purchase Computer Flow", () => {
    test(
        "should purchase a custom computer as a guest user",
        { tag: "@smoke" },
        async ({
            signIn,
            mainMenu,
            productsMenu,
            productListPage,
            productDetailsPage,
            configureComputerPage,
            shoppingCartPage,
            checkout,
        }) => {
            await test.step("GIVEN the user is on the home page as a guest", async () => {
                // navigation done in beforeEach
            });

            await test.step("WHEN the user configures and adds a custom computer to the cart", async () => {
                await productsMenu.navigate(MenuItemsEnum.DESKTOPS);
                await productListPage.goToBuildCustomComputer();
                await configureComputerPage.configureComputerOptions(ComputerData.build());
                await productDetailsPage.setProductQuantity(1);
                await productDetailsPage.addToCart();
                await mainMenu.openShoppingCart();
            });

            await test.step("THEN the product should be present in the shopping cart", async () => {
                expect(
                    await shoppingCartPage.isProductInTheList(ProductSkuEnum.BUILD_YOUR_OWN_COMPUTER),
                    "Expect: Product should be present in the shopping cart",
                ).toBe(true);
            });

            await test.step("WHEN the user completes checkout as a guest", async () => {
                await shoppingCartPage.checkout();
                await signIn.checkoutAsGuest();
                await checkout.fillBillingAddress(BillingData.build());
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

    test(
        "should purchase shoes in size 9 as a guest user",
        { tag: "@smoke" },
        async ({
            signIn,
            mainMenu,
            productsMenu,
            productListPage,
            productDetailsPage,
            shoppingCartPage,
            checkout,
        }) => {
            await test.step("GIVEN the user is on the home page as a guest", async () => {
                // navigation done in beforeEach
            });

            await test.step("WHEN the user selects a shoe with size 9 and adds it to the cart", async () => {
                const shoe = ShoeData.build({ size: ShoeSizeEnum.SIZE_9, print: ShoePrintEnum.FRESH });
                await productsMenu.navigate(MenuItemsEnum.SHOES);
                await productListPage.goToProduct("Nike Floral Roshe Customized Running Shoes");
                await productDetailsPage.selectShoeSize(shoe.size);
                await productDetailsPage.selectShoeColor(shoe.color);
                await productDetailsPage.selectShoePrint(shoe.print);
                await productDetailsPage.setProductQuantity(1);
                await productDetailsPage.addToCart();
                await mainMenu.openShoppingCart();
            });

            await test.step("THEN the product should be present in the shopping cart", async () => {
                expect(
                    await shoppingCartPage.isProductInTheList(ProductSkuEnum.NIKE_FLORAL_ROSHE),
                    "Expect: Shoes should be present in the shopping cart",
                ).toBe(true);
            });

            await test.step("WHEN the user completes checkout as a guest", async () => {
                await shoppingCartPage.checkout();
                await signIn.checkoutAsGuest();
                await checkout.fillBillingAddress(BillingData.build());
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
