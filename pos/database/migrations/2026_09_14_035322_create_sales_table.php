<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('transaction_number');
            $table->string('sale_date');
            $table->decimal('total_amount', 10,2);
            $table->decimal('discount_amount', 10,2);
            $table->decimal('amount_paid', 10,2);
            $table->decimal('change_amount', 10,2);
            $table->enum('customer_type', ['Senior Citizen', 'Pwd']);
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
