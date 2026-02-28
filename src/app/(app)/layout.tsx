import { AppHeader } from '@/components/layout/app-header';
import { UserDataFetcher } from '@/components/layout/user-data-fetcher';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            <UserDataFetcher />
            <AppHeader />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
}
