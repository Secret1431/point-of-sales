<?php

namespace App\Policies;

use App\Models\User;
use App\Models\SaleItem;

class ItemPolicy 
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['suppliers']);
    }

    public function create(User $user): bool
    {
        return true; 
    }

}
