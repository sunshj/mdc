<template>
  <h5 :id class="prose-h5">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h5>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const { id } = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc

const generate = computed(
  () => !!id && typeof headings?.anchorLinks === 'object' && !!headings.anchorLinks.h5
)
</script>

<style scoped>
.prose-h5 {
  scroll-margin: 5rem;
  font-size: 1.125rem;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.025em;
  text-decoration: none;
}
</style>
