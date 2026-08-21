<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Customer;
use App\Scopes\CustomerScope;
use Illuminate\Database\Eloquent\Builder;

class CustomerRepository extends BaseRepository 
{

    public function __construct(Customer $customer) 
    {
        parent::__construct($customer);
    }

    public function ScopeQuery (Builder $query, User $user): Builder 
    {
        return CustomerScope::applyRestrictionScope(
            $this->query(),
            $user 
        );
    }

    public function getFilteredPaginated(User $user, array $filters = [], int $perPage = 10): LengthAwarePaginator 
    {
        $query = $this->scopeQuery($this->query(), $user);

        if (!empty($filters['search'])) {
            $keyword = $filters['search'];
            $query->where(function ($q) use ($keyword) {
                $q->where('firstname', 'like', "%${keyword}")
                    ->orWhere('lastname', 'like', "%${keyword}");
            });
        }

        if (!empty($filters['start_date'])) {
            $query->whereDate('created_at', '>=', $filters['start_date']);
        }

        if (!empty($filters['end_date'])) {
            $query->whereDate('created_at', '<=', $filters['end_date']);
        }

        return $this->paginate($perPage, $query);
    }
}