<?php

namespace App\Repositories;

use App\Models\Item;

class ItemRepository extends BaseRepository 
{
    public function __construct(protected Item $item) 
    {
        parent::__construct($item);
    }

    public function itemFilter(int $userId)
    {
        return $this->item
            ->where('user_id', $userId)
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}