import { Page, expect } from "@playwright/test";
import { log } from "../../core/helpers/logger";

export class ProductDetailsPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get quantityInput() {
    return this.page.locator("input[id*='quantity'], input[name*='quantity']");
  }

  get cartButton() {
    return this.page.locator("button:has-text('Add to cart')").last();
  }

  get productAddedToCartMessage() {
    return this.page.locator([
            "text=The product has been added to your shopping cart",
            "text=/.*added to.*cart.*/i",
            ".notification, .alert-success, [class*='success-notification']",
            ".bar-notification"
        ].join(", "));
  }

  get closeMessageButton() {
    return this.page.locator("button[aria-label='Close'], .notification-close, [class*='close'], .close-notification");
  }

  async SetProductQuantity(quantity: number) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async AddToCart() {
    await this.cartButton.click();
    await expect(this.productAddedToCartMessage.first()).toBeVisible();
    await this.CloseSuccessMessage();        
  }

  async CloseSuccessMessage() {
    await this.closeMessageButton.click();
  }
}
