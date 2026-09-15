<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Category;

class CategoryPolicy 
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['suppliers']);
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['suppliers']);
    }

    public function update(User $user, Category $category): bool
    {
        return in_array($user->role, ['suppliers']);
    }
}
