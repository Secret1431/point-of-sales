import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Item, itemSchema } from "@/schema/item-schema";
import { Sale } from "@/schema/sale-schema";
import { Batch } from "@/schema/batch-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem  
} from "@/components/ui/select";

interface ItemFormProps {
    item: Item | null;
    flash: {
        success?: string;
        error?: string;
        warning?: string;
    }
    batches: Batch[];
    sales: Sale[];
}

export function ItemForm({ item }: ItemFormProps) {
    const { props } = usePage<ItemFormProps>();
    const batchesList = props.batches;
    const salesList = props.sales;

    const { data, setData, put, post, processing, errors, reset } = useForm({
        id: item?.id,
        sale_id: item?.sale_id,
        batch_id: item?.batch_id,
        quantity: item?.quantity,
        unit_price: item?.unit_price,
        subtotal: item?.subtotal 
    });

    useEffect(() => {
        setData({
            id: item?.id,
            sale_id: item?.sale_id,
            batch_id: item?.batch_id,
            quantity: item?.quantity,
            unit_price: item?.unit_price,
            subtotal: item?.subtotal 
        })
    }, [item]);

    useEffect(() => {
        if (props.flash.success) {
            toast.success(props.flash.success);
        } else if (props.flash.error) {
            toast.error(props.flash.error);
        } else if (props.flash.warning) {
            toast.warning(props.flash.warning);
        }
    }, [props.flash]);

    const handleCreateItem = (e: React.FormEvent) => {
        e.preventDefault();

        const result = itemSchema.safeParse(data);
        if (!result.success) {
            toast.warning('Please input your field');
            return;
        }

        if (item) {
            put(`/items/${item.id}`)
        } else {
            post('/items', {
                onError: (errors) => {
                    console.log(errors);
                }
            })
        }
    };

    const fields = [
        ["sale_id", "Sale", "select"],
        ["batch_id", "Batch", "select"],
        ["quantity", "Quantity", "number"],
        ["unit_price", "Unit Price", "number"],
        ["subtotal", "Sub total", "number"],
    ]as const;

    return (
        <div className="w-full bg-white border border-gray-300 shadow-md rounded-xl p-3">
            <form onSubmit={handleCreateItem} className="flex flex-col gap-4">
                {fields.map(([ name, label, type ]) => (
                    type === 'select' ? (
                        <Select 
                            value={String(data[name] ?? "")} 
                            onValueChange={(val) => setData(name, Number(val))}>
                            <SelectTrigger>
                                <SelectValue placeholder={label} />
                            </SelectTrigger>
                            <SelectContent>
                                {( name === 'batch_id' ? batchesList : salesList).map((item: any) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.name || item.transaction_number || item.batch_number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ): (
                        <Input 
                         type={type}
                         key={name}
                         placeholder={label}
                         value={String(data[name])}
                         onChange={(e) => {
                            setData(
                                name,
                                Number(e.target.value)
                            )
                         }}
                        />
                    )
                ))}

                <div className="flex items-center gap-2">
                    <Button 
                        type="submit" 
                        disabled={processing} 
                        className="w-full bg-slate-500 hover:bg-slate-400"
                    >
                        {processing ? 'Saving' : item ? 'Update item' : 'Save Item'}
                    </Button>
                </div>
            </form>
        </div>
    )
}