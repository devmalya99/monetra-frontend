'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, HeartPulse, Banknote, PiggyBank, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
    useEffect(() => {
        console.log('🌟 [STEP: UI Update] -> Loaded Beautiful Premium Analytics Dashboard Design!');
    }, []);

    // Mock bar chart data logic
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const actualHeights = [40, 48, 55, 30, 60, 50, 62];
    const forecastHeights = [45, 52, 60, 35, 65, 55, 65];

    return (
        <div className="relative min-h-[calc(100vh-64px)] bg-[#f8fafc] text-slate-800 pb-20">
            <div className="max-w-[1400px] mx-auto p-6 lg:p-8 space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Advanced Analytics</h1>
                        <p className="text-sm text-slate-500 font-medium tracking-wide">Deep insights and AI-powered forecasting for your financial health.</p>
                    </div>

                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                        <button className="px-5 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">Weekly</button>
                        <button className="px-5 py-2 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 transition-colors shadow-xs">Monthly</button>
                        <button className="px-5 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">Yearly</button>
                    </div>
                </div>

                {/* Top Row Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Financial Health */}
                    <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Financial Health</h3>
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                <HeartPulse className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-slate-900">82</span>
                            <span className="text-sm font-bold text-slate-400">/100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full mb-3">
                            <div className="w-[82%] h-full bg-emerald-500 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-auto pt-2">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500 stroke-3" />
                            <span className="text-xs font-bold text-emerald-500">+5% from last month</span>
                        </div>
                    </Card>

                    {/* Monthly Spending */}
                    <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Monthly Spending</h3>
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <Banknote className="w-4 h-4 text-blue-600" />
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="text-4xl font-bold text-slate-900">$3,420</span>
                        </div>
                        <div className="text-xs font-medium text-slate-500 mb-5">
                            Predicted peak: $3,500
                        </div>
                        <div className="flex items-end gap-1 h-6 mt-auto">
                            {/* Dummy mini bar chart */}
                            <div className="w-full flex gap-1.5 opacity-60">
                                <div className="h-2 flex-1 bg-blue-100 rounded-full" />
                                <div className="h-3 flex-1 bg-blue-100 rounded-full" />
                                <div className="h-4 flex-1 bg-blue-100 rounded-full" />
                                <div className="h-6 flex-1 bg-blue-500 rounded-full" />
                                <div className="h-3 flex-1 bg-slate-100 rounded-full" />
                                <div className="h-2 flex-1 bg-slate-100 rounded-full" />
                            </div>
                        </div>
                    </Card>

                    {/* Savings Ratio */}
                    <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Savings Ratio</h3>
                            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                                <PiggyBank className="w-4 h-4 text-rose-500 fill-rose-500" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <span className="text-4xl font-bold text-slate-900">24%</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-auto pt-2 mb-6">
                            <TrendingUp className="w-3.5 h-3.5 text-rose-500 stroke-3" />
                            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">Improving trend</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 z-10" />
                            <div className="w-6 h-6 rounded-full bg-emerald-100 -ml-4 z-20" />
                            <div className="w-6 h-6 rounded-full bg-rose-100 -ml-4 z-30" />
                        </div>
                    </Card>
                </div>

                {/* Middle Row Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
                    {/* Spending Trends Chart */}
                    <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between">
                        <div className="w-full flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-[15px] font-bold text-slate-800 mb-1">Monthly Spending Trends</h2>
                                <p className="text-xs text-slate-400 font-medium">Comparison of actual vs. forecast spending</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Actual</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-100" />
                                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">AI Forecast</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="w-full h-48 flex items-end justify-between px-2 gap-2 sm:gap-6 relative z-10">
                            {days.map((day, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                                    <div className="w-full h-full absolute bottom-0 left-0 bg-slate-50 rounded-t-lg shadow-inner" style={{ height: `${forecastHeights[idx]}%` }} />
                                    <div className="w-full absolute bottom-0 left-0 bg-[#8dbdff] rounded-t-lg transition-all group-hover:bg-[#7bacfb]" style={{ height: `${actualHeights[idx]}%` }} />
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex justify-between mt-4 px-2 sm:px-6">
                            {days.map((day, idx) => (
                                <span key={idx} className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{day}</span>
                            ))}
                        </div>
                    </Card>

                    {/* Category Breakdown */}
                    <Card className="bg-white border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between">
                        <div className="w-full">
                            <h2 className="text-[15px] font-bold text-slate-800 mb-1">Category Breakdown</h2>
                            <p className="text-xs text-slate-400 font-medium">Where your funds go</p>
                        </div>

                        <div className="relative w-48 h-48 my-8 shrink-0 flex items-center justify-center">
                            {/* Simulated Donut Chart using CSS Borders */}
                            <div className="absolute inset-0 rounded-full border-[24px] border-slate-100" />
                            <div className="absolute inset-0 rounded-full border-[24px] border-blue-400 border-t-blue-400 border-r-blue-400 border-b-transparent border-l-transparent -rotate-12" />
                            <div className="absolute inset-0 rounded-full border-[24px] border-emerald-400 border-t-transparent border-r-emerald-400 border-b-emerald-400 border-l-transparent rotate-[70deg]" />
                            <div className="absolute inset-0 rounded-full border-[24px] border-rose-400 border-t-transparent border-r-transparent border-b-rose-400 border-l-rose-400 -rotate-45" />

                            <div className="text-center bg-white w-32 h-32 rounded-full absolute flex flex-col items-center justify-center shadow-xs">
                                <span className="text-2xl font-bold text-slate-800">$3.4k</span>
                                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Total</span>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                <div>
                                    <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Housing</div>
                                    <div className="text-sm font-bold text-slate-800">45%</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                <div>
                                    <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Groceries</div>
                                    <div className="text-sm font-bold text-slate-800">22%</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                <div>
                                    <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Leisure</div>
                                    <div className="text-sm font-bold text-slate-800">18%</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                <div>
                                    <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Others</div>
                                    <div className="text-sm font-bold text-slate-800">15%</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom Row Predictive */}
                <Card className="border-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-10 relative overflow-hidden bg-gradient-to-r from-white to-blue-50/30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                        <div className="space-y-6">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest bg-indigo-50 text-indigo-600 uppercase">
                                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                                AI Predictive Analysis
                            </span>

                            <h2 className="text-[28px] font-bold text-slate-900 leading-tight">
                                Next Month Expense Forecast
                            </h2>

                            <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
                                Based on your recurring subscriptions, historical dining habits, and utility fluctuations, we anticipate your spending to be <span className="font-bold text-indigo-600">$3,150</span> for September.
                            </p>

                            <div className="flex gap-4 pt-4">
                                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl flex-1">
                                    <h4 className="text-[10px] font-bold tracking-widest text-emerald-600/60 uppercase mb-1">Savings Potential</h4>
                                    <span className="text-xl font-bold text-emerald-600">$240.00</span>
                                </div>
                                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl flex-1">
                                    <h4 className="text-[10px] font-bold tracking-widest text-indigo-600/60 uppercase mb-1">Forecast Accuracy</h4>
                                    <span className="text-xl font-bold text-indigo-600">94.8%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center h-full">
                            <div className="w-full bg-[#5252e6] rounded-2xl p-6 shadow-xl relative overflow-hidden text-white">
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#6969eb] rounded-bl-3xl" />

                                <h3 className="text-[11px] font-bold tracking-widest text-indigo-200 uppercase mb-5">Pro Tip for September</h3>
                                <p className="text-lg font-medium leading-relaxed mb-6 relative z-10 text-white">
                                    &quot;Switching your home broadband to the annual plan would save you $12/month.&quot;
                                </p>

                                <Button className="w-full bg-white text-[#5252e6] hover:bg-slate-50 border-0 h-11 font-bold shadow-md rounded-xl">
                                    Apply Suggestion <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Footer */}
            <footer className="mt-8 pb-8 border-t border-slate-200 pt-8 max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="w-5 h-5 rounded bg-slate-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-sm bg-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-400">Monetra Premium</span>
                </div>

                <div className="flex items-center gap-6 md:gap-8">
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Data Security</a>
                    <a href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Contact Support</a>
                </div>

                <div className="text-xs font-semibold text-slate-400 opacity-60">
                    © 2023 Monetra AI. All financial data is encrypted.
                </div>
            </footer>
        </div>
    );
}
