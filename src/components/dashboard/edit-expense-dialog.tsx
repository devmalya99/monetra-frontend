'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Pencil, Loader2, Trash2, Wand2 } from 'lucide-react';
import { expensesApi, type Expense } from '@/lib/api/expenses';
import { customToast } from '@/lib/toast';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
    amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: 'Amount must be positive number',
    }),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    category: z.string().min(1, 'Please select a category'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;



interface EditExpenseDialogProps {
    expense: Expense;
    onExpenseUpdated?: () => void;
    onExpenseDeleted?: () => void;
}

export function EditExpenseDialog({ expense, onExpenseUpdated, onExpenseDeleted }: EditExpenseDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggestingCategory, setIsSuggestingCategory] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            amount: expense.amount.toString(),
            title: expense.title,
            category: expense.category,
            date: new Date(expense.date).toISOString().split('T')[0],
            notes: expense.notes || '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            await expensesApi.update(expense.id, {
                title: data.title,
                category: data.category,
                amount: parseFloat(data.amount),
                date: new Date(data.date).toISOString(),
                notes: data.notes || '',
            });

            setOpen(false);
            customToast.success("Expense updated successfully");
            if (onExpenseUpdated) {
                onExpenseUpdated();
            }
        } catch (err: any) {
            console.error('Failed to update expense:', err);
            customToast.error(err.response?.data?.message || 'Failed to update expense');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = () => {
        setConfirmDelete(true);
    };

    const confirmAndDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await expensesApi.delete(expense.id);
            setConfirmDelete(false);
            setOpen(false);
            customToast.success("Expense deleted successfully");
            if (onExpenseDeleted) {
                onExpenseDeleted();
            }
        } catch (err: any) {
            console.error('Failed to delete expense:', err);
            customToast.error(err.response?.data?.message || 'Failed to delete expense');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSuggestCategory = async () => {
        const title = getValues('title');
        if (!title || title.length < 3) {
            customToast.error('Please enter a valid title first');
            return;
        }

        setIsSuggestingCategory(true);
        try {
            const category = await expensesApi.suggestCategory(title);
            if (category) {
                setValue('category', category, { shouldValidate: true });
                customToast.success(`Category set to "${category}"`);
            } else {
                customToast.error('No category suggestion received');
            }
        } catch (error) {
            customToast.error('Failed to get an AI category suggestion');
        } finally {
            setIsSuggestingCategory(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Edit Expense"
                >
                    <Pencil className="w-4 h-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Edit Expense</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Update the details of your recorded expense or remove it.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right text-gray-300 font-bold">
                            Amount
                        </Label>
                        <div className="col-span-3">
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                                <Input
                                    id="amount"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500 font-medium"
                                    {...register('amount')}
                                />
                            </div>
                            {errors.amount && (
                                <p className="text-xs text-red-400 mt-1 font-medium">{errors.amount.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right text-gray-300 font-bold">
                            Title
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="title"
                                placeholder="Grocery shopping"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500 font-medium"
                                {...register('title')}
                            />
                            {errors.title && (
                                <p className="text-xs text-red-400 mt-1 font-medium">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right text-gray-300 font-bold">
                            Category
                        </Label>
                        <div className="col-span-3">
                            <div className="flex gap-2">
                                <Input
                                    id="category"
                                    placeholder="E.g., Food, Transport"
                                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500 font-medium"
                                    {...register('category')}
                                />
                                <Button
                                    type="button"
                                    onClick={handleSuggestCategory}
                                    disabled={isSuggestingCategory}
                                    className="h-10 bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 shadow-none hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors"
                                    title="Suggest category with AI"
                                >
                                    {isSuggestingCategory ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                                </Button>
                            </div>
                            {errors.category && (
                                <p className="text-xs text-red-400 mt-1 font-medium">{errors.category.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right text-gray-300 font-bold">
                            Date
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="date"
                                type="date"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500 font-medium block"
                                {...register('date')}
                            />
                            {errors.date && (
                                <p className="text-xs text-red-400 mt-1 font-medium">{errors.date.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right text-gray-300 font-bold">
                            Notes
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="notes"
                                placeholder="Optional notes"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500 font-medium"
                                {...register('notes')}
                            />
                            {errors.notes && (
                                <p className="text-xs text-red-400 mt-1 font-medium">{errors.notes.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="flex items-center sm:justify-between mt-4">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteClick}
                            disabled={isDeleting || isLoading}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-transparent shadow-none"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || isDeleting}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white z-100">
                    <DialogHeader>
                        <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Are you absolutely sure you want to delete this expense? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-md border border-red-500/20 mb-4">
                        This will permanently remove <strong>{expense.title}</strong> from your records.
                    </div>
                    <DialogFooter className="flex items-center sm:justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setConfirmDelete(false)}
                            disabled={isDeleting}
                            className="text-gray-400 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={confirmAndDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                            Yes, Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Dialog>
    );
}
