import { z } from "zod";

export const saleSchema = z.object({
    id: z.number().optional(),
    transaction_number: z.number(),
    sale_date: z.string(),
    total_amount: z.number(),
    discount_amount: z.number(),
    amount_paid: z.number(),
    change_amount: z.number(),
    customer_type: z.enum(['Senior', 'Pwd'])
});

export type Sale = z.infer<typeof saleSchema>