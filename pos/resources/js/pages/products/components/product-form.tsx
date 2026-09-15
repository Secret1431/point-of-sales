import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Product, productSchema } from "@/schema/product-schema";
import { Category } from "@/schema/category-schema";
import { Supplier } from "@/schema/supplier-schema";
import { SonnerProps } from "@/types/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem 
} from "@/components/ui/select";

interface ProductFormProps {
    flash: {
        success?: string;
        error?: string;
        warning?: string;
    }
    categories: Category[];
    suppliers: Supplier[];
    product?: Product | null;
}

export function ProductForm({ product }: ProductFormProps) {
    const { props } = usePage<SonnerProps>();
    const categoryList = props.categories;
    const supplierList = props.suppliers;

    const { data, setData, put, post, processing, errors, reset } = useForm({
        category_id: product?.category_id,
        supplier_id: product?.supplier_id,
        brand_name: product?.brand_name ?? "",
        generic_name: product?.generic_name ?? "",
        unit: product?.unit,
        selling_price: product?.selling_price,
        reorder_level: product?.reorder_level,
        requires_prescription: product?.requires_prescription ?? false
    }as Product);

    useEffect(() => {
        setData({
            category_id: product?.category_id,
            supplier_id: product?.supplier_id,
            brand_name: product?.brand_name ?? "",
            generic_name: product?.generic_name ?? "",
            unit: product?.unit,
            selling_price: product?.selling_price,
            reorder_level: product?.reorder_level,
            requires_prescription: product?.requires_prescription
        })
    }, [product]);

    useEffect(() => {
        if (props.flash.success) {
            toast.success(props.flash.success);
        } else if (props.flash.error) {
            toast.error(props.flash.error);
        } else if (props.flash.warning) {
            toast.warning(props.flash.warning);
        }
    }, [props.flash]);

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();

        const result = productSchema.safeParse(data);
        if (!result.success) {
            toast.error('Please input you field');
            return;
        }

        if (product) {
            put(`/products/${product.id}`, {
                onSuccess: () => {
                    
                }
            });
        } else {
            post('/products', {
                onSuccess: onAdd
            });
        }
    };

    const fields = [
        ["category_id", "Category Name", "select"],
        ["supplier_id", "Supplier Name", "select"],
        ["brand_name", "Brand Name", "text"],
        ["generic_name", "Generic Name", "text"],
        ["unit", "Unit", "number"],
        ["selling_price", "Selling Price", "number"],
        ["reorder_level", "Reorder Level", "number"],
        ["requires_prescription", "Requires Prescription", "checkbox"],
    ] as const;

    return (
        <div className="w-full bg-white border border-gray-300 shadow-md rounded-lg p-3">
            <form onSubmit={handleAddProduct} className="flex flex-col gap-2">
                {fields.map(([name, label, type]) => (
                    <div key={name}>
                        {type === 'select' ? (
                            <Select 
                                value={data[name] ? String(data[name]) : ""} 
                                onValueChange={(val) => setData(name, Number(val))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={label} />
                                </SelectTrigger>
                                <SelectContent>
                                    {( name === 'category_id' ? categoryList : supplierList).map((item: any) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.name || item.category_name || item.supplier_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ): type === 'checkbox' ? (
                            <Checkbox 
                                id="requires_prescription"
                                checked={data.requires_prescription}
                                onCheckedChange={(checked) => {
                                    setData("requires_prescription", checked === true)
                                }}
                            />
                        ): (
                            <Input 
                                type={type}
                                placeholder={label}
                                value={String(data[name])}
                                onChange={(e) => {
                                    setData(
                                        name,
                                        type === "number"
                                        ? Number(e.target.value)
                                        : e.target.value
                                    )
                                }}
                            />
                        )}
                    </div>
                ))}

                <div className="flex items-center ">
                    <Button type="submit" disabled={processing} className="w-full bg-slate-500 hover:bg-slate-400">
                        {processing ? 'Saving' : product ? 'Update product' : 'Save product'}
                    </Button>
                </div>
            </form>
        </div>
    )
}