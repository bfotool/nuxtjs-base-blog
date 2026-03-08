<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  pageChange: [page: number];
}>();

const pages = computed(() => {
  const result: (number | "...")[] = [];
  const { currentPage, totalPages } = props;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) result.push(i);
  } else {
    result.push(1);
    if (currentPage > 3) result.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      result.push(i);
    }
    if (currentPage < totalPages - 2) result.push("...");
    result.push(totalPages);
  }

  return result;
});
</script>

<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-1" aria-label="Pagination">
    <button
      :disabled="currentPage === 1"
      class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-800"
      aria-label="Previous page"
      @click="emit('pageChange', currentPage - 1)"
    >
      <Icon name="lucide:chevron-left" size="18" />
    </button>

    <template v-for="(page, i) in pages" :key="`page-${i}`">
      <span
        v-if="page === '...'"
        class="px-2 text-sm text-neutral-400 dark:text-neutral-600"
      >
        ...
      </span>
      <button
        v-else
        class="h-9 min-w-[2.25rem] rounded-lg px-2 text-sm font-medium transition-colors"
        :class="
          page === currentPage
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
            : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
        "
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="emit('pageChange', page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      :disabled="currentPage === totalPages"
      class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-800"
      aria-label="Next page"
      @click="emit('pageChange', currentPage + 1)"
    >
      <Icon name="lucide:chevron-right" size="18" />
    </button>
  </nav>
</template>
