<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Employee;

class EmployeePolicy 
{
    public function view (User $user, Employee $employee): bool
    {
        return $employee->user_id === $user_id;
    }

    public function create (User $user, Employee $employee): bool 
    {
        return $employee->user_id === $user_id;
    }

    public function updateEmployee (User $user, Employee $employee): bool 
    {
        return $employee->user_id === $user_id;
    }

    public function deleteEmployee (User $user, Employee $employee): bool
    {
        return $employee->user_id === $user_id;
    }
}