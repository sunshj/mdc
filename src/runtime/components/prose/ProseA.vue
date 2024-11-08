<template>
  <NuxtLink :href :target="refinedTarget" :external class="prose-a">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, type PropType } from '#imports'

const { href, external } = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<
      '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined
    >,
    default: undefined,
    required: false
  },
  external: {
    type: Boolean,
    default: undefined,
    required: false
  }
})

const refinedTarget = computed(() => {
  if (href.startsWith('/') && !href.startsWith('//')) return '_self'
  if (href.startsWith('#')) return '_self'
  return '_blank'
})
</script>

<style scoped>
.prose-a {
  text-decoration: underline dotted;
  text-underline-offset: 4px;
}

.prose-a:hover {
  text-decoration: underline;
  color: var(--active-link);
}

.prose-a:has(code) {
  text-decoration: none !important;
}
</style>
