<?php

namespace App\Scopes;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class CustomerScope 
{
    public static function applyRestrictionScope(Builder $query, User $user): Builder
    {
        if (!$user->isAdmin()) {
            return $query->where('user_id', $user->id);
        }

        return $query;
    }
}