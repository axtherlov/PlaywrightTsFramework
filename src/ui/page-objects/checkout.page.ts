import { Page } from '@playwright/test';
import { ShippingMethodEnum } from '../enums/shipping-method-enum';
import { PaymentMethodEnum } from '../enums/payment-method-enum';
import { BillingInfo } from '../model/billing-info';

export class Checkout {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get firstNameInput() {
        return this.page.locator("input[id*='BillingAddress_FirstName'], input[name*='FirstName']").first();
    }

    get lastNameInput() {
        return this.page.locator("input[id*='BillingAddress_LastName'], input[name*='LastName']").first();
    }

    get emailInput() {
        return this.page.locator("input[id*='BillingAddress_Email'], input[type='email']").first();
    }

    get phoneInput() {
        return this.page.locator("input[id*='BillingAddress_PhoneNumber'], input[name*='PhoneNumber']").first();
    }

    get countrySelect() {
        return this.page.locator("select[id*='BillingAddress_CountryId'], select[name*='CountryId']").first();
    }

    get stateSelect() {
        return this.page.locator("select[id*='BillingAddress_StateProvinceId'], select[name*='StateProvinceId']").first();
    }

    get cityInput() {
        return this.page.locator("input[id*='BillingAddress_City'], input[name*='City']").first();
    }

    get addressInput() {
        return this.page.locator("input[id*='BillingAddress_Address1'], input[name*='Address1']").first();
    }

    get zipInput() {
        return this.page.locator("input[id*='BillingAddress_ZipPostalCode'], input[name*='ZipPostalCode']").first();
    }

    get continueButton() {
        return this.page.locator("button:has-text('Continue')").first();
    }

    get confirmButton() {
        return this.page.locator("button:has-text('Confirm')");
    }

    get orderConfirmationMessage() {
        return this.page.locator("text=Your order has been successfully processed!");
    }

    shippingOptionRadio(shippingMethod: ShippingMethodEnum) {
        return this.page.locator(`input[type='radio'][name*='${shippingMethod}']`).first();
    }

    paymentMethodRadio(paymentMethod: PaymentMethodEnum) {
        return this.page.locator(`input[type='radio'][name*='${paymentMethod}'], input[name*='${paymentMethod}']`).first();
    }


    async fillBillingAddress(info: BillingInfo) {
        await this.firstNameInput.fill(info.firstName);
        await this.lastNameInput.fill(info.lastName);
        await this.emailInput.fill(info.email);
        await this.phoneInput.fill(info.phone);
        await this.countrySelect.selectOption({ index: info.countryIndex });
        await this.stateSelect.selectOption({ index: info.stateIndex });
        await this.cityInput.fill(info.city);
        await this.addressInput.fill(info.address);
        await this.zipInput.fill(info.zip);
    }
   
    async selectShippingMethod(method: ShippingMethodEnum) {
        await this.shippingOptionRadio(method).check();
    }

    async selectPaymentMethod(method: PaymentMethodEnum) {
        await this.paymentMethodRadio(method).check();
    }

    async confirmOrder() {
        await this.confirmButton.click();
    }
}