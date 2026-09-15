<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'user_id',
        'sale_id',
        'batch_id',
        'quantity',
        'unit_price',
        'subtotal'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sale(): BelongsTo 
    {
        return $this->belongsTo(Sale::class);
    }
}
