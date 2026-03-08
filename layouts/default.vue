<script setup lang="ts">
// Layout wraps all pages with Header + Footer + Toast
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
    <ToastContainer />
  </div>
</template>
