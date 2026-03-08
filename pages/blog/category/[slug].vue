<script setup lang="ts">
import type { Post, Category } from "~/types";
import { POSTS_PER_PAGE } from "~/utils/constants";

const route = useRoute();
const categorySlug = route.params.slug as string;
const api = useApi();

const posts = ref<Post[]>([]);
const categories = ref<Category[]>([]);
const page = ref(1);
const totalPages = ref(1);
const loading = ref(true);

const currentCategory = computed(() =>
  categories.value.find((c) => c.slug === categorySlug)
);

useSeoMeta({
  title: () => currentCategory.value?.name || categorySlug,
  description: () => currentCategory.value?.description || "",
});

onMounted(async () => {
  categories.value = await api.getCategories();
  await loadPosts();
});

async function loadPosts() {
  loading.value = true;
  const response = await api.getPosts({
    category: categorySlug,
    page: page.value,
    pageSize: POSTS_PER_PAGE,
  });
  posts.value = response.data;
  totalPages.value = response.pagination.totalPages;
  loading.value = false;
}

function handlePageChange(newPage: number) {
  page.value = newPage;
  loadPosts();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <!-- Back -->
    <NuxtLink
      to="/"
      class="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
    >
      <Icon name="lucide:arrow-left" size="16" />
      All Posts
    </NuxtLink>

    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
        {{ currentCategory?.name || categorySlug }}
      </h1>
      <p
        v-if="currentCategory?.description"
        class="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400"
      >
        {{ currentCategory.description }}
      </p>
    </header>

    <!-- Filter -->
    <section class="mb-8">
      <BlogCategoryFilter :categories="categories" :active-slug="categorySlug" />
    </section>

    <!-- Posts -->
    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <PostCardSkeleton v-for="i in POSTS_PER_PAGE" :key="i" />
    </div>
    <EmptyState
      v-else-if="posts.length === 0"
      title="No posts in this category"
      description="Check back later or browse other categories."
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
