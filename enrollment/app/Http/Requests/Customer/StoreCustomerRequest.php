<?php

namespace App\Http\Requests\Customer;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function validation ()
    {
        $this->merge([
            'firstname' => strip_tags($this->firstname),
            'lastname' => strip_tags($this->lastname)
        ]);
    }

    public function rules(): array
    {
        return [
            'firstname' => 'required|string|max:100',
            'lastname' => 'required|string|max:100'
        ];
    }
}
