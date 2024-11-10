<template>
  <div class="card">
    <div class="code-group">
      <div class="code-group-tabs">
        <div
          v-for="(slot, i) in defaultSlots"
          :key="`${i}-${label(slot.props)}`"
          :value="label(slot.props)"
          :class="{
            'code-group-tab': true,
            active: activeTabIndex === i
          }"
          @click="activeTabIndex = i"
        >
          <SmartIcon v-if="icon(slot?.props)" :name="icon(slot?.props)!" />
          {{ label(slot.props) }}
        </div>

        <CodeCopy v-if="code" :code="code" class="copy-btn" />
      </div>
    </div>

    <div
      v-for="(slot, i) in defaultSlots"
      v-show="activeTabIndex === i"
      :key="`${i}${label(slot.props)}`"
      :value="label(slot.props)"
    >
      <component :is="slot" :show-header="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from '#imports'
import { useFileIcons } from '../composables/file-icons'

const defaultSlots = computed(() => useSlots()?.default?.() || [])

const activeTabIndex = ref(0)

const code = computed(() => defaultSlots.value[activeTabIndex.value]?.props?.code)

const iconMap = useFileIcons()

function icon(props: any) {
  return props?.icon || iconMap.get(props?.filename?.toLowerCase()) || iconMap.get(props?.language)
}

function label(props: any) {
  return props?.label || props?.filename
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem; /* 8px */
  border: 1px solid var(--mdc-border);
  background-color: var(--mdc-background);
  margin: 1rem 0;
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

.copy-btn {
  margin-left: auto;
}
</style>
