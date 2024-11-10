<template>
  <blockquote class="prose-blockquote">
    <slot />
  </blockquote>
</template>

<style scoped>
.prose-blockquote {
  border-left: 3px solid var(--mdc-border);
  font-style: italic;
  padding-left: 1.25rem;
  margin: 1rem 0;
}
</style>
