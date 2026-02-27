'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Bell, Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PremiumFeatureDialog } from '@/components/shared/premium-feature-dialog';
import { cn } from '@/lib/utils';

const routes = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Investments', href: '/investments' },
    { label: 'Settings', href: '/settings' },
];

export function AppHeader() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mr-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 font-bold">
                        <ShieldCheck className="h-5 w-5 fill-emerald-500 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-800">Monetra</span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex flex-1 items-center gap-2 h-full">
                    {routes.map((route) => {
                        const isActive = pathname === route.href || pathname.startsWith(route.href + '/');
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "relative h-full px-4 flex items-center text-sm font-medium transition-colors",
                                    isActive ? "text-emerald-500" : "text-slate-500 hover:text-slate-800"
                                )}
                            >
                                {route.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-400 rounded-t-lg" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side actions */}
                <div className="flex items-center gap-6">
                    <div className="relative hidden lg:flex items-center">
                        <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                        <Input
                            placeholder={pathname.includes('/analytics') ? "Search data..." : pathname.includes('/investments') ? "Search stocks, mutual funds..." : "Search settings..."}
                            className="w-[280px] bg-slate-50 border-0 focus-visible:ring-emerald-500 pl-9 font-medium text-sm placeholder:text-slate-400 h-10 rounded-lg"
                        />
                    </div>

                    <PremiumFeatureDialog />

                    <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="flex items-center gap-3 cursor-pointer pl-2 border-l border-slate-100">
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-orange-100 bg-orange-50 flex items-center justify-center">
                            <img src="https://i.pravatar.cc/150?u=johndoe" alt="John Doe" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 hidden sm:block">John Doe</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
