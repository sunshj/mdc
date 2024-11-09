<template>
  <div class="card" :class="{ 'no-header': !showHeader }">
    <div v-if="showHeader && filename" class="card-header">
      <SmartIcon v-if="icon" :name="icon" class="icon" />
      {{ filename }}
      <CodeCopy :code class="copy-btn" />
    </div>

    <span v-if="!filename" class="absolute-copy-btn">
      <CodeCopy :code />
    </span>

    <span v-if="!filename && !isSingleLine" class="absolute-language">{{ language }}</span>

    <div class="card-body">
      <div
        class="code-wrapper"
        :class="{
          'inline-copy': showHeader && !filename,
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
import { computed, type PropType } from '#imports'
import { iconMap } from '../../config'
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
  showHeader: {
    type: Boolean,
    default: true
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

const icon = iconMap.get(props.filename?.toLowerCase()) || iconMap.get(props.language)

const isSingleLine = computed(() => props.code.trim().split('\n').length === 1)
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem; /* 8px */
  border: 1px solid var(--border);
  background-color: var(--background);
  margin: 1rem 0;
}

.no-header {
  border-style: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
}

.card-header {
  display: flex;
  padding: 0.75rem; /* 12px */
  border-bottom: 1px solid var(--border);
  font-size: 14px;
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

.absolute-language {
  position: absolute;
  z-index: 5;
  text-transform: uppercase;
  bottom: 0.5rem; /* 12px */
  right: 0.5rem; /* 12px */
  font-weight: 700;
  color: #ccca;
}

.card-body {
  background-color: var(--muted-30);
}

.code-wrapper {
  overflow-x: auto;
  font-size: 14px;
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
