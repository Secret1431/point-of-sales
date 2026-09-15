import { z } from "zod";

export const productSchema = z.object({
    id: z.number().optional(),
    category_id: z.number(),
    supplier_id: z.number(),
    brand_name: z.string(),
    generic_name: z.string(),

    unit: z.number({
        message: "Required unit",
    }),

    selling_price: z.number({
        message: "Required selling price",
    }),

    reorder_level: z.number({
        message: "Required reorder level",
    }),

    requires_prescription: z.boolean({
    message: "Required",
}),
});

export type Product = z.infer<typeof productSchema>