<script setup lang="ts">
import { NAV_LINKS } from "~/utils/constants";

const route = useRoute();
const colorMode = useColorMode();
const mobileOpen = ref(false);

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    mobileOpen.value = false;
  }
);
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/80"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="text-xl font-bold tracking-tight text-neutral-900 dark:text-white"
      >
        Bfotool Blog
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in NAV_LINKS"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="
            route.path === link.to
              ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white'
          "
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <NuxtLink
          to="/search"
          class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          aria-label="Search"
        >
          <Icon name="lucide:search" size="18" />
        </NuxtLink>

        <button
          class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          aria-label="Toggle theme"
          @click="toggleTheme"
        >
          <Icon
            :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
            size="18"
          />
        </button>

        <!-- Mobile toggle -->
        <button
          class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 md:hidden dark:text-neutral-400 dark:hover:bg-neutral-800"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" size="20" />
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    <nav
      v-if="mobileOpen"
      class="border-t border-neutral-200 bg-white px-4 py-3 md:hidden dark:border-neutral-800 dark:bg-neutral-950"
    >
      <NuxtLink
        v-for="link in NAV_LINKS"
        :key="link.to"
        :to="link.to"
        class="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="
          route.path === link.to
            ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
            : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800/50'
        "
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
