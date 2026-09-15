<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Resources\ItemResource;
use App\Services\ItemService;
use App\Repositories\ItemRepository;
use App\Models\Item;
use App\Models\Sale;
use App\Models\Batch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller 
{
    public function __construct(
        protected ItemService $itemService,
        protected ItemRepository $itemRepo
    )
    {
        $this->itemService = $itemService;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Item::class);

        $items = $this->itemRepo->itemFilter($request->user()->id);

        return Inertia::render('item/item', [
            'items' => ItemResource::collection($items),
            'sales' => Sale::select('id', 'transaction_number')->get(),
            'batches' => Batch::select('id', 'batch_number')->get(),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage()
            ]
        ]);
    }

    public function store(StoreItemRequest $request)
    {
        $this->authorize('create', Item::class);
        $this->itemService->createItem($request->validated());

        return back()->with('success', 'Items created successfully');
    }
}