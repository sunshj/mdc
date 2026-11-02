<template>
  <div>
    <textarea v-model="input" placeholder="Enter your markdown here" cols="30" rows="10" />

    <button class="stream" :disabled="streaming" @click="run">
      {{ streaming ? 'streaming...' : 'stream' }}
    </button>
    <button class="clear" @click="clear">clear</button>

    <div class="output">
      <Suspense>
        <Markdown :value="output" :streaming :plugins />
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Markdown } from '@comark/vue'
import shiki from '@comark/vue/plugins/shiki'
import githubDark from 'shiki/themes/github-dark-default.mjs'
import githubLight from 'shiki/themes/github-light-default.mjs'

const plugins = [shiki({ themes: { light: githubLight, dark: githubDark } })]

const input = ref(`# Comark streaming

Rendered by **Comark** with the prose components of this module.

::code-group
\`\`\`bash [npm]
npm run dev
\`\`\`

\`\`\`bash [pnpm]
pnpm dev
\`\`\`

\`\`\`bash [yarn]
yarn dev
\`\`\`
::

\`\`\`ts [stream.ts]
interface Chunk {
  text: string
  done: boolean
}

export async function consume(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()

  let content = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    content += decoder.decode(value, { stream: true })
  }

  return content
}
\`\`\`

| step | status |
| --- | --- |
| parse | done |
| render | streaming |

> Unclosed syntax is closed automatically, e.g. **bold

- list item with \`inline code\`
- [link](https://comark.dev)
`)

const output = ref(input.value)
const streaming = ref(false)

const CHUNK_SIZE = 4
const FRAME_DELAY = 16

async function run() {
  output.value = ''
  streaming.value = true
  try {
    for (let i = 0; i < input.value.length; i += CHUNK_SIZE) {
      output.value = input.value.slice(0, i + CHUNK_SIZE)
      await new Promise(resolve => setTimeout(resolve, FRAME_DELAY))
    }
  } finally {
    output.value = input.value
    streaming.value = false
  }
}

function clear() {
  output.value = ''
}
</script>

<style scoped>
textarea {
  width: 100%;
  border: 1px solid var(--mdc-border);
  padding: 10px;
  color: var(--mdc-foreground);
  background-color: var(--mdc-background);
  font-size: 16px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
}

.stream {
  margin-right: 10px;
}

.clear {
  background-color: #dc3545;
}

.output {
  margin-top: 20px;
  width: 100%;
}
</style>
