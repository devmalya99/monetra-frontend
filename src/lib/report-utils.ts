import { format, startOfWeek, startOfMonth, parseISO } from 'date-fns';
import type { Expense } from '@/lib/api/expenses';

export type ReportViewMode = 'daily' | 'weekly' | 'monthly';

/** Treat transaction as income if title suggests it (salary, deposit, etc.) */
export function isIncome(expense: Expense): boolean {
  const t = (expense.title || '').toLowerCase();
  return t.includes('salary') || t.includes('deposit') || t.includes('income');
}

export interface TransactionRow {
  date: string;
  dateLabel: string;
  description: string;
  category: string;
  income: number;
  expense: number;
  isSubtotal?: boolean;
  notes?: string;
}

export interface ReportGroup {
  label: string; // e.g. "01-03-2021", "Week of Mar 1", "March 2021"
  rows: TransactionRow[];
  incomeTotal: number;
  expenseTotal: number;
}

function toRow(expense: Expense): TransactionRow {
  const amount = parseFloat(expense.amount) || 0;
  const asIncome = isIncome(expense);
  return {
    date: expense.date,
    dateLabel: format(parseISO(expense.date), 'dd-MM-yyyy'),
    description: expense.title,
    category: expense.category,
    income: asIncome ? amount : 0,
    expense: asIncome ? 0 : amount,
    notes: expense.notes,
  };
}

export function buildDailyReport(expenses: Expense[]): ReportGroup[] {
  const byDate = new Map<string, TransactionRow[]>();
  for (const e of expenses) {
    const key = e.date;
    if (!byDate.has(key)) byDate.set(key, []);
    byDate.get(key)!.push(toRow(e));
  }
  const sortedDates = Array.from(byDate.keys()).sort();
  return sortedDates.map((dateStr) => {
    const rows = byDate.get(dateStr)!;
    const incomeTotal = rows.reduce((s, r) => s + r.income, 0);
    const expenseTotal = rows.reduce((s, r) => s + r.expense, 0);
    return {
      label: format(parseISO(dateStr), 'dd-MM-yyyy'),
      rows,
      incomeTotal,
      expenseTotal,
    };
  });
}

export function buildWeeklyReport(expenses: Expense[]): ReportGroup[] {
  const byWeek = new Map<string, TransactionRow[]>();
  for (const e of expenses) {
    const d = parseISO(e.date);
    const weekStart = startOfWeek(d, { weekStartsOn: 0 });
    const key = format(weekStart, 'yyyy-MM-dd');
    if (!byWeek.has(key)) byWeek.set(key, []);
    byWeek.get(key)!.push(toRow(e));
  }
  const sortedWeeks = Array.from(byWeek.keys()).sort();
  return sortedWeeks.map((weekKey) => {
    const rows = byWeek.get(weekKey)!;
    const incomeTotal = rows.reduce((s, r) => s + r.income, 0);
    const expenseTotal = rows.reduce((s, r) => s + r.expense, 0);
    const weekStart = parseISO(weekKey);
    return {
      label: `Week of ${format(weekStart, 'MMM d, yyyy')}`,
      rows,
      incomeTotal,
      expenseTotal,
    };
  });
}

export function buildMonthlyReport(expenses: Expense[]): ReportGroup[] {
  const byMonth = new Map<string, TransactionRow[]>();
  for (const e of expenses) {
    const d = parseISO(e.date);
    const monthStart = startOfMonth(d);
    const key = format(monthStart, 'yyyy-MM');
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(toRow(e));
  }
  const sortedMonths = Array.from(byMonth.keys()).sort();
  return sortedMonths.map((monthKey) => {
    const rows = byMonth.get(monthKey)!;
    const incomeTotal = rows.reduce((s, r) => s + r.income, 0);
    const expenseTotal = rows.reduce((s, r) => s + r.expense, 0);
    const [y, m] = monthKey.split('-');
    const monthStart = new Date(Number(y), Number(m) - 1, 1);
    return {
      label: format(monthStart, 'MMMM yyyy'),
      rows,
      incomeTotal,
      expenseTotal,
    };
  });
}

export function getReportGroups(expenses: Expense[], mode: ReportViewMode): ReportGroup[] {
  switch (mode) {
    case 'daily':
      return buildDailyReport(expenses);
    case 'weekly':
      return buildWeeklyReport(expenses);
    case 'monthly':
      return buildMonthlyReport(expenses);
    default:
      return buildDailyReport(expenses);
  }
}

export function getGrandTotals(expenses: Expense[]) {
  let totalIncome = 0;
  let totalExpense = 0;
  for (const e of expenses) {
    const amount = parseFloat(e.amount) || 0;
    if (isIncome(e)) totalIncome += amount;
    else totalExpense += amount;
  }
  return {
    totalIncome,
    totalExpense,
    savings: totalIncome - totalExpense,
  };
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
