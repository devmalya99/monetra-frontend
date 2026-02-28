'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, Crown, Check, X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axiosInstance from '@/lib/axios';
import { load } from "@cashfreepayments/cashfree-js";


interface PremiumFeatureDialogProps {
    children?: React.ReactNode;
    triggerClassName?: string;
}

interface Membership {
    id: string;
    tier: string;
    price: string;
    tenure: string;
    createdAt: string;
    updatedAt: string;
}

interface Plan {
    id: string;
    tier: string;
    name: string;
    price: string;
    tenure: string;
    description: string;
    isPopular?: boolean;
}

const planConfig: Record<string, { name: string, description: string, isPopular?: boolean }> = {
    "pro": { name: "Pro", description: "Essential tools for personal finance management." },
    "ultra": { name: "Ultra", description: "Advanced investments and live bank sync functionality.", isPopular: true },
    "max": { name: "Max", description: "Ultimate financial mastery with premium AI & support." }
};

const featureComparison = [
    { feature: "Smart Budgeting & Analytics", pro: true, ultra: true, max: true },
    { feature: "Goal Tracking", pro: true, ultra: true, max: true },
    { feature: "Bank-Grade Security (256-bit)", pro: true, ultra: true, max: true },
    { feature: "Live Bank Sync (10k+ banks)", pro: false, ultra: true, max: true },
    { feature: "Advanced Investments Dashboard", pro: false, ultra: true, max: true },
    { feature: "Priority 24/7 Support", pro: false, ultra: false, max: true },
    { feature: "AI Predictive Analytics", pro: false, ultra: false, max: true },
];

