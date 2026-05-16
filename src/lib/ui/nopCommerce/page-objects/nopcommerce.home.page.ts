import { expect, type Page } from "@playwright/test";
import { log } from "../../../helpers/logger.js";

export class HomePage {
    constructor(private readonly page: Page) {}
    /** Elements */
    private get userNameInputBox() {
        return this.page.getByRole("textbox", { name: "Email:" });
    }
    private get passwordInputBox() {
        return this.page.getByRole("textbox", { name: "Password:" });
    }
    private get loginBtn() {
        return this.page.getByRole("button", { name: "Log in" });
    }

    /** Page Actions */
    async loginToNopeCommerceApp(
        url: string,
        username: string,
        password: string,
    ) {
        await log("info", `Login to ${url}`);

        await this.page.goto(url);
        await this.userNameInputBox.fill(username);
        await this.passwordInputBox.fill(password);
        await this.loginBtn.click();

        await expect(this.page).toHaveURL(`${url}/admin/`);
        await log("info", `Home Page is successfully launched`);
    }
}
