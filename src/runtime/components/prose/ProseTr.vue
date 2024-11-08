<template>
  <tr class="prose-tr">
    <slot />
  </tr>
</template>

<style scoped>
.prose-tr {
  margin: 0;
  border-top: 1px solid var(--border);
  padding: 0;
}

.prose-tr:nth-child(even) {
  background-color: var(--muted-50);
}
</style>
