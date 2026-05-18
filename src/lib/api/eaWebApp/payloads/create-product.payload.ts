import { z } from "zod";
import { ProductType } from "../../../ui/eaWebApp/enums/product-type.enum";

export const CreateProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    productType: z.enum([ProductType.CPU, ProductType.MONITOR]),
});

export type CreateProductPayload = z.infer<typeof CreateProductSchema>;
