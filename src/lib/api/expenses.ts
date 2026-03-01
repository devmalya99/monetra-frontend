import api from '@/lib/axios';

export interface Expense {
    id: string;
    userId: string;
    title: string;
    amount: string;
    category: string;
    date: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AddExpensePayload {
    title: string;
    amount: string | number;
    category: string;
    date: string;
}

export interface UpdateExpensePayload {
    title: string;
    amount: number;
    category: string;
    date: string;
}

interface ApiResponse<T> {
    status: string;
    results: number;
    data: T;
}

interface ExpensesData {
    totalExpense?: number;
    expenses: Expense[];
}

export const expensesApi = {
    getAll: async (): Promise<{ expenses: Expense[], totalExpense: number }> => {
        const response = await api.get<ApiResponse<ExpensesData>>('/user/my-expenses');

        // Centralize response parsing logic
        if (response.data.status === 'success' && response.data.data && Array.isArray(response.data.data.expenses)) {
            return {
                expenses: response.data.data.expenses,
                totalExpense: response.data.data.totalExpense || 0
            };
        }

        console.warn('Unexpected API response structure:', response.data);
        return { expenses: [], totalExpense: 0 };
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/user/delete-expense/${id}`);
    },

    add: async (payload: AddExpensePayload): Promise<void> => {
        await api.post('/user/add-expense', payload);
    },

    update: async (id: string, payload: UpdateExpensePayload): Promise<void> => {
        await api.patch(`/user/update-expense/${id}`, payload);
    },

    updateBalance: async (payload: { amount: number }): Promise<void> => {
        await api.post('/user/update-balance', payload);
    },

    getMonthlyBalance: async (): Promise<{ allocatedBalance: number }> => {
        try {
            const response = await api.get('/user/monthly-balance');
            return { allocatedBalance: response.data?.data?.allocatedBalance || 0 };
        } catch (error) {
            console.warn('Failed to fetch monthly balance:', error);
            return { allocatedBalance: 0 };
        }
    },

    getTopCategories: async (limit: number = 3): Promise<Array<{ category: string; totalAmount: number }>> => {
        try {
            const response = await api.get(`/user/top-categories?limit=${limit}`);
            return response.data?.data?.topCategories || [];
        } catch (error) {
            console.warn('Failed to fetch top categories:', error);
            return [];
        }
    }
};
