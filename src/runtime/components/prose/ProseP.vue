<template>
  <p class="prose-p">
    <slot />
  </p>
</template>

<style scoped>
.prose-p {
  line-height: 1.75rem; /* 28px */
}

.prose-p:not(:first-child) {
  margin-top: 1.5rem; /* 24px */
}
</style>
