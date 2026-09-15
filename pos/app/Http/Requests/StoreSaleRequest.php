<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareValidation(): void 
    {
        $this->merge([
            'transaction_number' => strip_tags($this->transaction_number),
            'sale_date' => strip_tags($this->sale_date),
            'total_amount' => strip_tags($this->total_amount),
            'discount_amount' => strip_tags($this->discount_amount), 
            'amount_paid' => strip_tags($this->amount_paid), 
            'change_amount' => strip_tags($this->change_amount), 
            'customer_type' => strip_tags($this->customer_type), 
        ]);
    }

    public function rules(): array
    {
        $saleId = $this->route('sales')?->id;
        
        return [
            'transaction_number' => 'required|integer',
            'sale_date' => 'required|date',
            'total_amount' => 'required|integer',
            'discount_amount' => 'required|integer',
            'amount_paid' => 'required|integer',
            'change_amount' => 'required|integer',
            'customer_type' => 'required|string|max:100',
        ];
    }
}
