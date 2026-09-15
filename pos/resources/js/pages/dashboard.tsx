import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { Product } from '@/schema/product-schema';
import { Sale } from '@/schema/sale-schema';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface PageProps {
    products?: { data: Product[] } | Product[];
    sales?: { data: Sale[] } | Sale[];
    [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Custom Professional Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs border border-slate-800">
                <p className="font-semibold text-slate-300 mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-slate-400">Total Revenue:</span>
                    <span className="font-bold text-white">
                        {new Intl.NumberFormat('en-PH', {
                            style: 'currency',
                            currency: 'PHP',
                        }).format(payload[0].value)}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const { props } = usePage<PageProps>();

    const rawProducts = props.products;
    const rawSales = props.sales;

    const products: Product[] = Array.isArray(rawProducts)
        ? rawProducts
        : rawProducts?.data ?? [];

    const sales: Sale[] = Array.isArray(rawSales)
        ? rawSales
        : rawSales?.data ?? [];

    // Aggregate Data
    const totalSalesAmount = sales.reduce(
        (acc, sale) => acc + Number(sale?.total_amount || 0),
        0
    );

    const totalInventoryValue = products.reduce(
        (acc, product) => acc + Number(product?.selling_price || 0),
        0
    );

    // Prepare Daily Sales Data
    const salesChartData = sales.reduce((acc: { date: string; amount: number }[], sale) => {
        const rawDate = sale?.created_at ? new Date(sale.created_at) : new Date();
        const formattedDate = rawDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });

        const existingDate = acc.find((item) => item.date === formattedDate);

        if (existingDate) {
            existingDate.amount += Number(sale?.total_amount || 0);
        } else {
            acc.push({
                date: formattedDate,
                amount: Number(sale?.total_amount || 0),
            });
        }

        return acc;
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-slate-50/50 p-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Minimalist Professional KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        
                        {/* Total Sales Card */}
                        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Total Revenue
                                </span>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    Live
                                </span>
                            </div>
                            <div className="mt-2 flex items-baseline justify-between">
                                <h3 className="text-2xl font-bold text-slate-900">
                                    {formatCurrency(totalSalesAmount)}
                                </h3>
                            </div>
                        </div>

                        {/* Inventory Value Card */}
                        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Inventory Selling Value
                                </span>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-2xl font-bold text-slate-900">
                                    {formatCurrency(totalInventoryValue)}
                                </h3>
                            </div>
                        </div>

                        {/* Total Products Card */}
                        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Total Products
                                </span>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-2xl font-bold text-slate-900">
                                    {products.length.toLocaleString()} <span className="text-sm font-normal text-slate-500">items</span>
                                </h3>
                            </div>
                        </div>

                    </div>

                    {/* Main Chart Section */}
                    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Sales Performance
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Daily revenue analytics overview
                                </p>
                            </div>
                        </div>

                        <div className="h-[320px] w-full">
                            {salesChartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart 
                                        data={salesChartData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>

                                        {/* Subtle Clean Grid */}
                                        <CartesianGrid 
                                            strokeDasharray="4 4" 
                                            vertical={false} 
                                            stroke="#f1f5f9" 
                                        />

                                        <XAxis 
                                            dataKey="date" 
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            dy={10}
                                        />

                                        <YAxis 
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            tickFormatter={(val) => `₱${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                                        />

                                        <Tooltip content={<CustomTooltip />} />

                                        <Area 
                                            type="monotone" 
                                            dataKey="amount" 
                                            stroke="#2563eb" 
                                            strokeWidth={2}
                                            fill="url(#salesGradient)" 
                                            activeDot={{ r: 6, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                                    No sales data available for preview.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}