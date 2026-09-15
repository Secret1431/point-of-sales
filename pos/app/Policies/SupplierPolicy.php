<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Supplier;

class SupplierPolicy 
{

    public function viewAny(User $user)
    {
        return in_array($user->role, ['suppliers']);
    }

    public function create(User $user)
    {
        return in_array($user->role, ['suppliers']);
    }

    public function update(User $user, Supplier $supplier)
    {
        
        return in_array($user->role, ['suppliers', 'admin']);
    }
}