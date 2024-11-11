<template>
  <li class="prose-li"><slot /></li>
</template>

<style scoped>
.prose-li {
  margin: 0.5rem 0;
  line-height: 1.75;
}

.prose-li::marker {
  color: var(--mdc-muted-foreground);
}
</style>
