import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { 
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem 
} from "@/components/ui/select";

interface PaginationProps {
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
    };
    routeName: string;
}

export function Pagination({ meta, routeName }: PaginationProps) {
    if(meta.last_page <= 1) {
        return null;
    }

    const handlePageOrLimit = (newPage: number, newLimit: number) => {
        router.get(
            routeName,
            { page: newPage, per_page: newLimit },
            { preserveState: true, preserveScroll: true }
        )
    };

    return (
        <div className="flex sm:justify-between sm:items-center text-gray-700 p-2">
            <div className="flex items-center gap-4">
                <Select value={String(meta.per_page)} onValueChange={(val) => handlePageOrLimit(1, Number(val))}>
                    <SelectTrigger>
                        <SelectValue placeholder='Filtered rows'>Filtered Rows</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">Rows 10</SelectItem>
                        <SelectItem value="100">Rows 100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-4">
                <Button
                 disabled={meta.current_page === 1}
                 onClick={() => handlePageOrLimit(meta.current_page -1, meta.per_page)}
                 className="size-7 w-15 text-xs"
                >
                    Previous
                </Button>

                <span className="text-slate-500 text-sm">
                    Page {meta.current_page} of {meta.last_page}
                </span>

                <Button
                 disabled={meta.current_page >= meta.last_page}
                 onClick={() => handlePageOrLimit(meta.current_page + 1, meta.per_page)}
                 className="size-7 w-15 text-xs"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}