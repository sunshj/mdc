<template>
  <h2 :id class="prose-h2">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const { id } = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc

const generate = computed(
  () => !!id && typeof headings?.anchorLinks === 'object' && !!headings.anchorLinks.h2
)
</script>

<style scoped>
.prose-h2 {
  scroll-margin: 5rem; /* 80px */
  font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px */
  font-weight: 600;
  letter-spacing: -0.025em;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  margin: 0.75rem 0; /* 16px */
}
</style>
