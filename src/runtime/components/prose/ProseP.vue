<template>
  <p class="prose-p">
    <slot />
  </p>
</template>

<style scoped>
.prose-p {
  line-height: var(--mdc-prose-line-height, 1.75);
  margin: var(--mdc-prose-spacing, 1.25em) 0;
}
</style>
