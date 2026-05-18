import { mergeTests } from "@playwright/test";
import { test as authTest } from "./auth.fixture";
import { ProductService } from "../services/product.service";

type ApiServices = {
    productService: ProductService;
};

export const test = mergeTests(authTest).extend<ApiServices>({
    productService: async ({ apiRequest, authToken, authType }, use) => {
        await use(new ProductService(apiRequest, authToken, authType));
    },
});
