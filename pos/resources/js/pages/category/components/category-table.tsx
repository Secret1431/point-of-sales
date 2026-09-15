import { 
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell 
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/schema/category-schema";
import { Pagination } from "@/components/ui/pagination";

interface CategoryTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    meta: {
        current_page: number;
        per_page: number;
        last_page: number;
    }
    routeName: string;
}

export function CategoryTable({ categories, onEdit, meta, routeName }: CategoryTableProps) {
    return (
        <div className="w-full bg-white border border-gray-300 shadow rounded-lg">
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell>{cat.id}</TableCell>
                                <TableCell>{cat.category_name}</TableCell>
                                <TableCell>{cat.category_name}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size='icon' onClick={() => onEdit(cat)}>
                                        <Pencil />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableHead colSpan={10} className="text-slate-500 text-center">
                                No categories found
                            </TableHead>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination 
                meta={meta}
                routeName={routeName}
            />
        </div>
    )
}