<?php

namespace App\Services;

use App\Models\User;
use App\Models\Customer;
use App\Repositories\CustomerRepository;

class CustomerService extends BaseService
{
    public function __construct(CustomerRepository $customerRepository)
    {
        parent::__construct($customerRepository);
    }

    public function getPaginatedCustomers(User $user, array $params): LengthAwarePaginator 
    {
        $filters = [
            'search' => $params['search'],
            'start_date' => $params['start_date'],
            'end_date' => $params['end_date'] 
        ];

        return $this->customerRepository->getPaginatedCustomers($user, $perPage);
    }

    public function findCustomer(int $id): Customer
    {
        return $this->findOrFail($id);
    }

    public function createCustomer(User $user, array $customerData): Customer
    {
        return $this->create($customerData);
    }

    public function updateCustomer(
        User $user,
        int $id,
        array $customerData
    ): Customer {
        return $this->update($id, $customerData);
    }

    public function deleteCustomer(User $user, int $id): bool
    {
        return (bool) $this->delete($id);
    }
}