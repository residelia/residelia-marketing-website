<template>
    <a :href="value?.url+'?fm=webp'" class="color--theme" target="_blank" rel="noopener"><slot /></a>
</template>

<script lang="ts" setup>
defineProps<{
  value: object
}>();
</script>