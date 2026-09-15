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
        // roles: ['admin']
    },
    {
        title: 'Category',
        url: '/categories',
        icon: Grid,
        // roles: ['suppliers']
    },
    {
        title: 'Product',
        url: '/products',
        icon: Package,
        // roles: ['admin']
    },
    {
        title: 'Batch',
        url: '/batches',
        icon: Package,
        // roles: ['admin']
    },
    {
        title: 'Supplier',
        url: '/suppliers',
        icon: User2,
        // roles: ['suppliers']
    },
    {
        title: 'Sales',
        url: '/sales',
        icon: ShoppingCart,
        // roles: ['admin']
    },
    {
        title: 'Item',
        url: '/items',
        icon: ShoppingCart,
        // roles: ['admin']
    },
];

const manageNavItems: NavItem[] = [
    {
        title: 'User',
        url: 'users',
        icon: User2
    }
];

export type NavItem = {
    title: string;
    url: string;
    roles?: string[];
};
const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    const { auth } = usePage().props as any;

    const visibleNavItems = mainNavItems.filter((item) => {
        if (!item.roles) {
            return true;
        }

        return item.roles.includes(auth.user.role);
    });

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
                {visibleNavItems.length > 0 && (
                    <NavMain items={visibleNavItems} label='platform' />
                )}

            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
