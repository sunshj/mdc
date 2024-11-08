<template>
  <!-- Icons -->
  <Icon v-if="isIcon" :name="name" :size="size" />
  <!-- Emojis -->
  <span v-else-if="isEmoji" :style="{ fontSize: `${size}px` }">{{ name }}</span>
  <!-- Link -->
  <NuxtImg
    v-else
    :src="name"
    :style="{ display: 'inline', width: `${size}px`, height: `${size}px` }"
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

const isEmoji = computed(() => {
  return /[\u00A9\u00AE\u2000-\u3300]|\uD83C[\uD000-\uDFFF]|\uD83D[\uD000-\uDFFF]|\uD83E[\uD000-\uDFFF]/.test(
    props.name
  )
})
</script>
