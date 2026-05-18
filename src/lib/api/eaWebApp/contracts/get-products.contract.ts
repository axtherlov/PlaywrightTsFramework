import { z } from "zod";

export const GetProductsSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    productType: z.number(),
});

export type GetProductsContract = z.infer<typeof GetProductsSchema>;
