<template>
  <div :class="{ card: true, 'no-header': !props.showHeader }">
    <div v-if="props.showHeader && props.filename" class="card-header">
      <SmartIcon v-if="icon" :name="icon" class="icon" />
      {{ props.filename }}
      <CodeCopy :code="props.code" class="copy-btn" />
    </div>

    <span v-if="!props.filename" class="absolute-copy-btn"><CodeCopy :code="props.code" /></span>

    <span v-if="!props.filename && !isSingleLine" class="absolute-language">
      {{ props.language }}
    </span>

    <div class="card-body">
      <div
        :class="{
          'code-wrapper': true,
          'inline-copy': props.showHeader && !props.filename,
          'no-language': !props.language
        }"
      >
        <pre ref="preRef" class="prose-pre" :class="props.class">
          <slot />
        </pre>

        <div
          v-if="collapseButtonVisible"
          :data-collapsed="collapsed"
          class="collapse-button-wrapper"
        >
          <button class="collapse-button" @click="collapsed = !collapsed">
            {{ collapsed ? 'Expand code' : 'Collapse code' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { computed, onUnmounted, ref, toRef } from '#imports'
import { useMdcpConfig } from '../../composables/mdcp-config'
import type { BuiltinLanguage } from 'shiki'

const props = withDefaults(
  defineProps<{
    code: string
    language?: BuiltinLanguage
    filename?: string
    showHeader?: boolean
    highlights?: number[]
    meta?: string
    class?: string
  }>(),
  {
    filename: '',
    showHeader: true,
    highlights: () => []
  }
)

const { icons, codeBlock } = useMdcpConfig()

const preRef = ref<HTMLPreElement>()
const collapsed = toRef(codeBlock.enableFold)
const codeBlockMaxHeight = computed(() => (collapsed.value ? `${codeBlock.foldHeight}px` : 'auto'))
const collapseButtonVisible = ref(false)

const observer = useIntersectionObserver(preRef, ([{ isIntersecting, target }]) => {
  if (isIntersecting && codeBlock.enableFold) {
    collapseButtonVisible.value = target.scrollHeight > codeBlock.foldHeight
  } else {
    collapseButtonVisible.value = false
  }
})

const icon = computed(
  () => icons.get(props.filename?.toLowerCase()) || icons.get(props.language ?? '')
)

const isSingleLine = computed(() => props.code.trim().split('\n').length === 1)

onUnmounted(() => {
  observer.stop()
})
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--mdc-border);
  background-color: var(--mdc-background);
  margin: 1em 0;
}

.no-header {
  border-style: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
}

.card-header {
  display: flex;
  padding: 0.75rem;
  border-bottom: 1px solid var(--mdc-border);
  font-size: 14px;
  line-height: 1.25rem;
}

.icon {
  align-self: center;
  margin-right: 0.375rem;
}

.copy-btn {
  margin-left: auto;
  margin-right: 0.25rem;
}

.absolute-copy-btn {
  position: absolute;
  z-index: 10;
  top: 0.75rem;
  right: 0.5rem;
}

.absolute-language {
  position: absolute;
  z-index: 5;
  text-transform: uppercase;
  bottom: 0.5rem;
  right: 0.5rem;
  font-weight: 700;
  color: #ccca;
}

.card-body {
  background-color: var(--mdc-muted-30);
}

.code-wrapper {
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.25rem;
  position: relative;
}

.inline-copy :deep(.line) {
  padding-right: 2.75rem;
}

.no-language {
  padding-left: 0.75rem;
}

.collapse-button-wrapper {
  width: 100%;
  position: absolute;
  bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.collapse-button-wrapper[data-collapsed='false'] {
  display: none;
}

.code-wrapper:hover .collapse-button-wrapper {
  display: flex;
}

.collapse-button {
  border: 1px solid var(--mdc-border);
  padding: 2px 5px;
  border-radius: 4px;
  background: var(--mdc-muted);
  color: var(--mdc-foreground);
  cursor: pointer;
  pointer-events: auto;
}
</style>

<style>
.prose-pre {
  margin: 0;
  white-space: normal;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px 0;
  max-height: v-bind(codeBlockMaxHeight);
}

.prose-pre code {
  white-space: pre;
  display: block;
  font-family: var(--mdc-code-family);
}

.prose-pre code .line {
  display: block;
  position: relative;
  padding: 0 1rem;
}

.prose-pre code .line.highlight {
  background-color: var(--mdc-muted-80);
}

/* line diff */
.prose-pre code .line.diff.remove {
  background-color: #f43f5e24;
  opacity: 0.6;
}

.prose-pre code .line.diff.add {
  background-color: #10b98124;
}

.prose-pre code .line.diff.remove::before {
  content: '－';
  color: #c23a3a;
  position: absolute;
  left: 5px;
}

.prose-pre code .line.diff.add::before {
  content: '＋';
  color: #23b73c;
  position: absolute;
  left: 5px;
}

/* disable language-md line diff  */
.language-md.prose-pre code .line.diff {
  background-color: inherit !important;
  opacity: inherit !important;
}

.language-md.prose-pre code .line.diff::before {
  content: none !important;
}
</style>
