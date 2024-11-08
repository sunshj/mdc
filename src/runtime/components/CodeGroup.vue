<template>
  <div>
    {{ slots }}
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots().default ?? []
</script>
