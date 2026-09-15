<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    protected $fillable = [
        'product_id',
        'supplier_id',
        'user_id',
        'batch_number',
        'cost_price',
        'quantity_received',
        'current_stock',
        'expiration_date',
        'received_date'
    ];

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }

    public function supplier(): BelongsTo {
        return $this->belongsTo(Supplier::class);
    }
}
