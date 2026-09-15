<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareValidation(): void 
    {
        $this->merge([
            'product_id' => strip_tags($this->product_id),
            'supplier_id' => strip_tags($this->supplier_id),
            'batch_number' => strip_tags($this->batch_number),
            'cost_price' => strip_tags($this->cost_price),
            'quantity_received' => strip_tags($this->quantity_received),
            'current_stock' => strip_tags($this->current_stock),
            'expiration_date' => strip_tags($this->expiration_date),
            'received_date' => strip_tags($this->receieved_date) 
        ]);
    }

    public function rules(): array
    {
        $batchId = $this->route('batches')?->id;
        return [
            'product_id' => 'required|integer',
            'supplier_id' => 'required|integer',
            'batch_number' => 'required|integer|max:50',
            'cost_price' => 'required|integer|max:50',
            'quantity_received' => 'required|integer',
            'current_stock' => 'required|integer|min:0',
            'received_date' => 'required|date',
            'expiration_date' => 'required|date'
        ];
    }
}
