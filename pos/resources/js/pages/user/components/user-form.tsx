import { useForm } from "@inertiajs/react";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";

interface UserFormProps {
    user?: User,
    onSuccess: () => void;
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    middlename: user?.middlename ?? "",
    status: user?.status ?? ""
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();

    const options = {
      preserveScroll: true,
      onSuccess: () => {
        reset(),
        onSuccess?.() 
      },
    };

    if(user) {
      put(`/users/${user.id}`, options);
    } else {
      post('/users', options);
    }
  };

  const fields = [
    { type: 'text', name: 'firstname', placeholder: 'First Name', required: true },
    { type: 'text', name: 'lastname', placeholder: 'Last Name', required: true },
    { type: 'text', name: 'middlename', placeholder: 'Middle Name', required: true },
    { type: 'select', name: 'status', placeholder: 'Status', options: ["Active", "Inactive"]}
  ];

  return (
    <div className="w-full bg-white border border-gray-300 shadow-sm rounded-lg p-6">
      <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
        {fields.map((f) => (
          <FormField 
           {...f}
           key={f.name}
           value={data[f.name as keyof typeof data]}
           onChange={setData}
          />
        ))}
      </form>
    </div>
  )
}