<template>
  <code class="prose-inline-code">
    <slot />
  </code>
</template>

<style scoped>
.prose-inline-code {
  color: var(--mdc-inline-code);
  border: 1px solid var(--mdc-border);
  position: relative;
  border-radius: 4px;
  background-color: var(--mdc-muted);
  padding: 3px 5px;
  font-family: var(--mdc-code-family);
}

a .prose-inline-code {
  border: 1px dashed var(--mdc-muted-foreground);
}

a .prose-inline-code:hover {
  color: var(--mdc-active-link);
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
