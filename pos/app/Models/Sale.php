<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'user_id',
        'transaction_number',
        'sale_date',
        'total_amount',
        'discount_amount',
        'amount_paid',
        'change_amount',
        'customer_type'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function item(): HasMany 
    {
        return $this->hasMany(SaleItem::class);
    }
}
