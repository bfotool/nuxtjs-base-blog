<script setup lang="ts">
import type { Category } from "~/types";

defineProps<{
  categories: Category[];
  activeSlug?: string;
}>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <NuxtLink
      to="/"
      class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
      :class="
        !activeSlug
          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
      "
    >
      All
    </NuxtLink>
    <NuxtLink
      v-for="cat in categories"
      :key="cat.id"
      :to="`/blog/category/${cat.slug}`"
      class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
      :class="
        activeSlug === cat.slug
          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
      "
    >
      {{ cat.name }}
    </NuxtLink>
  </div>
</template>
