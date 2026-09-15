import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Category, categorySchema } from "@/schema/category-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter 
} from "@/components/ui/dialog";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
}

interface SonnerProps {
    flash: {
        success?: string;
        error?: string;
        warning?: string;
    }
}

export function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
    const { props } = usePage<SonnerProps>();
    const { data, setData, put, post, processing, errors, reset } = useForm<Category>({
        id: category?.id,
        category_name: category?.category_name ?? ''
    });

    useEffect(() => {
        setData({
            id: category?.id,
            category_name: category?.category_name ?? ''
        })
    }, [category]);

    useEffect(() => {
        if (props.flash.success) {
            toast.success(props.flash.success);
        } else if (props.flash.error) {
            toast.error(props.flash.error);
        } else if (props.flash.warning) {
            toast.warning(props.flash.warning);
        }
    }, [props.flash]);

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();

        const result = categorySchema.safeParse(data);
        if (!result.success) {
            toast.error("Please check your input");
            return;
        }

        if (category) {
            put(`/categories/${category.id}`, {
                onSuccess: () => {
                    onClose();
                }
            });
        } else {
            post('/categories', {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    const fields = [
        ["category_name", "Category Name", "text"],
    ]as const;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {category ? 'Edit category' : 'Add category'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddCategory} className="flex flex-col gap-2">
                    {fields.map(([name, label, type]) => (
                        <div key={name}>
                            <Input 
                             type={type}
                             placeholder={label}
                             value={data[name]}
                             onChange={(e) => {
                                setData(
                                    name,
                                    String(e.target.value)
                                )
                             }}
                            />
                        </div>
                    ))}

                    <DialogFooter>
                        <Button type="submit" disabled={processing} className="bg-slate-500 hover:bg-slate-400">
                            {processing ? 'Saving' : category ? 'Update category' : 'Save Category'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}