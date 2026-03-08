<script setup lang="ts">
import type { Post, Category } from "~/types";
import { POSTS_PER_PAGE } from "~/utils/constants";

useSeoMeta({
  title: "Bfotool Blog",
  description:
    "Insights, tutorials, and stories for modern developers. Explore the latest in web development, design, and technology.",
});

const api = useApi();

const posts = ref<Post[]>([]);
const featured = ref<Post | null>(null);
const categories = ref<Category[]>([]);
const page = ref(1);
const totalPages = ref(1);
const loading = ref(true);

// Load initial data
onMounted(async () => {
  const [featuredPosts, cats] = await Promise.all([
    api.getFeaturedPosts(),
    api.getCategories(),
  ]);
  featured.value = featuredPosts[0] || null;
  categories.value = cats;
  await loadPosts();
});

async function loadPosts() {
  loading.value = true;
  const response = await api.getPosts({
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
    <!-- Featured Hero -->
    <section v-if="featured" class="mb-12">
      <BlogFeaturedPost :post="featured" />
    </section>

    <!-- Category Filter -->
    <section class="mb-8">
      <BlogCategoryFilter :categories="categories" />
    </section>

    <!-- Post Grid -->
    <section>
      <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PostCardSkeleton v-for="i in POSTS_PER_PAGE" :key="i" />
      </div>
      <EmptyState v-else-if="posts.length === 0" />
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </section>

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
