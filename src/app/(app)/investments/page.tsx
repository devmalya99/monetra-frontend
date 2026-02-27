'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus, TrendingUp, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InvestmentsPage() {
    useEffect(() => {
        console.log('🌟 [STEP: UI Update] -> Loaded Beautiful Premium Investments Dashboard Design!');
    }, []);

    const portfolioValue = 1248250.00;

    // Format currency to INR format
    const formatINR = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        }).format(value);
    };

    const holdings = [
        {
            id: 1,
            symbol: 'RE',
            name: 'Reliance Industries',
            details: '42 Shares • Stocks',
            color: 'bg-blue-50 text-blue-600',
            value: 124800.00,
            return: 18450,
            returnPct: 14.2,
            change: 1.2,
            isPositiveChange: true
        },
        {
            id: 2,
            symbol: 'HDFC',
            name: 'HDFC Midcap Index Fund',
            details: '124.5 Units • Mutual Fund',
            color: 'bg-emerald-50 text-emerald-600',
            value: 84200.00,
            return: 12100,
            returnPct: 16.8,
            change: 0.8,
            isPositiveChange: true
        },
        {
            id: 3,
            symbol: 'SGB',
            name: 'Sovereign Gold Bonds',
            details: '10 Grams • Gold',
            color: 'bg-amber-50 text-amber-600',
            value: 72500.00,
            return: 4300,
            returnPct: 6.3,
            change: -0.2,
            isPositiveChange: false
        },
        {
            id: 4,
            symbol: 'TA',
            name: 'Tata Motors',
            details: '85 Shares • Stocks',
            color: 'bg-purple-50 text-purple-600',
            value: 62150.00,
            return: 8400,
            returnPct: 15.6,
            change: 2.4,
            isPositiveChange: true
        }
    ];

    const marketTrends = [
        { name: 'Nifty 50', type: 'INDEX', value: '24,312.45', change: '+1.02%', isPositive: true },
        { name: 'Sensex', type: 'INDEX', value: '79,845.12', change: '+0.88%', isPositive: true },
        { name: 'Gold (24K)', type: 'COMMODITY', value: '7,450.00/g', change: '-0.15%', isPositive: false },
        { name: 'USD/INR', type: 'CURRENCY', value: '83.92', change: '+0.04%', isPositive: true },
    ];

    return (
        <div className="relative min-h-[calc(100vh-64px)] bg-[#f8fafc] text-slate-800 pb-20">
            <div className="max-w-[1400px] mx-auto p-6 lg:p-8 space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h3 className="text-[13px] font-bold tracking-widest text-slate-400 uppercase mb-3">Portfolio Value</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl sm:text-[44px] font-bold text-slate-800 leading-none tracking-tight">
                                {formatINR(portfolioValue).replace('.00', '')}
                                <span className="text-slate-400 text-3xl">.00</span>
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold bg-emerald-50 text-emerald-600">
                                <TrendingUp className="w-4 h-4 mr-1 stroke-[3]" />
                                +18.4%
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold h-11 px-5 rounded-xl shadow-sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button className="bg-[#00d79d] hover:bg-[#00c58e] text-white font-bold h-11 px-6 rounded-xl shadow-sm shadow-[#00d79d]/20 transition-all hover:shadow-md hover:shadow-[#00d79d]/20 border-0">
                            <Plus className="w-5 h-5 mr-1" />
                            Invest More
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Asset Allocation */}
                        <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-slate-800 mb-8">Asset Allocation</h2>
                            <div className="flex flex-col sm:flex-row items-center gap-10">
                                {/* Simulated Donut Chart */}
                                <div className="relative w-48 h-48 rounded-full border-[20px] border-slate-100 shrink-0 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-[20px] border-emerald-400 border-t-emerald-400 border-r-emerald-400 border-b-transparent border-l-transparent -rotate-45"></div>
                                    <div className="absolute inset-0 rounded-full border-[20px] border-indigo-400 border-t-transparent border-r-transparent border-b-indigo-400 border-l-transparent rotate-12"></div>
                                    <div className="absolute inset-0 rounded-full border-[20px] border-amber-400 border-t-transparent border-r-transparent border-b-transparent border-l-amber-400 -rotate-[60deg]"></div>
                                    <div className="text-center">
                                        <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Diverse</div>
                                        <div className="text-lg font-bold text-slate-800">Balanced</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1 w-full">
                                    <div>
                                        <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">Stocks</h3>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-lg font-bold text-slate-800">₹5,61,712</span>
                                            <span className="text-xs font-semibold text-slate-400">(45%)</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">Mutual Funds</h3>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-lg font-bold text-slate-800">₹3,74,475</span>
                                            <span className="text-xs font-semibold text-slate-400">(30%)</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">Gold & Commodities</h3>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-lg font-bold text-slate-800">₹1,87,237</span>
                                            <span className="text-xs font-semibold text-slate-400">(15%)</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">Cash / Liquid</h3>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-lg font-bold text-slate-800">₹1,24,825</span>
                                            <span className="text-xs font-semibold text-slate-400">(10%)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* My Holdings */}
                        <div>
                            <div className="flex items-center justify-between mb-4 px-1">
                                <h2 className="text-xl font-bold text-slate-800">My Holdings</h2>
                                <div className="flex bg-slate-100/80 p-1 rounded-full">
                                    <button className="px-5 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors">Equity</button>
                                    <button className="px-5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 shadow-xs">All Assets</button>
                                </div>
                            </div>

                            <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Investment Name</th>
                                                <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Current Value</th>
                                                <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Total Return</th>
                                                <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase text-right">1D Change</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {holdings.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-5 flex items-center gap-4">
                                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold tracking-wide", item.color)}>
                                                            {item.symbol}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[14px] text-slate-800 mb-0.5">{item.name}</div>
                                                            <div className="text-xs font-medium text-slate-400">{item.details}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="font-bold text-[14px] text-slate-800">
                                                            {formatINR(item.value)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="font-bold text-[14px] text-emerald-500 mb-0.5">
                                                            +{formatINR(item.return)}
                                                        </div>
                                                        <div className="text-[11px] font-bold text-emerald-500/80">
                                                            +{item.returnPct}%
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <span className={cn(
                                                            "inline-block px-2.5 py-1 rounded text-xs font-bold",
                                                            item.isPositiveChange ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                                        )}>
                                                            {item.change > 0 ? '+' : ''}{item.change}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 border-t border-slate-50 text-center">
                                    <button className="text-[13px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors">
                                        View All 18 Holdings
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Market Trends */}
                        <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-8">
                                <TrendingUp className="w-5 h-5 text-emerald-500 stroke-[3]" />
                                <h2 className="text-lg font-bold text-slate-800">Market Trends</h2>
                            </div>

                            <div className="space-y-6 pb-8 border-b border-slate-100">
                                {marketTrends.map((trend, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-[14px] text-slate-800 mb-0.5">{trend.name}</div>
                                            <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{trend.type}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-[14px] text-slate-800 mb-0.5">{trend.value}</div>
                                            <div className={cn(
                                                "text-xs font-bold",
                                                trend.isPositive ? "text-emerald-500" : "text-rose-500"
                                            )}>
                                                {trend.change}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-5">Market News</h3>
                                <div className="space-y-5">
                                    <div>
                                        <h4 className="text-[13px] font-bold text-slate-800 leading-snug mb-1">RBI keeps repo rate unchanged at 6.5%, focus on inflation.</h4>
                                        <div className="text-[11px] font-medium text-slate-400">2 hours ago • Financial Express</div>
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-bold text-slate-800 leading-snug mb-1">IT sector expected to see rebound in Q3 earnings.</h4>
                                        <div className="text-[11px] font-medium text-slate-400">5 hours ago • Moneycontrol</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Portfolio Health */}
                        <Card className="bg-[#eafbf5] border-0 shadow-none rounded-2xl p-6 relative overflow-hidden">
                            <div className="flex items-start gap-4 mb-5 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="pt-0.5">
                                    <h3 className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase mb-0.5">Portfolio Health</h3>
                                    <div className="text-base font-bold text-slate-800">Very Good</div>
                                </div>
                            </div>

                            <div className="w-full h-2 bg-emerald-200/50 rounded-full mb-4 relative z-10">
                                <div className="w-[85%] h-full bg-emerald-500 rounded-full"></div>
                            </div>

                            <p className="text-xs font-medium text-slate-600 relative z-10">
                                Your portfolio is well-diversified across 4 asset classes.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 pb-8 border-t border-slate-200 pt-8 max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="w-5 h-5 rounded bg-slate-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-sm bg-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-400">Monetra</span>
                </div>

                <div className="flex items-center gap-6 md:gap-8">
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Help Center</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Security</a>
                </div>

                <div className="text-xs font-semibold text-slate-400 opacity-60">
                    © 2023 Monetra FinTech India.
                </div>
            </footer>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button className="w-14 h-14 rounded-full bg-[#00d79d] hover:bg-[#00c58e] text-white shadow-lg shadow-[#00d79d]/30 border-0 p-0 flex items-center justify-center transition-transform hover:scale-105">
                    <Plus className="w-6 h-6" />
                </Button>
            </div>
        </div>
    );
}
