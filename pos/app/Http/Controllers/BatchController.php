<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBatchRequest;
use App\Http\Resources\BatchResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SupplierResource;
use App\Repositories\BatchRepository;
use App\Models\Batch;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller 
{
    public function __construct(protected BatchRepository $batchRepo)
    {
        $this->batchRepo = $batchRepo;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Batch::class);

        $batches = $this->batchRepo->filteredByDate(
            $request->input('date'),
            $request->user()->id,
            10
        );

        return Inertia::render('batch/batch', [
            'batches' => BatchResource::collection($batches),
            'products' => Product::select('id', 'generic_name')->get(),
            'suppliers' => Supplier::select('id', 'supplier_name')->get(),
            'filters' => $request->only('date'),
            'meta' => [
                'current_page' => $batches->currentPage(),
                'last_page' => $batches->lastPage(),
                'per_page' => $batches->perPage()
            ]
        ]);
    }

    public function store(StoreBatchRequest $request)
    {
        $this->authorize('create', Batch::class);
        $this->batchRepo->create($request->validated());

        return back()->with('success', 'Batch created successfully');
    }

    public function update(StoreBatchRequest $request, Batch $batch)
    {
        $this->authorize('update', $batch);
        $this->batchRepo->update($batch, $request->validated());

        return back()->with('success', 'Batch updated successfully');
    }
}