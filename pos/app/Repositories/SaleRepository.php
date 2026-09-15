<?php

namespace App\Repositories;

use App\Models\Sale;

class SaleRepository extends BaseRepository 
{
    public function __construct(protected Sale $sale)
    {
        parent::__construct($sale);
    }

    public function saleFilter(int $userId) 
    {
        return Sale::query()
            ->where('user_id', $userId)
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}