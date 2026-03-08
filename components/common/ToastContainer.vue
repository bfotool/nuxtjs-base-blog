<script setup lang="ts">
const toastStore = useToastStore();

const iconMap: Record<string, string> = {
  success: "lucide:check-circle",
  error: "lucide:alert-circle",
  info: "lucide:info",
  warning: "lucide:alert-triangle",
};

const styleMap: Record<string, string> = {
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  warning:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
};
</script>

<template>
  <div v-if="toastStore.toasts.length" class="fixed right-4 bottom-4 z-[100] flex flex-col gap-2">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="flex min-w-[300px] max-w-[420px] animate-slide-in-right items-start gap-3 rounded-xl border px-4 py-3 shadow-lg"
      :class="styleMap[toast.type]"
      role="alert"
    >
      <Icon :name="iconMap[toast.type]" size="18" class="mt-0.5 shrink-0" />
      <div class="flex-1">
        <p class="text-sm font-semibold">{{ toast.title }}</p>
        <p v-if="toast.message" class="mt-0.5 text-xs opacity-80">
          {{ toast.message }}
        </p>
      </div>
      <button
        class="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
        @click="toastStore.removeToast(toast.id)"
      >
        <Icon name="lucide:x" size="14" />
      </button>
    </div>
  </div>
</template>
