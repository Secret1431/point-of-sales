import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { PaginateFilter } from "@/schema/paginate-filter";

interface CategoryFilterProps {
    filters: PaginateFilter;
    onAdd: () => void;
}
export function CategoryFilter({ filters, onAdd }: CategoryFilterProps) {
    const [search, setSearch] = useState(filters?.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    route('categories.index'),
                    { ...filters, search },
                    { preserveState: true, preserveScroll: true }
                )
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input 
                 type="search"
                 placeholder="Category search..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-9"
                />
            </div>

            <Button onClick={onAdd}>
                <Plus /> Add Category
            </Button>
        </div>
    )
}