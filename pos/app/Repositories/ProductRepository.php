<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository extends BaseRepository 
{
    public function __construct(protected Product $product)
    {
        parent::__construct($product);
    }

    public function filteredBySearch(?string $search, int $userId)
    {
        return Product::query() 
         ->where('user_id', $userId)
         ->when($search, function ($query) use ($search) {
            $query->where('brand_name', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();
    }
}