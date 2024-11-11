<template>
  <span class="img-wrapper">
    <NuxtImg :src="refinedSrc" :alt :width :height :title class="prose-img" />
    <span v-if="alt" class="img-title">{{ title || alt }}</span>
  </span>
</template>

<script setup lang="ts">
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'
import { computed, useRuntimeConfig } from '#imports'

const { alt, src, title, height, width } = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {
  if (src?.startsWith('/') && !src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !src.startsWith(_base)) return joinURL(_base, src)
  }
  return src
})
</script>

<style scoped>
.img-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1em 0;
}

.prose-img {
  width: 100%;
  border-radius: 6px;
}

.img-title {
  text-align: center;
  color: var(--mdc-muted-foreground);
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
