import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { format } from 'date-fns';
import { type Expense } from '@/lib/api/expenses';
import { cn } from '@/lib/utils';
import { getCategoryIcon, getCategoryColor } from "./top-balance-card";

interface RecentTransactionsProps {
    expenses: Expense[];
    loading: boolean;
    error: string | null;
}

export function RecentTransactions({ expenses, loading, error }: RecentTransactionsProps) {
    const formatINR = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        }).format(value);
    };

    const getAmountColor = (amount: number, isIncome: boolean) => {
        if (isIncome) return 'text-emerald-500';
        return 'text-rose-500';
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-slate-800">Recent Transactions</h2>
                <button className="text-sm font-semibold text-emerald-500 hover:text-emerald-600 transition-colors">
                    View All
                </button>
            </div>

            <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    </div>
                ) : error ? (
                    <div className="text-rose-500 text-center p-8">{error}</div>
                ) : expenses.length === 0 ? (
                    <div className="text-slate-400 text-center p-12 text-sm font-medium">No expenses recorded yet.</div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {expenses.slice(0, 5).map((expense) => {
                            const isIncome = expense.title.toLowerCase().includes('salary') || expense.title.toLowerCase().includes('deposit');
                            const displayAmount = parseFloat(expense.amount);

                            return (
                                <div key={expense.id} className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                                            {getCategoryIcon(expense.category)}
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-bold text-slate-800 mb-0.5">
                                                {expense.title}
                                            </h4>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                <span>{format(new Date(expense.date), 'MMM dd')}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                                <span>{expense.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cn("font-bold text-[15px]", getAmountColor(displayAmount, isIncome))}>
                                        {isIncome ? '+' : '-'}{formatINR(displayAmount)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>
        </div>
    );
}
