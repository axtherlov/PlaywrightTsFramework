import { Page } from "@playwright/test";
import { ProductDto } from "../model/product.dto";

export class ProductCreatePage {
    private nameInput;
    private descriptionInput;
    private priceInput;
    private productType;
    private createButton;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator("#Name");
        this.descriptionInput = page.locator("#Description");
        this.priceInput = page.locator("#Price");
        this.productType = page.locator("#ProductType");
        this.createButton = page.locator("#Create");
    }

    async createProduct(product: ProductDto) {
        await this.nameInput.fill(product.name);
        await this.descriptionInput.fill(product.description);
        await this.priceInput.fill(product.price.toString());
        await this.productType.selectOption(String(product.productType));
        await this.createButton.click();
    }
}
