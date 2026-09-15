<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource 
{
    public function toArray(Request $request) {
        return [
            'id' => $this->id,
            'supplier_name' => $this->supplier_name,
            'contact_person' => $this->contact_person,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address
        ];
    }
}