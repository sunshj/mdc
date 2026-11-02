<template>
  <h4 :id="props.id" class="prose-h4">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h4>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const anchorLinks = useRuntimeConfig().public.mdc?.headings?.anchorLinks

const enabled = typeof anchorLinks === 'object' ? anchorLinks?.h4 : (anchorLinks ?? true)
const generate = computed(() => !!props.id && !!enabled)
</script>

<style scoped>
.prose-h4 {
  scroll-margin: 5rem;
  text-decoration: none;

  font-size: var(--mdc-h4-size, 1.125em);
  font-weight: var(--mdc-heading-weight, 600);
  line-height: 1.5;
  margin: calc(1.5em * var(--mdc-heading-spacing, 1)) 0 calc(0.5em * var(--mdc-heading-spacing, 1));
}

.prose-h4 > a {
  color: inherit;
  text-decoration: none;
}

.prose-h4 > a:hover {
  text-decoration: underline;
}
</style>
