<template>
  <h3 :id class="prose-h3">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h3>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const { id } = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc

const generate = computed(
  () => !!id && typeof headings?.anchorLinks === 'object' && !!headings.anchorLinks.h3
)
</script>

<style scoped>
.prose-h3 {
  scroll-margin: 5rem;
  font-size: 1.375rem;
  line-height: 1.25;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: -0.025em;
  margin: 1.5rem 0 0.5em;
}
</style>
