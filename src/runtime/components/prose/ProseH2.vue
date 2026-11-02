<template>
  <h2 :id="props.id" class="prose-h2">
    <NuxtLink v-if="generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const anchorLinks = useRuntimeConfig().public.mdc?.headings?.anchorLinks

const enabled = typeof anchorLinks === 'object' ? anchorLinks?.h2 : (anchorLinks ?? true)
const generate = computed(() => !!props.id && !!enabled)
</script>

<style scoped>
.prose-h2 {
  scroll-margin: 5rem;
  text-decoration: none;

  font-size: var(--mdc-h2-size, 1.5em);
  font-weight: var(--mdc-h2-weight, 700);
  line-height: 1.33;
  margin: calc(2em * var(--mdc-heading-spacing, 1)) 0 calc(1em * var(--mdc-heading-spacing, 1));
}

.prose-h2 > a {
  color: inherit;
  text-decoration: none;
}

.prose-h2 > a:hover {
  text-decoration: underline;
}
</style>
