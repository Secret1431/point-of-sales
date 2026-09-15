import { router } from "@inertiajs/react";
import { User } from "@/types/user";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Pencil, Trash } from "lucide-react";
import { TableComponent } from "@/components/ui/data-tables/body";

interface UserTableProps {
    users: User[];
    serchUser: string;
    onSearch: (searchUser: string) => void;
    onEdit: (user: User) => void;
}

export function UserTable({ users, onEdit, serchUser, onSearch }: UserTableProps) {

  const handleRemoveUser = (id: number) => {
    const confirmed = window.confirm(
      'Are you sure want to delete this users?'
    );

    if(!confirmed) return;

    router.delete(`/users/${id}`, {
      preserveScroll: true 
    });
  }

  const columns = [
    { key: 'id', label: '#', render: (user: User) => user.id },
    { key: 'firstname', label: 'First Name', render: (user: User) => user.firstname },
    { key: 'lastname', label: 'Last Name', render: (user: User ) => user.lastname },
    { key: 'middlename', label: 'Middle Name', render: (user: User ) => user.middlename },
    { key: 'status', label: 'Status', render: (user: User) => user.status},
    { key: 'actions', label: 'Action', render: (user: User) => {
      <div className="flex flex-col gap-2">
        <Button
         size="sm"
         variant='outline'
         onClick={() => onEdit(user)}
        >
          <Pencil />
        </Button>

        <Button
         size='sm'
         variant='destructive'
         onClick={() => handleRemoveUser(user.id)}
        >
          <Trash />
        </Button>
      </div>
    }}
  ];

  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="relative sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <Input 
                 type="search"
                 placeholder="User Search..."
                 value={serchUser}
                 onChange={(e) => onSearch(e.target.value)} 
                 className="pl-9"
                />
            </div>
        </div>
        <TableComponent 
         data={users}
         columns={columns}
         emptyMessage="No users found"
        />
    </div>
  )
}