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
  scroll-margin: 5rem;
  font-size: 1.125rem;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.025em;
  text-decoration: none;
  margin: 1em 0;
}
</style>
