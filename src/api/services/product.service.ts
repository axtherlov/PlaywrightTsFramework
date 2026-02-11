import { expect } from "@playwright/test";
import { envConfig } from "../../config/environment-config";
import { ApiRequestFn } from "../api-types";
import { GetProductsContract } from "../schemas/getProductsContract";

export class ProductService {
    async getProducts(apiRequest: ApiRequestFn) {
        const { status, body } = await apiRequest<GetProductsContract[]>({
            method: "GET",
            url: ProductServiceEndpoints.GET_PRODUCTS,
            baseUrl: envConfig.apiUrlSut2,
        });

        expect(status).toBe(200);
        expect(body).toBeTruthy();

        return body as GetProductsContract[];
    }
}

export enum ProductServiceEndpoints {
    GET_PRODUCTS = "/Product/GetProducts",
}
