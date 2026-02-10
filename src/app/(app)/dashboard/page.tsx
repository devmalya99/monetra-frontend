'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Activity, TrendingUp, Trash2, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import api from '@/lib/axios';
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

interface Expense {
    id: string;
    userId: string;
    title: string;
    amount: string;
    category: string;
    date: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ApiResponse<T> {
    status: string;
    results: number;
    data: T;
}

interface ExpensesData {
    expenses: Expense[];
}

export default function DashboardPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get<ApiResponse<ExpensesData>>('/user/my-expenses');

            if (response.data.status === 'success' && response.data.data && Array.isArray(response.data.data.expenses)) {
                setExpenses(response.data.data.expenses);
            } else {
                console.warn('Unexpected API response structure:', response.data);
                setExpenses([]);
            }

            setError(null);
        } catch (err) {
            console.error('Failed to fetch expenses:', err);
            setError('Failed to load expenses. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this expense?')) return;

        try {
            await api.delete(`/user/delete-expense/${id}`);
            // Force refetch to show fresh data
            fetchExpenses();
        } catch (err) {
            console.error('Failed to delete expense:', err);
            alert('Failed to delete expense');
        }
    };

    // Calculate totals with safety check
    const totalExpenses = Array.isArray(expenses)
        ? expenses.reduce((sum, item) => {
            const amount = parseFloat(item.amount);
            return sum + (isNaN(amount) ? 0 : amount);
        }, 0)
        : 0;
    // Since we don't have "income" API yet, we can't calculate real balance. 
    // However, if the user intends "Expenses" to be negative in a "Transactions" list, 
    // then Total Balance would be Income - Expenses.
    // For now, I'll display Total Expenses as the primary metric.
    // The "Income" card might need to be 0 or static until an endpoint exists.
    // I will treat "Total Balance" as just a placeholder or 0 - TotalExpenses if starting from 0.
    // Actually, usually Expense Trackers have a "Budget" or "Income" setting. 
    // Since we don't have that, I'll show Total Expenses clearly.

    // IF the user considers these are just transactions, maybe some are income?
    // But endpoint is `add-expense`. So safe to assume all are expenses (outflows).

    return (
        <div className="p-8 space-y-8 bg-gray-900 min-h-screen text-white">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                    Dashboard
                </h2>
                <AddExpenseDialog onExpenseAdded={fetchExpenses} />
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Total Expenses
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            ${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-gray-400">
                            Total spendings tracked
                        </p>
                    </CardContent>
                </Card>

                {/* Placeholder for future Income/Balance features */}
                <Card className="bg-gray-800 border-gray-700 opacity-60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Income (Coming Soon)
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-500">$0.00</div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Transactions
                        </CardTitle>
                        <Activity className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{expenses.length}</div>
                        <p className="text-xs text-gray-400">
                            Recorded entries
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                {/* Main Activity List - Taking up full width or partitioned */}
                <Card className="col-span-1 lg:col-span-7 bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Expenses</CardTitle>
                        <p className="text-sm text-gray-400">
                            You have made {expenses.length} transactions.
                        </p>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                            </div>
                        ) : error ? (
                            <div className="text-red-400 text-center p-4">{error}</div>
                        ) : expenses.length === 0 ? (
                            <div className="text-gray-500 text-center p-8">No expenses recorded yet.</div>
                        ) : (
                            <div className="space-y-4">
                                {expenses.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 hover:bg-gray-700/50 transition-colors group">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-2 bg-rose-500/10 rounded-full">
                                                <ArrowDown className="h-4 w-4 text-rose-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium leading-none text-white">{expense.title}</p>
                                                <div className="flex items-center mt-1 gap-2">
                                                    <span className="text-xs text-gray-400">{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                                                        {expense.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="font-semibold text-white">
                                                -${parseFloat(expense.amount).toFixed(2)}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(expense.id)}
                                                className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
