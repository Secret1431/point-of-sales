<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public  function prepareValidation(): void 
    {
        $this->merge([
            'category_name' => strip_tags($this->category_name) 
        ]);
    }

    public function rules(): array
    {
        return [
            'category_name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[A-Za-z\s]+$/',
                'unique:categories,category_name',
            ],
        ];
    }
}
