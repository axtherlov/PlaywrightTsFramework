import test, { Page } from "@playwright/test";
import { ShippingMethodEnum } from "../enums/shipping-method-enum";
import { PaymentMethodEnum } from "../enums/payment-method-enum";
import { BillingInfo } from "../model/billing-info";

export class Checkout {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get firstNameInput() {
        return this.page.getByRole("textbox", { name: "First name:" });
    }

    get lastNameInput() {
        return this.page.getByRole("textbox", { name: "Last name:" });
    }

    get emailInput() {
        return this.page.getByRole("textbox", { name: "Email:" });
    }

    get phoneInput() {
        return this.page.getByRole("textbox", { name: "Phone number:" });
    }

    get countrySelect() {
        return this.page.getByLabel("Country:");
    }

    get stateSelect() {
        return this.page.getByLabel("State / province:");
    }

    get cityInput() {
        return this.page.getByRole("textbox", { name: "City:" });
    }

    get addressInput() {
        return this.page.getByRole("textbox", { name: "Address 1:" });
    }

    get zipInput() {
        return this.page.getByRole("textbox", { name: "Zip / postal code:" });
    }

    get continueButton() {
        return this.page.getByRole("button", { name: "Continue" }).first();
    }

    get confirmButton() {
        return this.page.getByRole("button", { name: "Confirm" });
    }

    get orderSummaryDiv() {
        return this.page.locator("#checkout-payment-info-load");
    }

    get orderConfirmationMessage() {
        return this.page.locator(
            "text=Your order has been successfully processed!",
        );
    }

    shippingOptionRadio(shippingMethod: ShippingMethodEnum) {
        return this.page
            .locator(`input[type='radio'][name*='shippingoption']`)
            .nth(Number(shippingMethod));
    }

    paymentMethodRadio(paymentMethod: PaymentMethodEnum) {
        return this.page
            .locator(`input[type='radio'][name*='paymentmethod']`)
            .nth(Number(paymentMethod));
    }

    async fillBillingAddress(info: BillingInfo) {
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

    async selectShippingMethod(method: ShippingMethodEnum) {
        await test.step(`Step: ${this.selectShippingMethod.name}`, async () => {
            await this.shippingOptionRadio(method).check();
            await this.continueButton.click();
        });
    }

    async selectPaymentMethod(method: PaymentMethodEnum) {
        await test.step(`Step: ${this.selectPaymentMethod.name}`, async () => {
            await this.paymentMethodRadio(method).check();
            await this.continueButton.click();
        });
    }

    async confirmOrder() {
        await test.step(`Step: ${this.confirmOrder.name}`, async () => {
            await this.orderSummaryDiv.waitFor({ state: "visible" });
            await this.continueButton.click();
            await this.confirmButton.click();
        });
    }
}
