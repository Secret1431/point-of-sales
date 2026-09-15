import { z } from "zod";

export const supplierSchema = z.object({
    id: z.number(),
    supplier_name: z.string().max(50, "Supplier name is required"),
    contact_person: z.string().max(50),
    phone: z.number(),
    email: z.string(),
    address: z.string()
});

export type Supplier = z.infer<typeof supplierSchema>