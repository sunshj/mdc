<template>
  <div class="selector">
    <select
      v-model="$colorMode.value"
      @change="$colorMode.preference = ($event.target as HTMLSelectElement).value"
    >
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>

    <select :value="$route.path" @change="onLinkChange">
      <option
        v-for="link in links"
        :key="link.name"
        :value="link.path"
        :selected="link.path === $route.path"
      >
        {{ link.name }}
      </option>
    </select>
  </div>

  <NuxtPage />
</template>

<script setup lang="ts">
import { useEventBus } from '@vueuse/core'

const links = [
  {
    name: 'index',
    path: '/'
  },
  {
    name: 'example',
    path: '/example'
  },
  {
    name: 'play',
    path: '/play'
  }
]

function onLinkChange(event: Event) {
  navigateTo((event.target as HTMLSelectElement).value)
}

const bus = useEventBus('mdc:copied')

bus.on(data => {
  console.log('copied code: ', data)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--mdc-background);
  color: var(--mdc-foreground);
  border-color: var(--mdc-border);
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  max-width: 768px;
}
</style>

<style scoped>
.selector {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: cadetblue;
}

select {
  width: fit-content;
  padding: 2px 4px;
  height: 100%;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

option {
  background-color: cadetblue;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
</style>
