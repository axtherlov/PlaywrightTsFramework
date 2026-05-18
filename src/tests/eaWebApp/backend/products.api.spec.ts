import { test } from "../../../lib/api/eaWebApp/fixtures/api-services.fixture";
import { expect } from "@playwright/test";
import { ProductType } from "../../../lib/ui/eaWebApp/enums/product-type.enum";
import { CreateProductPayload } from "../../../lib/api/eaWebApp/payloads/create-product.payload";

test.describe("Product API CRUD", () => {
    test(
        "Should get list of products",
        { tag: "@api" },
        async ({ productService }) => {
            const res = await productService.getProducts();

            expect(res.length).toBeGreaterThan(0);
        },
    );

    test(
        "Should create a product",
        { tag: "@api" },
        async ({ productService }) => {
            const randomId = Math.floor(1000 + Math.random() * 9000);
            const newProduct: CreateProductPayload = {
                id: randomId,
                name: `Test Product ${randomId}`,
                description: "This is a test product",
                price: 10,
                productType: ProductType.CPU,
            };

            await productService.createProduct(newProduct);

            const actualProduct = await productService.getProductById(
                newProduct.id.toString(),
            );

            expect(actualProduct.id).toBe(newProduct.id);
        },
    );

    test(
        "Should get specific product by id",
        { tag: "@api" },
        async ({ productService }) => {
            const productId = 1;
            const product = await productService.getProductById(
                productId.toString(),
            );

            expect(product.id).toBe(productId);
        },
    );
});
