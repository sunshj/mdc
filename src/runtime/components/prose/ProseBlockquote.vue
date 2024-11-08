<template>
  <blockquote class="prose-blockquote">
    <slot />
  </blockquote>
</template>

<style scoped>
.prose-blockquote {
  border-left: 3px solid var(--border);
  font-style: italic;
  padding-left: 1.5rem;
}

.prose-blockquote:not(:first-child) {
  margin-top: 1.5rem;
}
</style>
