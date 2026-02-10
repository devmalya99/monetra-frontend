import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Activity, TrendingUp } from "lucide-react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 bg-gray-900 min-h-screen text-white">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                    Dashboard
                </h2>
                <AddExpenseDialog />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Total Balance
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$45,231.89</div>
                        <p className="text-xs text-gray-400">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Income
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-cyan-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$5,300.00</div>
                        <p className="text-xs text-gray-400">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Expenses
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$2,100.00</div>
                        <p className="text-xs text-gray-400">
                            -4% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Active Budgets
                        </CardTitle>
                        <Activity className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">4</div>
                        <p className="text-xs text-gray-400">
                            2 nearing limit
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-gray-400">
                            Chart Placeholder (Recharts implementation coming soon)
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Sales</CardTitle>
                        <p className="text-sm text-gray-400">
                            You made 265 sales this month.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Mock Data List */}
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">Grocery Run</p>
                                    <p className="text-sm text-gray-400">Wallmart</p>
                                </div>
                                <div className="ml-auto font-medium text-white">-$120.00</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">Salary</p>
                                    <p className="text-sm text-gray-400">Direct Deposit</p>
                                </div>
                                <div className="ml-auto font-medium text-emerald-500">+$3,500.00</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
