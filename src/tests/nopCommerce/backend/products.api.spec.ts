import { test } from "../../../lib/api/eaWebApp/fixtures/api-services.fixture";
import { expect } from "@playwright/test";

test.describe("Products API flow", () => {
    test(
        "Should get list of products",
        { tag: "@api" },
        async ({ productService }) => {
            const res = await productService.getProducts();

            expect(res.length).toBeGreaterThan(0);
        },
    );
});
