<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Sale;

class SalePolicy 
{
    public function viewAny(User $user): bool
    {
        return true; 
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['suppliers']);
    }

    public function update(User $user, Sale $sale): bool 
    {
        return in_array($user->role, ['suppliers']);
    }
}
