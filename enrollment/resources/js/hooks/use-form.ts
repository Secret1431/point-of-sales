import { useState } from "react";

export function useForm<T extends Record<string, any>>(
    initialForm: T
) {
    const [form, setForm] = useState<T>(initialForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name] : value 
        }));
    }

    const resetForm = () => {
        setForm(initialForm);
    }

    return {
        form,
        setForm,
        handleChange,
        resetForm 
    }
}