<template>
  <code class="prose-inline-code">
    <slot />
  </code>
</template>

<style scoped>
.prose-inline-code {
  position: relative;
  border-radius: 4px;
  background-color: var(--muted);
  padding: 0.2rem 0.3rem;
}

a .prose-inline-code {
  border: 1px dashed var(--muted-foreground);
}

a .prose-inline-code:hover {
  color: var(--active-link);
}

.prose-inline-code:not(
    h1 > code,
    h1 > a > code,
    h2 > a > code,
    h3 > a > code,
    h4 > a > code,
    h5 > a > code,
    strong > a > code
  ) {
  font-size: 13px;
  line-height: 1.25rem;
}
</style>
