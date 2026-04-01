import { expect } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";
import { ApiRequestFn } from "../../api-types";
import { GetProductsContract } from "../../schemas/eaWebApp/getProducts.contract";
import { ProductServiceEndpoints } from "./endpoints";
import { CreateProductPayload } from "../../payloads/eaWebApp/createProduct.payload";

export class ProductService {
    async getProducts(apiRequest: ApiRequestFn) {
        const test = ProductServiceEndpoints.getProducts;
        const { status, body } = await apiRequest<GetProductsContract[]>({
            method: "GET",
            url: ProductServiceEndpoints.getProducts,
            baseUrl: envConfig.apiUrl,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as GetProductsContract[];
    }

    async getProductById(apiRequest: ApiRequestFn, productId: string) {
        const { status, body } = await apiRequest<GetProductsContract>({
            method: "GET",
            url: ProductServiceEndpoints.getProductById(productId),
            baseUrl: envConfig.apiUrl,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as GetProductsContract;
    }

    async createProduct(
        apiRequest: ApiRequestFn,
        payload: CreateProductPayload,
    ) {
        const { status, body } =  await apiRequest<GetProductsContract>({
            method: "POST",
            url: ProductServiceEndpoints.createProduct,
            baseUrl: envConfig.apiUrl,
            body: payload,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as GetProductsContract;
    }
}
