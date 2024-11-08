<template>
  <div class="container">
    <MDC v-if="data" :value="data" />
  </div>
</template>

<script lang="ts" setup>
import exampleMdUrl from '~/assets/example.md?url'

const { data } = useFetch(exampleMdUrl)
</script>

<style scoped></style>
