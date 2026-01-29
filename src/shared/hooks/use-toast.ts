import * as React from "react";

export type ToastType = "success" | "error";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const show = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
    
    return id;
  }, []);

  const remove = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, show, remove };
}