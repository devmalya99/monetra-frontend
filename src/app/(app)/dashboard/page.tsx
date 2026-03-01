'use client';

import { useEffect, useState, useCallback } from 'react';
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import { expensesApi, type Expense } from '@/lib/api/expenses';
import { AddBalanceDialog } from "@/components/dashboard/add-balance-dialog";
import { TopBalanceCard } from "@/components/dashboard/top-balance-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { MonthlySpending } from "@/components/dashboard/monthly-spending";

export default function DashboardPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [topCategories, setTopCategories] = useState<{ category: string; totalAmount: number }[]>([]);
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

    const fetchTopCategories = useCallback(async () => {
        try {
            const data = await expensesApi.getTopCategories(3);
            setTopCategories(data);
        } catch (err) {
            console.error('Failed to fetch top categories:', err);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
        fetchBalance();
        fetchTopCategories();
    }, [fetchExpenses, fetchBalance, fetchTopCategories]);

    // Map the actual backend total expense into our current spend UI.
    const dummyCurrentSpend = totalExpense > 0 ? totalExpense : 0;
    const dummyBudgetLeft = dummyBudget - dummyCurrentSpend;
    // Use Budget Left as the Total Balance now that Cash/Invested are removed
    const dummyTotalBalance = dummyBudgetLeft;



    return (
        <div className="relative min-h-[calc(100vh-64px)] bg-[#f8fafc] text-slate-800 pb-20">
            <div className="max-w-[1400px] mx-auto p-6 lg:p-8 space-y-8">

                <TopBalanceCard totalBalance={dummyTotalBalance} />

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
                    <RecentTransactions
                        expenses={expenses}
                        loading={loading}
                        error={error}
                        onExpenseModified={fetchExpenses}
                    />

                    <MonthlySpending
                        currentSpend={dummyCurrentSpend}
                        budgetLimit={dummyBudget}
                        budgetLeft={dummyBudgetLeft}
                        topCategories={topCategories}
                    />
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
