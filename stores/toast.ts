import { defineStore } from "pinia";
import type { Toast, ToastType } from "~/types";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  function addToast(type: ToastType, title: string, message?: string) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const duration = 4000;

    toasts.value.push({ id, type, title, message, duration });

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return { toasts, addToast, removeToast };
});
