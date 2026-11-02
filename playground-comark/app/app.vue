<template>
  <div class="container">
    <NuxtPage />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--mdc-background);
  color: var(--mdc-foreground);
  border-color: var(--mdc-border);
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  max-width: 768px;
}
</style>
