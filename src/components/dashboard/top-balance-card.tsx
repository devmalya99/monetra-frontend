import { Card } from "@/components/ui/card";
import { TrendingUp, ShoppingBag, Utensils, Zap, Car } from "lucide-react";

interface TopBalanceCardProps {
    totalBalance: number;
}

export function TopBalanceCard({ totalBalance }: TopBalanceCardProps) {
    const formatINR = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        }).format(value);
    };

    return (
        <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                    <h3 className="text-[13px] font-semibold tracking-wider text-slate-400 uppercase">Total Balance</h3>
                    <div className="flex items-end gap-4">
                        <span className="text-4xl sm:text-[44px] font-bold text-slate-800 leading-none">
                            {formatINR(totalBalance).replace('.00', '')}
                            <span className="text-slate-400 text-3xl">.00</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +12.5%
                        </span>
                        <span className="text-xs text-slate-400 font-medium tracking-wide">vs last month</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

// Helper functions for icons
export const getCategoryIcon = (category: string) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('food') || cat.includes('dining')) return <Utensils className="h-5 w-5 text-orange-500" />;
    if (cat.includes('shop')) return <ShoppingBag className="h-5 w-5 text-rose-500" />;
    if (cat.includes('transport') || cat.includes('travel')) return <Car className="h-5 w-5 text-indigo-500" />;
    if (cat.includes('bill') || cat.includes('util')) return <Zap className="h-5 w-5 text-purple-500" />;
    return <ShoppingBag className="h-5 w-5 text-teal-500" />;
};

export const getCategoryColor = (category: string) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('food') || cat.includes('dining')) return 'bg-orange-50';
    if (cat.includes('shop')) return 'bg-rose-50';
    if (cat.includes('transport') || cat.includes('travel')) return 'bg-indigo-50';
    if (cat.includes('bill') || cat.includes('util')) return 'bg-purple-50';
    return 'bg-teal-50';
};
