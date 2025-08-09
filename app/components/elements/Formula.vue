<template>
  <div>
    <div v-html="renderedLatex" class="latex-formula my-5"></div>
  </div>
</template>

<script setup lang="ts">
import katex from 'katex'
import 'katex/dist/katex.min.css'

const props = defineProps<{
  value: { body: string }
}>();

const renderedLatex = computed(() =>
  katex.renderToString(props.value.body || '', {
    throwOnError: false,
    displayMode: true
  })
)
</script>

<style scoped>
.latex-formula {
  margin: 1em 0;
  font-size: 1.1em;
}
</style>