import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Sale, saleSchema } from "@/schema/sale-schema";
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

interface SaleFormProps {
  sale: Sale;
  flash: {
    success?: string;
    error?: string;
    warning?: string;
  }
}

export function SaleForm({ sale }: SaleFormProps) {
  const { props } = usePage<SaleFormProps>();
  const { data, setData, put, post, processing, errors, reset } = useForm({
    id: sale?.id,
    transaction_number: sale?.transaction_number,
    sale_date: sale?.sale_date,
    total_amount: sale?.total_amount,
    discount_amount: sale?.discount_amount,
    amount_paid: sale?.amount_paid,
    change_amount: sale?.change_amount,
    customer_type: sale?.customer_type
  } as Sale);

  useEffect(() => {
    setData({
      id: sale?.id,
      transaction_number: sale?.transaction_number,
      sale_date: sale?.sale_date,
      total_amount: sale?.total_amount,
      discount_amount: sale?.discount_amount,
      amount_paid: sale?.amount_paid,
      change_amount: sale?.change_amount,
      customer_type: sale?.customer_type
    });
  }, [sale]);

  useEffect(() => {
    if (props.flash.success) {
      toast.success(props.flash.success);
    } else if (props.flash.error) {
      toast.error(props.flash.error);
    } else if (props.flash.warning) {
      toast.warning(props.flash.warning);
    }
  }, [props.flash]);

  useEffect(() => {
    let discount = 0;

    if (data.customer_type === "Senior" || data.customer_type === "Pwd") {
      discount = data.total_amount ? data.total_amount * 0.20 : 0; // 20% discount
    }

    const netAmount = (data.total_amount || 0) - discount;
    const change = (data.amount_paid || 0) - netAmount;

    setData((prev) => ({
      ...prev,
      discount_amount: discount,
      change_amount: change < 0 ? 0 : change,
    }));
  }, [data.total_amount, data.amount_paid, data.customer_type]);

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();

    const result = saleSchema.safeParse(data);
    if (!result.success) {
      toast.warning('Please input your field');
      return;
    }

    if (sale) {
      put(`/sales/${sale.id}`);
    } else {
      post("/sales");
    }
    reset();
  };

  const editableFields = [
    ["transaction_number", "Transaction", "number"],
    ["sale_date", "Sale Date", "date"],
    ["total_amount", "Total Amount", "number"],
    ["amount_paid", "Amount Paid", "number"],
    ["customer_type", "Customer Type", "select"],
  ] as const;

  const computedFields = [
    ["discount_amount", "Discount Amount", "number"],
    ["change_amount", "Change Amount", "number"],
  ] as const;

  return (
    <div className="w-full bg-white border border-gray-300 shadow-sm rounded-lg p-4">
      <form onSubmit={handleAddSale} className="flex flex-col gap-4">
        {editableFields.map(([name, label, type]) => (
          <div key={name}>
            {type === "select" ? (
              <Select
                value={data[name] ? String(data[name]) : ""}
                onValueChange={(val) =>
                  setData(name, val as "Senior" | "Pwd" | "Regular")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senior">Senior Citizen</SelectItem>
                  <SelectItem value="Pwd">Person with Disability</SelectItem>
                  <SelectItem value="Regular">Regular</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                placeholder={label}
                value={String(data[name] ?? "")}
                onChange={(e) => {
                  setData(
                    name,
                    type === "number" ? Number(e.target.value) : e.target.value
                  );
                }}
              />
            )}
          </div>
        ))}

        {computedFields.map(([name, label, type]) => (
          <div key={name}>
            <Input
              type={type}
              placeholder={label}
              value={String(data[name] ?? 0)}
              readOnly
            />
          </div>
        ))}

        <div className="flex items-center">
          <Button
            type="submit"
            disabled={processing}
            className="w-full bg-slate-500 hover:bg-slate-400"
          >
            {processing ? "Saving" : sale ? "Update sale" : "Save sale"}
          </Button>
        </div>
      </form>
    </div>
  );
}
