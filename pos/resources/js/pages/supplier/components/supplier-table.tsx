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
import { Supplier } from "@/schema/supplier-schema";
import { Pagination } from "@/components/ui/pagination";

interface SupplierTableProps {
    onEdit: (supplier: Supplier) => void;
    suppliers: Supplier[]
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
    }
    routeName: string;
}

export function SupplierTable({ onEdit, suppliers, meta, routeName }: SupplierTableProps) {
    return (
        <div className="w-full bg-white border border-gray-300 shadow-sm rounded-xl">
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Supplier Name</TableHead>
                        <TableHead>Contact Person</TableHead>
                        <TableHead>Tel No.</TableHead>
                        <TableHead>Email Address</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {suppliers.length > 0 ? (
                        suppliers.map((sup) => (
                            <TableRow key={sup.id}>
                                <TableCell>{sup.id}</TableCell>
                                <TableCell>{sup.supplier_name}</TableCell>
                                <TableCell>{sup.contact_person}</TableCell>
                                <TableCell>{sup.phone}</TableCell>
                                <TableCell>{sup.email}</TableCell>
                                <TableCell>{sup.address}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size='icon' onClick={() => onEdit(sup)}>
                                        <Pencil />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableHead colSpan={10} className="text-slate-600 text-center">
                                No suppliers found
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