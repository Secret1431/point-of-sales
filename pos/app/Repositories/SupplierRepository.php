<?php

namespace App\Repositories;

use App\Models\Supplier;

class SupplierRepository extends BaseRepository 
{
    public function __construct(protected Supplier $supplier) 
    {
        parent::__construct($supplier);
    }
    
    public function supplierSearch(?string $search, int $userId)
    {
        return Supplier::query()
            ->where('user_id', $userId)
            ->when($search, function ($query) use ($search) {
                $query->where('supplier_name', 'like', "%${search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}