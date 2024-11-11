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
  line-height: 1.25;
  font-weight: 600;
  scroll-margin: 5rem;
  font-size: 2.25rem;
  letter-spacing: -0.025em;
  text-decoration: none;
  margin: 1rem 0;
}
</style>
