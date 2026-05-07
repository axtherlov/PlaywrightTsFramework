import test, { Locator, Page } from "@playwright/test";
import { ShippingMethodEnum } from "../enums/shipping-method-enum";
import { PaymentMethodEnum } from "../enums/payment-method-enum";
import { BillingInfo } from "../model/billing-info";

export class Checkout {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** First name input in the billing address form. */
    get firstNameInput(): Locator {
        return this.page.getByLabel("First name:");
    }

    /** Last name input in the billing address form. */
    get lastNameInput(): Locator {
        return this.page.getByLabel("Last name:");
    }

    /** Email input in the billing address form. */
    get emailInput(): Locator {
        return this.page.getByLabel("Email:");
    }

    /** Phone number input in the billing address form. */
    get phoneInput(): Locator {
        return this.page.getByLabel("Phone number:");
    }

    /** Country dropdown in the billing address form. */
    get countrySelect(): Locator {
        return this.page.getByLabel("Country:");
    }

    /** State / province dropdown in the billing address form. */
    get stateSelect(): Locator {
        return this.page.getByLabel("State / province:");
    }

    /** City input in the billing address form. */
    get cityInput(): Locator {
        return this.page.getByLabel("City:");
    }

    /** Address line 1 input in the billing address form. */
    get addressInput(): Locator {
        return this.page.getByLabel("Address 1:");
    }

    /** Zip / postal code input in the billing address form. */
    get zipInput(): Locator {
        return this.page.getByLabel("Zip / postal code:");
    }

    /** Continue button — advances the active checkout step. */
    get continueButton(): Locator {
        return this.page.getByRole("button", { name: "Continue" }).first();
    }

    /** Confirm button — submits the final order. */
    get confirmButton(): Locator {
        return this.page.getByRole("button", { name: "Confirm" });
    }

    /** Payment information section shown before order confirmation. */
    get orderSummaryDiv(): Locator {
        return this.page.locator("#checkout-payment-info-load");
    }

    /** Success message displayed after the order is placed. */
    get orderConfirmationMessage(): Locator {
        return this.page.getByText("Your order has been successfully processed!");
    }

    /** Saved billing address dropdown for registered users. */
    get savedBillingAddressSelect(): Locator {
        return this.page.getByRole("combobox", {
            name: "Select a billing address from your address book or enter a new address.",
        });
    }

    // ==================== Locator methods ====================

    /**
     * Returns the radio button for the given shipping method.
     * @param {ShippingMethodEnum} shippingMethod - The shipping option to select.
     * @returns {Locator}
     */
    shippingOptionRadio(shippingMethod: ShippingMethodEnum): Locator {
        return this.page
            .locator(`input[type='radio'][name*='shippingoption']`)
            .nth(Number(shippingMethod));
    }

    /**
     * Returns the radio button for the given payment method.
     * @param {PaymentMethodEnum} paymentMethod - The payment option to select.
     * @returns {Locator}
     */
    paymentMethodRadio(paymentMethod: PaymentMethodEnum): Locator {
        return this.page
            .locator(`input[type='radio'][name*='paymentmethod']`)
            .nth(Number(paymentMethod));
    }

    // ==================== Actions ====================

    /**
     * Proceeds through the billing step using the pre-selected saved address (registered users only).
     * @returns {Promise<void>}
     */
    async useSavedBillingAddress(): Promise<void> {
        await test.step(`Step: ${this.useSavedBillingAddress.name}`, async () => {
            await this.continueButton.click();
        });
    }

    /**
     * Fills in the billing address form and advances to the next checkout step.
     * @param {BillingInfo} info - The billing address details.
     * @returns {Promise<void>}
     */
    async fillBillingAddress(info: BillingInfo): Promise<void> {
        await test.step(`Step: ${this.fillBillingAddress.name}`, async () => {
            await this.firstNameInput.fill(info.firstName);
            await this.lastNameInput.fill(info.lastName);
            await this.emailInput.fill(info.email);
            await this.phoneInput.fill(info.phone);
            await this.countrySelect.selectOption({
                index: Number(info.country),
            });
            await this.stateSelect.click();
            await this.stateSelect.selectOption({ index: Number(info.state) });
            await this.cityInput.fill(info.city);
            await this.addressInput.fill(info.address);
            await this.zipInput.fill(info.zip);
            await this.continueButton.click();
        });
    }

    /**
     * Selects the given shipping method and advances to the next checkout step.
     * @param {ShippingMethodEnum} method - The shipping method to select.
     * @returns {Promise<void>}
     */
    async selectShippingMethod(method: ShippingMethodEnum): Promise<void> {
        await test.step(`Step: ${this.selectShippingMethod.name}`, async () => {
            await this.shippingOptionRadio(method).check();
            await this.continueButton.click();
        });
    }

    /**
     * Selects the given payment method and advances to the next checkout step.
     * @param {PaymentMethodEnum} method - The payment method to select.
     * @returns {Promise<void>}
     */
    async selectPaymentMethod(method: PaymentMethodEnum): Promise<void> {
        await test.step(`Step: ${this.selectPaymentMethod.name}`, async () => {
            await this.paymentMethodRadio(method).check();
            await this.continueButton.click();
        });
    }

    /**
     * Advances through the payment info step and confirms the order.
     * @returns {Promise<void>}
     */
    async confirmOrder(): Promise<void> {
        await test.step(`Step: ${this.confirmOrder.name}`, async () => {
            await this.orderSummaryDiv.waitFor({ state: "visible" });
            await this.continueButton.click();
            await this.confirmButton.click();
        });
    }
}
