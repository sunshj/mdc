<template>
  <div class="selector">
    <select v-model="option">
      <option value="index.md">index.md</option>
      <option value="example.md">example.md</option>
      <option value="tailwind.md">tailwind.md</option>
    </select>

    <select v-model="$colorMode.value">
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>
  </div>

  <div class="container">
    <MDC :value="data!" />
  </div>
</template>

<script setup lang="ts">
const option = ref('index.md')

const { data } = useFetch<string>(
  () =>
    `https://raw.githubusercontent.com/nuxt-themes/typography/refs/heads/main/.demo/content/${option.value}`
)
</script>

<style scoped>
.selector {
  position: fixed;
  top: 0;
  left: 0;
  width: 120px;
  background-color: cadetblue;
}

select {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

option {
  background-color: cadetblue;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
</style>
