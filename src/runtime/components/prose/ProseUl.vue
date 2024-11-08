<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style scoped>
.prose-ul {
  list-style-type: disc;
  margin: 0.5rem 0 0.5rem 1.5rem;
}

.prose-ul.contains-task-list {
  list-style-type: none;
  margin: 0.5rem 0;
}
</style>
