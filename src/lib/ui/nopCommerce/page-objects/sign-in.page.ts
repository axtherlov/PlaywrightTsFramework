import test, { Page } from "@playwright/test";

export class SignIn {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get checkoutAsGuestButton() {
        return this.page.getByRole("button", { name: "Checkout as Guest" });
    }

    async checkoutAsGuest() {
        await test.step(`Step: ${this.checkoutAsGuest.name}`, async () => {
            await this.checkoutAsGuestButton.click();
        });
    }
}
