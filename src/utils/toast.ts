import { toast } from 'sonner';

type ToastOptions = Parameters<typeof toast.success>[1];

export const notify = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, options),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, options),

  info: (message: string, options?: ToastOptions) =>
    toast(message, options),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, options),

  loading: (message: string, options?: ToastOptions) =>
    toast.loading(message, options),

  updateSuccess: (id: string | number, message: string) =>
    toast.success(message, { id }),

  updateError: (id: string | number, message: string) =>
    toast.error(message, { id }),

  dismiss: (id?: string | number) => toast.dismiss(id),

  promise: toast.promise,
};