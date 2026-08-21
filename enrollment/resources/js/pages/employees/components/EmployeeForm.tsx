import { useForm } from "@/hooks/use-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Employee } from "../types/employee";
import { useEmployeeStore } from "../store/employee.store";

interface EmployeeFormProps {
  employee?: Employee;
  onSuccess?: () => void;
}

export function EmployeeForm({ employee, onSuccess }: EmployeeFormProps) {
  const { createEmployee, updateEmployee } = useEmployeeStore();

  const { form, handleChange, resetForm } = useForm({
    firstname: employee?.firstname ?? "",
    lastname: employee?.lastname ?? "",
    middlename: employee?.middlename ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (employee) {
      await updateEmployee(employee.id, form);
    } else {
      await createEmployee(form);
      resetForm();
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="firstname"
        placeholder="First Name"
        value={form.firstname}
        onChange={handleChange}
      />
      <Input
        name="lastname"
        placeholder="Last Name"
        value={form.lastname}
        onChange={handleChange}
      />
      <Input
        name="middlename"
        placeholder="Middle Name"
        value={form.middlename}
        onChange={handleChange}
      />

      <Button type="submit">
        {employee ? "Update" : "Create"} Employee
      </Button>
    </form>
  );
}