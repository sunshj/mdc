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
  scroll-margin: 5rem; /* 80px */
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
  font-weight: 600;
  letter-spacing: -0.025em;
}

.prose-h3:not(:first-child) {
  margin-top: 2rem; /* 32px */
}
</style>
