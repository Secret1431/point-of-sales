<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'brand_name' => $this->brand_name,
            'generic_name' => $this->generic_name,
            'unit' => $this->unit,
            'selling_price' => $this->selling_price,
            'reorder_level' => $this->reorder_level,
            'requires_prescription' => $this->requires_prescription
        ];
    
    }
}
