<template>
  <h5 :id="props.id" class="prose-h5">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h5>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const anchorLinks = useRuntimeConfig().public.mdc?.headings?.anchorLinks

const enabled = typeof anchorLinks === 'object' ? anchorLinks?.h5 : (anchorLinks ?? false)
const generate = computed(() => !!props.id && !!enabled)
</script>

<style scoped>
.prose-h5 {
  scroll-margin: 5rem;
  text-decoration: none;

  font-size: var(--mdc-h5-size, 1em);
  font-weight: var(--mdc-heading-weight, 600);
  line-height: 1.5;
  margin: calc(1.5em * var(--mdc-heading-spacing, 1)) 0 calc(0.5em * var(--mdc-heading-spacing, 1));
}

.prose-h5 > a {
  color: inherit;
  text-decoration: none;
}

.prose-h5 > a:hover {
  text-decoration: underline;
}
</style>
