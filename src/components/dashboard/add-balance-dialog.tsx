'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Wallet } from 'lucide-react';
import { expensesApi } from '@/lib/api/expenses';

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
    amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
        message: 'Amount must be a positive number',
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddBalanceDialogProps {
    onBudgetUpdate?: (amount: number) => void;
}

export function AddBalanceDialog({ onBudgetUpdate }: AddBalanceDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        try {
            await expensesApi.updateBalance({ amount: parseFloat(data.amount) });

            if (onBudgetUpdate) {
                onBudgetUpdate(parseFloat(data.amount));
            }
            setOpen(false);
            reset();
            console.log('Balance updated successfully');
        } catch (err: unknown) {
            console.error('Failed to update balance:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg h-12 px-6 font-bold shadow-indigo-600/20">
                    <Wallet className="mr-2 h-4 w-4" /> Monthly Budget Allocation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-0 shadow-2xl rounded-2xl p-6 sm:p-8">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold text-slate-800">Set Monthly Budget</DialogTitle>
                    <DialogDescription className="text-sm text-slate-500 font-medium">
                        Enter how much you are allocating for expenses this month to track your spending limits.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2 relative">
                        <Label htmlFor="amount" className="text-sm font-bold text-slate-700">
                            Budget Amount
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                            <Input
                                id="amount"
                                type="text"
                                inputMode="decimal"
                                placeholder="0.00"
                                className="pl-8 bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-emerald-500 h-11 text-base font-bold rounded-lg"
                                {...register('amount')}
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-xs text-rose-500 font-medium mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white w-full h-11 text-base font-bold rounded-lg shadow-sm shadow-emerald-500/20"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Balance
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
