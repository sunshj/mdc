<template>
  <div class="code-group-card">
    <div class="code-group">
      <div class="code-group-tabs">
        <div name="files">
          <div
            v-for="(slot, i) in defaultSlots"
            :key="`${i}-${label(slot.props!)}`"
            :value="label(slot.props!)"
            :class="{
              'code-group-tab': true,
              active: activeTabIndex === i
            }"
            @click="onTabClick($event, i)"
          >
            <Icon v-if="icon(slot?.props!)" :name="icon(slot?.props!)!" />
            {{ label(slot.props!) }}
          </div>
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
import { objectEntries } from '@vueuse/core'
import { computed, ref, useAppConfig, useSlots } from '#imports'

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

function onTabClick(evt: MouseEvent, index: number) {
  activeTabIndex.value = index
  const el = evt.target as HTMLDivElement
  el?.scrollIntoView?.({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}

const code = computed(() => defaultSlots.value[activeTabIndex.value]?.props?.code)

const { mdcp } = useAppConfig()
const icons = computed(() => new Map<string, string>(objectEntries(mdcp.codeIconMap)))

function icon(props: SlotVNodeProps) {
  return (
    props?.icon ||
    icons.value.get(props?.filename?.toLowerCase() ?? '') ||
    icons.value.get(props?.language ?? '')
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
  padding: 5px;
  position: relative;
}

.code-group-tabs [name='files'] {
  display: flex;
  flex: 1;
  overflow-x: auto;
}

.code-group-tab {
  padding: 5px 10px;
  cursor: pointer;
  min-width: fit-content;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease-in-out;
}

.code-group-tab.active {
  background-color: var(--mdc-secondary);
  border-radius: 6px;
}
</style>
