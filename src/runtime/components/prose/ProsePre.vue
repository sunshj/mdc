<template>
  <div :data-header="props.showHeader" class="prose-pre-card">
    <div v-if="props.showHeader && props.filename" name="header">
      <Icon v-if="icon" :name="icon" />
      <span> {{ props.filename }}</span>
      <CodeCopy :code="props.code" name="copy-btn" />
    </div>

    <span v-if="!props.filename" name="absolute-copy-btn"><CodeCopy :code="props.code" /></span>

    <span v-if="!props.filename && !isSingleLine" name="absolute-language">
      {{ props.language }}
    </span>

    <div name="body">
      <div
        name="code-wrapper"
        :data-inline-copy="props.showHeader && !props.filename"
        :data-no-language="!props.language"
      >
        <pre ref="preRef" class="prose-pre" :class="props.class">
          <slot />
        </pre>

        <button
          v-if="collapseButtonVisible"
          :data-collapsed="collapsed"
          name="collapse-button"
          @click="collapsed = !collapsed"
        >
          <Icon :size="16" :name="collapsed ? 'lucide:chevron-down' : 'lucide:chevron-up'" />
          {{ collapsed ? 'Expand code' : 'Collapse code' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { objectEntries } from '@vueuse/core'
import { computed, onUnmounted, ref, toRef, useAppConfig, useIntersectionObserver } from '#imports'
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

const { mdcp } = useAppConfig()
const icons = computed(() => new Map<string, string>(objectEntries(mdcp.codeIconMap)))

const preRef = ref<HTMLPreElement>()
const collapsed = toRef(mdcp.codeBlock.enableFold)
const codeBlockMaxHeight = computed(() =>
  collapsed.value ? `${mdcp.codeBlock.foldHeight}px` : 'auto'
)
const collapseButtonVisible = ref(false)

const observer = useIntersectionObserver(preRef, ([entry]) => {
  if (entry?.isIntersecting && entry?.target && mdcp.codeBlock.enableFold) {
    collapseButtonVisible.value = entry.target.scrollHeight > mdcp.codeBlock.foldHeight
  } else {
    collapseButtonVisible.value = false
  }
})

const icon = computed(
  () => icons.value.get(props.filename?.toLowerCase()) || icons.value.get(props.language ?? '')
)

const isSingleLine = computed(() => props.code.trim().split('\n').length === 1)

onUnmounted(() => {
  observer.stop()
})
</script>

<style scoped>
.prose-pre-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--mdc-border);
  background-color: var(--mdc-background);
  margin: 1em 0;
}

.prose-pre-card[data-header='false'] {
  border-style: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
}

.prose-pre-card [name='header'] {
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 12px;
  border-bottom: 1px solid var(--mdc-border);
  font-size: 14px;
  line-height: 1.25rem;
}

.prose-pre-card .iconify {
  align-self: center;
  margin-right: 0.375rem;
}

.prose-pre-card [name='copy-btn'] {
  margin-left: auto;
}

.prose-pre-card [name='absolute-copy-btn'] {
  position: absolute;
  z-index: 10;
  top: 7px;
  right: 5px;
}

.prose-pre-card [name='absolute-language'] {
  position: absolute;
  z-index: 5;
  text-transform: uppercase;
  bottom: 0.5rem;
  right: 0.5rem;
  font-weight: 700;
  color: #ccca;
}

.prose-pre-card [name='body'] {
  background-color: var(--mdc-muted-30);
}

.prose-pre-card [name='code-wrapper'] {
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.25rem;
  position: relative;
}

.prose-pre-card [name='code-wrapper'][data-inline-copy='true'] :deep(.line) {
  padding-right: 2.75rem;
}

.prose-pre-card [name='code-wrapper'][data-no-language='true'] > .prose-pre {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.prose-pre-card [name='collapse-button'] {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid var(--mdc-border);
  padding: 2px 5px;
  border-radius: 4px;
  display: flex;
  background: var(--mdc-muted);
  color: var(--mdc-foreground);
  cursor: pointer;
}

.prose-pre-card [name='collapse-button']:hover {
  outline: 2px solid var(--mdc-muted-foreground);
}

.prose-pre-card [name='collapse-button'][data-collapsed='false'] {
  display: none;
}

.prose-pre-card [name='code-wrapper']:hover > [name='collapse-button'] {
  display: flex;
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
  content: '-';
  color: #c23a3a;
  position: absolute;
  left: 4px;
}

.prose-pre code .line.diff.add::before {
  content: '+';
  color: #23b73c;
  position: absolute;
  left: 4px;
}

/* disable language-md line diff  */
.prose-pre.language-md code .line.diff {
  background-color: inherit !important;
  opacity: inherit !important;
}

.prose-pre.language-md code .line.diff::before {
  content: none !important;
}
</style>
