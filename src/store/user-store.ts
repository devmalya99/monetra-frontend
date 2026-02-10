
import { create } from 'zustand';

interface User {
    id: string; // Or number
    email: string;
    // Add other fields from your user model
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null, // Initial state, will be hydrated on client mount
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
}));
