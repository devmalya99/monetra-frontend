'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useUserStore } from '@/store/user-store';
import { Loader2 } from 'lucide-react';

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Verify valid session on every hard refresh/mount
                const { data } = await api.get('/user/me');
                if (data) {
                    setUser(data);
                }
            } catch (error) {
                // Session invalid or expired - just stop loading
                console.log('Not authenticated');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [setUser]);

    // Show loading spinner while checking auth status
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
