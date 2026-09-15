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
import { Batch } from "@/schema/batch-schema";
import { Pagination } from "@/components/ui/pagination";

interface BatchTableProps {
    onEdit: (batch: Batch) => void;
    batches: Batch[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
    }
    routeName: string;
};

export function BatchTable({ onEdit, batches, meta, routeName }: BatchTableProps) {
    return (
        <div className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Batch Number</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Received Date</TableHead>
                        <TableHead>Expiration Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {batches.length > 0 ? (
                        batches.map((bat) => (
                            <TableRow key={bat.id}>
                                <TableCell>{bat.id}</TableCell>
                                <TableCell>{bat.product_id}</TableCell>
                                <TableCell>{bat.supplier_id}</TableCell>
                                <TableCell>{bat.batch_number}</TableCell>
                                <TableCell>{bat.cost_price}</TableCell>
                                <TableCell>{bat.quantity_received}</TableCell>
                                <TableCell>{bat.current_stock}</TableCell>
                                <TableCell>{bat.received_date}</TableCell>
                                <TableCell>{bat.expiration_date}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size='icon' onClick={() => onEdit(bat)}>
                                        <Pencil />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableCell colSpan={10} className="text-slate-500 text-center">
                                No batches found
                            </TableCell>
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