<template>
    <span v-if="value.slug">
      <NuxtLink v-if="Array.isArray(value?.slug)" :to="localePath(value?.slug.find(t => t._key === locale).value.current)" class="color--theme"><slot /></NuxtLink>
      <NuxtLink v-else :to="localePath(value?.slug.current)" class="color--theme"><slot /></NuxtLink>
    </span>
    <span v-else>COULD NOT RENDER LINK</span>
</template>

<script lang="ts" setup>
const { locale } = useI18n()
const localePath = useLocalePath()

defineProps<{
  value: object
}>();
</script>