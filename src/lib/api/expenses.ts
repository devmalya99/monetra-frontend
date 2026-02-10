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
    amount: string;
    category: string;
    date: string;
}

interface ApiResponse<T> {
    status: string;
    results: number;
    data: T;
}

interface ExpensesData {
    expenses: Expense[];
}

export const expensesApi = {
    getAll: async (): Promise<Expense[]> => {
        const response = await api.get<ApiResponse<ExpensesData>>('/user/my-expenses');

        // Centralize response parsing logic
        if (response.data.status === 'success' && response.data.data && Array.isArray(response.data.data.expenses)) {
            return response.data.data.expenses;
        }

        console.warn('Unexpected API response structure:', response.data);
        return [];
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/user/delete-expense/${id}`);
    },

    add: async (payload: AddExpensePayload): Promise<void> => {
        await api.post('/user/add-expense', payload);
    }
};
