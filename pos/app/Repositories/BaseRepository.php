<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository 
{
    public function __construct(protected Model $model)
    {
        $this->model = $model;
    }

    public function create(array $data): Model 
    {
        $data['user_id'] = auth()->id();
        
        return $this->model->create($data);
    }

    public function update(Model $model, array $data): Model 
    {
        $model->update($data);
        return $model->fresh();
    }

    public function delete(Model $model): bool 
    {
        return (bool) $model->delete();
    }
}