<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
    <p class="text-7xl font-bold text-neutral-200 dark:text-neutral-800">
      {{ error.statusCode || "Error" }}
    </p>
    <h1 class="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
      {{ error.statusCode === 404 ? "Page Not Found" : "Something went wrong" }}
    </h1>
    <p class="mt-2 max-w-md text-neutral-600 dark:text-neutral-400">
      {{
        error.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : "An unexpected error occurred. Please try again."
      }}
    </p>
    <button
      class="mt-8 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      @click="handleError"
    >
      <Icon name="lucide:home" size="16" />
      Back to Home
    </button>
  </div>
</template>
