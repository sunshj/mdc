<template>
  <button class="color-mode-button" @click="colorMode.preference = next()">
    <Icon v-if="colorMode.preference === 'light'" :size="24" name="lucide:sun" />
    <Icon v-else-if="colorMode.preference === 'dark'" :size="24" name="lucide:moon" />
    <Icon v-else :size="24" name="lucide:contrast" />
  </button>
</template>

<script setup lang="ts">
import { useCycleList } from '@vueuse/core'

const colorMode = useColorMode()

const { next } = useCycleList(['system', 'light', 'dark'], {
  initialValue: colorMode.preference
})
</script>

<style scoped>
.color-mode-button {
  background: var(--mdc-background);
  border: 2px solid var(--mdc-border);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--mdc-primary);
}
</style>
