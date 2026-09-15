import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { useState } from 'react';
import { Sale } from '@/schema/sale-schema';
import { PaginateFilter } from '@/schema/paginate-filter';
import { SaleHeader } from './components/sale-header';
import { SaleFilter } from './components/sale-filter';
import { SaleTable } from './components/sale-table';
import { SaleForm } from './components/sale-form';

interface SaleProps {
    sales: Sale[];
    filters: PaginateFilter;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sale',
        href: '/sales',
    },
];

export default function SalePage({ sales, filters }: SaleProps) {
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

    const handleEdit = (sale: Sale) => {
        setSelectedSale(sale);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className='min-h-screen bg-slate-100 font-[Montsarrat]'>
                <div className='flex flex-col w-full max-w-7xl gap-4 p-4 sm:p-5'>

                    <SaleHeader />

                    <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>

                        <div className='w-full sm:w-1/3'>
                            <SaleForm sale={selectedSale} />
                        </div>

                        <div className='w-full sm:w-2/3'>
                            <SaleFilter filters={filters} />
                            <SaleTable 
                                sales={sales.data}
                                meta={sales.meta}
                                routeName='/sales'
                                onEdit={handleEdit}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </AppLayout>
    );
}
