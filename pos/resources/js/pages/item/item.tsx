import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { useState } from 'react';
import { Item } from '@/schema/item-schema';
import { ItemHeader } from './components/item-header';
import { ItemTable } from './components/item-table';
import { ItemForm } from './components/item-form';

interface ItemProps {
    items: Item[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Item',
        href: '/items',
    },
];

export default function Dashboard({ items }: ItemProps) {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const handleEditItem = (item: Item) => {
        setSelectedItem(item);
    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className='min-h-screen bg-slate-100 font-[Montsarrat]'>
                <div className='flex flex-col w-full max-w-7xl gap-4 p-4 sm:p-5'>

                    <div>
                        <ItemHeader />
                    </div>
                    
                    <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>

                        <div className='w-full sm:w-1/3'>
                            <ItemForm 
                                item={selectedItem}
                            />
                        </div>

                        <div className='w-full sm:w-2/3'>
                            <ItemTable 
                                items={items.data}
                                meta={items.meta}
                                routeName='/items'
                                onEdit={handleEditItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
