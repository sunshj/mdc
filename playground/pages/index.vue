<template>
  <div class="container">
    <MDC :value="componentsMd">
      <template #default="{ body, toc }">
        <div class="toc">
          <div v-if="toc.links?.length" class="toc-links">
            <NuxtLink v-for="link in toc.links" :key="link.id" :href="`#${link.id}`">
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>
        <MDCRenderer :body />
      </template>
    </MDC>
  </div>
</template>

<script setup lang="ts">
import componentsMd from '~/assets/components.md?raw'
</script>

<style scoped>
.toc {
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 10;
  width: 160px;
  height: calc(100vh - 30px);
  background-color: cadetblue;
  color: white;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
  .toc {
    display: none;
  }
}

.toc-links {
  overflow-y: auto;
  height: 100%;
}

.toc a {
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.toc a:hover {
  background-color: white;
  color: cadetblue;
}
</style>
