<template>
  <h1 :id="props.id" class="prose-h1">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h1>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const anchorLinks = useRuntimeConfig().public.mdc?.headings?.anchorLinks

const enabled = typeof anchorLinks === 'object' ? anchorLinks?.h1 : (anchorLinks ?? false)
const generate = computed(() => !!props.id && !!enabled)
</script>

<style scoped>
.prose-h1 {
  scroll-margin: 5rem;
  text-decoration: none;

  font-size: var(--mdc-h1-size, 2.25em);
  font-weight: var(--mdc-h1-weight, 800);
  line-height: 1.1;
  margin: 0 0 calc(0.9em * var(--mdc-heading-spacing, 1));
}

.prose-h1 > a {
  color: inherit;
  text-decoration: none;
}

.prose-h1 > a:hover {
  text-decoration: underline;
}
</style>
