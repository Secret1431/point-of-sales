<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->contrained('categories')->onDelete('cascade');
            $table->foreignId('supplier_id')->contrained('suppliers')->onDelete('cascade');
            $table->foreignId('user_id')->contrained('users')->onDelete('cascade');
            $table->string('brand_name')->unique();
            $table->string('generic_name')->unique();
            $table->integer('unit');
            $table->decimal('unit_price', 10, 2);
            $table->integer('reorder_level');
            $table->boolean('requires_prescription');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
