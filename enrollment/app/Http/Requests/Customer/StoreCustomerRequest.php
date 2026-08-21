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

    protected function Validation (): bool 
    {
        return $this->merge([
            'firstname' => strip_tag($this->firstname),
            'lastname' => strip_tags($this->lastname) 
        ]);
    }

    public function rules(): array
    {
        return [
            'firstname',
            'lastname'
        ];
    }
}
