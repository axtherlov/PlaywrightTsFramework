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
import { CountryEnum } from "../../../lib/ui/nopCommerce/enums/country-enum";
import { StateEnum } from "../../../lib/ui/nopCommerce/enums/state-enum";

test.beforeEach(async ({ mainFlow }) => {
    await mainFlow.navigateToHomePage();
});

test.describe("Purchase Computer Flow", () => {
    test("purchase computer with guest user", async ({
        signIn,
        mainMenu,
        productsMenu,
        productListPage,
        productDetailsPage,
        configureComputerPage,
        shoppingCartPage,
        checkout,
    }) => {
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

        expect(
            await shoppingCartPage.isProductInTheList("COMP_CUST"),
            "Expect: Product should be present in the shopping cart",
        ).toBe(true);

        await shoppingCartPage.checkout();
        await signIn.checkoutAsGuest();

        await checkout.fillBillingAddress({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            country: CountryEnum.USA,
            state: StateEnum.ALABAMA,
            city: "New York",
            address: "123 Main St",
            zip: "10001",
        });

        await checkout.selectShippingMethod(ShippingMethodEnum.GROUND);
        await checkout.selectPaymentMethod(PaymentMethodEnum.MONEY_ORDER);
        await checkout.confirmOrder();

        await expect(
            checkout.orderConfirmationMessage,
            "Expect: Confirmation message should be visible after order is processed",
        ).toBeVisible();
    });
});
