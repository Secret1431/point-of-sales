<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BatchController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ItemController;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SaleResource;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'throttle:60,1'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'products' => ProductResource::collection(Product::all()),
            'sales' => SaleResource::collection(Sale::all())
        ]);
    })->name('dashboard');

    Route::get('user', function () {
        return Inertia::render('user/user');
    })->name('user');

    Route::resource('categories', CategoryController::class);
    Route::resource('suppliers', SupplierController::class);
    Route::resource('products', ProductController::class);
    Route::resource('batches', BatchController::class);
    Route::resource('sales', SaleController::class);
    Route::resource('items', ItemController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
