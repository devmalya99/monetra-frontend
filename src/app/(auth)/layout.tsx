import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Twitter } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 lg:p-8">
            <Link
                href="/"
                className="mb-8 flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <ShieldCheck className="h-5 w-5" />
                </div>
                Monetra
            </Link>
            <div className="w-full max-w-sm space-y-6 sm:w-[350px]">
                {children}
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{' '}
                    <Link
                        href="/terms"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
