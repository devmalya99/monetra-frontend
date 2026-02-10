
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/user-store';
import api from '@/lib/axios';
import { landingPageContent } from '@/data/landing-page';

export function Header() {
    const { isAuthenticated, clearUser } = useUserStore();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await api.post('/user/logout');
            clearUser();
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // Force local clear even if backend fails
            clearUser();
            router.push('/');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Monetra</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    {landingPageContent.footer.links.product.map((link) => (
                        <Link key={link.label} href={link.href} className="transition-colors hover:text-foreground">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <ModeToggle />

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">Dashboard</Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden sm:flex gap-2">
                            <Link href="/signin">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">Start Tracking</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
