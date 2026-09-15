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
import { Product } from "@/schema/product-schema";
import { Pagination } from "@/components/ui/pagination";

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
    }
    routeName: string;
}

export function ProductTable({ products, onEdit, meta, routeName }: ProductTableProps) {
    return (
        <div className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Brand Name</TableHead>
                        <TableHead>Generic Name</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Reorder</TableHead>
                        <TableHead>Prescription</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.length > 0 ? (
                        products.map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell>{prod.id}</TableCell>
                                <TableCell>{prod.category_id}</TableCell>
                                <TableCell>{prod.supplier_id}</TableCell>
                                <TableCell>{prod.brand_name}</TableCell>
                                <TableCell>{prod.generic_name}</TableCell>
                                <TableCell>{prod.unit}</TableCell>
                                <TableCell>{prod.selling_price}</TableCell>
                                <TableCell>{prod.reorder_level}</TableCell>
                                <TableCell>{prod.requires_prescription}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size="icon" onClick={() => onEdit(prod)}>
                                        <Pencil />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableHead colSpan={10} className="text-slate-500 text-center">
                                No products found
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