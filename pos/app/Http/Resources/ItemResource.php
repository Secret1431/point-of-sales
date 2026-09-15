<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource 
{
    public function toArray(Request $request) {
        return [
            'id' => $this->id,
            'sale_id' => $this->sale_id,
            'batch_id' => $this->batch_id,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'subtotal' => $this->subtotal
        ];
    }
}