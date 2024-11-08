<template>
  <NuxtImg :src="refinedSrc" :alt :width :height class="prose-img" />
</template>

<script setup lang="ts">
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'
import { computed, useRuntimeConfig } from '#imports'

const { alt, src, height, width } = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
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
.prose-img {
  width: 100%;
  border-radius: 0.375rem; /* 6px */
}

.prose-img:not(:first-child) {
  margin-top: 2rem; /* 32px */
}

.prose-img:not(:last-child) {
  margin-bottom: 2rem; /* 32px */
}
</style>
