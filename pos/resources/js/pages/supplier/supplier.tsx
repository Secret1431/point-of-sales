import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { useState } from 'react';
import { Supplier } from '@/schema/supplier-schema';
import { PaginateFilter } from '@/schema/paginate-filter';
import { SupplierHeader } from './components/supplier-header';
import { SupplierFilter } from './components/supplier-filter';
import { SupplierTable } from './components/supplier-table';
import { SupplierForm } from './components/supplier-form';

interface SupplierProps {
    suppliers: Supplier[];
    filters: PaginateFilter
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Supplier',
        href: '/suppliers',
    },
];

export default function Suppliers({ suppliers, filters }: SupplierProps) {
    const [formOpen, setFormOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const handleAddSupplier = () => {
        setSelectedSupplier(null);
        setFormOpen(true);
    }

    const handleEditSupplier = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setFormOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Supplier" />

            <div className='min-h-screen bg-slate-100 font-[Montsarrat]'>
                <div className='flex flex-col w-full gap-4 p-4 sm:p-5'>

                    <div>
                        <SupplierHeader />
                    </div>

                    <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>

                        <div>
                            <SupplierForm 
                                open={formOpen}
                                supplier={selectedSupplier}
                                onClose={() => setFormOpen(false)}
                            />
                        </div>

                        <div className='w-full space-y-4'>
                            <SupplierFilter filters={filters} onAdd={handleAddSupplier} />
                            <SupplierTable 
                                onEdit={handleEditSupplier}
                                suppliers={suppliers.data}
                                meta={suppliers.meta}
                                routeName={route('suppliers.index')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
