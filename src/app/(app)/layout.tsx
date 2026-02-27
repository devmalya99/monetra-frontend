import { AppHeader } from '@/components/layout/app-header';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            <AppHeader />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
}
