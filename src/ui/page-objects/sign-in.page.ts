import { Page } from "@playwright/test";

export class SignIn {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get checkoutAsGuestButton() {
        return this.page.getByRole("button", { name: "Checkout as Guest" });
    }

    async checkoutAsGuest() {
        await this.checkoutAsGuestButton.click();
    }
}
