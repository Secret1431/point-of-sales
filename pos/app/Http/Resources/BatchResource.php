<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BatchResource extends JsonResource
{
    public function toArray(Request $request) {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'supplier_id' => $this->supplier_id,
            'batch_number' => $this->batch_number,
            'cost_price' => $this->cost_price,
            'quantity_received' => $this->quantity_received,
            'current_stock' => $this->current_stock,
            'expiration_date' => $this->expiration_date,
            'received_date' => $this->received_date,

            'products' => new ProductResource($this->whenLoaded('products'))
        ];
    }
}