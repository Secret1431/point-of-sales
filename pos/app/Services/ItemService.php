<?php

namespace App\Services;

use App\Models\Item;
use App\Repositories\ItemRepository;

class ItemService 
{
    public function __construct(protected ItemRepository $itemRepo)
    {
        $this->itemRepo = $itemRepo;
    }

    public function createItem(array $itemData)
    {
        $quantity = $itemData['quantity'];
        $price = $itemData['unit_price'];

        $itemData['subtotal'] = $quantity * $price;

        return $this->itemRepo->create($itemData);
    }
}