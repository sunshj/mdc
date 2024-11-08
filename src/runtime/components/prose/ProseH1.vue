<template>
  <h1 :id class="prose-h1">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h1>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const { id } = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc

const generate = computed(
  () => !!id && typeof headings?.anchorLinks === 'object' && !!headings.anchorLinks.h1
)
</script>

<style scoped>
.prose-h1 {
  scroll-margin: 5rem; /* 80px */
  font-size: 2.25rem; /* 36px */
  line-height: 2.5rem; /* 40px */
  font-weight: 800;
  letter-spacing: -0.025em;
  text-decoration: none;
  margin: 1rem 0;
}

@media (min-width: 1024px) {
  .prose-h1 {
    font-size: 3rem; /* 48px */
    line-height: 1;
  }
}
</style>
