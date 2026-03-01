'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldCheck, Bell, Search, Star, Crown, LogOut, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import axiosInstance from '@/lib/axios';
import { useUserStore } from '@/store/user-store';
import { customToast } from '@/lib/toast';

const routes = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Investments', href: '/investments' },
    { label: 'Settings', href: '/settings' },
];

export function AppHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, membership, clearUser } = useUserStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/user/logout');
            clearUser();
            customToast.success("You have been signed out");
            router.push('/signin');
        } catch (error) {
            console.error("Logout failed", error);
            customToast.error("Failed to sign out properly");
        }
    };

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

                    {membership ? (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-600 text-xs font-bold">
                            <div className="w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                <Crown className="w-2.5 h-2.5 text-white" />
                            </div>
                            {membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1)}
                        </div>
                    ) : (
                        <Link href="/premium-membership" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-indigo-600 text-xs font-bold cursor-pointer hover:bg-indigo-50 transition-colors">
                            <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                <Star className="w-2.5 h-2.5 fill-white" />
                            </div>
                            Premium
                        </Link>
                    )}

                    <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-3 cursor-pointer pl-2 border-l border-slate-100 hover:opacity-80 transition-opacity"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-100 bg-indigo-50 flex items-center justify-center">
                                {user?.profileImgUrl ? (
                                    <img src={user.profileImgUrl} alt={user.fullName || "User"} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-sm font-bold text-indigo-500">
                                        {user?.fullName ? user.fullName.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "U")}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-bold text-slate-800 hidden sm:block">
                                {user?.fullName || (user?.email && user.email.substring(0, 4)) || "User"}
                            </span>
                            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                        </div>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 transform origin-top-right transition-all">
                                <div className="p-2">
                                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                        Account
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 flex items-center gap-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
