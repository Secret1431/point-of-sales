import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Supplier, supplierSchema } from "@/schema/supplier-schema";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

interface SupplierFormProps {
    supplier: Supplier;
    open: boolean;
    onClose: () => void;
    flash: {
        success?: string;
        error?: string;
        warning?: string;
    }
}

export function SupplierForm({ supplier, open, onClose }: SupplierFormProps) {
    const { props } = usePage<SupplierFormProps>();

    const { data, setData, put, post, processing, errors, reset } = useForm({
        id: supplier?.id,
        supplier_name : supplier?.supplier_name,
        contact_person: supplier?.contact_person,
        phone: supplier?.phone,
        email: supplier?.email,
        address: supplier?.address
    });

    useEffect(() => {
        setData({
            id: supplier?.id,
            supplier_name : supplier?.supplier_name,
            contach_person: supplier?.contact_person,
            phone: supplier?.phone,
            email: supplier?.email,
            address: supplier?.address
        })
    }, [supplier]);

    useEffect(() => {
        if (props.flash.success) {
            toast.success(props.flash.success);
        } else if (props.flash.error) {
            toast.error(props.flash.error);
        } else if (props.flash.warning) {
            toast.warning(props.flash.warning);
        }
    }, [props.flash]);

    const handleAddSupplier = (e: React.FormEvent) => {
        e.preventDefault();

        const result = supplierSchema.safeParse(data);
        if (!result.success) {
            toast.warning('Please input youre field');
            return;
        }

        if (supplier) {
            put(`/suppliers/${supplier.id}`);
        } else {
            post('/suppliers');
        }
        reset();
    }

    const fields = [
        ["supplier_name", "Supplier Name", "text"],
        ["contact_person", "Contact Person", "text"],
        ["phone", "Phone", "number"],
        ["email", "Email Address", "email"],
        ["address", "Address", "text"],
    ] as const;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{supplier ? "Edit supplier" : "Add supplier"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddSupplier} className="flex flex-col gap-4">
                    {fields.map(([name, label, type]) => (
                        <div key={name}>
                            <Input 
                                type={type}
                                placeholder={label}
                                value={data[name]}
                                onChange={(e) => {
                                    setData(
                                        name,
                                        type === 'number' 
                                        ? Number(e.target.value)
                                        : e.target.value
                                    )
                                }}
                            />
                            {errors[name] && (
                                <p className="text-red-500">
                                    {errors[name]}
                                </p>
                            )}
                        </div>
                    ))}

                    <DialogFooter>
                        <Button type="button" onClick={onClose}>Close</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving" : supplier ? "Update supplier" : "Save supplier"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}