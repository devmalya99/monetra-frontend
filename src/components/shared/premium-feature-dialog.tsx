'use client';

import { useState } from 'react';
import { Star, Zap, Shield, Crown, Sparkles, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PremiumFeatureDialogProps {
    children?: React.ReactNode;
    triggerClassName?: string;
}

const features = [
    {
        title: "AI Predictive Analytics",
        description: "Get smart forecasting and insights on your daily spending habits.",
        icon: <Sparkles className="w-5 h-5 text-indigo-500" />
    },
    {
        title: "Live Bank Sync",
        description: "Automatically connect and sync transactions from over 10,000+ global banks.",
        icon: <Zap className="w-5 h-5 text-amber-500" />
    },
    {
        title: "Advanced Investments Dashboard",
        description: "Real-time stock and mutual fund tracking with detailed asset allocation.",
        icon: <TrendingUp className="w-5 h-5 text-emerald-500" />
    },
    {
        title: "Bank-Grade Security",
        description: "256-bit encryption ensuring your financial data is completely protected.",
        icon: <Shield className="w-5 h-5 text-rose-500" />
    }
];

export function PremiumFeatureDialog({ children, triggerClassName }: PremiumFeatureDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? (
                    <div className={cn("cursor-pointer", triggerClassName)}>
                        {children}
                    </div>
                ) : (
                    <div className={cn("hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-indigo-600 text-xs font-bold cursor-pointer hover:bg-indigo-50 transition-colors", triggerClassName)}>
                        <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                            <Star className="w-2.5 h-2.5 fill-white" />
                        </div>
                        Premium
                    </div>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl">
                {/* Header Area */}
                <DialogHeader className="m-0 p-0 text-left">
                    <div className="relative overflow-hidden bg-indigo-600 px-6 py-10 text-center">
                        {/* Background elements */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm shadow-indigo-900/20">
                                <Crown className="w-8 h-8 text-amber-300" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-white mb-2 text-center">
                                Upgrade to Monetra Premium
                            </DialogTitle>
                            <DialogDescription className="text-indigo-100 font-medium text-sm max-w-xs mx-auto text-center">
                                Unlock the ultimate financial suite to take complete control of your wealth.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Features List */}
                <div className="p-6 md:p-8 bg-slate-50/50">
                    <div className="space-y-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 mb-1">{feature.title}</h4>
                                    <p className="text-xs font-medium text-slate-500 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Area */}
                    <div className="mt-8 space-y-3">
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-md shadow-indigo-600/20 rounded-xl"
                            onClick={() => setOpen(false)}
                        >
                            Get Premium for $9.99/mo
                        </Button>
                        <div className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Cancel anytime. No hidden fees.
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
