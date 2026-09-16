import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Grid, User2, Package, ShoppingCart } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
        roles: ['Admin']
    },
    {
        title: 'Category',
        url: '/categories',
        icon: Grid,
        roles: ['Admin', 'Stockman']
    },
    {
        title: 'Product',
        url: '/products',
        icon: Package,
        roles: ['Admin', 'Stockman']
    },
    {
        title: 'Batch',
        url: '/batches',
        icon: Package,
        roles: ['Admin', 'Stockman']
    },
    {
        title: 'Supplier',
        url: '/suppliers',
        icon: User2,
        roles: ['suppliers', 'Admin']
    },
    {
        title: 'Sales',
        url: '/sales',
        icon: ShoppingCart,
        roles: ['Admin', 'Stockman']
    },
    {
        title: 'Item',
        url: '/items',
        icon: ShoppingCart,
        roles: ['Admin', 'Stockman']
    },
];


const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    const { auth } = usePage().props as any;

    const userRole = auth.user?.role;

    const visibleItems = mainNavItems.filter((item) =>
        item.roles?.includes(userRole)
    )

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {visibleItems.length > 0 && (
                    <NavMain items={visibleItems} label='platform' />
                )}

            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
