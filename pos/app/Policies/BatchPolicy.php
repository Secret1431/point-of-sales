<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Batch;

class BatchPolicy 
{
    public function viewAny(User $user): bool 
    {
        return in_array($user->role, ['suppliers']);
    }

    public function view(User $user, Batch $batch): bool {
        return $user->id === $productBatch->user_id;
    }

    public function create(User $user): bool {
        return true;
    }

    public function update(User $user, Batch $batch): bool {
        return in_array($user->role, ['suppliers']);
    }
}