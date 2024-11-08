<template>
  <!-- iconify -->
  <Icon v-if="isIcon" :name :size />
  <!-- image -->
  <NuxtImg
    v-else
    :src="name"
    :style="{ display: 'inline', width: `${size}px`, height: `${size}px` }"
  />
</template>

<script setup lang="ts">
import { stringToIcon, validateIconName } from '@iconify/utils'
import { computed } from '#imports'

const { name, size = 16 } = defineProps<{
  name: string
  size?: number
}>()

const isIcon = computed(() => validateIconName(stringToIcon(name)))
</script>
