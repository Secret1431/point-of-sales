<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Services\CustomerService;
use App\Http\Requests\Customer\StoreCustomerRequest;
use App\Http\Requests\Customer\UpdateCustomerRequest;

class CustomerController extends Controller
{
    protected CustomerService $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Customer::class);

        $customers = $this->customerService->paginate(
            $request->user(),
            $request->all()
        );

        return Inertia::render('features/customers/customerPage', [
            'customers' => $customers,

            'filters' => $request->only(['search', 'start_date', 'end_date', 'per_page'])
        ]);
    }

    public function show(Request $request, int $id): Response
    {
        $customer = $this->customerService->findCustomer($id);

        $this->authorize('view', $customer);

        return redirect()
            ->route('customers.index')
            ->with('success', 'Customer created success');
    }

    public function store(StoreCustomerRequest $request)
    {
        $this->authorize('create', Customer::class);

        $customer = $this->customerService->createCustomer(
            $request->user(),
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Customer created successfully',
            'data' => $customer,
        ], 201);
    }

    public function update(UpdateCustomerRequest $request, int $id)
    {
        $customer = $this->customerService->findCustomer($id);

        $this->authorize('update', $customer);

        $updatedCustomer = $this->customerService->updateCustomer(
            $request->user(),
            $id,
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Customer updated successfully',
            'data' => $updatedCustomer,
        ]);
    }

    public function destroy(Request $request, int $id)
    {
        $customer = $this->customerService->findCustomer($id);

        $this->authorize('delete', $customer);

        $this->customerService->deleteCustomer(
            $request->user(),
            $id
        );

        return response()->json([
            'success' => true,
            'message' => 'Customer deleted successfully',
        ]);
    }
}