'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Loader2, ShoppingBag, Utensils, Zap, Car } from "lucide-react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import { format } from 'date-fns';
import { expensesApi, type Expense } from '@/lib/api/expenses';
import { cn } from '@/lib/utils';
import { AddBalanceDialog } from "@/components/dashboard/add-balance-dialog";

export default function DashboardPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dummyBudget, setDummyBudget] = useState(45000); // Changed to state

    useEffect(() => {
        console.log('🌟 [STEP: UI Update] -> Loaded Beautiful Premium Dashboard Design!');
    }, []);

    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true);
            const data = await expensesApi.getAll();
            setExpenses(data.expenses);
            setTotalExpense(data.totalExpense);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch expenses:', err);
            setError('Failed to load expenses.');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchBalance = useCallback(async () => {
        try {
            const data = await expensesApi.getMonthlyBalance();
            setDummyBudget(data.allocatedBalance);
        } catch (err) {
            console.error('Failed to fetch balance:', err);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
        fetchBalance();
    }, [fetchExpenses, fetchBalance]);

    // Map the actual backend total expense into our current spend UI.
    const dummyCurrentSpend = totalExpense > 0 ? totalExpense : 0;
    const dummyBudgetLeft = dummyBudget - dummyCurrentSpend;

    // Use Budget Left as the Total Balance now that Cash/Invested are removed
    const dummyTotalBalance = dummyBudgetLeft;

    const budgetPercent = Math.min((dummyCurrentSpend / dummyBudget) * 100, 100);

    // Format currency to INR format
    const formatINR = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: value % 1 === 0 ? 0 : 2, // remove .00 if not needed, or keep for total
        }).format(value);
    };

    const getIcon = (category: string) => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('food') || cat.includes('dining')) return <Utensils className="h-5 w-5 text-orange-500" />;
        if (cat.includes('shop')) return <ShoppingBag className="h-5 w-5 text-rose-500" />;
        if (cat.includes('transport') || cat.includes('travel')) return <Car className="h-5 w-5 text-indigo-500" />;
        if (cat.includes('bill') || cat.includes('util')) return <Zap className="h-5 w-5 text-purple-500" />;
        return <ShoppingBag className="h-5 w-5 text-teal-500" />;
    };

    const getIconWrapperColor = (category: string) => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('food') || cat.includes('dining')) return 'bg-orange-50';
        if (cat.includes('shop')) return 'bg-rose-50';
        if (cat.includes('transport') || cat.includes('travel')) return 'bg-indigo-50';
        if (cat.includes('bill') || cat.includes('util')) return 'bg-purple-50';
        return 'bg-teal-50';
    };

    const getAmountColor = (amount: number, isIncome: boolean) => {
        if (isIncome) return 'text-emerald-500';
        return 'text-rose-500';
    };

    return (
        <div className="relative min-h-[calc(100vh-64px)] bg-[#f8fafc] text-slate-800 pb-20">
            <div className="max-w-[1400px] mx-auto p-6 lg:p-8 space-y-8">

                {/* Top Balance Card */}
                <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4">
                            <h3 className="text-[13px] font-semibold tracking-wider text-slate-400 uppercase">Total Balance</h3>
                            <div className="flex items-end gap-4">
                                <span className="text-4xl sm:text-[44px] font-bold text-slate-800 leading-none">
                                    {formatINR(dummyTotalBalance).replace('.00', '')}
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

                {/* Main Content Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">

                    {/* Left Column: Recent Transactions */}
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
                                    {/* Map actual expenses but we mock some dummy data styles for missing properties like isIncome */}
                                    {/* If the array is empty then we just show the recorded expenses */}
                                    {/* Adding a mocked income to match design precisely? Design has "Salary Deposit" */}
                                    {expenses.slice(0, 5).map((expense) => {
                                        // Pretend first item or items with 'deposit' or 'salary' in title are income
                                        const isIncome = expense.title.toLowerCase().includes('salary') || expense.title.toLowerCase().includes('deposit');
                                        const displayAmount = parseFloat(expense.amount);

                                        return (
                                            <div key={expense.id} className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getIconWrapperColor(expense.category)}`}>
                                                        {getIcon(expense.category)}
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
                                    {/* If there are no expenses, let's inject a static dummy list to perfectly match the design image for "beautiful ui" showcase */}
                                    {expenses.length === 0 && (
                                        <>
                                            <div className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50">
                                                        <Zap className="h-5 w-5 text-emerald-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-bold text-slate-800 mb-0.5">Salary Deposit</h4>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                            <span>Aug 30</span><span className="w-1 h-1 rounded-full bg-slate-200"></span><span>Monthly Pay</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-[15px] text-emerald-500">+₹85,000.00</div>
                                            </div>
                                            <div className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-rose-50">
                                                        <ShoppingBag className="h-5 w-5 text-rose-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-bold text-slate-800 mb-0.5">Amazon India</h4>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                            <span>Aug 28</span><span className="w-1 h-1 rounded-full bg-slate-200"></span><span>Shopping</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-[15px] text-rose-500">-₹4,250.00</div>
                                            </div>
                                            <div className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                                                        <Utensils className="h-5 w-5 text-orange-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-bold text-slate-800 mb-0.5">Zomato</h4>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                            <span>Aug 27</span><span className="w-1 h-1 rounded-full bg-slate-200"></span><span>Food & Dining</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-[15px] text-rose-500">-₹820.00</div>
                                            </div>
                                            <div className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-50">
                                                        <Car className="h-5 w-5 text-indigo-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-bold text-slate-800 mb-0.5">Uber</h4>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                            <span>Aug 26</span><span className="w-1 h-1 rounded-full bg-slate-200"></span><span>Transport</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-[15px] text-rose-500">-₹340.00</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Right Column: Monthly Spending */}
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
                                            {formatINR(dummyCurrentSpend).replace('.00', '')}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-300">
                                            / {formatINR(dummyBudget).replace('.00', '')}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase mb-1">Budget Left</h3>
                                    <span className="text-base font-bold text-emerald-500">{formatINR(dummyBudgetLeft).replace('.00', '')}</span>
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
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                            <span className="text-sm font-semibold text-slate-600">Shopping</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">₹12,400</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <span className="text-sm font-semibold text-slate-600">Food</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">₹8,100</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                                            <span className="text-sm font-semibold text-slate-600">Bills</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">₹5,000</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 pb-8 border-t border-slate-200 pt-8 max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="w-5 h-5 rounded bg-slate-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-sm bg-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-400">Monetra</span>
                </div>

                <div className="flex items-center gap-6 md:gap-8">
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Help Center</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Terms</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Security</a>
                </div>

                <div className="text-xs font-semibold text-slate-400 opacity-60">
                    © 2023 Monetra FinTech India.
                </div>
            </footer>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
                <AddBalanceDialog onBudgetUpdate={setDummyBudget} />
                <AddExpenseDialog onExpenseAdded={fetchExpenses} />
            </div>
        </div>
    );
}
