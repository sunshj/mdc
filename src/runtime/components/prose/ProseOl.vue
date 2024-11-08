<template>
  <ol class="prose-ol">
    <slot />
  </ol>
</template>

<style scoped>
.prose-ol {
  list-style-type: decimal;
  margin: 0.5rem 0 0.5rem 1.5rem;
}
</style>
