'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Shield, Bell, Award, Zap, Check, ChevronDown, UserCircle, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/user-store';
import Link from 'next/link';

export default function SettingsPage() {
    const { user, membership } = useUserStore();

    useEffect(() => {
        console.log('🌟 [STEP: UI Update] -> Loaded Beautiful Premium Settings Design!');
    }, []);

    const sidebarItems = [
        { icon: User, label: 'Profile', active: true },
        { icon: UserCircle, label: 'Account', active: false },
        { icon: Shield, label: 'Security', active: false },
        { icon: Bell, label: 'Notifications', active: false },
        { icon: Award, label: 'Subscription', active: false },
    ];

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] text-slate-800 pb-20">
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
                    <p className="text-slate-500 font-medium">Manage your account preferences and subscription details.</p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Left Sidebar */}
                    <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden h-fit p-3">
                        <nav className="flex flex-col gap-1">
                            {sidebarItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all text-left",
                                        item.active
                                            ? "bg-emerald-50 text-emerald-600 relative overflow-hidden"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                    )}
                                >
                                    {item.active && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                                    )}
                                    <item.icon className={cn("w-5 h-5", item.active ? "text-emerald-500" : "text-slate-400")} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </Card>

                    {/* Right Content */}
                    <div className="space-y-6">
                        {/* Profile Settings */}
                        <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-800 mb-1">Profile Settings</h2>
                                <p className="text-sm text-slate-400 font-medium">Update your personal information and how it&apos;s displayed.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-slate-700">Full Name</Label>
                                    <Input
                                        defaultValue={user?.fullName || ""}
                                        placeholder="Enter your full name"
                                        className="bg-white border-slate-200 focus-visible:ring-emerald-500 text-sm font-medium h-11 rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-slate-700">Email Address</Label>
                                    <Input
                                        defaultValue={user?.email || ""}
                                        disabled
                                        className="bg-slate-50 border-slate-200 text-slate-500 focus-visible:ring-emerald-500 text-sm font-medium h-11 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2 relative">
                                    <Label className="text-sm font-bold text-slate-700">Currency Preference</Label>
                                    <div className="relative">
                                        <select className="appearance-none w-full bg-white border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-700 text-sm font-medium h-11 rounded-lg px-3 pr-10">
                                            <option>INR - Indian Rupee (₹)</option>
                                            <option>USD - US Dollar ($)</option>
                                            <option>EUR - Euro (€)</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2 relative">
                                    <Label className="text-sm font-bold text-slate-700">Timezone</Label>
                                    <div className="relative">
                                        <select className="appearance-none w-full bg-white border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-700 text-sm font-medium h-11 rounded-lg px-3 pr-10">
                                            <option>(GMT+05:30) India Standard Time</option>
                                            <option>(GMT+00:00) Universal Time Coordinated</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button className="bg-[#12b981] hover:bg-[#10a371] text-white font-semibold rounded-lg px-6 h-11 shadow-sm shadow-[#12b981]/20 transition-all hover:shadow-md hover:shadow-[#12b981]/20">
                                    Save Changes
                                </Button>
                            </div>
                        </Card>

                        {/* Current Plan */}
                        <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", membership ? "bg-amber-50" : "bg-indigo-50")}>
                                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white relative", membership ? "bg-amber-500" : "bg-indigo-500")}>
                                            {membership ? <Crown className="w-5 h-5 text-white" /> : <Award className="w-5 h-5 text-white" />}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-bold text-slate-800">
                                                Current Plan: {membership ? membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1) : 'Free'}
                                            </h3>
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                                membership ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
                                            )}>
                                                {membership ? "Active" : "Default"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">
                                            {membership ? `Thank you for being a premium member. Valid for ${membership.tenure}.` : "You are currently using the limited free version of Monetra."}
                                        </p>
                                    </div>
                                </div>
                                {!membership && (
                                    <Link href="/premium-membership">
                                        <Button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold border-0 shadow-none h-11 px-6 rounded-lg whitespace-nowrap transition-colors">
                                            <Zap className="w-4 h-4 mr-2 fill-indigo-600" />
                                            Upgrade to Premium
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            <div className="pt-6">
                                <h4 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                                    {membership ? "Your plan includes" : "Premium Benefits"}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-emerald-600 stroke-3" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600">Smart Budgeting & Analytics</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-emerald-600 stroke-3" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600">Priority Financial Metrics</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-emerald-600 stroke-3" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600">Advanced Portfolios</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Preferences */}
                        <div className="space-y-4">
                            <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-row items-center justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-slate-800 mb-1">Dark Mode</h3>
                                    <p className="text-sm text-slate-500 font-medium">Switch between light and dark themes.</p>
                                </div>
                                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer flex items-center p-1 transition-colors">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                                </div>
                            </Card>

                            <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-row items-center justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-slate-800 mb-1">Marketing Emails</h3>
                                    <p className="text-sm text-slate-500 font-medium">Receive news and offers about our products.</p>
                                </div>
                                <div className="w-12 h-6 bg-emerald-400 rounded-full relative cursor-pointer flex items-center p-1 transition-colors justify-end">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            {/* No footer here to prevent duplication if Layout handles it globally instead. If Layout does not, keeping it. */}
        </div>
    );
}