export function PremiumFeatureDialog({ children, triggerClassName }: PremiumFeatureDialogProps) {
    const [open, setOpen] = useState(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(false);
    const [verifyingId, setVerifyingId] = useState<string | null>(null);



    const cashfreeRef = useRef<any>(null);

    useEffect(() => {
        const init = async () => {
            try {
                // Load once on mount and store in ref
                // Use production mode to align with backend production keys
                cashfreeRef.current = await load({ mode: "production" });
            } catch (e) {
                console.error("SDK Initialization failed", e);
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (open && plans.length === 0) {
            const fetchMemberships = async () => {
                console.log("🚀 [PremiumFeatureDialog] Step 1: Initiating fetch for premium memberships...");
                setLoading(true);
                try {
                    const response = await axiosInstance.get('/premium/memberships');
                    console.log("✅ [PremiumFeatureDialog] Step 2: Successfully fetched memberships:", response.data);

                    if (response.data.status === 'success') {
                        const fetchedMemberships: Membership[] = response.data.data.memberships;
                        const mappedPlans = fetchedMemberships.map((m) => {
                            const tierKey = m.tier.toLowerCase();
                            const config = planConfig[tierKey] || { name: m.tier, description: "Premium Membership" };
                            return {
                                id: m.id,
                                tier: tierKey,
                                name: config.name,
                                price: m.price,
                                tenure: m.tenure,
                                description: config.description,
                                isPopular: config.isPopular
                            };
                        });

                        console.log("✨ [PremiumFeatureDialog] Step 3: Mapped plans configuration successfully");

                        // Sort matching the desired order pro -> ultra -> max
                        const order = ['pro', 'ultra', 'max'];
                        mappedPlans.sort((a, b) => {
                            const iA = order.indexOf(a.tier);
                            const iB = order.indexOf(b.tier);
                            if (iA !== -1 && iB !== -1) return iA - iB;
                            if (iA !== -1) return -1;
                            if (iB !== -1) return 1;
                            return 0;
                        });

                        setPlans(mappedPlans);
                    }
                } catch (error) {
                    console.error("❌ [PremiumFeatureDialog] Error: Failed to fetch premium memberships", error);
                } finally {
                    setLoading(false);
                    console.log("🏁 [PremiumFeatureDialog] Step 4: Finished Premium Membership fetch process.");
                }
            };
            fetchMemberships();
        }
    }, [open, plans.length]);

    const handlePlanSelection = async (planId: string) => {
        // Ensure the SDK is ready before proceeding
        if (!cashfreeRef.current) {
            console.error("SDK not loaded");
            return;
        }

        try {
            setVerifyingId(planId);
            const response = await axiosInstance.post('/premium/verify-order', {
                membership_id: planId
            });

            // Use the persisted ref
            let checkoutOptions = {
                paymentSessionId: response.data.data.payment_session_id,
                redirectTarget: "_modal",  // opens as popup modal
            };

            // Handle the promise returned by checkout
            const result = await cashfreeRef.current.checkout(checkoutOptions);

            if (result.error) {
                console.log("Payment error", result.error);
            }
            if (result.paymentDetails) {
                console.log("Payment completed", result.paymentDetails.paymentMessage);
            }

            // Log the result to see if payment was completed or cancelled
            console.log("Payment Result:", result);
        } catch (error) {
            console.error("Verification failed", error);
        } finally {
            setVerifyingId(null);
        }
    };



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

            <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl flex flex-col md:h-auto max-h-[90vh]">
                {/* Header Area */}
                <DialogHeader className="m-0 p-0 text-left shrink-0">
                    <div className="relative overflow-hidden bg-indigo-600 px-6 py-8 text-center">
                        {/* Background elements */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mb-3 shadow-lg backdrop-blur-sm shadow-indigo-900/20">
                                <Crown className="w-7 h-7 text-amber-300" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-white mb-1 text-center">
                                Upgrade to Monetra Premium
                            </DialogTitle>
                            <DialogDescription className="text-indigo-100 font-medium text-sm max-w-sm mx-auto text-center">
                                Unlock the ultimate financial suite to take complete control of your wealth.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Features List & Pricing */}
                <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
                    <div className="p-6 md:p-8 bg-slate-50/50">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-16 space-y-4">
                                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                <p className="text-sm font-medium text-slate-500">Loading premium plans...</p>
                            </div>
                        ) : (
                            <>
                                {/* Plans Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
                                    {plans.map((plan) => (
                                        <div key={plan.tier} className={cn(
                                            "relative bg-white rounded-2xl p-6 border flex flex-col transition-transform duration-300 hover:-translate-y-1",
                                            plan.isPopular ? "border-indigo-500 shadow-indigo-100 shadow-xl md:scale-105 z-10" : "border-slate-200 shadow-sm"
                                        )}>
                                            {plan.isPopular && (
                                                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm whitespace-nowrap">
                                                    Most Popular
                                                </div>
                                            )}
                                            <h3 className="text-lg font-bold text-slate-800 mb-2">{plan.name}</h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-3xl font-extrabold text-slate-900">₹{plan.price}</span>
                                                <span className="text-sm font-medium text-slate-500">/{plan.tenure}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium mb-6 flex-1">
                                                {plan.description}
                                            </p>
                                            <Button
                                                onClick={() => handlePlanSelection(plan.id)}
                                                disabled={verifyingId === plan.id}
                                                className={cn(
                                                    "w-full font-bold shadow-md transition-all active:scale-95 flex items-center justify-center",
                                                    plan.isPopular ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20" : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50",
                                                    verifyingId === plan.id && "opacity-80 cursor-not-allowed"
                                                )}>
                                                {verifyingId === plan.id && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                                {verifyingId === plan.id ? "Verifying..." : `Choose ${plan.name}`}
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                {/* Detailed Comparison Table */}
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-sm font-bold text-slate-700">
                                        <div className="flex-1 px-2">Detailed Comparison</div>
                                        <div className="flex w-1/2 md:w-auto items-center">
                                            <div className="w-16 md:w-20 text-center font-bold text-slate-500">Pro</div>
                                            <div className="w-16 md:w-20 text-center font-bold text-indigo-600">Ultra</div>
                                            <div className="w-16 md:w-20 text-center font-bold text-slate-500">Max</div>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {featureComparison.map((f, i) => (
                                            <div key={i} className="p-4 flex justify-between items-center text-sm group hover:bg-slate-50/50 transition-colors">
                                                <div className="flex-1 text-slate-600 font-semibold px-2">{f.feature}</div>
                                                <div className="flex w-1/2 md:w-auto items-center">
                                                    <div className="w-16 md:w-20 flex justify-center">
                                                        {f.pro ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-slate-300" />}
                                                    </div>
                                                    <div className="w-16 md:w-20 flex justify-center">
                                                        {f.ultra ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-slate-300" />}
                                                    </div>
                                                    <div className="w-16 md:w-20 flex justify-center">
                                                        {f.max ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-slate-300" />}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-8">
                            Cancel anytime. Prices are inclusive of all taxes.
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
