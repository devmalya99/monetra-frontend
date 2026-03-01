"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import axiosInstance from "@/lib/axios"
import { customToast } from "@/lib/toast"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [isSuccess, setIsSuccess] = React.useState(false)

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            customToast.error("Please enter a valid email address.")
            return;
        }

        setIsLoading(true)

        try {
            const response = await axiosInstance.post('/user/request-password-reset', { email })

            if (response.data.status === 'success') {
                setIsSuccess(true)
                customToast.success("Password reset link has been sent to your email.")
            }
        } catch (error: any) {
            console.error("Forgot password error:", error)
            const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again."
            customToast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="border-muted shadow-lg transition-all hover:shadow-xl dark:border-muted/50 dark:bg-card/50 w-full max-w-[400px]">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    {isSuccess ? "Check your email" : "Reset Password"}
                </CardTitle>
                <CardDescription>
                    {isSuccess
                        ? `We've sent a password reset link to ${email}. Please check your inbox and click the link to reset your password.`
                        : "Enter your email to receive a password reset link"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {!isSuccess ? (
                    <form onSubmit={handleEmailSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    required
                                    className="pl-9"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Reset Link
                        </Button>
                    </form>
                ) : (
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

            {!isSuccess && (
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
