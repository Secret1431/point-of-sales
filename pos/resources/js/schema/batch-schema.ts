import { z } from 'zod';

export const batchSchema = z.object({
    id: z.number().optional(),
    product_id: z.number(),
    supplier_id: z.number(),
    batch_number: z.number(),
    cost_price: z.number(),
    quantity_received: z.number(),
    current_stock: z.number(),
    expiration_date: z.string(),
    received_date: z.string()
});

export type Batch = z.infer<typeof batchSchema>