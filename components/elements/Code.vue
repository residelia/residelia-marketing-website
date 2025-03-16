<template>
  <div class="txt-code r-06">
      {{ value.language }}
      <p>
        <code class="code-language-js">
          {{ value.code }}
        </code>
      </p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  value: object,
}>();
</script>