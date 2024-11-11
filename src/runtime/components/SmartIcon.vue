<template>
  <!-- iconify -->
  <Icon v-if="isIcon" :name="props.name" :size="props.size" />
  <!-- image -->
  <NuxtImg
    v-else
    :src="props.name"
    :style="{ display: 'inline', width: `${props.size}px`, height: `${props.size}px` }"
  />
</template>

<script setup lang="ts">
import { stringToIcon, validateIconName } from '@iconify/utils'
import { computed } from '#imports'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  {
    size: 16
  }
)

const isIcon = computed(() => validateIconName(stringToIcon(props.name)))
</script>
