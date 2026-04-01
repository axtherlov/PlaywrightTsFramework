import { ProductType } from "../../../ui/eaWebApp/enums/product-type.enum";

export interface CreateProductPayload {
    id: number;
    name: string;
    description: string;
    price: number;
    productType: ProductType;
}
