<template>
  <div class="container">
    <MDC v-if="data" :value="data">
      <template #default="{ body, toc }">
        <div class="toc">
          <div v-if="toc.links?.length" class="toc-links">
            <NuxtLink
              v-for="link in flattenTree(toc.links)"
              :key="link.id"
              :style="{
                paddingLeft: `${(link.depth - 1) * 10}px`
              }"
              :href="`#${link.id}`"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>
        <MDCRenderer :body="body" />
      </template>
    </MDC>
  </div>
</template>

<script lang="ts" setup>
import exampleMdUrl from '~/assets/example.md?url'

const { data } = useFetch(exampleMdUrl, { server: false })

function flattenTree(tree: any[]): any[] {
  return tree.flatMap(node => [node, ...flattenTree(node.children ?? [])])
}
</script>

<style scoped>
.toc {
  position: fixed;
  top: 30px;
  z-index: 90;
  left: 0;
  width: 200px;
  padding: 5px 0;
  color: blueviolet;
}

@media screen and (max-width: 840px) {
  .toc {
    display: none;
  }
}

.toc-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
