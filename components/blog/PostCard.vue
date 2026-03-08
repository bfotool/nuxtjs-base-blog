<script setup lang="ts">
import type { Post } from "~/types";

defineProps<{
  post: Post;
}>();
</script>

<template>
  <article
    class="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
  >
    <NuxtLink :to="`/blog/${post.slug}`" class="block">
      <!-- Cover Image -->
      <div class="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          :src="post.coverImage"
          :alt="post.title"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span
          v-if="post.featured"
          class="absolute top-3 left-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-semibold text-white"
        >
          Featured
        </span>
      </div>

      <!-- Content -->
      <div class="p-5">
        <span class="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {{ post.category.name }}
        </span>

        <h2
          class="mt-2 text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
        >
          {{ post.title }}
        </h2>

        <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {{ post.excerpt }}
        </p>

        <!-- Meta -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img
              :src="post.author.avatar"
              :alt="post.author.name"
              class="h-7 w-7 rounded-full"
            />
            <span class="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {{ post.author.name }}
            </span>
          </div>

          <div class="flex items-center gap-3 text-xs text-neutral-500">
            <span class="flex items-center gap-1">
              <Icon name="lucide:calendar" size="12" />
              {{ formatDate(post.publishedAt) }}
            </span>
            <span class="flex items-center gap-1">
              <Icon name="lucide:clock" size="12" />
              {{ post.readingTime }} min
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
