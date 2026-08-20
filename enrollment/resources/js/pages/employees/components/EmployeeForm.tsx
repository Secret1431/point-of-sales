import { useForm } from "@/hooks/use-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Employee } from "../types/employee";
import { useEmployeeStore } from "../store/employee.store";

interface EmployeeFormProps {
    employee?: Employee;
    onSuccess?: () => void;
}

interface EmployeeFormData {
    firstname: string;
    lastname: string;
    middlename: string;
}

const initialForm: EmployeeFormData = {
    firstname: '',
    lastname: '',
    middlename: '' 
}

export function EmployeeForm({
    employee,
    onSuccess 
}: EmployeeFormProps) {

    const { createEmployee, updateEmployee } = useEmployeeStore();

    const { form, setForm, handleChange, resetForm } = useForm(
        employee ? {
            firstname: employee.firstname,
            lastname: employee.lastname,
            middlename: employee.middlename
        }
        : initialForm 
    );

    const handleSubmitEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (employee) {
            await updateEmployee(employee.id, form);
        } else {
            await createEmployee(form);
        }
    };

    return (
        <form onSubmit={handleSubmitEmployee} className="">
            <Input 
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
            />

            <Input 
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
            />

            <Input 
                type="text"
                name="middlename"
                value={form.middlename}
                onChange={handleChange}
            />

            <Button type="submit">
                {employee ? 'Update Employee' : 'Create Employee'}
            </Button>
        </form>
    )
}