import { Page } from "@playwright/test";

export class ProductListPage {
    private createButton;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.createButton = page.getByText("Create");
    }

    productCell(name: string) {
        return this.page.locator(
            `//table[@class='table']//td[contains(text(),'${name}')]`,
        );
    }

    private deleteCell(name: string) {
        return this.page.locator(
            `//table[@class='table']//td[contains(text(),'${name}')]/following-sibling::td/a[text()='Delete']`,
        );
    }

    async openCreateProduct() {
        await this.createButton.click();
    }

    async openProductForDelete(name: string) {
        await this.deleteCell(name).click();
    }
}
