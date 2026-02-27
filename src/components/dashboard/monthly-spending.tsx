import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface MonthlySpendingProps {
    currentSpend: number;
    budgetLimit: number;
    budgetLeft: number;
    topCategories: { category: string; totalAmount: number }[];
}

export function MonthlySpending({ currentSpend, budgetLimit, budgetLeft, topCategories }: MonthlySpendingProps) {
    const budgetPercent = Math.min((currentSpend / budgetLimit) * 100, 100);

    const formatINR = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        }).format(value);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-slate-800">Monthly Spending</h2>
            </div>
            <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-8">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">Current Spend</h3>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold text-slate-800 tracking-tight">
                                {formatINR(currentSpend).replace('.00', '')}
                            </span>
                            <span className="text-sm font-semibold text-slate-300">
                                / {formatINR(budgetLimit).replace('.00', '')}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase mb-1">Budget Left</h3>
                        <span className="text-base font-bold text-emerald-500">{formatINR(budgetLeft).replace('.00', '')}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4 relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-emerald-400 rounded-full"
                        style={{ width: `${budgetPercent}%` }}
                    />
                </div>

                <div className="flex items-center gap-2 mb-10">
                    <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 text-[10px] font-bold">i</div>
                    <span className="text-xs font-medium text-slate-400">You&apos;ve spent {Math.round(budgetPercent)}% of your monthly budget.</span>
                </div>

                <div className="pt-2">
                    <h3 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-6">Top Categories</h3>
                    <div className="space-y-5">
                        {topCategories && topCategories.length > 0 ? (
                            topCategories.slice(0, 5).map((cat, idx) => {
                                const colors = ['bg-blue-400', 'bg-amber-400', 'bg-purple-400', 'bg-emerald-400', 'bg-rose-400'];
                                return (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-2.5 h-2.5 rounded-full", colors[idx % colors.length])} />
                                            <span className="text-sm font-semibold text-slate-600">{cat.category}</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">{formatINR(cat.totalAmount).replace('.00', '')}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm font-medium text-slate-500 mb-1">No spend data yet</p>
                                <p className="text-xs text-slate-400">Add some expenses to see your top categories breakdown here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
