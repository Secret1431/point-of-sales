import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { EmployeeTable } from './employees/components/EmployeeTable';
import { PageLayout } from '@/layouts/page-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer',
        href: '/customers',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer" />
            <PageLayout>
                <EmployeeTable />
            </PageLayout>
            
        </AppLayout>
    );
}
