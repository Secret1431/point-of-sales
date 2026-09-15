import { 
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell 
} from "@/components/ui/table";
import { Sale } from "@/schema/sale-schema";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

interface SaleTableProps {
   onEdit: (sale: Sale) => void;
   sales: Sale[];
   meta: {
    current_page: number;
    last_page: number;
    per_page: number;
   }
   routeName: string;
};

export function SaleTable({ onEdit, sales, meta, routeName }: SaleTableProps) {
    return (
        <div className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Sale Date</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Paid</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Customer Type</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sales?.length > 0 ? (
                        sales.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>{sale.id}</TableCell>
                                <TableCell>{sale.transaction_number}</TableCell>
                                <TableCell>{sale.sale_date}</TableCell>
                                <TableCell>{sale.total_amount}</TableCell>
                                <TableCell>{sale.discount_amount}</TableCell>
                                <TableCell>{sale.amount_paid}</TableCell>
                                <TableCell>{sale.change_amount}</TableCell>
                                <TableCell>{sale.customer_type}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size="icon" onClick={() => onEdit(sale)}>
                                        <Pencil />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableHead colSpan={10} className="text-slate-500 text-center">
                                No sales found
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