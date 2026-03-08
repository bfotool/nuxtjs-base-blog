<script setup lang="ts">
import type { Post } from "~/types";
import { POSTS_PER_PAGE } from "~/utils/constants";

useSeoMeta({
  title: "Search",
  description: "Search articles, tutorials, and guides on Bfotool Blog.",
});

const route = useRoute();
const api = useApi();

const query = ref((route.query.query as string) || (route.query.tag as string) || "");
const debouncedQuery = useDebounce(query, 400);
const posts = ref<Post[]>([]);
const page = ref(1);
const totalPages = ref(1);
const total = ref(0);
const loading = ref(false);
const searched = ref(false);

watch(debouncedQuery, () => {
  page.value = 1;
});

watch(
  [debouncedQuery, page],
  async ([q]) => {
    if (!q.trim()) {
      posts.value = [];
      searched.value = false;
      return;
    }

    loading.value = true;
    searched.value = true;
    const response = await api.getPosts({
      query: q,
      page: page.value,
      pageSize: POSTS_PER_PAGE,
    });
    posts.value = response.data;
    totalPages.value = response.pagination.totalPages;
    total.value = response.pagination.total;
    loading.value = false;
  },
  { immediate: true }
);

function handlePageChange(newPage: number) {
  page.value = newPage;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Search</h1>
      <p class="mt-1 text-neutral-600 dark:text-neutral-400">
        Find articles, tutorials, and guides.
      </p>
    </header>

    <!-- Search Input -->
    <div class="relative mb-8">
      <Icon
        name="lucide:search"
        size="20"
        class="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
      />
      <input
        v-model="query"
        type="text"
        placeholder="Search by title, tag, or keyword..."
        class="w-full rounded-xl border border-neutral-200 bg-white py-3 pr-4 pl-12 text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-blue-400"
        autofocus
      />
    </div>

    <!-- Results count -->
    <p v-if="searched && !loading" class="mb-6 text-sm text-neutral-500">
      {{ total }} {{ total === 1 ? "result" : "results" }} found
      <span v-if="debouncedQuery">for "{{ debouncedQuery }}"</span>
    </p>

    <!-- Results -->
    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <PostCardSkeleton v-for="i in 3" :key="i" />
    </div>
    <EmptyState
      v-else-if="searched && posts.length === 0"
      title="No results found"
      :description="`No articles match '${debouncedQuery}'. Try different keywords.`"
    />
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <!-- Pagination -->
    <section v-if="!loading && totalPages > 1" class="mt-10">
      <Pagination
        :current-page="page"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </section>
  </div>
</template>
