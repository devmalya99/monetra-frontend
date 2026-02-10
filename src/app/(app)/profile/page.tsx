'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
    return (
        <div className="p-8 space-y-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold tracking-tight text-white">Profile Settings</h2>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Personal Information</CardTitle>
                        <CardDescription className="text-gray-400">Update your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-200">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-200">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 234 567 890"
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Changes</Button>
                    </CardFooter>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Financial Goals</CardTitle>
                        <CardDescription className="text-gray-400">Set your financial targets.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currency" className="text-gray-200">
                                Preferred Currency
                            </Label>
                            <Input
                                id="currency"
                                placeholder="USD ($)"
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="monthly_limit" className="text-gray-200">
                                Monthly Spending Limit
                            </Label>
                            <Input
                                id="monthly_limit"
                                type="number"
                                placeholder="5000"
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="savings_goal" className="text-gray-200">
                                Annual Savings Goal
                            </Label>
                            <Input
                                id="savings_goal"
                                type="number"
                                placeholder="10000"
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Update Goals</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
