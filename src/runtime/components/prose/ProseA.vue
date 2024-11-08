<template>
  <NuxtLink :href :target :external class="prose-a">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PropType } from '#imports'

const { href, external, target } = defineProps({
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
</script>

<style scoped>
.prose-a {
  font-weight: 600;
  text-decoration: underline;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
</style>
