import { Employee } from "../types/employee";
import { useEmployeeStore } from "../store/employee.store";

import { TableHead } from "@/components/ui/DataTable/table-head";
import { TableRow } from "@/components/ui/DataTable/table-row";
import { TableBody } from "@/components/ui/DataTable/table-body";
import { TableCell } from "@/components/ui/DataTable/table-cell";

interface EmployeeTableProps {
    onEdit: (employee: Employee) => void;
}

export function EmployeeTable({ onEdit }: EmployeeTableProps) {

    const { employees, deleteEmployee } = useEmployeeStore();

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure want to delete")) {
            await deleteEmployee(id);
        }
    }

   return (
        <table className="w-full">
            <TableHead>
                <TableRow>
                    <TableCell header>ID</TableCell>
                    <TableCell header>First Name</TableCell>
                    <TableCell header>Last Name</TableCell>
                    <TableCell header> MiddleName</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {employees.length === 0 ? (
                    <TableRow>
                        <TableCell>No employee found</TableCell>
                    </TableRow>
                ): (
                    employees.map((emp) => (
                        <TableRow key={emp.id}>
                            <TableCell>{emp.firstname}</TableCell>
                            <TableCell>{emp.lastname}</TableCell>
                            <TableCell>{emp.middlename}</TableCell>

                            <TableCell>
                                <button
                                    onClick={() => onEdit(emp)}
                                    className="py-2 px-4 bg-green-500 shadow-sm rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(emp.id)}
                                    className="py-2 px-4 bg-red-500 shadow-sm rounded"
                                >
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </table>
   )
}