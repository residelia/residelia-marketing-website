<template>
  <div class="post-inner-img">
      <SanityImage class="img-fluid r-16" :asset-id="value.asset._ref" auto="format" :alt="value?.alt" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  value: object
}>();
</script>