<script setup lang="ts">
import type { Post } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;
const api = useApi();
const toastStore = useToastStore();

const post = ref<Post | null>(null);
const related = ref<Post[]>([]);
const loading = ref(true);
const error = ref(false);

useSeoMeta({
  title: () => post.value?.title || "Blog Post",
  description: () => post.value?.excerpt || "",
  ogTitle: () => post.value?.title || "",
  ogDescription: () => post.value?.excerpt || "",
  ogImage: () => post.value?.coverImage || "",
});

onMounted(async () => {
  try {
    const data = await api.getPostBySlug(slug);
    post.value = data;

    const relatedPosts = await api.getRelatedPosts(
      slug,
      data.category.slug,
      3
    );
    related.value = relatedPosts;
  } catch {
    error.value = true;
  }
  loading.value = false;
});

async function handleShare() {
  const url = window.location.href;
  if (navigator.share) {
    await navigator.share({ title: post.value?.title, url });
  } else {
    await navigator.clipboard.writeText(url);
    toastStore.addToast("success", "Link copied to clipboard!");
  }
}
</script>

<template>
  <!-- Loading -->
  <div v-if="loading" class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <Skeleton class="mb-4 h-8 w-3/4" />
    <Skeleton class="mb-2 h-5 w-1/2" />
    <Skeleton class="mb-8 h-80 w-full !rounded-2xl" />
    <div class="space-y-3">
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-5/6" />
    </div>
  </div>

  <!-- Error / Not Found -->
  <div
    v-else-if="error || !post"
    class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6"
  >
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
      Post not found
    </h1>
    <p class="mt-2 text-neutral-600 dark:text-neutral-400">
      The article you're looking for doesn't exist or has been removed.
    </p>
    <NuxtLink
      to="/"
      class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
    >
      <Icon name="lucide:arrow-left" size="16" />
      Back to Home
    </NuxtLink>
  </div>

  <!-- Article -->
  <article v-else class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <!-- Back link -->
    <NuxtLink
      to="/"
      class="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
    >
      <Icon name="lucide:arrow-left" size="16" />
      Back to Blog
    </NuxtLink>

    <div class="grid gap-10 lg:grid-cols-[1fr_280px]">
      <!-- Main -->
      <div>
        <header>
          <NuxtLink
            :to="`/blog/category/${post.category.slug}`"
            class="text-sm font-semibold uppercase tracking-wider text-blue-600 hover:underline dark:text-blue-400"
          >
            {{ post.category.name }}
          </NuxtLink>

          <h1
            class="mt-3 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl dark:text-white"
          >
            {{ post.title }}
          </h1>

          <p class="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
            {{ post.excerpt }}
          </p>

          <!-- Meta -->
          <div
            class="mt-6 flex flex-wrap items-center gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800"
          >
            <div class="flex items-center gap-3">
              <img
                :src="post.author.avatar"
                :alt="post.author.name"
                class="h-10 w-10 rounded-full"
              />
              <div>
                <p class="text-sm font-semibold text-neutral-900 dark:text-white">
                  {{ post.author.name }}
                </p>
                <p class="text-xs text-neutral-500">
                  {{ post.author.bio.slice(0, 60) }}...
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-sm text-neutral-500">
              <span class="flex items-center gap-1">
                <Icon name="lucide:calendar" size="14" />
                {{ formatDate(post.publishedAt) }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="lucide:clock" size="14" />
                {{ post.readingTime }} min read
              </span>
            </div>

            <button
              class="ml-auto rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Share"
              @click="handleShare"
            >
              <Icon name="lucide:share-2" size="18" />
            </button>
          </div>
        </header>

        <!-- Cover Image -->
        <div
          class="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800"
        >
          <img
            :src="post.coverImage"
            :alt="post.title"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Article Body -->
        <div class="mt-10">
          <BlogMarkdownRenderer :content="post.content" />
        </div>

        <!-- Tags -->
        <div
          class="mt-10 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-6 dark:border-neutral-800"
        >
          <Icon name="lucide:tag" size="16" class="text-neutral-500" />
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag"
            :to="`/search?tag=${encodeURIComponent(tag)}`"
            class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="hidden lg:block">
        <div class="sticky top-24 space-y-6">
          <BlogTableOfContents :content="post.content" />
        </div>
      </aside>
    </div>

    <!-- Related Posts -->
    <section
      v-if="related.length > 0"
      class="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800"
    >
      <h2 class="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">
        Related Articles
      </h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogPostCard v-for="p in related" :key="p.id" :post="p" />
      </div>
    </section>
  </article>
</template>
