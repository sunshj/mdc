<template>
  <div class="card" :class="{ 'in-group': inGroup }">
    <div v-if="!inGroup && filename" class="card-header">
      <SmartIcon v-if="icon" :name="icon" class="icon" />
      {{ filename }}
      <CodeCopy :code="code" class="copy-btn" />
    </div>

    <span v-if="!filename" class="absolute-copy-btn">
      <CodeCopy :code="code" />
    </span>

    <div class="card-body">
      <div
        class="code-wrapper"
        :class="{
          'inline-copy': !inGroup && !filename,
          'no-language': !language
        }"
      >
        <pre class="prose-pre" :class="$props.class" :style="style">
          <slot />
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from '#imports'
import { fileIconMap } from '../../config'
import type { BuiltinLanguage } from 'shiki'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String as PropType<BuiltinLanguage>,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  inGroup: {
    type: Boolean,
    default: false
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  },

  style: {
    type: [String, Object],
    default: null
  }
})

const iconMap = new Map(Object.entries(fileIconMap))
const icon = iconMap.get(props.filename?.toLowerCase()) || iconMap.get(props.language)
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem; /* 8px */
  border: 1px solid var(--border);
  background-color: var(--background);
}

.card:not(:first-child) {
  margin-top: 1.25rem; /* 20px */
}

.card:not(:last-child) {
  margin-top: 1.25rem; /* 20px */
}

.in-group {
  border-style: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-bottom: 0;
}

.card-header {
  display: flex;
  padding: 0.75rem; /* 12px */
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
}

.icon {
  align-self: center;
  margin-right: 0.375rem; /* 6px */
}

.copy-btn {
  margin-left: auto;
  margin-right: 0.25rem; /* 4px */
}

.absolute-copy-btn {
  position: absolute;
  z-index: 10;
  top: 0.75rem; /* 12px */
  right: 0.75rem; /* 12px */
}

.card-body {
  background-color: var(--muted-30);
}

.code-wrapper {
  overflow-x: auto;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  padding: 0.75rem 0; /* 12px */
}

.inline-copy :deep(.line) {
  padding-right: 2.75rem;
}

.no-language {
  padding-left: 0.75rem;
}
</style>

<style>
.shiki .line {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.shiki .line.highlight {
  background-color: var(--muted-80);
}

.prose-pre {
  margin: 0;
  white-space: normal;
}
.prose-pre code {
  white-space: pre;
}

.prose-pre code .line {
  display: block;
  min-height: 1rem;
}

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
</style>
