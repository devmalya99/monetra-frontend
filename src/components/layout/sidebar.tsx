'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, User, LogOut, ShieldCheck } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/user-store';
import api from '@/lib/axios';

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-emerald-500',
    },
    {
        label: 'Profile',
        icon: User,
        href: '/profile',
        color: 'text-violet-500',
    },
];

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { clearUser } = useUserStore();

    const handleLogout = async () => {
        try {
            await api.post('/user/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            clearUser();
            router.push('/');
        }
    };

    return (
        <div className={cn("space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white overflow-y-auto", className)}>
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14 hover:opacity-80 transition-opacity">
                    <div className="relative h-8 w-8 mr-4">
                        <ShieldCheck className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                        Monetra
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200',
                                pathname === route.href ? 'text-white bg-white/10 shadow-lg shadow-emerald-500/10' : 'text-zinc-400',
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2 border-t border-white/5">
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
