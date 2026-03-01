import { toast, ToastOptions } from 'react-hot-toast';

export const customToast = {
    success: (message: string, options?: ToastOptions) => {
        return toast.success(message, {
            style: {
                background: '#10b981', // emerald-500
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '600',
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
            },
            ...options,
        });
    },
    error: (message: string, options?: ToastOptions) => {
        return toast.error(message, {
            style: {
                background: '#f43f5e', // rose-500
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '600',
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#f43f5e',
            },
            ...options,
        });
    },
    loading: (message: string, options?: ToastOptions) => {
        return toast.loading(message, {
            style: {
                background: '#334155', // slate-700
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '600',
            },
            ...options,
        });
    },
    dismiss: toast.dismiss,
};
