import { Page } from "@playwright/test";

export class ShoppingCartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get agreeTermsButton() {
    return this.page.locator([
                "input[type='checkbox'][id*='terms']",
                "input[id*='agreeToTerms']",
                "input[id*='termsofservice']",
                "input[name*='terms'], input[name*='agreeToTerms']",
                "label:has-text('I agree') >> ../input",
                "input[aria-label*='terms']"
            ].join(", "));
  }

   get checkoutButton() {
    return this.page.locator([
               "button:has-text('Checkout')",
                "a:has-text('Checkout')", 
                "input[value*='Checkout']",
                "button[class*='checkout']"
            ].join(", "));
  }

  private productRow(productName: string) {
    return this.page.locator(`//span[.='${productName}']/ancestor::tr`);
  }

  async isProductInTheList(productName: string) {
    const cells = this.productRow(productName).locator("td");
    const count = await cells.count();
    if (count === 0) {
       return false
    }   
    return true;
  }

  async checkout() {
    await this.agreeTermsButton.click();
    await this.checkoutButton.click();
  }

}
