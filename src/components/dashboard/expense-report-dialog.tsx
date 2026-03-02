'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, FileDown, Loader2, Calendar, CalendarDays, CalendarRange } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import type { Expense } from '@/lib/api/expenses';
import {
  type ReportViewMode,
  getReportGroups,
  getGrandTotals,
  formatINR,
} from '@/lib/report-utils';
import { cn } from '@/lib/utils';
import { customToast } from '@/lib/toast';
import { downloadExpenseReportPDF } from '@/lib/pdf-report';

interface ExpenseReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenses: Expense[];
}

const VIEW_MODES: { id: ReportViewMode; label: string; icon: React.ReactNode }[] = [
  { id: 'daily', label: 'Daily', icon: <Calendar className="h-4 w-4" /> },
  { id: 'weekly', label: 'Weekly', icon: <CalendarDays className="h-4 w-4" /> },
  { id: 'monthly', label: 'Monthly', icon: <CalendarRange className="h-4 w-4" /> },
];

export function ExpenseReportDialog({ open, onOpenChange, expenses, ...props }: ExpenseReportDialogProps) {
  const membership = useUserStore((s) => s.membership);
  const isPremium = !!membership;
  const [viewMode, setViewMode] = useState<ReportViewMode>('daily');
  const [downloading, setDownloading] = useState(false);

  const groups = useMemo(() => getReportGroups(expenses, viewMode), [expenses, viewMode]);
  const totals = useMemo(() => getGrandTotals(expenses), [expenses]);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      await downloadExpenseReportPDF(expenses, viewMode);
      customToast.success('Report downloaded');
    } catch (e) {
      console.error(e);
      customToast.error('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white text-slate-800"
        {...props}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Expense & Income Report
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            View and download your transactions by daily, weekly, or monthly period.
          </DialogDescription>
        </DialogHeader>

        {!isPremium ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                <Crown className="h-7 w-7 text-amber-600" />
              </div>
            </div>
            <h3 className="font-semibold text-slate-800">Premium feature</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Expense and income reports with daily, weekly, and monthly views are available for Premium members.
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/premium-membership">Upgrade to Premium</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              {VIEW_MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setViewMode(m.id)}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    viewMode === m.id
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
              <div className="ml-auto">
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                  disabled={downloading || expenses.length === 0}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileDown className="h-4 w-4 mr-1.5" />
                  )}
                  Download PDF
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto min-h-0 rounded-lg border border-slate-200">
              {expenses.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">No transactions to show.</div>
              ) : (
                <div className="p-2">
                  {groups.map((group) => (
                    <div key={group.label} className="mb-6 last:mb-0">
                      <h4 className="text-sm font-semibold text-teal-700 mb-2 sticky top-0 bg-white py-1">
                        {group.label}
                      </h4>
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-teal-50 text-teal-800">
                            <th className="text-left py-2 px-3 border-b border-teal-100 rounded-tl">Date</th>
                            <th className="text-left py-2 px-3 border-b border-teal-100">Description</th>
                            <th className="text-left py-2 px-3 border-b border-teal-100">Category</th>
                            <th className="text-right py-2 px-3 border-b border-teal-100">Income</th>
                            <th className="text-right py-2 px-3 border-b border-teal-100 rounded-tr">Expense</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map((row, i) => (
                            <tr key={`${row.date}-${row.description}-${i}`} className="border-b border-slate-100">
                              <td className="py-2 px-3 text-slate-600">{row.dateLabel}</td>
                              <td className="py-2 px-3 text-slate-800">
                                {row.description}
                                {row.notes && <span className="block text-xs text-slate-500 italic max-w-[200px] truncate mt-0.5">{row.notes}</span>}
                              </td>
                              <td className="py-2 px-3 text-slate-600">{row.category}</td>
                              <td className="py-2 px-3 text-right text-emerald-600 font-medium">
                                {row.income > 0 ? formatINR(row.income) : '—'}
                              </td>
                              <td className="py-2 px-3 text-right text-rose-600 font-medium">
                                {row.expense > 0 ? formatINR(row.expense) : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-xs text-slate-500 mt-1 px-3">
                        Subtotal — Income: {formatINR(group.incomeTotal)} | Expense: {formatINR(group.expenseTotal)} | Savings: {formatINR(group.incomeTotal - group.expenseTotal)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {expenses.length > 0 && (
              <div className="border-t border-slate-200 pt-3 flex flex-wrap gap-6 text-sm">
                <span className="font-semibold text-slate-700">
                  Total Income: <span className="text-emerald-600">{formatINR(totals.totalIncome)}</span>
                </span>
                <span className="font-semibold text-slate-700">
                  Total Expense: <span className="text-rose-600">{formatINR(totals.totalExpense)}</span>
                </span>
                <span className="font-semibold text-slate-700">
                  Savings: <span className="text-teal-600">{formatINR(totals.savings)}</span>
                </span>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
