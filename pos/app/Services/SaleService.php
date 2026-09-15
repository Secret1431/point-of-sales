<?php

namespace App\Services;

use App\Models\Sale;
use App\Repositories\SaleRepository;

class SaleService 
{
    public function __construct(protected SaleRepository $saleRepo)
    {
        $this->saleRepo = $saleRepo;
    }

    public function createSale(array $saleData): Sale
    {
        $totalAmount = $saleData['total_amount'];
        $discountAmount = $saleData['discount_amount'];
        $amountPaid = $saleData['amount_paid'];

        $netAmount = $amountPaid - $discountAmount;
        $changeAmount = $amountPaid - $netAmount;

        $saleData['change_amount'] = $changeAmount;

        return $this->saleRepo->create($saleData);
    }

    public function computeSale(Sale $sale): Sale 
    {
        $netTotal = $sale->total_amount - $sale->discount_amount;
        $changeAmount = $sale->amount_paid - $netTotal;

        $sale->change_amount = $changeAmount;
        $sale->save();

        return $sale;
    }
}