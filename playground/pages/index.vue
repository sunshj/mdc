<template>
  <div class="selector">
    <select v-model="$colorMode.value">
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>
  </div>

  <div class="container">
    <MDC :value="exampleMd" />
  </div>
</template>

<script setup lang="ts">
import exampleMd from '~/assets/example.md?raw'
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
