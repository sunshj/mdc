<template>
  <div class="img-wrapper">
    <NuxtImg :src="refinedSrc" :alt :width :height :title class="prose-img" />
    <div v-if="alt" class="img-title">{{ title || alt }}</div>
  </div>
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
  gap: 0.5rem; /* 8px */
  margin: 1rem 0;
}

.prose-img {
  width: 100%;
  border-radius: 6px;
}

.img-title {
  text-align: center;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
