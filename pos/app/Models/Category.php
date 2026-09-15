<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    
    protected $fillable = [
        'category_name',
        'user_id'
    ];

    protected $casts = [
        'created_at' => 'datetime'
    ];
    
    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }

    public function products(): HasMany 
    {
        return $this->hasMany(Product::class);
    }
}
