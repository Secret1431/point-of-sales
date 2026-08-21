<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

abstract class BaseRepository 
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function query (): Builder 
    {
        return $this->model->newQuery();
    }

    public function all (): Collection 
    {
        return $this->query()->get();
    }

    public function find (int $id): ?Model 
    {
        return $this->query()->find($id);
    }

    public function paginate (int $perPage = 10, ?Builder $query = null): LengthAwarePaginator 
    {
        return ($query ?? $this->query())->paginate($perPage);
    }

    public function create (array $data):?Model 
    {
        return $this->query()->create($data);
    }

    public function update (Model $model, array $data): Model 
    {
        $model->update($data);

        return $model->fresh();
    }

    public function delete (Model $model): bool 
    {
        return (bool) $model->delete();
    }
}