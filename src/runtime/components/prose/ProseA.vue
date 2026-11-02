<template>
  <span v-if="incomplete" class="prose-a"><slot /></span>
  <NuxtLink
    v-else
    :href="props.href"
    :target="refinedTarget"
    :external="props.external"
    class="prose-a"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from '#imports'

const props = defineProps<{
  href: string
  external?: boolean
}>()

// Comark marks unterminated links with a `comark:incomplete-link` placeholder while streaming.
const incomplete = computed(() => props.href.startsWith('comark:incomplete-'))

const refinedTarget = computed(() => {
  if (props.href.startsWith('/') && !props.href.startsWith('//')) return '_self'
  if (props.href.startsWith('#')) return '_self'
  return '_blank'
})
</script>

<style scoped>
.prose-a {
  color: inherit;
  text-decoration: underline dotted;
  text-underline-offset: 4px;
}

.prose-a:hover {
  text-decoration: underline;
  color: var(--mdc-active-link);
}

.prose-a:has(code) {
  text-decoration: none !important;
}
</style>
