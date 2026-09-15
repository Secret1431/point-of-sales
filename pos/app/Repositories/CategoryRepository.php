<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends BaseRepository 
{
    public function __construct(protected Category $category)
    {
        parent::__construct($category);
    }

    public function filterSearch(?string $search, int $userId)
    {
        return Category::query()
            ->where('user_id', $userId)
            ->when($search, function ($query) use ($search) {
                $query->where('category_name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

}