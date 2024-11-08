<template>
  <h4 :id class="prose-h4">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h4>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const { id } = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc

const generate = computed(
  () => !!id && typeof headings?.anchorLinks === 'object' && !!headings.anchorLinks.h4
)
</script>

<style scoped>
.prose-h4 {
  scroll-margin: 5rem; /* 80px */
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight: 600;
  letter-spacing: -0.025em;
  text-decoration: none;
  margin: 0.25rem 0;
}
</style>
