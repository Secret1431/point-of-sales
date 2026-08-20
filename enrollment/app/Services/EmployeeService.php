<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\EmployeeRepository;

class EmployeeService extends BaseService
{
    public function __construct(
        protected EmployeeRepository $repository 
    ) {
        parent::__construct($repository);
    }

    public function search (User $user, string $keyword)
    {
        return $this->repository->search($user, $keyword);
    }
}