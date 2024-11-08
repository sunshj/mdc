<template>
  <div class="table-wrapper">
    <table class="prose-table">
      <slot />
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-y: auto;
}

.table-wrapper:not(:first-child) {
  margin-top: 1.5rem;
}

.table-wrapper:not(:last-child) {
  margin-bottom: 1.5rem;
}

.prose-table {
  width: 100%;
  margin: 0;
  border-radius: 0.5rem;
  border-spacing: 0;
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}
</style>

<style>
*,
*::before,
*::after {
  border: 0px solid var(--border);
}
</style>
