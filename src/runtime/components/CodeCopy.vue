<template>
  <div class="code-copy">
    <Transition name="copy-fade" mode="out-in">
      <Icon v-if="!copied" name="lucide:copy" @click="copy(props.code)" />
      <Icon v-else name="lucide:check" />
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
.copy-fade-enter-active,
.copy-fade-leave-active {
  transition: opacity 0.2s ease;
}

.copy-fade-enter-from,
.copy-fade-leave-to {
  opacity: 0;
}

.code-copy {
  display: flex;
}

.code-copy .iconify {
  display: block;
  align-self: center;
  cursor: pointer;
  color: var(--mdc-muted-foreground);
}

.code-copy .iconify:hover {
  color: var(--mdc-primary);
}
</style>
