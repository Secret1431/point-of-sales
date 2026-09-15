<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Repositories\CategoryRepository;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(protected CategoryRepository $categoryRepo) 
    {
        $this->categoryRepo = $categoryRepo;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Category::class);

        $categories = $this->categoryRepo->filterSearch(
            $request->input('search'),
            $request->user()->id,
            10 
        );

        return Inertia::render('category/category', [
            'categories' => CategoryResource::collection($categories),
            'filters' => $request->only('search'),
            'meta' => [
                'current_page' => $categories->currentPage(),
                'last_page' => $categories->lastPage(),
                'per_page' => $categories->perPage()
            ],
        ]);
    }
    
    public function store(StoreCategoryRequest $request)
    {
        $this->authorize('create', Category::class);

        $this->categoryRepo->create($request->validated());

        return back()->with('success', 'Category created successfully');
    }

    public function update(StoreCategoryRequest $request, Category $category)
    {
        $this->authorize('update', $category);

        $this->categoryRepo->update($category, $request->validated());

        return back()->with('success', 'Category updated successfully');
    }
}