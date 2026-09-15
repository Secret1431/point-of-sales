import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { useState } from 'react';
import { Product } from '@/schema/product-schema';
import { ProductHeader } from './components/product-header';
import { ProductFilter } from './components/product-filter';
import { ProductTable } from './components/product-table';
import { ProductForm } from './components/product-form';
import { PaginateFilter } from '@/schema/paginate-filter';

interface ProductProps {
    products: Product[]
    filters: PaginateFilter;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/products',
    },
];

export default function Products({ products, filters }: ProductProps ) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleCreateProduct = () => {
        setSelectedProduct(null);
    }

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />

            <div className='min-h-screen bg-slate-100 font-[Montsarrat]'>
                <div className='flex flex-col w-full max-w-7xl gap-4 p-4 sm:p-5'>

                    <ProductHeader />

                    <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>

                        <div className='w-full sm:w-1/3'>
                            <ProductForm 
                                onAdd={handleCreateProduct}
                                product={selectedProduct}
                            />
                        </div>

                        <div className='w-full sm:w-2/2 space-y-4'>
                        <ProductFilter filters={filters} />
                            <ProductTable 
                                products={products.data}
                                meta={products.meta}
                                routeName='/products'
                                onEdit={handleEditProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
