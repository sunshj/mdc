<template>
  <ol class="prose-ol">
    <slot />
  </ol>
</template>

<style scoped>
.prose-ol {
  margin-left: 1.5rem; /* 24px */
  list-style-type: decimal;
}

.prose-ol:not(:first-child) {
  margin-top: 1.5rem; /* 24px */
}

.prose-ol:not(:last-child) {
  margin-bottom: 1.5rem; /* 24px */
}

.prose-ol > li:not(:first-child) {
  margin-top: 0.5rem; /* 8px */
}
</style>
