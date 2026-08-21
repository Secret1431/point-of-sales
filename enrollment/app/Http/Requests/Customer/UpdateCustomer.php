<?php

namespace App\Http\Requests\Customer;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomer extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    protected function validation (): bool 
    {
        return $this->merge([
            'firstname' => strip_tags($this->firstname),
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

    public function message (): array 
    {
        
    }
}
