<?php

namespace App\Repositories;

use App\Models;
use Illuminate\Database\Eloquent\Builder;

abstract class BaseRepository 
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    protected function query(): Builder
    {
        return $this->model->newQuery();
    }

    public function all(): iterable 
    {
        return $this->query()->get();
    }

    public function scopeQuery()
    {
        return $this->query();
    }

    public function find(int $id)
    {
        return $this->query()->find($id);
    }

    public function findOrFail(int $id)
    {
        return $this->query()->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->query()->create($data);
    }

    public function update(int $id, array $data)
    {
        $model = $this->findOrFail($id);
        $model->update($data);

        return $model->fresh();
    }

    public function delete(int $id)
    {
        $model = $this->findOrFail($id);

        return (bool) $model->delete();
    }
}