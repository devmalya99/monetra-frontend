'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Loader2, ArrowRight, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

// Define the validation schema
const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: SignupFormValues) {
        setIsLoading(true);
        setError(null);
        
        console.log('🚀 Step 1: Initiating Signup Process...');
        
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                throw new Error("Backend URL is not defined");
            }

            console.log(`📡 Step 2: Sending request to ${backendUrl}/user/signup...`);
            
            const response = await axios.post(`${backendUrl}/user/signup`, {
                email: data.email,
                password: data.password
            });

            console.log('✅ Step 3: Signup successful!', response.data);
            
            // Redirect to signin page on success
            router.push('/signin');
        } catch (err: any) {
            console.error('❌ Step 3: Signup failed:', err);
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="border-muted shadow-lg transition-all hover:shadow-xl dark:border-muted/50 dark:bg-card/50">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Create an account
                </CardTitle>
                <CardDescription>
                    Enter your email and password below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                className={`pl-9 ${errors.email ? "border-red-500" : ""}`}
                                disabled={isLoading}
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
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

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}

                    <Button className="w-full mt-2 group" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            <>
                                Sign Up with Email
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <div className="text-center text-sm text-muted-foreground w-full">
                    Already have an account?{' '}
                    <Link
                        href="/signin"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
