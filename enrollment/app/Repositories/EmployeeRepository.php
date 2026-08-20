<?php

namespace App\Repositories;

use App\Models\Employee;
use App\Models\User;
use App\Scopes\EmployeeScope;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class EmployeeRepository extends BaseRepository 
{
    public function __construct(Employee $model)
    {
        parent::__construct($model);
    }

    public function scopeQuery(User $user): Builder
    {
        return EmployeeScope::applyRestrictionScope(
            $this->query(),
            $user 
        );
    }

    public function search (string $keyword)
    {
        return $this->query()
            ->where(function ($query) use ($keyword) {
                $query->where('firstname', 'like', "%{$keyword}%")
                    ->orWhere('lastname', 'like', "%{$keyword}%");
            });
    }
}