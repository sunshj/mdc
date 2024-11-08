<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style scoped>
.prose-ul {
  margin-left: 1.5rem; /* 24px */
  list-style-type: disc;
}

.prose-ul:not(:first-child) {
  margin-top: 1.5rem; /* 24px */
}

.prose-ul:not(:last-child) {
  margin-bottom: 1.5rem; /* 24px */
}

.prose-ul > li:not(:first-child) {
  margin-top: 0.5rem; /* 8px */
}
</style>
