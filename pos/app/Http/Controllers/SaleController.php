<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Resources\SaleResource;
use App\Services\SaleService;
use App\Repositories\SaleRepository;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller 
{
    public function __construct(
        protected saleRepository $saleRepo,
        protected SaleService $saleService
    )
    {
        $this->saleService = $saleService;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Sale::class);

        $sales = $this->saleRepo->saleFilter($request->user()->id, 10);

        return Inertia::render('sales/sale', [
            'sales' => SaleResource::collection($sales),
            'meta' => [
                'current_page' => $sales->currentPage(),
                'last_page' => $sales->lastPage(),
                'per_page' => $sales->perPage()
            ]
        ]);
    }

    public function store(StoreSaleRequest $request)
    {
        $this->authorize('create', Sale::class);
        
        $this->saleService->createSale($request->validated());

        return back()->with('success', 'Sales created successfully');
    }

    public function update(StoreSaleRequest $request, Sale $sale)
    {
        $this->authorize('update', $sale);
        $this->saleService->computeSale($sale, $request->validated());

        return back()->with('success', 'Sales updated successfully');
    }
}