<template>
  <div class="container">
    <textarea
      v-model="input"
      placeholder="Enter your code here"
      cols="30"
      rows="10"
      @keydown.ctrl.enter="send"
    />

    <button @click="send">send</button>

    <div class="output">
      <MDC v-for="{ id, value } in output" :key="id" :value="value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const input = ref(`\`\`\`js
export default defineNuxtConfig({
  extends: '@nuxt-themes/typography'
})
\`\`\`
`)

const output = ref<Array<{ id: number; value: string }>>([])

function send() {
  output.value.unshift({
    id: Date.now(),
    value: input.value
  })
  input.value = ''
}
</script>

<style scoped>
textarea {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.output {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
