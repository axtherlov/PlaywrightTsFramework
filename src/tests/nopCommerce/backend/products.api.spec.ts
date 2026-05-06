import { test } from "../../../lib/api/fixtures/api-request-fixture";
import { ProductService } from "../../../lib/api/services/eaWebApp/product.service";
import { expect } from "@playwright/test";

test.describe("Products API flow", () => {
    test(
        "Should get list of products",
        { tag: "@api" },
        async ({ apiRequest }) => {
            const productService = new ProductService();
            let res = await productService.getProducts(apiRequest);

            expect(res.length).toBeGreaterThan(0);
        },
    );
});
