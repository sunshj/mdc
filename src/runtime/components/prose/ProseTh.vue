<template>
  <th class="prose-th">
    <slot />
  </th>
</template>

<style scoped>
.prose-th {
  border: 1px solid var(--border);
  text-align: left;
  font-weight: 700;
  padding: 0.5rem 1rem; /* 8px 16px */
}

.prose-th[align='center'] {
  text-align: center;
}

.prose-th[align='right'] {
  text-align: right;
}
</style>
