import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { useState } from 'react';
import { Batch } from '@/schema/batch-schema';
import { BatchHeader } from './components/batch-header';
import { BatchTable } from './components/batch-table';
import { BatchForm } from './components/batch-form';

interface BatchProps {
    batches: Batch[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Batch',
        href: '/batches',
    },
];

export default function Batches({ batches, filters }: BatchProps) {
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

    const handleEdit = (batch: Batch) => {
        setSelectedBatch(batch);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Batch" />

            <div className='min-h-screen bg-slate-100 font-[Montsarrat]'>
                <div className='flex flex-col w-full max-w-7xl gap-4 p-4 sm:p-5'>

                    <BatchHeader />

                    <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>

                        <div className='w-full sm:w-1/3'>
                            <BatchForm 
                                batch={selectedBatch}
                            />
                        </div>


                        <div className='w-full sm:w-2/2'>
                            <BatchTable 
                                onEdit={handleEdit}
                                batches={batches.data}
                                meta={batches.meta}
                                routeName='/batches'
                            />
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
