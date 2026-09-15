import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { PaginationProps } from '@/types/user';
import { UserForm } from './components/user-form';
import { UserTable } from './components/user-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/users',
    },
    {
        title: 'User',
        href: '/user',
    },
];

export default function User({ users, filters }: PaginationProps) {

    const [search, setSearch] = useState("");

    const handleSearchUser = (value: string) => {
        setSearch(value);

        router.get('/users', { search: value }, {
            preserveState: true,
            preserveScroll: true 
        });
    };

    const handleEdit = (user: any) => {
        console.log('Edit user', user);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className='flex min-h-screen bg-[#f7f6f5] font-[Roboto]'>
                <div className='flex-1 flex flex-col p-6 sm:p-8'>
                    <div className='w-full max-w-7xl'>
                        <div className='flex flex-col sm:flex-row items-stretch gap-2   '>

                            <div className='w-full lg:w-1/2 flex flex-col'>
                                <UserForm />
                            </div>

                            <div className='w-full lg:w-2/2 flex flex-col'>
                                <UserTable 
                                 users={users.data}
                                 serchUser={search}
                                 onSearch={setSearch}
                                 onEdit={handleEdit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
