<template>
  <div class="code-group-card">
    <div class="code-group">
      <div class="code-group-tabs">
        <div
          v-for="(slot, i) in defaultSlots"
          :key="`${i}-${label(slot.props!)}`"
          :value="label(slot.props!)"
          :class="{
            'code-group-tab': true,
            active: activeTabIndex === i
          }"
          @click="activeTabIndex = i"
        >
          <SmartIcon v-if="icon(slot?.props!)" :name="icon(slot?.props!)!" />
          {{ label(slot.props!) }}
        </div>

        <CodeCopy v-if="code" :code name="copy-btn" />
      </div>
    </div>

    <div
      v-for="(slot, i) in defaultSlots"
      v-show="activeTabIndex === i"
      :key="`${i}${label(slot.props!)}`"
      :value="label(slot.props!)"
    >
      <component :is="slot" :show-header="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from '#imports'
import { useMdcpConfig } from '../composables/mdcp-config'

type SlotVNodeProps = {
  code?: string
  filename?: string
  language?: string
  showHeader?: boolean
  icon?: string
  label?: string
} & Record<string, any>

const defaultSlots = computed(() => useSlots()?.default?.() || [])

const activeTabIndex = ref(0)

const code = computed(() => defaultSlots.value[activeTabIndex.value]?.props?.code)

const { icons } = useMdcpConfig()

function icon(props: SlotVNodeProps) {
  return (
    props?.icon ||
    icons.get(props?.filename?.toLowerCase() ?? '') ||
    icons.get(props?.language ?? '')
  )
}

function label(props: SlotVNodeProps) {
  return props?.label || props?.filename
}
</script>

<style scoped>
.code-group-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--mdc-border);
  background-color: var(--mdc-background);
  margin: 1em 0;
  font-size: 14px;
}

.code-group {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.code-group-tabs {
  display: flex;
  flex-direction: row;
  gap: 4px;
  background-color: var(--mdc-background);
  border-bottom: 1px solid var(--mdc-border);
  padding: 5px 12px 5px 5px;
  overflow-x: auto;
}

.code-group-tab {
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease-in-out;
}

.code-group-tab.active {
  background-color: var(--mdc-secondary);
  border-radius: 6px;
}

.code-group-tabs [name='copy-btn'] {
  margin-left: auto;
}
</style>
