import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Batch, batchSchema } from "@/schema/batch-schema";
import { Product } from "@/schema/product-schema";
import { Supplier } from "@/schema/supplier-schema";

interface BatchFormProps {
  batch?: Batch;
  flash: {
    success?: string;
    error?: string;
    warning?: string;
  }
  products: Product[];
  suppliers: Supplier[];
}

export function BatchForm({ batch }: BatchFormProps) {
  const { props } = usePage<BatchFormProps>();
  const productList = props.products;
  const supplierList = props.suppliers;

  const { data, setData, put, post, processing, errors } = useForm({
    id: batch?.id,
    product_id: batch?.product_id,
    supplier_id: batch?.supplier_id,
    batch_number: batch?.batch_number,
    cost_price: batch?.cost_price,
    quantity_received: batch?.quantity_received,
    current_stock: batch?.current_stock,
    received_date: batch?.received_date,
    expiration_date: batch?.expiration_date,
  });

  useEffect(() => {
    if (batch) {
      setData({
        id: batch.id,
        product_id: batch.product_id ?? null,
        supplier_id: batch.supplier_id ?? null,
        batch_number: batch.batch_number ?? 0,
        cost_price: batch.cost_price ?? 0,
        quantity_received: batch.quantity_received ?? 0,
        current_stock: batch.current_stock ?? 0,
        received_date: batch.received_date ?? "",
        expiration_date: batch.expiration_date ?? "",
      });
    }
  }, [batch]);

  useEffect(() => {
    if (props.flash.error) {
      toast.success(props.flash.success);
    } else if (props.flash.error) {
      toast.error(props.flash.error)
    } else if (props.flash.warning) {
      toast.warning(props.flash.warning);
    }
  }, [props.flash]);

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();

    const result = batchSchema.safeParse(data);
    if (!result.success) {
      toast.warning('Please input youre field');
      return;
    }

    if (batch?.id) {
      put(`/batches/${batch.id}`);
    } else {
      post("/batches", {
        onError: (errs) => console.log(errs),
      });
    }
  };

  const fields = [
    ["product_id", "Product", "select"],
    ["supplier_id", "Supplier", "select"],
    ["batch_number", "Batch Number", "number"],
    ["cost_price", "Cost Price", "number"],
    ["quantity_received", "Quantity", "number"],
    ["current_stock", "Stock", "number"],
    ["received_date", "Received Date", "date"],
    ["expiration_date", "Expiration", "date"],
  ] as const;

  return (
    <div className="w-full bg-white border border-gray-300 shadow-md rounded-lg p-3">
      <form onSubmit={handleAddBatch} className="flex flex-col gap-4">
        {fields.map(([name, label, type]) => (
          <div key={name}>
            {type === "select" ? (
              <Select
                value={data[name] ? String(data[name]) : ""}
                onValueChange={(val) => setData(name, Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                  {(name === "product_id" ? productList : supplierList).map(
                    (item: any) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name || item.generic_name || item.supplier_name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                placeholder={label}
                value={data[name] ?? ""}
                onChange={(e) => {
                  setData(
                    name,
                    type === "number"
                      ? Number(e.target.value)
                      : e.target.value
                  );
                }}
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            disabled={processing}
            className="w-full bg-slate-500 hover:bg-slate-400"
          >
            {processing ? "Saving" : batch ? "Update batch" : "Save batch"}
          </Button>
        </div>
      </form>
    </div>
  );
}