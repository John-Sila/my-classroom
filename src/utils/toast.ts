import { toast } from "sonner";

export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast(message),

  loading: (message: string) => toast.loading(message),

  updateSuccess: (id: string | number, message: string) =>
    toast.success(message, { id }),

  updateError: (id: string | number, message: string) =>
    toast.error(message, { id }),

  dismiss: (id: string | number) => toast.dismiss(id),

  promise: toast.promise,
};