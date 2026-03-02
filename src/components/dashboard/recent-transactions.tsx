import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from 'date-fns';
import { type Expense, expensesApi } from '@/lib/api/expenses';
import { cn } from '@/lib/utils';
import { getCategoryIcon, getCategoryColor } from "./top-balance-card";
import { EditExpenseDialog } from "./edit-expense-dialog";
import { customToast } from "@/lib/toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RecentTransactionsProps {
    expenses: Expense[];
    loading: boolean;
    error: string | null;
    onExpenseModified?: () => void;
}

export function RecentTransactions({ expenses, loading, error, onExpenseModified }: RecentTransactionsProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteExpense, setConfirmDeleteExpense] = useState<Expense | null>(null);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('monetra_expenses_per_page');
            return saved ? parseInt(saved) : 5;
        }
        return 5;
    });
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(expenses.length / itemsPerPage));
    const start = (page - 1) * itemsPerPage;
    const paginatedExpenses = expenses.slice(start, start + itemsPerPage);

    // Persist itemsPerPage to localStorage
    useEffect(() => {
        localStorage.setItem('monetra_expenses_per_page', itemsPerPage.toString());
    }, [itemsPerPage]);

    // Reset to page 1 when list shrinks (e.g. after delete) and current page would be empty
    useEffect(() => {
        if (expenses.length > 0 && start >= expenses.length) {
            setPage(Math.max(1, totalPages));
        }
    }, [expenses.length, start, totalPages]);

    const executeDelete = async () => {
        if (!confirmDeleteExpense) return;
        try {
            setDeletingId(confirmDeleteExpense.id);
            await expensesApi.delete(confirmDeleteExpense.id);
            customToast.success("Expense deleted successfully");
            if (onExpenseModified) onExpenseModified();
        } catch (err) {
            console.error("Failed to delete", err);
            customToast.error("Failed to delete expense");
        } finally {
            setDeletingId(null);
            setConfirmDeleteExpense(null);
        }
    };

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
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Show</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        className="text-[11px] bg-slate-100 border-none text-slate-600 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-bold cursor-pointer hover:bg-slate-200"
                    >
                        {[5, 10, 20, 50].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
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
                    <>
                        <div className="divide-y divide-slate-50">
                            {paginatedExpenses.map((expense: Expense) => {
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
                                                {expense.notes && (
                                                    <div className="text-xs text-slate-500 mt-0.5 italic truncate max-w-[200px] sm:max-w-[300px]">
                                                        {expense.notes}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={cn("font-bold text-[15px]", getAmountColor(displayAmount, isIncome))}>
                                                {isIncome ? '+' : '-'}{formatINR(displayAmount)}
                                            </div>

                                            {/* Action Buttons - Always visible for mobile accessibility */}
                                            <div className="flex items-center gap-1">
                                                <EditExpenseDialog
                                                    expense={expense}
                                                    onExpenseUpdated={onExpenseModified}
                                                    onExpenseDeleted={onExpenseModified}
                                                />
                                                <button
                                                    onClick={() => setConfirmDeleteExpense(expense)}
                                                    disabled={deletingId === expense.id}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Delete Expense"
                                                >
                                                    {deletingId === expense.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {expenses.length > 0 && (
                            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                    Page {page} of {totalPages}
                                    <span className="ml-2 text-slate-300">|</span>
                                    <span className="ml-2">
                                        Showing {start + 1}–{Math.min(start + itemsPerPage, expenses.length)} of {expenses.length}
                                    </span>
                                </span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page <= 1}
                                        className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 h-8 px-3 rounded-lg font-bold text-xs transition-all disabled:opacity-30"
                                    >
                                        <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                                        Prev
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                        className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 h-8 px-3 rounded-lg font-bold text-xs transition-all disabled:opacity-30"
                                    >
                                        Next
                                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Card>

            <Dialog open={!!confirmDeleteExpense} onOpenChange={() => setConfirmDeleteExpense(null)}>
                <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white z-100">
                    <DialogHeader>
                        <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Are you absolutely sure you want to delete this expense? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {confirmDeleteExpense && (
                        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-md border border-red-500/20 mb-4">
                            This will permanently remove <strong>{confirmDeleteExpense.title}</strong> from your records.
                        </div>
                    )}
                    <DialogFooter className="flex items-center sm:justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setConfirmDeleteExpense(null)}
                            disabled={!!deletingId}
                            className="text-gray-400 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={executeDelete}
                            disabled={!!deletingId}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {deletingId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                            Yes, Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
