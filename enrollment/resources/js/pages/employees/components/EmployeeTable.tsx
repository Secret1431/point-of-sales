import { Employee } from "../types/employee";
import fakeEmployees from '../../../fakeDb/employee';
import { useEmployeeStore } from "../store/employee.store";

import { TableHead } from "@/components/ui/DataTable/table-head";
import { TableHeader } from "@/components/ui/DataTable/table-header";
import { TableRow } from "@/components/ui/DataTable/table-row";
import { TableBody } from "@/components/ui/DataTable/table-body";
import { TableCell } from "@/components/ui/DataTable/table-cell";
import { Pagination } from "@/components/ui/pagination";

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
    <div className="w-full overflow-x-auto bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
      <TableHeader 
        title="Employee Form" 
        description="Manage all employee" 
        onAddClick={() => console.log('Add clicked')} 
      />

        <table className="w-full text-left text-sm border-t border-b border-gray-200">
          <TableHead>
            <TableRow>
              <TableCell header className="w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableCell>
              <TableCell header>Username</TableCell>
              <TableCell header>Role</TableCell>
              <TableCell header>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fakeEmployees.length > 0 ? (
              fakeEmployees.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.middlename}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center py-12 text-gray-400" header={false}>  
                  No record found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
        <Pagination />
      </div>
  );
}