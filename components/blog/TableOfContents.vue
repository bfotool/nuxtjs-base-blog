<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const headings = computed<TocItem[]>(() => {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(props.content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }
  return items;
});
</script>

<template>
  <nav
    v-if="headings.length >= 3"
    class="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50"
  >
    <h3
      class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white"
    >
      <Icon name="lucide:list" size="16" />
      Table of Contents
    </h3>
    <ul class="mt-3 space-y-1.5">
      <li
        v-for="h in headings"
        :key="h.id"
        :style="{ paddingLeft: `${(h.level - 2) * 16}px` }"
      >
        <a
          :href="`#${h.id}`"
          class="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          {{ h.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
