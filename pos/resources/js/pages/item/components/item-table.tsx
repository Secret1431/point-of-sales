import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Item } from "@/schema/item-schema";
import { PaginateFilter } from "@/schema/paginate-filter";
import { Pencil } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

interface ItemTableProps {
    onEdit: (item: Item) => void;
    items: Item[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
    }
    routeName: string;
}

export function ItemTable({ onEdit, items, meta, routeName }: ItemTableProps) {
    return (
        <div className="w-full bg-white border border-gray-300 shadow-md rounded-xl">
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Sale</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Aciton</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.sale_id}</TableCell>
                                <TableCell>{item.batch_id}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unit_price}</TableCell>
                                <TableCell>{item.subtotal}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button onClick={() => onEdit(item)}>
                                        <Pencil />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableHead colSpan={10} className="text-slate-600 text-center">
                                No items found
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