"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from "lucide-react"

enum Step {
    EMAIL = 1,
    OTP = 2,
    NEW_PASSWORD = 3,
    SUCCESS = 4
}

export default function ForgotPasswordPage() {
    const [step, setStep] = React.useState<Step>(Step.EMAIL)
    const [isLoading, setIsLoading] = React.useState(false)

    // Simulation handlers (same as before)
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStep(Step.OTP)
        }, 1500)
    }

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStep(Step.NEW_PASSWORD)
        }, 1500)
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStep(Step.SUCCESS)
        }, 1500)
    }

    return (
        <Card className="border-muted shadow-lg transition-all hover:shadow-xl dark:border-muted/50 dark:bg-card/50 w-full max-w-[400px]">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    {step === Step.EMAIL && "Reset Password"}
                    {step === Step.OTP && "Verify Identity"}
                    {step === Step.NEW_PASSWORD && "Set New Password"}
                    {step === Step.SUCCESS && "Password Reset!"}
                </CardTitle>
                <CardDescription>
                    {step === Step.EMAIL && "Enter your email to receive a secure code"}
                    {step === Step.OTP && "Enter the 6-digit code sent to your email"}
                    {step === Step.NEW_PASSWORD && "Choose a strong password for your account"}
                    {step === Step.SUCCESS && "Your password has been successfully updated"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {step === Step.EMAIL && (
                    <form onSubmit={handleEmailSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="email" placeholder="name@example.com" type="email" required className="pl-9" />
                            </div>
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Code
                        </Button>
                    </form>
                )}

                {step === Step.OTP && (
                    <form onSubmit={handleOtpSubmit} className="grid gap-4">
                        <div className="flex justify-center my-4 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="w-10 h-10 border rounded-md bg-muted/50 animate-pulse" />
                            ))}
                        </div>
                        {/* Note: This is a placeholder visual for OTP inputs */}
                        <div className="grid gap-2">
                            <Label htmlFor="otp" className="sr-only">One-Time Password</Label>
                            <Input
                                id="otp"
                                placeholder="123456"
                                type="text"
                                maxLength={6}
                                className="text-center text-lg tracking-[0.5em] font-mono h-12"
                                required
                                autoFocus
                            />
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Verify Code
                        </Button>
                        <div className="text-center text-sm">
                            <button type="button" className="text-primary hover:underline font-medium" onClick={() => setStep(Step.EMAIL)} disabled={isLoading}>
                                Resend Code
                            </button>
                        </div>
                    </form>
                )}

                {step === Step.NEW_PASSWORD && (
                    <form onSubmit={handlePasswordSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" required placeholder="••••••••" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" required placeholder="••••••••" />
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </form>
                )}

                {step === Step.SUCCESS && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <Link href="/signin" className="w-full">
                            <Button className="w-full" variant="default">Back to Sign In</Button>
                        </Link>
                    </div>
                )}
            </CardContent>

            {step !== Step.SUCCESS && (
                <CardFooter className="flex justify-center border-t py-4">
                    <Link
                        href="/signin"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Sign In
                    </Link>
                </CardFooter>
            )}
        </Card>
    )
}
