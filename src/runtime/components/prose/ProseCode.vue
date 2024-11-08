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

.prose-inline-code:not(
    h1 > code,
    h1 > a > code,
    h2 > a > code,
    h3 > a > code,
    h4 > a > code,
    h5 > a > code,
    strong > a > code
  ) {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
