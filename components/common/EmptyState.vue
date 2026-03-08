<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: "No results found",
    description:
      "Try adjusting your search or filters to find what you're looking for.",
  }
);
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="mb-4 rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-800">
      <Icon
        name="lucide:file-question"
        size="32"
        class="text-neutral-400 dark:text-neutral-500"
      />
    </div>
    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
      {{ title }}
    </h3>
    <p class="mt-1 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
      {{ description }}
    </p>
  </div>
</template>
