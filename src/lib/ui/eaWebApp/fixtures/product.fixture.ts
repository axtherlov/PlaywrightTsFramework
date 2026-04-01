import { test as customTest } from "@playwright/test";
import { ProductDto } from "../model/product.dto";
import { ProductType } from "../enums/product-type.enum";

type DTOs = {
    simpleProductDto: ProductDto;
};

const dtoFactory = customTest.extend<DTOs>({
    simpleProductDto: async ({}, use) => {
        const randomId = Math.floor(1000 + Math.random() * 9000);

        const createProduct = new ProductDto({
            name: `testProduct-${randomId}`,
            description: "descriptionTest",
            price: 10.5,
            productType: ProductType.CPU,
        });
        await use(createProduct);
    },
});

export const test = dtoFactory;
