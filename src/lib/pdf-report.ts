import { format } from 'date-fns';
import type { Expense } from '@/lib/api/expenses';
import type { ReportViewMode } from '@/lib/report-utils';
import { getReportGroups, getGrandTotals } from '@/lib/report-utils';

export async function downloadExpenseReportPDF(
  expenses: Expense[],
  mode: ReportViewMode
): Promise<void> {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const groups = getReportGroups(expenses, mode);
  const { totalIncome, totalExpense, savings } = getGrandTotals(expenses);

  let y = 20;
  doc.setFontSize(16);
  doc.setTextColor(20, 94, 94);
  doc.text('Expense & Income Report', 14, y);
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${format(new Date(), 'dd MMM yyyy, hh:mm a')}`, 14, y);
  doc.text(`View: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`, 14, y + 5);
  y += 14;

  const tableHead = [['Date', 'Description', 'Category', 'Income (₹)', 'Expense (₹)']];

  for (const group of groups) {
    doc.setFontSize(11);
    doc.setTextColor(20, 94, 94);
    doc.text(group.label, 14, y);
    y += 6;

    const body = group.rows.map((r) => [
      r.dateLabel,
      r.description.slice(0, 35),
      r.category.slice(0, 20),
      r.income > 0 ? r.income.toFixed(2) : '—',
      r.expense > 0 ? r.expense.toFixed(2) : '—',
    ]);

    autoTable(doc, {
      head: [tableHead[0]],
      body,
      startY: y,
      theme: 'grid',
      headStyles: { fillColor: [20, 94, 94], textColor: 255 },
      margin: { left: 14 },
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(
      `Subtotal — Income: ₹${group.incomeTotal.toFixed(2)} | Expense: ₹${group.expenseTotal.toFixed(2)} | Savings: ₹${(group.incomeTotal - group.expenseTotal).toFixed(2)}`,
      14,
      y
    );
    y += 10;
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  }

  y += 4;
  doc.setDrawColor(20, 94, 94);
  doc.setLineWidth(0.5);
  doc.line(14, y, 196, y);
  y += 8;
  doc.setFontSize(12);
  doc.setTextColor(20, 94, 94);
  doc.text(`Total Income:    ₹${totalIncome.toFixed(2)}`, 14, y);
  doc.text(`Total Expense:   ₹${totalExpense.toFixed(2)}`, 14, y + 7);
  doc.text(`Savings:         ₹${savings.toFixed(2)}`, 14, y + 14);

  doc.save(`Monetra-Expense-Report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}
