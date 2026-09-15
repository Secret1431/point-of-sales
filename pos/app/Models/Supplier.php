<?php

namespace App\Models;

use App\Models\User;
use App\Supports\Enums\SupplierStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builders;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    protected $fillable = [
        'supplier_name',
        'contact_person',
        'phone',
        'email',
        'address',
        'status',
        'user_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }
    
    public function product(): HasMany 
    {
        return $this->hasMany(Product::class);
    }

    public function scopeActive(Builder $query): Builder 
    {
        return $query->where('status', SupplierStatus::ACTIVE->value);
    }
    
    public function scopeInactive(Builder $query): Builder 
    {
        return $query->where('status', SupplierStatus::INACTIVE->value);
    }
}
