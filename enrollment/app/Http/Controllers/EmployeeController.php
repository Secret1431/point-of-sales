<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Services\EmployeeService;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;

class EmployeeController extends Controller 
{
    public function __construct(
        protected EmployeeService $service 
    ) {}

    public function index (Request $request)
    {
        $this->authorize('viewAny', Employee::class);

        $employees = $this->service->paginate(
            $request->user(),
            $request->integer('per_page', 10)
        );

        return response()->json([
            'success' => true,
            'message' => 'Employee retrieved success',
            'data' => $employees 
        ]);
    }

    public function show (Request $request, Employee $employee)
    {
        $this->authorize('view', Employee::class);

        return response()->json([
            'success' => true,
            'message' => 'Employee retrieved success',
            'data' => $employee 
        ]);
    }

    public function createEmployee (StoreEmployeeRequest $request)
    {
        $this->authorize('create', Employee::class);

        $employee = $this->service->create(
            $request->user(),
            $request->validated() 
        );

        return response()->json([
            'success' => true,
            'message' => 'Employee created success',
            'data' => $employee 
        ]);
    }

    public function updateEmployee (UpdateEmployeeRequest $request, Employee $employee)
    {
        $this->authorize('update',  $employee);

        $updatedEmployee = $this->service->update(
            $employee,
            $request->validated(),
            $id 
        );

        return response()->json([
            'success' => true,
            'message' => 'Employee updated success',
            'data' => $employee 
        ]);
    }

    public function destroy (Employee $employee)
    {
        $this->authorize('delete', Employee::class);

        $this->service->delete($employee);

        return response()->json([
            'success' => true,
            'message' => 'Employee deleted success'
        ]);
    }
}