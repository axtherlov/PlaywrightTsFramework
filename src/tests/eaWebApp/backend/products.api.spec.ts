import { test } from "../../../lib/api/api-request-fixture";
import { expect } from "@playwright/test";
import { ProductService } from "../../../lib/api/services/eaWebApp/product.service";
import { ProductType } from "../../../lib/ui/eaWebApp/enums/product-type.enum";
import { CreateProductPayload } from "../../../lib/api/payloads/eaWebApp/createProduct.payload";

test.describe("Product API CRUD", () => {
    test(
        "Should get list of products",
        { tag: "@api" },
        async ({ apiRequest }) => {
            const productService = new ProductService();
            let res = await productService.getProducts(apiRequest);

            expect(res.length).toBeGreaterThan(0);
        },
    );

    test("Should create a product", { tag: "@api" }, async ({ apiRequest }) => {
        const productService = new ProductService();

        const randomId = Math.floor(1000 + Math.random() * 9000);
        const newProduct: CreateProductPayload = {
            id: randomId,
            name: `Test Product ${randomId}`,
            description: "This is a test product",
            price: 10,
            productType: ProductType.CPU,
        };

        await productService.createProduct(apiRequest, newProduct);

        const actualProduct = await productService.getProductById(
            apiRequest,
            newProduct.id.toString(),
        );

        expect(actualProduct.id).toBe(newProduct.id);
    });

    test(
        "Should get specific product by id",
        { tag: "@api" },
        async ({ apiRequest }) => {
            const productService = new ProductService();
            const productId = 1;
            const product = await productService.getProductById(
                apiRequest,
                productId.toString(),
            );

            expect(product.id).toBe(productId);
        },
    );
});
