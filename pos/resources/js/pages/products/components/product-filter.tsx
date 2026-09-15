import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PaginateFilter } from "@/schema/paginate-filter";

interface ProductFilterProps {
    filters: PaginateFilter;
}

export function ProductFilter({ filters }: ProductFilterProps) {
    const [search, setSearch] = useState(filters?.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    route('products.index'),
                    { ...filters, search },
                    { preserveState: true, preserveScroll: true }
                )
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input 
                    type="search"
                    placeholder="Product search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>
        </div>
    )
}