<template>
    <div>
    <div v-if="data">{{ data[0].title.find(l => l._key === locale).value }}</div>
        <SectionsDemo6Section1 />
        <SectionsDemo6Section2 />
        <SectionsDemo6Section3 />
        <SectionsDemo6Section4 />
        <SectionsDemo6Section5 />
        <SectionsDemo6Section6 />
        <SectionsDemo6Section7 />
        <SectionsDemo6Section8 />
        <SectionsDemo6Section9 />
        <SectionsDemo6Section10 />
        <SectionsDemo6Section11 />
        <SectionsDemo6Section12 />
        <SectionsDemo6Section13 />
        <SectionsDemo6Section14 />
        <SectionsDemo6Section15 />
        <SectionsDemo6Section16 />
        <SectionsDemo6Section17 />
    </div>
</template>

<script setup>
import { useMainStore } from '../../stores/mainStore';
import { pageQuery } from '../../queries/contentQueries'

useHead({
    bodyAttrs: {
        class: "navbar-dark scheme-residelia"
    },
})

const route = useRoute();
const { locale } = useI18n()
const mainStore = useMainStore()

const data = await useSanityData({
    query: pageQuery,
    params: {
        slug: route.fullPath,
        language: locale._value
    }
})

console.log(
        "%cStop!",
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
console.log(route)
console.log(locale.value)
console.log(data)

useServerSeoMeta({
  title: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  ogTitle: `${data.value[0].title.find(l => l._key === locale.value).value}`,
  description: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogDescription: `${data.value[0].description.find(l => l._key === locale.value).value}`,
  ogImage: `${data.value[0]?.hero?.image}`,
  twitterCard: 'summary_large_image',
})
// defineWebPage({
//   // will resolve to ISO 8601 format
//   '@type': 'WebPage',
//   url: `${process.env.BASE_URL}/${route.fullPath}`,
//   name: `${data._value[0].title.find(l => l._key === locale._value).value}`,
//   image: `${data._value[0]?.hero?.image}`,
//   datePublished: new Date(2024, 10, 1)
// })
</script>