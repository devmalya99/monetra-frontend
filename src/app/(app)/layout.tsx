import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative min-h-screen bg-gray-900">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900 border-r border-gray-800">
                <Sidebar className="h-full bg-gray-900 border-r border-gray-800" />
            </div>
            <main className="md:pl-72 min-h-screen flex flex-col">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
