<script setup lang="ts">
import { NAV_LINKS, SOCIAL_LINKS } from "~/utils/constants";
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white">
            Bfotool Blog
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Insights, tutorials, and stories for modern developers. Built with
            Nuxt 3 and a lot of coffee.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
            Navigation
          </h4>
          <ul class="mt-3 space-y-2">
            <li v-for="link in NAV_LINKS" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Topics -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
            Topics
          </h4>
          <ul class="mt-3 space-y-2">
            <li
              v-for="topic in ['Web Development', 'Design', 'DevOps', 'AI & ML', 'Career']"
              :key="topic"
            >
              <span class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ topic }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
            Connect
          </h4>
          <div class="mt-3 flex gap-3">
            <a
              v-for="(url, platform) in SOCIAL_LINKS"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              :aria-label="platform"
            >
              <Icon :name="`lucide:${platform === 'twitter' ? 'twitter' : platform}`" size="18" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <p class="text-center text-xs text-neutral-500">
          &copy; {{ currentYear }} Bfotool Blog. All rights reserved.
          Built with Nuxt 3, TypeScript &amp; Tailwind CSS.
        </p>
      </div>
    </div>
  </footer>
</template>
