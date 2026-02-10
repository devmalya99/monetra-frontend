'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Sidebar } from '@/components/layout/sidebar';

export function Navbar() {
    return (
        <div className="flex items-center p-4 md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 border-r border-gray-800 bg-[#111827] text-white w-72">
                    <SheetTitle className="sr-only">Mobile Sidebar</SheetTitle>
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    );
}
