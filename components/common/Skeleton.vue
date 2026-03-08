<script setup lang="ts">
defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    class="animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
    :class="$props.class"
  />
</template>
