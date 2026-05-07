import { expect } from "@playwright/test";
import { test } from "../../../lib/ui/nopCommerce/fixtures/merge.fixture";
import { MenuItemsEnum } from "../../../lib/ui/nopCommerce/enums/menu-items";
import { ShippingMethodEnum } from "../../../lib/ui/nopCommerce/enums/shipping-method-enum";
import { PaymentMethodEnum } from "../../../lib/ui/nopCommerce/enums/payment-method-enum";
import { ProductEnum, ProductSkuEnum } from "../../../lib/ui/nopCommerce/enums/product-enum";
import { BillingData } from "../../../lib/ui/nopCommerce/test-data/billing.data";

test.describe("Purchase Multiple Products", () => {
    test.beforeEach(async ({ mainFlow }) => {
        await mainFlow.navigateToHomePage();
    });

    test(
        "should add multiple products and complete purchase as a guest user",
        { tag: ["@smoke", "@regression"] },
        async ({ cartFlow, signIn, mainMenu, shoppingCartPage, checkout }) => {
            await test.step("GIVEN the user is on the home page as a guest", async () => {
                // navigation done in beforeEach
            });

            await test.step("WHEN the user adds multiple desktop products to the cart", async () => {
                await cartFlow.addProductsToCart(MenuItemsEnum.DESKTOPS, [
                    ProductEnum.DIGITAL_STORM_VANQUISH,
                    ProductEnum.LENOVO_IDEACENTRE,
                ]);
                await mainMenu.openShoppingCart();
            });

            await test.step("THEN all products are present in the shopping cart", async () => {
                for (const sku of [ProductSkuEnum.DIGITAL_STORM_VANQUISH, ProductSkuEnum.LENOVO_IDEACENTRE]) {
                    expect(
                        await shoppingCartPage.isProductInTheList(sku),
                        `Expect: ${sku} should be present in the shopping cart`,
                    ).toBe(true);
                }
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
