<template>
  <div
    class="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
  >
    <Skeleton class="h-48 w-full !rounded-none" />
    <div class="p-5">
      <Skeleton class="mb-3 h-4 w-24" />
      <Skeleton class="mb-2 h-6 w-full" />
      <Skeleton class="mb-4 h-4 w-3/4" />
      <div class="flex items-center gap-3">
        <Skeleton class="h-8 w-8 !rounded-full" />
        <Skeleton class="h-3 w-28" />
      </div>
    </div>
  </div>
</template>
