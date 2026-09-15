<?php

namespace App\Repositories;

use App\Models\Batch;

class BatchRepository extends BaseRepository 
{
    public function __construct(protected Batch $batch)
    {
        parent::__construct($batch);
    }

    public function filteredByDate(?string $date, int $userId)
    {
        return Batch::query()
            ->where('user_id', $userId)
            ->when($date, fn($query) => $query->whereDate('expiration_date', $date))
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}