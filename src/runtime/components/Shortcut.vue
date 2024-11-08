<template>
  <kbd :class="['shortcut', size]">
    {{ computedValue }}
  </kbd>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '#imports'

const { value, size = 'sm' } = defineProps<{
  value: string
  size?: 'xs' | 'sm' | 'md'
}>()

const metaSymbol = ref('Ctrl')

onMounted(() => {
  metaSymbol.value =
    navigator && navigator.userAgent && /Macintosh;/.test(navigator.userAgent) ? '⌘' : 'Ctrl'
})

const computedValue = computed(() => (value === 'meta' ? metaSymbol : value))
</script>

<style scoped>
.shortcut {
  background-color: var(--muted);
  border: 1px solid var(--border);
  pointer-events: none;
  height: 20px;
  display: inline-flex;
  user-select: none;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  font-weight: 500;
}

.shortcut.xs {
  height: 16px;
  min-height: 16px;
  font-size: 10px;
  padding: 0 4px;
}

.shortcut.sm {
  height: 20px;
  min-height: 20px;
  font-size: 11px;
  padding: 0 4px;
}

.shortcut.md {
  height: 24px;
  min-height: 24px;
  font-size: 12px;
  padding: 0 6px;
}
</style>
