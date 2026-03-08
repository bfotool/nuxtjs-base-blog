<script setup lang="ts">
useSeoMeta({
  title: "About",
  description: "Learn more about Bfotool Blog — our mission, team, and values.",
});

const values = [
  {
    icon: "lucide:code",
    title: "Practical First",
    description:
      "Every article is grounded in real-world experience. No theoretical fluff — just actionable knowledge you can apply today.",
  },
  {
    icon: "lucide:lightbulb",
    title: "Clear Thinking",
    description:
      "We break down complex topics into understandable pieces. If we can't explain it simply, we don't understand it well enough.",
  },
  {
    icon: "lucide:users",
    title: "Community Driven",
    description:
      "Our content is shaped by the questions and challenges real developers face every day.",
  },
  {
    icon: "lucide:zap",
    title: "Always Current",
    description:
      "The tech landscape moves fast. We keep our content updated, retiring outdated advice and embracing new best practices.",
  },
];
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <!-- Hero -->
    <header class="text-center">
      <h1
        class="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white"
      >
        About Bfotool Blog
      </h1>
      <p
        class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
      >
        We're a team of developers, designers, and writers on a mission to make
        web development knowledge accessible, practical, and enjoyable.
      </p>
    </header>

    <!-- Cover -->
    <div
      class="relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800"
    >
      <img
        src="https://picsum.photos/seed/about-team/1400/600"
        alt="Team working together"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Story -->
    <section class="mt-14">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Our Story</h2>
      <div class="mt-4 space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p>
          DevPulse started in 2023 as a simple blog where a few developers
          shared what they learned building products at scale. We were tired of
          tutorials that showed the "happy path" without addressing the messy
          reality of production software.
        </p>
        <p>
          Today, we've grown into a publication read by thousands of developers
          every month. Our articles cover everything from frontend architecture
          to DevOps, from design systems to career growth — all written by
          practitioners who build software for a living.
        </p>
        <p>
          We believe the best way to learn is from people who are actively
          solving the same problems you face. That's why every piece on DevPulse
          comes from real experience, not abstract theory.
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="mt-16">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Our Values</h2>
      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <div
          v-for="value in values"
          :key="value.title"
          class="rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
        >
          <div class="mb-3 inline-flex rounded-xl bg-blue-50 p-2.5 dark:bg-blue-950">
            <Icon
              :name="value.icon"
              size="20"
              class="text-blue-600 dark:text-blue-400"
            />
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
            {{ value.title }}
          </h3>
          <p class="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {{ value.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
