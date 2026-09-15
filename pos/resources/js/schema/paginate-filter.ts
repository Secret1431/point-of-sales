import { z } from "zod";

export const paginationSchema = z.object({
    search: z.string().optional(),
    date: z.string().optional()
});

export type PaginateFilter = z.infer<typeof paginationSchema>