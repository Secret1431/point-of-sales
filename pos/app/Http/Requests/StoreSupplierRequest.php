<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSupplierRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function prepareValidation(): void 
    {
        $this->merge([
            'supplier_name' => strip_tags($this->supplier_name),
            'contact_person' => strip_tags($this->contact_person),
            'phone' => strip_tags($this->phone),
            'email' => strip_tags($this->email),
            'status' => strip_tags($this->status) 
        ]);
    }

    public function rules(): array
    {
        $supplierId = $this->route('supplier')?->id ?? $this->route('supplier');
        
        return [
            'supplier_name' => 'required|string|max:100|unique:suppliers,supplier_name',
            'contact_person' => 'required|string|max:100|unique:suppliers,contact_person',
            'phone' => 'required|string|max:11',
            'email' => 'required|string|max:100|unique:suppliers,email',
            'address' => 'required|string|max:100',
        ];
    }
}
