<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Repositories\ProductRepository;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller 
{
    public function __construct(protected ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Product::class);

        $products = $this->productRepo->filteredBySearch(
            $request->input('search'),
            $request->user()->id,
            10
        );

        return Inertia::render('products/product', [
            'products' => ProductResource::collection($products),
            'categories' => Category::select('id', 'category_name')->get(),
            'suppliers' => Supplier::select('id', 'supplier_name')->get(),
            'filters' => $request->only('search'),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage()
            ]
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $this->authorize('create', Product::class);

        
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $this->productRepo->create($data);

        return back()->with('success', 'Product created successfully');
    }

    public function update(StoreProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);
        
        $this->productRepo->update($product, $request->validated());

        return back()->with('success', 'Product updated successfully');
    }
}