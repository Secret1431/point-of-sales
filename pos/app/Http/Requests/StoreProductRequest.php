<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function prepareValidation(): void 
    {
        $this->merge([
            'brand_name' => strip_tags($this->brand_name),
            'generic_name' => strip_tags($this->generic_name),
            'unit' => strip_tags($this->unit),
            'selling_price' => strip_tags($this->selling_price),
            'reorder_level' => strip_tags($this->reorder_level),
            'requires_prescription' => strip_tags($this->requires_prescription)
        ]);
    }

    public function rules(): array
    {
        return [
            'category_id' => 'required|integer',
            'supplier_id' => 'required|integer',
            'brand_name' => 'required|string|unique:products,brand_name',
            'generic_name' => 'required|string|max:50',
            'unit' => 'required|integer',
            'selling_price' => 'required|integer',
            'reorder_level' => 'required|integer',
            'requires_prescription' => 'required|boolean'
        ];
    }
}
