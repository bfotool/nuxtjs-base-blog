<script setup lang="ts">
import type { Post } from "~/types";

defineProps<{
  post: Post;
}>();
</script>

<template>
  <article class="group relative overflow-hidden rounded-3xl bg-neutral-900">
    <!-- Background -->
    <div class="absolute inset-0">
      <img
        :src="post.coverImage"
        :alt="post.title"
        class="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
    </div>

    <!-- Content -->
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="relative block px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
    >
      <span
        class="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm"
      >
        Featured
      </span>

      <h1 class="mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {{ post.title }}
      </h1>

      <p class="mt-4 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
        {{ post.excerpt }}
      </p>

      <div class="mt-6 flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <img
            :src="post.author.avatar"
            :alt="post.author.name"
            class="h-8 w-8 rounded-full ring-2 ring-white/20"
          />
          <span class="text-sm font-medium text-neutral-200">
            {{ post.author.name }}
          </span>
        </div>
        <span class="text-neutral-600">|</span>
        <span class="text-sm text-neutral-400">
          {{ formatDate(post.publishedAt) }}
        </span>
        <span class="flex items-center gap-1 text-sm text-neutral-400">
          <Icon name="lucide:clock" size="14" />
          {{ post.readingTime }} min read
        </span>
      </div>

      <div
        class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-all group-hover:gap-3"
      >
        Read Article
        <Icon name="lucide:arrow-right" size="16" />
      </div>
    </NuxtLink>
  </article>
</template>
