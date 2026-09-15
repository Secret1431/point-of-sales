import { z } from "zod";

export const categorySchema = z.object({
    id: z.number(). optional(),
    category_name: z.string().min(1, "Required category name")
});

export type Category = z.infer<typeof categorySchema>