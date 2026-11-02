<template>
  <h3 :id="props.id" class="prose-h3">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h3>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const anchorLinks = useRuntimeConfig().public.mdc?.headings?.anchorLinks

const enabled = typeof anchorLinks === 'object' ? anchorLinks?.h3 : (anchorLinks ?? true)
const generate = computed(() => !!props.id && !!enabled)
</script>

<style scoped>
.prose-h3 {
  scroll-margin: 5rem;
  text-decoration: none;

  font-size: var(--mdc-h3-size, 1.25em);
  font-weight: var(--mdc-heading-weight, 600);
  line-height: 1.5;
  margin: calc(1.6em * var(--mdc-heading-spacing, 1)) 0 calc(0.6em * var(--mdc-heading-spacing, 1));
}

.prose-h3 > a {
  color: inherit;
  text-decoration: none;
}

.prose-h3 > a:hover {
  text-decoration: underline;
}
</style>
