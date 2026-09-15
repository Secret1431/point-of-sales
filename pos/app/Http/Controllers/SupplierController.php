<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Repositories\SupplierRepository;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller 
{
    public function __construct(protected SupplierRepository $supplierRepo)
    {
        $this->supplierRepo = $supplierRepo;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Supplier::class);

        $suppliers = $this->supplierRepo->supplierSearch(
            $request->input('search'),
            $request->user()->id,
            10 
        );

        return Inertia::render('supplier/supplier', [
            'suppliers' => SupplierResource::collection($suppliers),
            'filters' => $request->only('search'),
            'meta' => [
                'current_page' => $suppliers->currentPage(),
                'last_page' => $suppliers->lastPage(),
                'per_page' => $suppliers->perPage()
            ],
        ]);
    }

    public function store(StoreSupplierRequest $request)
    {
        $this->authorize('create', Supplier::class);
        $this->supplierRepo->create($request->validated());

        return back()->with('success', 'Supplier created successfully');
    }

    public function update(StoreSupplierRequest $request, Supplier $supplier) 
    {
        $this->authorize('update', $supplier);
        $this->supplierRepo->update($supplier, $request->validated());

        return back()->with('success', 'Supplier updated successsfully');
    }
}