'use client';

import * as React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axiosInstance from '@/lib/axios';
import { Loader2, ArrowRight, Lock } from 'lucide-react';
import { customToast } from '@/lib/toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: ResetPasswordFormValues) {
        setIsLoading(true);
        setError(null);

        console.log('🚀 Step 1: Initiating Reset Password Process...');

        try {
            console.log(`📡 Step 2: Sending request to /user/reset-password/${id}...`);

            const response = await axiosInstance.post(`/user/reset-password/${id}`, {
                password: data.password
            });

            console.log('✅ Step 3: Password Reset successful!', response.data);

            customToast.success("Password reset successfully. You can now login.");

            router.push('/signin');
        } catch (err: any) {
            console.error('❌ Step 3: Password reset failed:', err);
            const errorMessage = err.response?.data?.message || "Failed to reset password. The link might be expired.";
            setError(errorMessage);
            customToast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="border-muted shadow-lg transition-all hover:shadow-xl dark:border-muted/50 dark:bg-card/50">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Reset Password
                </CardTitle>
                <CardDescription>
                    Enter your new password below.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                placeholder="••••••••"
                                className={`pl-9 ${errors.password ? "border-red-500" : ""}`}
                                disabled={isLoading}
                                {...register("password")}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                placeholder="••••••••"
                                className={`pl-9 ${errors.confirmPassword ? "border-red-500" : ""}`}
                                disabled={isLoading}
                                {...register("confirmPassword")}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}

                    <Button className="w-full mt-2 group" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating Password...
                            </>
                        ) : (
                            <>
                                Reset Password
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
