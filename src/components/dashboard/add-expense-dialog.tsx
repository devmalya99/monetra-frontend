'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Loader2, Wand2 } from 'lucide-react';
import { expensesApi } from '@/lib/api/expenses';
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

// Update schema to match backend requirements: title, date, amount (string), category
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



interface AddExpenseDialogProps {
    onExpenseAdded?: () => void;
}

export function AddExpenseDialog({ onExpenseAdded }: AddExpenseDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggestingCategory, setIsSuggestingCategory] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            amount: '',
            title: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            notes: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            await expensesApi.add({
                title: data.title,
                category: data.category,
                amount: String(data.amount),
                date: new Date(data.date).toISOString(),
                notes: data.notes || '',
            });

            setOpen(false);
            reset();
            customToast.success("Expense added successfully!");
            if (onExpenseAdded) {
                onExpenseAdded();
            }
        } catch (err: any) {
            console.error('Failed to add expense:', err);
            const errorMessage = err.response?.data?.message || 'Failed to add expense. Please try again.';
            setError(errorMessage);
            customToast.error(errorMessage);
        } finally {
            setIsLoading(false);
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
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Add a new expense to track your spending. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right text-gray-300">
                            Amount
                        </Label>
                        <div className="col-span-3">
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                                <Input
                                    id="amount"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    className="pl-7 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500"
                                    {...register('amount')}
                                />
                            </div>
                            {errors.amount && (
                                <p className="text-xs text-red-400 mt-1">{errors.amount.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right text-gray-300">
                            Title
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="title"
                                placeholder="Grocery shopping"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500"
                                {...register('title')}
                            />
                            {errors.title && (
                                <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right text-gray-300">
                            Category
                        </Label>
                        <div className="col-span-3">
                            <div className="flex gap-2">
                                <Input
                                    id="category"
                                    placeholder="E.g., Food, Transport"
                                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500"
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
                                <p className="text-xs text-red-400 mt-1">{errors.category.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right text-gray-300">
                            Date
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="date"
                                type="date"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500 block"
                                {...register('date')}
                            />
                            {errors.date && (
                                <p className="text-xs text-red-400 mt-1">{errors.date.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right text-gray-300">
                            Notes
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="notes"
                                placeholder="Optional notes"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-500"
                                {...register('notes')}
                            />
                            {errors.notes && (
                                <p className="text-xs text-red-400 mt-1">{errors.notes.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Expense
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
