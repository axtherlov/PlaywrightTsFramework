import { expect } from "@playwright/test";
import { test } from '../../src/ui/fixtures/pom-fixture';
import { log } from "../../src/core/helpers/logger.js";
import { MenuItemsEnum } from "../../src/ui/enums/menu-items.js";
import { MainFlow } from '../../src/ui/flows/main.flow';
import { softwareEnum } from "../../src/ui/enums/software-enum";
import { ProcessorEnum } from "../../src/ui/enums/processor-enum";
import { RamEnum } from "../../src/ui/enums/ram-enum";
import { HddEnum } from "../../src/ui/enums/hdd-enum";
import { OSEnum } from "../../src/ui/enums/os-enum";
import { ShippingMethodEnum } from "../../src/ui/enums/shipping-method-enum";
import { PaymentMethodEnum } from "../../src/ui/enums/payment-method-enum";
import { CountryEnum } from "../../src/ui/enums/country-enum";
import { StateEnum } from '../../src/ui/enums/state-enum';

let mainFlow: MainFlow;

test.beforeEach(async ({ page }) => {
    mainFlow = new MainFlow(page);
    await mainFlow.navigateToHomePage();
});

test.describe("Purchase Computer Flow", () => {
    test("purchase computer with guest user", async ({ page, 
        signIn,
        mainMenu,
        productsMenu,
        productListPage,
        productDetailsPage,
        configureComputerPage,
        shoppingCartPage,
        checkout }, testInfo) => {      

        await productsMenu.navigate(MenuItemsEnum.DESKTOPS);        
        await productListPage.GoToBuildCustomComputer();
 
        await configureComputerPage.ConfigureComputerOptions({
            processor: ProcessorEnum.PENTIUM_OP1,
            ram: RamEnum.EIGHT,
            hdd: HddEnum.ADVANCED,
            os: OSEnum.VISTA_PREMIUM,
            software: softwareEnum.OFFICE
        });

        await productDetailsPage.SetProductQuantity(1);
        await productDetailsPage.AddToCart();        
        await mainMenu.openShoppingCart();
        
        expect(await shoppingCartPage.isProductInTheList(
            "COMP_CUST")).toBe(true);
        
        await shoppingCartPage.checkout();
        await signIn.checkoutAsGuest();
       
        await checkout.fillBillingAddress({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            country: CountryEnum.USA,
            state: StateEnum.NEW_YORK,
            city: "New York",
            address: "123 Main St",
            zip: "10001"
        });

        await checkout.continueButton.click();
        await checkout.selectShippingMethod(ShippingMethodEnum.GROUND)
        await checkout.continueButton.click();
        await checkout.selectPaymentMethod(PaymentMethodEnum.MONEY_ORDER);
        await checkout.confirmOrder();
        
        await expect(checkout.orderConfirmationMessage).toBeVisible();
    });
});
