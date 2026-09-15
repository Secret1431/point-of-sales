<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource 
{
    public function toArray(Request $request) {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'transaction_number' => $this->transaction_number,
            'sale_date' => $this->sale_date,
            'total_amount' => $this->total_amount,
            'selling_price' => $this->selling_price,
            'discount_amount' => $this->discount_amount,
            'amount_paid' => $this->amount_paid,
            'change_amount' => $this->change_amount,
            'customer_type' => $this->customer_type,
        ];
    }
}