import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { CategoryFilter } from './components/category-filter';
import { CategoryTable } from './components/category-table';
import { CategoryModal } from './components/category-modal';
import { Category } from '@/schema/category-schema';
import { PaginateFilter } from '@/schema/paginate-filter';
import { CategoryHeader } from './components/category-header';

interface CategoryProps {
    categories: Category[];
    filters: PaginateFilter;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer',
        href: '/categories',
    },
    {
        title: 'Category',
        href: '/categories',
    },
];

export default function Categories({ categories, filters }: CategoryProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleCreate = () => {
        setSelectedCategory(null);
        setIsFormOpen(true);
    }

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsFormOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer Category" />
            <div className='min-h-screen bg-slate-50/50 font-[Montsarrat]'>
                <div className='flex flex-col w-full max-w-7xl gap-4 p-4 sm:p-5'>
                    <CategoryHeader />
                    <CategoryFilter filters={filters} onAdd={handleCreate} />
                    <CategoryTable 
                    categories={categories.data}
                        meta={categories.meta}
                        onEdit={handleEdit}
                        routeName={route('categories.index')}
                    />

                    <CategoryModal 
                        isOpen={isFormOpen}
                        onClose={() => setIsFormOpen(false)}
                        category={selectedCategory}
                    />
                </div>
            </div>
         </AppLayout>
    );
}