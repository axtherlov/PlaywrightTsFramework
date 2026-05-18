import { expect } from "@playwright/test";
import { envConfig } from "../../../config/environment-config";
import type { ApiRequestFn, AuthType } from "../../api-types";
import { GetProductsContract } from "../contracts/get-products.contract";
import { ProductServiceEndpoints } from "./endpoints";
import { CreateProductPayload } from "../payloads/create-product.payload";

export class ProductService {
    constructor(
        private readonly apiRequest: ApiRequestFn,
        private readonly authToken: string,
        private readonly authType: AuthType,
    ) {}

    async getProducts() {
        const { status, body } = await this.apiRequest<GetProductsContract[]>({
            method: "GET",
            url: ProductServiceEndpoints.getProducts,
            baseUrl: envConfig.apiUrl,
            headers: this.authToken,
            authType: this.authType,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as GetProductsContract[];
    }

    async getProductById(productId: string) {
        const { status, body } = await this.apiRequest<GetProductsContract>({
            method: "GET",
            url: ProductServiceEndpoints.getProductById(productId),
            baseUrl: envConfig.apiUrl,
            headers: this.authToken,
            authType: this.authType,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as GetProductsContract;
    }

    async createProduct(payload: CreateProductPayload) {
        const { status, body } = await this.apiRequest<GetProductsContract>({
            method: "POST",
            url: ProductServiceEndpoints.createProduct,
            baseUrl: envConfig.apiUrl,
            body: payload,
            headers: this.authToken,
            authType: this.authType,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as GetProductsContract;
    }
}
