<template>
  <div>
    <SectionsBlogListingSection1 />
    <SectionsBlogListingSection2 />
    <SectionsBlogListingSection3 />
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "navbar-dark",
  },
});
definePageMeta({
  title: "My home page",
});
</script>
