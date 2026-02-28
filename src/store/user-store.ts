import { create } from 'zustand';

export interface User {
    id: string;
    email: string;
    fullName: string | null;
    phoneNumber: string | null;
    isVerified: boolean;
    mfaEnabled: boolean;
    lastLoginAt: string | null;
    role: string;
    city: string | null;
    countryCode: string | null;
    currencyCode: string;
    timezone: string | null;
    profileImgUrl: string | null;
    bio: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface Membership {
    id: string;
    tier: string;
    price: string;
    tenure: string;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    user: User | null;
    membership: Membership | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    setMembership: (membership: Membership | null) => void;
    setUserData: (user: User, membership: Membership | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    membership: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    setMembership: (membership) => set({ membership }),
    setUserData: (user, membership) => set({ user, membership, isAuthenticated: true }),
    clearUser: () => set({ user: null, membership: null, isAuthenticated: false }),
}));
