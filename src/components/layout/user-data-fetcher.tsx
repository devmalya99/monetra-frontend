'use client';

import { useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { useUserStore } from '@/store/user-store';

export function UserDataFetcher() {
    const { setUserData } = useUserStore();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/premium/user-data');
                if (response.data?.status === 'success') {
                    const { user, membership } = response.data.data;
                    if (user) {
                        setUserData(user, membership || null);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData();
    }, [setUserData]);

    return null; // This component strictly handles fetching and hydration
}
