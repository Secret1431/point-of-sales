import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaginateFilter } from "@/schema/paginate-filter";

interface SuppplierFilterProps {
    filters: PaginateFilter;
    onAdd: () => void;
}

export function SupplierFilter({ filters, onAdd }: SuppplierFilterProps) {
    const [search, setSearch] = useState(filters?.search || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || "")) {
                router.get(
                    route('suppliers.index'),
                    { ...filters, search },
                    { preserveState: true, preserveScroll: true }
                )
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-2">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input 
                    type="search"
                    placeholder="Supplier search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            <div>
                <Button onClick={onAdd}>
                    <Plus /> Add Supplier
                </Button>
            </div>
        </div>
    )
}