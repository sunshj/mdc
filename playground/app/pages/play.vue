<template>
  <div class="container">
    <textarea
      v-model="input"
      placeholder="Enter your code here"
      cols="30"
      rows="10"
      @keydown.ctrl.enter="send"
    />

    <button class="send" @click="send">send</button>
    <button class="clear" @click="clear">clear</button>

    <div class="output">
      <MDC v-for="{ id, value } in output" :key="id" :value />
    </div>
  </div>
</template>

<script lang="ts" setup>
const input = ref(`::code-group
  \`\`\`bash [npm]
  npm run dev
  \`\`\`

  \`\`\`bash [pnpm]
  pnpm dev
  \`\`\`

  \`\`\`bash [yarn]
  yarn dev
  \`\`\`

  \`\`\`bash [bun]
  bun run dev
  \`\`\`
::

\`\`\`yaml [.prettierignore]
content
README.md
\`\`\`
`)

const output = ref<Array<{ id: number; value: string }>>([])

const send = useDebounceFn(() => {
  if (!input.value.trim()) return
  output.value.unshift({
    id: Date.now(),
    value: input.value
  })
}, 350)

function clear() {
  input.value = ''
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

.send {
  margin-right: 10px;
}

.clear {
  background-color: #dc3545;
}

.output {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
