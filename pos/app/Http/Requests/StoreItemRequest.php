<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareValidation(): void 
    {
        $this->merge([
            'sale_id' => strip_tags($this->sale_id),
            'batch_id' => strip_tags($this->batch_id),
            'quantity' => strip_tags($this->quantity),
            'unit_price' => strip_tags($this->unit_price),
            'subtotal' => strip_tags($this->subtotal)
        ]);
    }

    public function rules(): array
    {
        $saleItemId = $this->route('saleItems')?->id;
        
        return [
            'sale_id' => 'required|integer',
            'batch_id' => 'required|integer',
            'quantity' => 'required|integer',
            'unit_price' => 'required|integer',
            'subtotal' => 'required|integer'
        ];
    }
}
