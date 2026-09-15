import { z } from "zod";

export const itemSchema = z.object({
    id: z.number().optional(),
    sale_id: z.number(),
    batch_id: z.number(),
    quantity: z.number(),
    unit_price: z.number(),
    subtotal: z.number()
});

export type Item = z.infer<typeof itemSchema>