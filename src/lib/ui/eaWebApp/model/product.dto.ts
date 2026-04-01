import { ProductType } from "../enums/product-type.enum";

export class ProductDto {
    name: string;
    description: string;
    price: number;
    productType: ProductType;

    constructor({
        name,
        description,
        price,
        productType,
    }: {
        name: string;
        description: string;
        price: number;
        productType: ProductType;
    }) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.productType = productType;
    }
}
