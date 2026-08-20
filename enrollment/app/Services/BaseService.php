<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\BaseRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

abstract class BaseService 
{
    public function __construct(
        protected BaseRepository $repository 
    ) {}


    public function paginate (User $user, int $perpage = 10): LengthAwarePaginator 
    {
        return $this->repository->paginate($user, $perpage);
    }

    public function find (User $user, int $id)
    {
        return $this->repository->find($user, $id);
    }

    public function create (User $user, array $data)
    {
        return $this->repository->create($user, $data);
    }

    public function update (User $user, int $id, array $data)
    {
        return $this->repository->update($user, $id, $data);
    }

    public function delete (User $user, int $id)
    {
        return $this->repository->delete($user, $id);
    }
}