<template>
  <div class="copy-wrapper">
    <Transition name="fade" mode="out-in">
      <Icon v-if="!copied" name="lucide:copy" class="copy" @click="copy(props.code)" />
      <Icon v-else name="lucide:check" class="copy" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useClipboard, useEventBus, whenever } from '@vueuse/core'

const props = defineProps<{
  code: string
}>()

const bus = useEventBus('mdc:copied')
const { copy, copied } = useClipboard({ legacy: true })

whenever(copied, () => {
  bus.emit(props.code)
})
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.copy-wrapper {
  display: flex;
}

.copy {
  display: block;
  align-self: center;
  cursor: pointer;
  color: var(--mdc-muted-foreground);
}

.copy:hover {
  color: var(--mdc-primary);
}
</style>
